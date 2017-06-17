import mongoose from 'mongoose';
import Project from './project';
let Schema = mongoose.Schema;

let ClientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    logo: String,
    description: String,
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project'}]
});

module.exports = mongoose.model('Client', ClientSchema);
