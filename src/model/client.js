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
    archive: { type: Boolean, default: false },
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project'}]
});

module.exports = mongoose.model('Client', ClientSchema);
