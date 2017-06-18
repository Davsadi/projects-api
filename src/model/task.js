import mongoose from 'mongoose';
import Project from './project';
import Action from './action';
let Schema = mongoose.Schema;

let taskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    detail: String,
    dueDate: Date,
    actions: [{ type: Schema.Types.ObjectId, ref: 'Action'}],
    archive: { type: Boolean, default: false },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    }
});

module.exports = mongoose.model('Task', taskSchema);
