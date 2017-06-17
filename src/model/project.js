import mongoose from 'mongoose';
import Client from './client';
let Schema = mongoose.Schema;

let ProjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: String,
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    }
});

module.exports = mongoose.model('Project', ProjectSchema);
