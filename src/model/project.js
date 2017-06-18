import mongoose from 'mongoose';
import Client from './client';
import Stakeholder from './stakeholder';
import Task from './task';
let Schema = mongoose.Schema;

let ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    sow: String,
    startDate: Date,
    archive: { type: Boolean, default: false },
    stakeholders: [{ type: Schema.Types.ObjectId, ref: 'Stakeholder'}],
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task'}],
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    }
});

module.exports = mongoose.model('Project', ProjectSchema);
