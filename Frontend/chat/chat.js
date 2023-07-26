// const token = localStorage.getItem('token');
// let nam = '';
// const allmsgs = document.querySelector('#chat-body');
// const welcomeUser = document.querySelector('#welcome-user'); 

// async function sendMessage(event) {
//     event.preventDefault();
//     try{
//         const message = document.getElementById('message').value;
//         console.log(message);
//         const response = await axios.post('https://vijay-group-chat.onrender.com/message/send',{message: message}, {headers:{'Authorization':token}});
//         message.value = '';
//         console.log(response.data.message);
//     }
//     catch(err){
//         console.log('Error while sending message', err);
//     }
// }



// setInterval(async () => {
//     try{
//     const response = await axios.get('https://vijay-group-chat.onrender.com/message/getallmessages', {headers: {'Authorization': token}});
//     // console.log(response.data);
//     if(response.status === 200)
//     {
//         let res = '';
//         console.log(response.data.data);
//         for(let i = 0;i<response.data.data.length;i++){
//             res += `<div>
//                 <span>${response.data.data[i].username}: </span>
//                 <span>${response.data.data[i].message}</span>
//             </div>`;
//         }
//         allmsgs.innerHTML = res;
//     }
//     else{
//         throw new Error('Not Able to get messages');
//     }
// }
// catch(err) {
// console.log(err);
// }
// },1000);


// document.getElementById('signOut').onclick = () => {
//     localStorage.clear();
//     window.location.href = "../login/index.html";
// }


// Initialize Socket.IO and establish a connection to the server


import {io} from "socket.io-client"
const socket = io('https://vijay-group-chat.onrender.com');

const token = localStorage.getItem('token');
let nam = '';
const allmsgs = document.querySelector('#chat-body');
const welcomeUser = document.querySelector('#welcome-user'); 

// Function to send a message via Socket.IO
function sendMessage(message) {
    socket.emit('chat message', message);
}

// Event listener for the message input form submission
document.getElementById('message-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const message = document.getElementById('message').value;
    sendMessage(message);
    document.getElementById('message').value = '';
});

// Event listener for sign out button
document.getElementById('signOut').onclick = () => {
    localStorage.clear();
    window.location.href = "../login/index.html";
}

// Event listener for new incoming messages
socket.on('chat message', (data) => {
    const { username, message } = data;
    const newMessageDiv = document.createElement('div');
    newMessageDiv.innerHTML = `
        <span>${username}: </span>
        <span>${message}</span>
    `;
    allmsgs.appendChild(newMessageDiv);
});

// Function to fetch all existing messages from the server and display them
async function fetchAndDisplayMessages() {
    try {
        const response = await axios.get('https://vijay-group-chat.onrender.com/message/getallmessages', { headers: { 'Authorization': token } });
        if (response.status === 200) {
            let res = '';
            for (let i = 0; i < response.data.data.length; i++) {
                res += `<div>
                    <span>${response.data.data[i].username}: </span>
                    <span>${response.data.data[i].message}</span>
                </div>`;
            }
            allmsgs.innerHTML = res;
        } else {
            throw new Error('Not Able to get messages');
        }
    } catch (err) {
        console.log(err);
    }
}

// Fetch and display messages when the page loads
fetchAndDisplayMessages();

