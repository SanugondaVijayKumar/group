const token = localStorage.getItem('token');
let nam = '';
const allmsgs = document.querySelector('#chat-body');
const welcomeUser = document.querySelector('#welcome-user'); 

async function sendMessage(event) {
    event.preventDefault();
    try{
        const message = document.getElementById('message').value;
        console.log(message);
        const response = await axios.post('http://localhost:3000/message/send',{message: message}, {headers:{'Authorization':token}});
        message.value = '';
        console.log(response.data.message);
    }
    catch(err){
        console.log('Error while sending message', err);
    }
}



setInterval(async () => {
    try{
    const response = await axios.get('http://localhost:3000/message/getallmessages', {headers: {'Authorization': token}});
    // console.log(response.data);
    if(response.status === 200)
    {
        let res = '';
        console.log(response.data.data);
        for(let i = 0;i<response.data.data.length;i++){
            res += `<div>
                <span>${response.data.data[i].username}: </span>
                <span>${response.data.data[i].message}</span>
            </div>`;
        }
        allmsgs.innerHTML = res;
    }
    else{
        throw new Error('Not Able to get messages');
    }
}
catch(err) {
console.log(err);
}
},1000);


document.getElementById('signOut').onclick = () => {
    localStorage.clear();
    window.location.href = "../login/login.html";
}

