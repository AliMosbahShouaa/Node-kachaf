const express = require('express')
const router = express.Router();
const { Squad } = require('../model/Squad')
const mongoose = require('mongoose')
const { validationResult } = require('express-validator');
const { body } = require('express-validator');
const categorie = require('./categorie')


// const AddSquad = async (Name, fawjId) => {
//     const squad = new Squad({
//         name: Name,
//         fawj: mongoose.Types.ObjectId(fawjId)

//     })
//     await squad.save();

//     let squadName = ["مجلس القرآن الكريم", "اللقاء الكشفي", "الحلقة الأسبوعية", "أخرى"]

//     squadName.forEach(function (element) {
//         categorie.AddCategorie(element, squad._id)

//     })


// }


const AddLeader = async (req, res, next) => {

    let leader = mongoose.Types.ObjectId(req.body.leader)


    Squad.findById(req.params.squadId)
        .then(squad => {
            if (!squad) throw createError(404);
            squad.leader = leader;
            return squad.save();
        })

        .then(squad => {
            res.status(201).json({ message: "تم إضافة القائد ", leader: squad.leader })

        })

        .catch(next);

}
const GetSquad = async (req, res, next) => {
    const squad = await Squad.find()
    if (!squad) {
        const error = new Error('Could not find squad.');
        error.statusCode = 404;
        throw error;
    }
    res.status(200).json({ message: 'success', squad });

}

const GetSquadFawj = async (req, res, next) => {
    const squad = await Squad.find({ fawj: req.params.fawjId })
    if (!squad) {
        const error = new Error('Could not find squad.');
        error.statusCode = 404;
        throw error;
    }
    res.status(200).json({ message: 'success', squad });

}

const UpdateSquad = async (req, res, next) => {
    const squadId = req.params.squadId;
    const { name, moufawadiyeh, fawj, leader } = req.body;


    try {
        const squad = await Squad.findById(squadId);
        if (!squad) {
            console.log('error')
        }
        squad.name = name;
        squad.moufawadiyeh = moufawadiyeh;
        squad.fawj = fawj;
        squad.leader = leader;

        await squad.save(function (e) {
            if (e) {
                res.status(400).json({ message: "failed" })
            } else {
                res.status(201).json({ message: "success" })

            }
        });

    } catch (e) {
        res.status(201).json({ message: e.message, code: e.statusCode });
    }

}

const DeleteSquad = async (req, res, next) => {

    const sqdId = req.params.sqdId;
    const squad = await Squad.findOne({ _id: sqdId });
    if (!squad) {
        const error = new Error('لم يتم العثور على نتائج');
        error.statusCode = 404;
        throw error;
    }
    await squad.deleteOne({ _id: sqdId })
    res.status(200).json({ message: 'تم الحذف بنجاح.', squad });
}

module.exports = { AddLeader, GetSquad, UpdateSquad, DeleteSquad, GetSquadFawj }
