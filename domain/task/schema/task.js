const mongoose = require('mongoose');
const { Schema } = mongoose;

const task = new Schema({
    pjId: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ['high', 'medium', 'low'],
        default: 'low',
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['not-started', 'in-progress', 'done'],
        default: 'not-started',
        required: true
    }
});

module.exports = mongoose.model('Task', task);
