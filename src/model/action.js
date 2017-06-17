import mongoose from 'mongoose';
import Task from './task';
import Stakeholder from './stakeholder';
let Schema = mongoose.Schema;

let actionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    role: String,
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    stakeholder: {
        type: Schema.Types.ObjectId,
        ref: 'Stakeholder',
        required: true
    }
});

module.exports = mongoose.model('Action', actionSchema);
