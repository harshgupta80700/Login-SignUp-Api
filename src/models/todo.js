const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true 
    },
    title:{
        type: String,
    },
    description:{
        type: String
    },
    priority:{
        type: String,
        enum:['max','mid','low']
    }
});

const Todos = mongoose.model('Todo',todoSchema);

module.exports = Todos;