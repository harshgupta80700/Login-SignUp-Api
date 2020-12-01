const mongoose =  require('mongoose')

const db =  'mongodb://127.0.0.1:27017/login_signUp_db'

mongoose.connect(db,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(()=>{
    console.log("DB connected");
}).catch(e =>{
    console.log("DB not connected");
})