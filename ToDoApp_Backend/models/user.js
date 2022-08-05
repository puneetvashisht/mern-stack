const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const UserSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: [true, "Please give a email"]
    },
    password: {
        type: String,
        required: [true, "Please give a password"]
    },
    tasks: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Task'
    }],
    createdAt:{
        type: Date,
        default: Date.now
    }
})

UserSchema.pre('save', async function(){
    // Hash the password...
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
})

// Use .methods on schema to define instance methods...
UserSchema.methods.matchPassword = async function (enteredPass){
    return await bcrypt.compare(enteredPass, this.password)
}

UserSchema.methods.getSignedJwtToken =  function (){
    // Generating  a token..
    const token = jwt.sign({id: this._id}, "This is a encryted token for this user");
    return token;

}

const User = mongoose.model('User', UserSchema);

module.exports = User;