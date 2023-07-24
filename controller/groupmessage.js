const UserGroup = require('../models/usergroup');
const User = require('../models/user');
const Group = require('../models/creategroup');
const GroupMessage = require('../models/groupmessage');

exports.addParticipation = async (req,res) => {
    try{
        let {email, admin} = req.body;
        let gid = req.params.id;
        let userID = req.user.id;
        console.log(userID, gid);
        let isadmin = await UserGroup.findOne({where:{userId:userID, groupnameId: gid}});
        if(isadmin.admin == true){
            let checkUser = await User.findOne({where: {email:email}});
            if(checkUser){
                let groupData = await Group.findOne({where: {id:gid}});
                let grpName = groupData.groupname;
                let grpID = groupData.id;
                let uname = checkUser.username;
                const result = await UserGroup.create({admin: admin, groupname: grpName, name: uname, userId: checkUser.id, groupnameId: grpID});
                res.status(200).json({result,message: "User successfully added"});
            }
            else{
                res.status(404).json({message: "User Not Found with that Email"});
            }
        }
        else
        {
            res.status(401).json({message:"You are not Admin or Group Doesn't exist"});
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
};


exports.sendGroupMessage = async (req,res) => {
    try{
        let groupid = req.params.id;
        let name = req.user.username;
        let userid = req.user.id;
        
        let {message} = req.body;
        console.log('user ID is',userid);

        let found = await UserGroup.findOne({where: {userId: userid, groupnameId: groupid}});
        if(found) {
            const result = await GroupMessage.create({message: message, username: name, groupid: groupid, userId:userid});
            res.status(200).json({result, message:"Message Successfully Send"});
        }
        else{
            throw new Error("Unable to Send Message");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Something went wrong'});
    }
}

exports.getGrpMessages = async (req,res) => {
    try{
        let gid = req.params.id;
        let uId = req.user.id;
        let found = UserGroup.findOne({where: {userId: uId, groupnameId: gid}});
        if(found){
            const response = await GroupMessage.findAll({where: {groupid: gid}});
            res.status(200).json({data: response, message: 'Successfully got all the group message'});
        }
        else{
            res.status(404).json({message: 'You are not the member of the group'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({err});
    }
}

exports.getGrpParticipants = async (req,res) => {
    try{
        let gid = req.params.id;
        let uid = req.user.id;

        let userFound = await UserGroup.findOne({where: {userId: uid, groupnameId: gid}});
        if(userFound){
            const result = await UserGroup.findAll({where: {groupnameId: gid}});
            res.status(200).json({data: result, message: "Successfully get all Participants"});
        }
        else{
            res.status(404).json({message: "You are not part of this group"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Something Went Wrong"});
    }
} 

exports.makeUserAdmin = async (req,res) => {
    try{
        let gid = req.params.id;
        let uid = req.user.id;

        let {userIdUpdate} = req.body;

        let check = await UserGroup.findOne({where: {userId: uid, groupnameId: gid}});

        if(check.admin == true) {
            const UpdateOld = await UserGroup.update({admin: false}, {where: {userId: uid, groupnameid: gid}});
            const UpdateNew = await UserGroup.update({admin: true}, {where: {userId: userIdUpdate, groupnameId: gid}});
            res.status(200).json({UpdateNew, message: "User Successfully updated"});
        }
        else{
            res.status(401).json({message: "You are not admin, tell admin to update"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({err, message: "Something went wrong"});
    }
}

exports.removeUser = async (req,res) => {
    try{
        let gid = req.params.id;
        let uid = req.user.id;

        let {userIdDelete} = req.body;

        let check = await UserGroup.findOne({where: {userId: uid, groupnameId: gid}});
        if(check.admin == true){
            const remove = await UserGroup.destroy({where: {userId: userIdDelete, groupnameId: gid}});
            res.status(200).json({remove, message: 'User Successfully deleted'});
        }
        else{
            res.status(401).json({message: "you are not admin ask Admin to make you admin"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({err, message: "Something went wrong"});
    }
}