const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const activitieSchema = new Schema({
    title: {
        type: String,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Categorie'
    },
    users: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        note : {
            type:String
        },
        rate : {
            type:String
        },
        next : {
            type:String
        }
    }],
    date: {
        type: Date,
        default: Date.now
    }

})
const Activities = mongoose.model("Activities", activitieSchema)

exports.Activities = Activities
