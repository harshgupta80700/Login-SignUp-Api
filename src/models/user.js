const validator =  require('validator')
const mongoose =  require('mongoose')

const userScehema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
            trim: true,
            unique: true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw Error("Please enter a valid email address")
                }
            }
        },
        password:{
            type: String,
            required: true,
            trim: true,
            minlength:[10,"Password too short"]
        },
    }
)

const User =  mongoose.model('User',userScehema)

module.exports = User