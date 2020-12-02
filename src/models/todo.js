const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId
    },
    title:{
        type: String,
    },
    description:{
        type: String
    },
    status:{
        type:Boolean
    }
})