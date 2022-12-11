const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const squadSchema = new Schema({
    name: {
        type: String,
    },

      fawj : {
        type: Schema.Types.ObjectId,
        ref: 'Fawj'
    },
    leader: {
        type: Schema.Types.ObjectId,
        ref: 'Management'
    },

    created_at: {
        type: Date,
        default: Date.now
    }

})
const Squad = mongoose.model("Squad", squadSchema)

exports.Squad = Squad
