import mongoose from 'mongoose';
import Action from './action';
let Schema = mongoose.Schema;

let noteSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    addDate: Date,
    tag: [ String ],
    archive: { type: Boolean, default: false },
    action: {
        type: Schema.Types.ObjectId,
        ref: 'Action',
        required: true
    }
});

module.exports = mongoose.model('Note', noteSchema);
