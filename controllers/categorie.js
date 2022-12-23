const express = require('express')
const router = express.Router();
const { Categorie } = require('../model/Categorie')
const mongoose = require('mongoose')
const { validationResult } = require('express-validator');
const { body } = require('express-validator');
const upload = require('../middelware/upload')
const { Activities } = require('../model/Activities')

const AddCategorie = async (Title, squadId) => {
    // const equalTitle = await Categorie.find({ title: Title });
    // const equalSquad = await Categorie.find({ squad: squadId });

    // if (equalTitle && equalSquad) {
    //     console.log("it is exist")
    //     return;
    // }

    const categorie = new Categorie({
        title: Title,
        squad: mongoose.Types.ObjectId(squadId),

    })

    await categorie.save();


}


const GetSquadCategorie = async (req, res, next) => {
    const categories = await Categorie.find({ squad: req.params.squadId })
    if (!categories) {
        const error = new Error('Could not find categories.');
        error.statusCode = 404;
        throw error;
    }
    res.status(200).json({ message: 'news fetched.', categories });

}

const UpdateCategorie = async (req, res, next) => {
    const categorieId = req.params.categorieId;
    const { title } = req.body;


    try {
        const categorie = await Categorie.findById(categorieId);
        if (!categorie) {
            console.log('error')
        }
        categorie.title = title;

        await categorie.save();


        res.status(201).json({ message: 'success' });
    } catch (e) {
        res.status(201).json({ message: "failed", code: e.statusCode });
    }

}


const DeleteCategorie = async (req, res, next) => {

    const categorieId = req.params.categorieId;
    const categorie = await Categorie.findOne({ _id: categorieId });
    if (!categorie) {
        const error = new Error('لم يتم العثور على نتائج');
        error.statusCode = 404;
        throw error;
    }
    await categorie.deleteOne({ _id: categorieId })
    res.status(200).json({ message: 'تم الحذف بنجاح.', categorie });
}


// const CheckOnsor = async (req, res, next) => {
//     const user = req.body.user
//     const activities = Activities.find({ categoryId: req.params.categorieId })
//     activities.find({ users: { $elemMatch: { userId: user } } })


// }

module.exports = { AddCategorie, GetSquadCategorie, DeleteCategorie, UpdateCategorie };
