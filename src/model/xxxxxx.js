import mongoose from 'mongoose';
import YYYYYY from './yyyyyy';
let Schema = mongoose.Schema;

let XXXXXXSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    yyyyyys: [{ type: Schema.Types.ObjectId, ref: 'YYYYYY'}]
});

module.exports = mongoose.model('XXXXXX', XXXXXXSchema);
