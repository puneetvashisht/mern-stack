const jwt = require('jsonwebtoken')
const User = require('../models/user')

const protect = async(req, res, next)=>{
    // logic for protecting the routes..
    let token = req.headers.authorization;

    console.log('token ---',token)
    token = token.split(' ')
    token = token[1]

    console.log('token sdvdv---',token)

    const decodedUser = jwt.verify(token, "This is a encryted token for this user");
    // console.log('id ------',decodedUser.id)
     
    req.user = {id: decodedUser.id};
    const userFound =  await User.findOne({_id: decodedUser.id});
    if(userFound){
        next();
    }else{
        res.json({message: "Invalid user, doeesn't have valid token.."})
    }
}


module.exports = protect;