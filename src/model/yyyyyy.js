import mongoose from 'mongoose';
import XXXXXX from './xxxxxx';
let Schema = mongoose.Schema;

let YYYYYYSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: String,
    xxxxxx: {
        type: Schema.Types.ObjectId,
        ref: 'XXXXXX',
        required: true
    }
});

module.exports = mongoose.model('YYYYYY', YYYYYYSchema);
