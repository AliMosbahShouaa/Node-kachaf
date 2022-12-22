const express = require('express')
const router = express.Router();
const { Moufawadiyeh } = require('../model/Moufawadiyeh')
const { Fawj } = require('../model/Fawj')
const { Squad } = require('../model/Squad')
const mongoose = require('mongoose')
const { validationResult } = require('express-validator');
const { body } = require('express-validator');


const AddMouafwadiyeh = async (req, res, next) => {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const mfd = new Moufawadiyeh({
            name: req.body.name,
        })

        await mfd.save(function (e) {
            if (e) {
                res.status(400).json({ message: "failed" })
            } else {
                res.status(201).json({ message: "success" })

            }
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}



const AddMoufawad = async (req, res, next) => {

    let moufawad = mongoose.Types.ObjectId(req.body.moufawad)
    Moufawadiyeh.findById(req.params.mfdId)
        .then(mfd => {
            if (!mfd) throw createError(404);
            mfd.moufawad = moufawad;
            return mfd.save();

        })
        .then(mfd => {
            res.status(201).json({ message: "تم إضافة مفوض ", moufawad: mfd.moufawad })
        })
        .catch(next);

}

const GetMfd = async (req, res, next) => {
    const moufawads = await Moufawadiyeh.find()
        .populate({
            path: 'moufawad', select: {
                _id: 0,
                Name: 1,
            },
        });
    if (!moufawads) {
        const error = new Error('Could not find moufawads.');
        error.statusCode = 404;
        throw error;
    }
    res.status(200).json({ message: 'success', moufawads });

}




const DeleteMfd = async (req, res, next) => {

    const mfdId = req.params.mfdId;
    const moufawadiyeh = await Moufawadiyeh.findOne({ _id: mfdId });
    if (!moufawadiyeh) {
        const error = new Error('لم يتم العثور على نتائج');
        error.statusCode = 404;
        throw error;
    }

    await moufawadiyeh.deleteOne({ _id: mfdId })
    res.status(200).json({ message: 'تم الحذف بنجاح.', moufawadiyeh });
}


module.exports = { AddMouafwadiyeh, AddMoufawad, DeleteMfd, GetMfd }
