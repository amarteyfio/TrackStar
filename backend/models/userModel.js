const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String, 
        required: true 
    },
},{timestamps: true});



//Static signup Method
userSchema.statics.signup = async function(email, password){
    //validation
    if(!email || !password) {
        throw Error('Email and Password are required');
    }
    else if(!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }
    /*else if(!validator.isStrongPassword(password))
    {
        throw Error('Password must contain at least one character, one number and one special character.');
    }*/
    
    //check if email exists
    const exists = await this.findOne({email});
    if(exists) {
        throw Error('Email already exists');
    }
    //hashing
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    //Create user
    const user = await this.create({ email, password: hash });

    return user;
}


// Static login Method
userSchema.statics.login = async function(email, password){
    //validation
    if(!email || !password) {
        throw Error('Incorrect email or password. Please try again.');
    }
    //check if email exists
    const user = await this.findOne({ email });
    if(!user) {
        throw Error('Incorrect email or password. Please try again.');
    }
    //compare password
    const valid = await bcrypt.compare(password, user.password);
    if(!valid) {
        throw Error('Incorrect email or password. Please try again');
    }
    return user;

}


module.exports = mongoose.model('User', userSchema);