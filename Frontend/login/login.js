async function login(event){
    try{
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        const loginDetails = {
            email,
            password
        }
        console.log(loginDetails);
        const response = await axios.post('https://vijay-group-chat.onrender.com/user/login', loginDetails)
        email.value = '';
        password.value = '';
        alert(response.data.message);
        localStorage.setItem('token', response.data.token);
        window.location.href = '../chat/chat.html';
    }
    catch(err){
        console.log(JSON.stringify(err));
    }
}