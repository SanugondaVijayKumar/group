const token = localStorage.getItem('token');
const grouplist = document.querySelector('.listofgrps');
async function creategroup(event){
   try{
    event.preventDefault();
    const groupName = event.target.groupname.value;
    const groupDetails = {
        groupName
    };
    const response = await axios.post('
http://localhost:3000/group/creategroup', groupDetails, {headers: {'Authorization': token}});
    if(response.status === 200){
        console.log(response.data.message);
        window.location.reload();
    }
   }
   catch(err){
    console.log(err);
   }
}


window.addEventListener('DOMContentLoaded', async () => {
    try{
        const response = await axios.get('
http://localhost:3000/group/getallgroups', {headers: {'Authorization': token}});
        console.log(response.data);
        if(response.status === 200){
            let grps = '';
            console.log(response.data.data);
            if(response.data.data.length === 0){
                grouplist.innerHTML = "You are not a part of any group";
            }
            else{
                for(let i = 0;i<response.data.data.length;i++){
                    grps += `<div>
                    <a href = "../groupdetails/groupdetails.html?g=${response.data.data[i].groupnameId}">${response.data.data[i].groupname}</a>
                    </div>`
                }
                grouplist.innerHTML = grps;
            }
        }
    }
    catch(err){
        console.log("Something went Wrong");
    }
})