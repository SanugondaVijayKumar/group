const Group = require('../models/creategroup');
const groupDetails = require('../models/usergroup');

exports.createGroup = async (req,res) => {
    try{
        let userid = req.user.id;
        const {groupName} = req.body;
        console.log('Group name is',groupName);
        console.log('User Id is', userid);
        await Group.create({groupname: groupName, userId: userid})
        .then(result => {
            let groupid = result.id;
            let groupname = result.groupname;
            let userName = req.user.username;
            console.log(groupid, groupname, userName);
            groupDetails.create({admin: true, groupname: groupname, name: userName, userId: userid, groupnameId: groupid})
            .then(result => {
                res.status(200).json({result, message:'Group Successfully Created'});
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
        })
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Something Went Wrong"});
    }
}

exports.getAllGroups = async (req,res) => {
   try{
    let id = req.user.id;
    // console.log("Group id is",id);
    const data = await groupDetails.findAll({where: {userId: id}})
    res.status(200).json({data});
   }
   catch(err){
    res.status(500).json({message: 'Not Able to getGroups'});
   }
}