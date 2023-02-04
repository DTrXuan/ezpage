// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDec-8CDh3qR--Edc3qQRoWezOe_1Chkbs",
    authDomain: "personal-web-85216.firebaseapp.com",
    databaseURL: "https://personal-web-85216-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "personal-web-85216",
    storageBucket: "personal-web-85216.appspot.com",
    messagingSenderId: "378523372936",
    appId: "1:378523372936:web:703797af9bdda4f2df3e3d",
    measurementId: "G-JSZMB8JS6M"
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
    messagesRef.on("value", function(snapshot) {
      messageList.innerHTML = '';
      snapshot.forEach(function(childSnapshot) {
        const message = childSnapshot.val();
        const messageItem = document.createElement('li');
        messageItem.innerHTML = `
          <p class="date">${message.date} : <strong>${message.text}</strong></p>
        `;
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.onclick = () => {
          if (message.author === userInput.value || userInput.value === 'xuansama') {
            childSnapshot.ref.remove();
          } else {
            alert('You are not authorized to delete this message.');
          }
        };
        messageItem.appendChild(deleteButton);
        messageList.appendChild(messageItem);
      });
    });
  };
  
  addMessageButton.onclick = addMessage;
  renderMessages();
  