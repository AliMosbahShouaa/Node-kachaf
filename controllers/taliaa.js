const express = require('express')
const router = express.Router();
const { Taliaa } = require('../model/Taliaa')
const mongoose = require('mongoose')
const { validationResult } = require('express-validator');
const { body } = require('express-validator');
const { User } = require('../model/User');
const { Squad } = require('../model/Squad');



const AddTaliaa = async (req, res, next) => {

    const taliaas = await Taliaa.find({ squad: req.body.squad })
    if (!taliaas) {
        res.send('failed')
    }

    const nameTaliaa = taliaas.find((tal) => {
        return tal.name === req.body.name
    })

    if (nameTaliaa) {
        res.status(200).json({ message: "name exist" })
    } else {
        const taliaa = new Taliaa({
            name: req.body.name.trim(),
            squad: mongoose.Types.ObjectId(req.body.squad)

        })

        await taliaa.save(function (e) {
            if (e) {
                res.status(400).json({ message: "failed" })
            } else {
                res.status(201).json({ message: "success" })

            }
        });
    }




}




const AddAreef = async (req, res, next) => {

    let areef = mongoose.Types.ObjectId(req.body.areef)



    Taliaa.findById(req.params.taliaaId)
        .then(taliaa => {
            if (!taliaa) throw createError(404);
            taliaa.areef = areef;
            return taliaa.save();
        })

        .then(taliaa => {
            res.status(201).json({ message: "تم إضافة العريف ", areef: taliaa.areef })

        })

        .catch(next);

}

const DeleteUserTaliaa = async (req, res, next) => {
    const userId = req.params.userId.trim();


        const user = await User.findById(userId);
        if (!user) {
            res.send('user not found')
        }
        const squade = await Squad.findById(user.squad)

        const taliaa = await Taliaa.find({ squad: squade })
        const idTaliaa = taliaa.filter((taliaa) => {
            return taliaa.name === "أخرى"
        })

        user.taliaa = idTaliaa[0]._id;

        await user.save(function (e) {
            if (e) {
                res.status(400).json({ message: "failed" })
            } else {
                res.status(201).json({ message: "success" })

            }
        });
    

}

const AddUserTaliaa = async (req, res, next) => {

    const userId = req.body.userId

    const user = await User.findById(userId);
    if (!user) {
        res.send('user not found')
    }

    Taliaa.findById(req.params.taliaaId.trim())
        .then(taliaa => {
            if (!taliaa) throw createError(404);

            user.taliaa = taliaa;

            user.save(function (e) {
                if (e) {
                    res.status(400).json({ message: "failed" })
                } else {
                    res.status(201).json({ message: "success" })

                }
            });
        })




}

const GetTaliaa = async (req, res, next) => {
    const taliaa = await Taliaa.find()
    // .populate({
    //     path: 'areef', select: {
    //         _id: 0,
    //         Name: 1
    //     }
    // })
    if (!taliaa) {
        const error = new Error('Could not find taliaa.');
        error.statusCode = 404;
        throw error;
    }
    res.status(200).json({ message: 'success', taliaa });

}

const GetTaliaaToSquad = async (req, res, next) => {
    const taliaa = await Taliaa.find({ squad: req.params.squadId }).select({
        _id: 1,
        name: 1,
    })

    if (!taliaa) {
        const error = new Error('Could not find taliaa.');
        error.statusCode = 404;
        throw error;
    }
    res.status(200).json({ message: 'success', taliaa });

}

const GetOneTaliaa = async (req, res, next) => {
    const taliaa = await Taliaa.findById(req.params.taliaaId).select({
        _id: 1,
        user: 1
    }).populate({
        path: 'user.user', select: {
            _id: 0,
            Name: 1,
            avatar: 1
        }
    })
    if (!taliaa) {
        const err = new Error('لم يتم العثور على نتائج للبحث');
        next(err);
        return;
    }
    res.status(200).json({message : "success" ,  taliaa })
}




// const DeleteUserTaliaa = async (req, res, next) => {
//     let user = req.body.user

//     Taliaa.findByIdAndUpdate(req.params.taliaaId,
//         { $pull: { "user": { user: user } } },
//         (err, data) => {
//             if (err) {
//                 return res.status(500).json({ error: 'error in deleting address' });
//             }

//             res.json(data);
//         });

// }



const DeleteTaliaa = async (req, res, next) => {

    const taliaaId = req.params.taliaaId.trim();
    const defaultTaliaaId = req.body.defaultTaliaaId

    const taliaa = await Taliaa.findOne({ _id: taliaaId });
    if (!taliaa) {
        const error = new Error('لم يتم العثور على نتائج');
        error.statusCode = 404;
        throw error;
    }
    if (taliaa.name === "أخرى") {
        res.json({ message: "this taliaa is can't delete" })
        return
    }

    //////////////////////////////////////////////////////////////////


    const users = await User.find({ taliaa: taliaaId })
    if (!users) {
        const error = new Error('لم يتم العثور على نتائج');
        error.statusCode = 404;
        throw error;
    }

    users.forEach(function (element) {
        element.taliaa = defaultTaliaaId
        element.save();
    })

    await taliaa.deleteOne(function (e) {
        if (e) {
            res.status(400).json({ message: "failed" })
        } else {
            res.status(201).json({ message: "success" })

        }
    });
   


}



module.exports = { AddTaliaa, AddUserTaliaa, AddAreef, DeleteTaliaa, GetTaliaa, GetTaliaaToSquad, GetOneTaliaa, DeleteUserTaliaa };
