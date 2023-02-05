// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBCS7sYZx6navsEUg1hfwz8jI9sQk_oYCE",
  authDomain: "dtrxuan.firebaseapp.com",
  databaseURL: "https://dtrxuan-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dtrxuan",
  storageBucket: "dtrxuan.appspot.com",
  messagingSenderId: "206959232405",
  appId: "1:206959232405:web:7c90ca0d831776dbd3e29c"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const messagesRef = database.ref("messages");

const addMessageButton = document.getElementById('add-message-button');
const messageInput = document.getElementById('message-input');
const userInput = document.getElementById('user-input');
const messageList = document.getElementById('message-list');

const addMessage = (event) => {
  event.preventDefault();
  if (!userInput.value || !messageInput.value) {
    alert('Username and Message are both required.');
    return;
  }
  const message = {
    author: userInput.value,
    text: messageInput.value,
    date: new Date().toLocaleString(),
  };
  messagesRef.push(message);
  messageInput.value = '';
};

const renderMessages = () => {
  messagesRef.on("value", function (snapshot) {
    messageList.innerHTML = '';
    snapshot.forEach(function (childSnapshot) {
      const message = childSnapshot.val();
      const messageItem = document.createElement('li');
        messageItem.innerHTML = `
          <p class="date">${message.date} : <strong>${message.text}</strong></p>
        `;
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.style.display = 'none';
        
        deleteButton.onclick = () => {
          if (message.author === userInput.value || userInput.value === 'xuansama') {
            childSnapshot.ref.remove();
          } else {
            alert('You are not authorized to delete this message.');
          }
        };
        
        messageItem.onclick = () => {
          if (deleteButton.style.display === 'none') {
            deleteButton.style.display = 'inline';
          } else {
            deleteButton.style.display = 'none';
          }
        };
        
        messageItem.appendChild(deleteButton);

      messageList.appendChild(messageItem);
    });
  });
};

addMessageButton.onclick = addMessage;
renderMessages();
