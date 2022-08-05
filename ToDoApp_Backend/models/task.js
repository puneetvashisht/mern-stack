const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    description: {
        type: String,
        required: [true, "Please give a description"]
    },
    title: {
        type: String,
        unique: true,
        required: [true, "Please give a title"]
    },
    done: {
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;