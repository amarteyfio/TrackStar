const User = require('../models/userModel');
const jwt = require('jsonwebtoken');


//Generate Token
const createToken = (_id) => {
    return jwt.sign({_id: _id},process.env.SECRET_KEY, {expiresIn: '1d'});
}



//login function
const loginUser = async (req,res) => {
    const {email, password} = req.body;
    try {
        const user = await User.login(email,password);
        if(user){
            const token = createToken(user._id);
            res.status(200).json({email, token});
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}


//signup
const signupUser = async (req,res) => {
    const {email, password, passwordConfirm} = req.body;
    if(password !== passwordConfirm){
        return res.status(400).json({error: 'Passwords do not match'});
    }
    try {
        const user = await User.signup(email,password);
        if(user){
            const token = createToken(user._id);
            res.status(200).json({email, token});
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}



module.exports = {signupUser, loginUser}