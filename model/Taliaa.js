const mongoose = require('mongoose')
const Schema = mongoose.Schema;



const taliaaSchema = new Schema({
    name: {
        type: String,
    },
    squad: {
        type: Schema.Types.ObjectId,
        ref: 'Squad'
    },
    areef: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    created_at: {
        type: Date,
        default: Date.now
    }

})
const Taliaa = mongoose.model("Taliaa", taliaaSchema)

exports.Taliaa = Taliaa
