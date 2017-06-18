import mongoose from 'mongoose';
import Task from './task';
import Stakeholder from './stakeholder';
import Note from './note';
let Schema = mongoose.Schema;

let actionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    detail: String,
    addDate: Date,
    dueDate: Date,
    status: String,
    archive: { type: Boolean, default: false },
    dependency: [{ type: Schema.Types.ObjectId, ref: 'Action'}],
    image: [ {
        url: String,
        title: String
    } ],
    link: [ {
        url: String,
        title: String
    } ],
    notes: [{ type: Schema.Types.ObjectId, ref: 'Note'}],
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    stakeholder: {
        type: Schema.Types.ObjectId,
        ref: 'Stakeholder'
    }
});

module.exports = mongoose.model('Action', actionSchema);
