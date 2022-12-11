const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const moufawadSchema = new Schema({
      name: {
        type: String,
    },
      moufawad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Management',
    },
    created_at: {
        type: Date,
        default: Date.now
    }

})
const Moufawadiyeh = mongoose.model("Moufawadiyeh", moufawadSchema)

exports.Moufawadiyeh = Moufawadiyeh
