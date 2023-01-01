const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const categorieSchema = new Schema({
    title: {
        type: String,
    },
    squad: {
        type: Schema.Types.ObjectId,
        ref: 'Squad'
    },
    moufawadiyeh: {
        type: Schema.Types.ObjectId,
        ref: 'Moufawadiyeh'
    },
    created_at: {
        type: Date,
        default: Date.now
    }

})
const Categorie = mongoose.model("Categorie", categorieSchema)

exports.Categorie = Categorie
