const validator =  require('validator')
const mongoose =  require('mongoose')

const userScehema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
        },
        password:{
            type: String,
            required: true,
        },
    }
)

const User =  mongoose.model('User',userScehema)

module.exports = User