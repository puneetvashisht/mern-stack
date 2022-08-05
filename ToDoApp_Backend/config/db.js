const mongoose = require('mongoose')


connectDB = async()=>{
    const url = "mongodb://localhost:27017/userDB?retryWrites=true&w=majority";


    const connection = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });


    console.log('Mongo Connected ....')
}

module.exports = connectDB;