const mongoose = require('mongoose')
const Schema = mongoose.Schema;



const fawjSchema = new Schema({
    name: {
        type: String,
    },
    moufawadiyeh: {
        type: Schema.Types.ObjectId,
        ref: 'Moufawadiyeh'
    },
    amid: {
        type: Schema.Types.ObjectId,
        ref: 'Management'
    },
    created_at: {
        type: Date,
        default: Date.now
    }

})
const Fawj = mongoose.model("Fawj", fawjSchema)

exports.Fawj = Fawj
