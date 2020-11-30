const express =  require('express')
require('./db/mongoose')

const authRoutes = require('./routes/authRoutes')

const app = express()
app.use(express.json())

const port = process.env.PORT || 3000

app.use("/",authRoutes)

app.listen(port,()=>{
    console.log('Server is up on port ',port);
})