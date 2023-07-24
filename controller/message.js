const Message = require('../models/message');
const User = require('../models/user');

exports.sendMessage = async (req,res) => {
    try{
        let id = req.user.id;
        let username = req.user.username;
        console.log('Message Sender name', username);
        const message = req.body.message;
        console.log(message);
        if(isValidMessage(message)){
            await req.user.createMessage({
                message: message,
                username: username,
                userId: id
            });
            res.status(200).json({message: 'Message saved to Database'});
        }
        else{
            throw new Error('Invalid message Typed');
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Something went wrong'});
    }
}


function isValidMessage(message){
    if(typeof message === 'string' && message.length > 0){
        return true;
    }
    else{
        return false;
    }
}


exports.getAllMessage = async (req,res) => {
    try{
        const result = await Message.findAll();
        // console.log(result);
        res.status(200).json({data: result, message: 'Get All Messages'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Something Went Wrong"});
    }
}

// exports.getUsers = async (req,res) => {
//     console.log(req.user.id);
//     await User.findAll({where: { id: req.user.id}})
//     .then((result) => {
//         res.status(200).json(result);
//     }) 
//     .catch((err) => {
//         console.log(err);
//         res.status(500).json({message: "Something Went wrong"});
//     })
// }

