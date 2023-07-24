let token = localStorage.getItem('token');
let addtogroup = document.querySelector('#add-to-group');
let sendmsg = document.querySelector('.sendmsg');
let inputtext = document.querySelector('#input-text');
let allmsgs = document.querySelector('.all-msgs');
let grpparticipants = document.querySelector('.grpparticipants');
let signout = document.querySelector('#signOut');

signout.addEventListener('click', () => {
    localStorage.clear();
    location.replace("../login/login.html");
})

addtogroup.addEventListener('click', async () => {
    try{
        let id = window.location.href.split("=")[1];
        console.log('ID is', id);
        let obj = {
            email: emailId.value,
            admin: adminvalue.value
        };
        console.log(obj);
        const response = await axios.post(`http://localhost:3000/content/addparticipant/${id}`, obj, {headers: {'Authorization': token}});
        // console.log(response);
        if(response.status === 200)
        {
            alert(response.data.message);
            emailId.value = '';
            location.reload();
        }
        else{
            throw new Error('SomeThing Went Wrong');
        }
    }
    catch(err){
        console.log(err);
    }
})

sendmsg.addEventListener('click', async () => {
    try{
        let id = window.location.href.split('=')[1];

        let inputvalue = inputtext.value;
        let obj = {
            message: inputvalue
        }
        const response = await axios.post(`http://localhost:3000/content/sendmessage/${id}`, obj, {headers: {'Authorization': token}});
        if(response.status === 200)
        {
            console.log(response.data.message);
            inputtext.value = '';   
        }
        else{
            throw new Error('Not able to send message, Something went wrong');
        }
    }
    catch(err){
        console.log(err);
    }
})

setInterval( async () => {
    try{
        let id = window.location.href.split('=')[1];

        const response = await axios.get(`http://localhost:3000/content/getgrpmessages/${id}`, {headers: {'Authorization': token}});
        if(response.status === 200){
            let len = '';
            for(let i=0;i<response.data.data.length;i++)
            {
                len += `<div>
                <span>${response.data.data[i].username}: </span>
                <span>${response.data.data[i].message}</span>
            </div>`;
            }
            allmsgs.innerHTML = len;
        }
        else{
            throw new Error('Not able to get Messages');
        }
    }
    catch(err){
        console.log(err);
    }
}, 1000);

document.addEventListener('DOMContentLoaded',async () => {
    try{
        let id = window.location.href.split('=')[1];
        const response = await axios.get(`http://localhost:3000/content/grpparticipants/${id}`, {headers: {'Authorization': token}});
        if(response.status === 200){
            let lop = '';
            for(let i= 0;i<response.data.data.length;i++)
            {
                const username = response.data.data[i].name;
                // console.log(username);
                if(response.data.data[i].admin == true)
                {
                    lop += `<div>
                    <p>Group Admin: <strong>${username}</strong></p>
                    </div>`;
                }
                else{
                    lop += `<div>
                    <p>${username}
                    <button class="makeadmin" id="${response.data.data[i].userId}">Make Admin</button>
                    <button class="removeuser" id="${response.data.data[i].userId}">Remove User</button></p>
                    </div>`
                }
            }
            grpparticipants.innerHTML = lop;
        }
    }
    catch(err){
        console.log(err);
    }
});

grpparticipants.addEventListener('click', async (e) => {
    try{
        let id = window.location.href.split('=')[1];
        console.log(id);
        if(e.target.classList.contains('makeadmin'))
        {
            let uid = e.target.id;
            // console.log("user ID is",uid);
            let obj = {
                userIdUpdate: uid
            }
            const response = await axios.post(`http://localhost:3000/content/makeuseradmin/${id}`, obj,{headers: {"Authorization": token}});
            alert(response.data.message);
            location.reload();
        }

        if(e.target.classList.contains('removeuser'))
        {
            let uid = e.target.id;
            // console.log("user ID is",uid)
            let obj = {
                userIdDelete: uid
            }
            const response = await axios.post(`http://localhost:3000/content/removeuser/${id}`, obj, {headers: {'Authorization': token}});
            alert(response.data.message);
            location.reload();
        }
    }
    catch(err){
        console.log(err);
    }
})

