const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const mosqueSchema = new Schema({
    name: {
        type: String,
    },
    location: {
        type: String,
    },
    avatar: {
        type: String
    },

    created_at: {
        type: Date,
        default: Date.now
    }

})
const Mosque = mongoose.model("Mosque", mosqueSchema)

exports.Mosque = Mosque
