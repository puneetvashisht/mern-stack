const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    description: {
        type: String,
        required: [true, "Please give a description"]
    },
    title: {
        type: String,
        required: [true, "Please give a title"]
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;