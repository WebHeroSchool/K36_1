ShowChannel('work', '#channel for work');

const channelButtons = document.querySelectorAll('.wrap__button'),
      messageBox = document.querySelector('textarea[name="massage"]');

channelButtons.forEach(function(elem) {

  elem.addEventListener("click", function(event) {

    let channelId = event.target.dataset.channelId,
        channelName = event.target.innerHTML;

    ShowChannel(channelId, channelName);

  });

});

messageBox.addEventListener("keyup", function(event) {

  if (event.code === "Enter") {

    AddMessage({

      authorId: 188372,
      authorName: "John",
      time: Math.floor(Date.now() / 1000),
      message: messageBox.value

    });

    messageBox.value = '';
    ScrollMessagesToBottom();

  }

});

function AddMessage(messageData) {

  let messagesWrapper = document.querySelector('.wrapper__content'),
      cloned = document.querySelector('.hidden-data > .content__message').cloneNode(true),
      img = cloned.querySelector('img'),
      userName = cloned.querySelector('.information__username'),
      messageText = cloned.querySelector('.context__text'),
      messageTime = cloned.querySelector('.information__time');

  img.src = 'image/av/'+messageData.authorId+'.png';
  userName.innerHTML = messageData.authorName;
  messageText.innerHTML = messageData.message;
  messageTime.innerHTML = GetMessageDateTime(messageData.time);

  messagesWrapper.append(cloned);

}

function ShowChannel(channelId, channelName) {

  let channelData = messages.channels[channelId],
      messagesWrapper = document.querySelector('.wrapper__content'),
      channelNameEl = document.querySelector('.header__text');

  messagesWrapper.innerHTML = '';
  channelNameEl.innerHTML = channelName;

  channelData.forEach(function(messageData) {

    AddMessage(messageData);

  });

}

function GetMessageDateTime(timestamp) {

  let date = new Date(timestamp * 1000);

  return AddLeadingZeroes(date.getDate()) + '.' + AddLeadingZeroes(date.getMonth()+1) + '.' + date.getFullYear() + ' ' + AddLeadingZeroes(date.getHours()) + ':' + AddLeadingZeroes(date.getMinutes());

}

function AddLeadingZeroes(n) {

  return String("00" + n).slice(-2);

}

function ScrollMessagesToBottom() {

  window.scrollTo(0,document.body.scrollHeight);

}
