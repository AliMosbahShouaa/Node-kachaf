const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const userSchema = new Schema({

    Position: {
        type: String,
    },
    Name: {
        type: String,
    },
    Email: {
        type: String,
    },
    Password: {
        type: String,
    },
    Date: {
        type: String,
    },
    BloodType: {
        type: String,
    },
    Number: {
        type: String,
    },
    FatherName: {
        type: String,
    },

    FatherBloodType: {
        type: String,
    },

    FatherWork: {
        type: String,
    },
    MotherName: {
        type: String,
    },

    MotherBloodType: {
        type: String,
    },

    MotherWork: {
        type: String,
    },
    PlaceOfBirth: {
        type: String,
    },
    Address: {
        type: String,
    },
    NbOfFamily: {
        type: String,
    },
    AddressType: {
        type: String,
    },
    CurrentEducation: {
        type: String,
    },
    Hobbies: {
        type: String,
    },
    Insurance: {
        type: String,
    },
    Illness: {
        type: String,
    },
    Cloth: {
        type: Boolean
    },
    moufawadiyeh: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Moufawadiyeh"
    },
    fawj: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fawj"
    },
    squad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Squad"
    },
    taliaa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Taliaa"
    },

    file: {
        type: String
    },
    SerialNumber: {
        type: Number
    },
    isAdmin: {
        type: Boolean
    },
    created_at: {
        type: Date,
        default: Date.now
    },


})
const User = mongoose.model("User", userSchema)

exports.User = User
