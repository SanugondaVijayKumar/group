const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const signUp = async (req,res,next) => {
    try{
        const {name, email, number ,password} = req.body;
        if(!name || !email || !number || !password){
           return req.status(400).json({message: 'Require all fields'});
        }
        const user = await User.findAll({where: {email}});
        if(user.length>0){
           return res.status(404).json({message: 'User already exists'});
        }
        else{
            bcrypt.hash(password, 10, async (err, hash) => {
                console.log(err);
                await User.create({username: name, email, phoneNo: number, password:hash});
                res.status(200).json({message: 'User successfully created'});
            })
        }
    }
    catch(err){
        res.status(500).json(err);
    }
}

const logIn = async (req,res,next) => {
    try{
        const {email, password} = req.body;
        if(!email || !password)
        {
            res.status(400).json({message: 'Email or Password is missing'});
        }
        const user = await User.findAll({where:{email:email}});

        if(user.length>0){
            bcrypt.compare(password, user[0].password, (err, match) => {
                if(err){
                    throw new Error('Something Went wrong');
                }
                if(match === true){
                    res.status(200).json({message: 'LoggedIn Successfully', token: generateToken(user[0].id)});
                }
                else{
                    res.status(401).json({message: 'Password Incorrect'});
                }
            })
        }
        else{
            return res.status(404).json({message: "Invalid Email, User doesn't exist"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: err
        });
    }
}

function generateToken(id){
    return jwt.sign({userId:id}, process.env.TOKEN_SECRET);    
}

module.exports = {
    signUp,
    logIn,
    generateToken
}