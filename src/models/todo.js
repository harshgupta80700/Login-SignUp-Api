const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title:{
        type: String,
    },
    description:{
        type: String
    },
    status:{
        type:Boolean
    },
    date:{
        type: Date
    }
})