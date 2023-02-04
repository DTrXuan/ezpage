const addMessageButton = document.getElementById('add-message-button');
const messageInput = document.getElementById('message-input');
const userInput = document.getElementById('user-input');
const messageList = document.getElementById('message-list');

const storageKey = 'messages';

let messages = JSON.parse(localStorage.getItem(storageKey)) || [];

const addMessage = (event) => {
  event.preventDefault();
  if (!userInput.value || !messageInput.value) {
    alert('Username and Message are both required.');
    return;
  }
  const message = {
    id: Math.floor(Math.random() * 100000000),
    author: userInput.value,
    text: messageInput.value,
    date: new Date().toLocaleString(),
  };
  messages.push(message);
  localStorage.setItem(storageKey, JSON.stringify(messages));
  messageInput.value = '';
  renderMessages();
};

const renderMessages = () => {
  messageList.innerHTML = '';
  for (const message of messages) {
    const messageItem = document.createElement('li');
    messageItem.innerHTML = `
      <p class="date">${message.date} : <strong>${message.text}</strong></p>
    `;
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.onclick = () => {
      if (message.author === userInput.value || userInput.value === 'xuansama') {
        messages = messages.filter(m => m.id !== message.id);
        localStorage.setItem(storageKey, JSON.stringify(messages));
        renderMessages();
      } else {
        alert('You are not authorized to delete this message.');
      }
    };
    messageItem.appendChild(deleteButton);
    messageList.appendChild(messageItem);
  }
};

addMessageButton.onclick = addMessage;
renderMessages();
