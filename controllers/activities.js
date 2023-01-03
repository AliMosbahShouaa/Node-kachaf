const express = require('express')
const router = express.Router();
const { Activities } = require('../model/Activities')
const mongoose = require('mongoose')
const { validationResult } = require('express-validator');
const { body } = require('express-validator');
const upload = require('../middelware/upload')


//  [
//     body('title')
//         .trim().isLength({ min: 3, max: 44 }).isString()
//         .withMessage('الرجاء إدخال حقل العنوان'),
//     body('categoryId')
//         .trim().isLength({ min: 3, max: 44 }).isString()
//         .withMessage('الرجاء إدخال حقل الصنف'),
// ],
const AddActivities = async (req, res, next) => {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const activities = new Activities({
            title: req.body.title,
            categoryId: mongoose.Types.ObjectId(req.body.categoryId),

        })


        await activities.save(function (e) {
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


const AddUserActivities = async (req, res, next) => {
    let data = {
        _id: mongoose.Types.ObjectId(),
        userId: mongoose.Types.ObjectId(req.body.userId),
        note: req.body.note,
        rate: req.body.rate,
        next: req.body.next
    };


    Activities.findById(req.params.activitiesId.trim())
        .then(activities => {

            if (!activities) throw createError(404);
            activities.users.push(data);
            return activities.save();
        })

        .then(activities => {
            let user = activities.users.id(data._id);
            res.json({ message: "success" });
        })

        .catch(next);

}

const UpdateNote = async (req, res) => {
    let { userId, note, next, rate } = req.body

    // Activities.findByIdAndUpdate(req.params.activitiesId.trim(),
    //     { $set: { "users": { userId: userId, note: note, next: next, rate: rate } } },
    //     (err, data) => {
    //         if (err) {
    //             return res.status(500).json({ error: 'failed' });
    //         }
    //         res.status(201).json({ message: "success" });
    //     });

     Activities.findOneAndUpdate(
        {
            _id: req.params.activitiesId,
            users: { $elemMatch: { userId: req.body.userId } }
        }, // FILTER
        {
            $set: {
                "users.$.note": req.body.note, // UPDATE
                "users.$.next": req.body.next, // UPDATE
                "users.$.rate": req.body.rate, // UPDATE
                "users.$.userId": req.body.userId, // UPDATE
            },
        },
        { new: true, safe: true, upsert: true },
        (err, data) => {
            if (err) {
                res.status(400).json({ message: "failed" })
            }else {
                res.status(201).json({ message: "success" })

            }
        });
}







const GetSquadActivities = async (req, res, next) => {
    const activities = await Activities.find({ categoryId: req.params.categorieId.trim() })
        .populate({
            path: 'users.userId'
        })
    if (!activities) {
        const error = new Error('Could not find activities.');
        error.statusCode = 404;
        throw error;
    }
    res.status(200).json({ message: 'success', activities });

}



const DeleteUserActivities = async (req, res, next) => {
    let userId = req.body.userId

    Activities.findByIdAndUpdate(req.params.activitiesId.trim(),
        { $pull: { "users": { userId: userId } } },
        (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'error in deleting address' });
            }

            res.json({ "message": "success" });
        });

}


const DeleteActivities = async (req, res, next) => {

    const activitiesId = req.params.activitiesId;
    const activities = await Activities.findOne({ _id: activitiesId });
    if (!activities) {
        const error = new Error('لم يتم العثور على نتائج');
        error.statusCode = 404;
        throw error;
    }

    await activities.deleteOne(function (e) {
        if (e) {
            res.status(400).json({ message: "failed" })
        } else {
            res.status(201).json({ message: "success" })

        }

    });

}


module.exports = { AddActivities, UpdateNote, GetSquadActivities, DeleteActivities, AddUserActivities, DeleteUserActivities };
