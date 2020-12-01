const express =  require('express')
require('dotenv').config();
require('./db/mongoose')

const authRoutes = require('./routes/authRoutes')
const generalRoutes =  require('./routes/generalUserRoutes')

const app = express()
app.use(express.json())

const port = process.env.PORT || 3000

app.use("/",authRoutes)
app.use("/general",generalRoutes)

app.listen(port,()=>{
    console.log('Server is up on port ',port);
})