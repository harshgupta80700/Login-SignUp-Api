const mongoose =  require('mongoose');

const db = process.env.DATABASE_URL;

mongoose.connect(db,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(()=>{
    console.log("DB connected");
}).catch(e =>{
    console.log("DB not connected");
})