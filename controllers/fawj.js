const express = require('express')
const router = express.Router();
const { Fawj } = require('../model/Fawj')
const mongoose = require('mongoose')
const { validationResult } = require('express-validator');
const { body } = require('express-validator');
const squad = require('../controllers/squad');
const { Squad } = require('../model/Squad')
const categorie = require('./categorie')
const { Taliaa } = require('../model/Taliaa')


const AddFawj = async (req, res, next) => {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const fawj = new Fawj({
            name: req.body.name,
            moufawadiyeh: mongoose.Types.ObjectId(req.body.moufawadiyeh)
        })

        await fawj.save();

        let categorieName = ["مجلس القرآن الكريم", "اللقاء الكشفي", "الحلقة الأسبوعية", "أخرى"]

        const squadAchbal = new Squad({
            name: "فرقة الأشبال",
            fawj: mongoose.Types.ObjectId(fawj._id)

        })
        await squadAchbal.save();


        categorieName.forEach(function (element) {
            categorie.AddCategorie(element, squadAchbal._id)

        })

        const taliaaAchbal = new Taliaa({
            name: "أخرى",
            squad: mongoose.Types.ObjectId(squadAchbal._id)

        })

        await taliaaAchbal.save();
        ///////////////////////////////////////////

        const squadMoutakadem = new Squad({
            name: "فرقة المتقدم",
            fawj: mongoose.Types.ObjectId(fawj._id)

        })
        await squadMoutakadem.save();


        categorieName.forEach(function (element) {
            categorie.AddCategorie(element, squadMoutakadem._id)
        })
        const taliaaMoutakadem = new Taliaa({
            name: "أخرى",
            squad: mongoose.Types.ObjectId(squadMoutakadem._id)

        })

        await taliaaMoutakadem.save();
        ///////////////////////////////////////////

        const squadFetyan = new Squad({
            name: "فرقة الفتيان",
            fawj: mongoose.Types.ObjectId(fawj._id)

        })
        await squadFetyan.save();

        categorieName.forEach(function (element) {
            categorie.AddCategorie(element, squadFetyan._id)
        })
        const taliaaFetyan = new Taliaa({
            name: "أخرى",
            squad: mongoose.Types.ObjectId(squadFetyan._id)

        })

        await taliaaFetyan.save();
        ///////////////////////////////////////////


        const squadJawall = new Squad({
            name: "فرقة الجوالة",
            fawj: mongoose.Types.ObjectId(fawj._id)

        })
        await squadJawall.save();

        categorieName.forEach(function (element) {
            categorie.AddCategorie(element, squadJawall._id)

        })
        const taliaaJawall = new Taliaa({
            name: "أخرى",
            squad: mongoose.Types.ObjectId(squadJawall._id)

        })

        await taliaaJawall.save();
        // let squadName = ["فرقة الأشبال", "فرقة المتقدم", "فرقة الجوالة"]

        // squadName.forEach(function (element) {
        //     squad.AddSquad(element, fawj._id)
        // })

        res.status(201).json({ message: "add new fawj", fawjId: fawj._id })


    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

const AddAmid = async (req, res, next) => {

    let amid = mongoose.Types.ObjectId(req.body.amid)


    Fawj.findById(req.params.fawjId)
        .then(fawj => {
            if (!fawj) throw createError(404);
            fawj.amid = amid;
            return fawj.save();
        })

        .then(fawj => {
            res.status(201).json({ message: "تم إضافة عميد ", amid: fawj.amid })

        })

        .catch(next);

}

const GetFawj = async (req, res, next) => {
    const fawj = await Fawj.find().populate({
        path: 'moufawadiyeh', select: {
            _id: 1,
            name: 1,
        }

    }).populate({
        path: 'amid', select: {
            _id: 0,
            Name: 1
        }
    })
    if (!fawj) {
        const error = new Error('Could not find fawj.');
        error.statusCode = 404;
        throw error;
    }
    res.status(200).json({ message: 'news fetched.', fawj });

}

const GetFawjMfd = async (req, res, next) => {
    const fawj = await Fawj.find({ moufawadiyeh: req.params.mfdId })
    if (!fawj) {
        const error = new Error('Could not find fawj.');
        error.statusCode = 404;
        throw error;
    }
    res.status(200).json({ message: 'news fetched.', fawj });

}

const DeleteFawj = async (req, res, next) => {

    const fwjId = req.params.fwjId;
    const fawj = await Fawj.findOne({ _id: fwjId });
    if (!fawj) {
        const error = new Error('لم يتم العثور على نتائج');
        error.statusCode = 404;
        throw error;
    }
    const squad = await Squad.find({ fawj: fawj })
    
     
   
   
    
    await Squad.deleteOne({ _id: squad[0]._id })
    await Squad.deleteOne({ _id: squad[1]._id })
    await Squad.deleteOne({ _id: squad[2]._id })
    await Squad.deleteOne({ _id: squad[3]._id })

    await fawj.deleteOne({ _id: fwjId })

    res.status(200).json({ message: 'تم الحذف بنجاح.', fawj });
}






module.exports = { AddFawj, AddAmid, GetFawj, GetFawjMfd, DeleteFawj };


