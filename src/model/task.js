import mongoose from 'mongoose';
import Project from './project';
import Action from './action';
let Schema = mongoose.Schema;

let taskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    role: String,
    actions: [{ type: Schema.Types.ObjectId, ref: 'Action'}],
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    }
});

module.exports = mongoose.model('Task', taskSchema);
