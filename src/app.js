const express =  require('express');
require('dotenv').config();
require('./db/mongoose');

const authRoutes = require('./routes/auth_routes');
const generalRoutes =  require('./routes/general_user_routes');
const todoRoutes = require('./routes/todo_routes');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000

app.use("/",authRoutes);
app.use("/general",generalRoutes);
app.use("/todo",todoRoutes);


app.listen(port,()=>{
    console.log('Server is up on port ',port);
})