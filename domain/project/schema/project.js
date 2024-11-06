const mongoose = require('mongoose');
const { Schema } = mongoose;
const Task = require('../../task/schema/task');  // Task 모델 파일 경로

const project = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }]
});

module.exports = mongoose.model('Project', project);