async function signup(event){
    try{
        event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const number = event.target.number.value;
    const password = event.target.password.value;

    const userDetails = {
        name,
        email,
        number,
        password
    }
    console.log(userDetails);
    const response = await axios.post('
https://fine-cowboy-hat-fish.cyclic.app:3000/user/signup', userDetails);
        if(response.status === 200)
        {
            alert('User successfully created. Please Login');
            window.location.href = '../login/index.html';
            console.log("User Successfully Registered");
        }
        else if(response.status === 404){
            alert('User already Exist');
            console.log(response.data.message);
        }
        else{
            throw new Error("Failed to register User");
        }
    }
    catch(err) {
        console.log(err);
    }
}