const express =  require('express')
require('./db/mongoose')

const userRouter = require('./routes/userRoutes')

const app = express()
app.use(express.json())

const port = process.env.PORT || 3000

app.use("/",userRouter)

app.listen(port,()=>{
    console.log('Server is up on port ',port);
})