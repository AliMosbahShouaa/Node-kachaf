const express = require('express')
const router = express.Router();
const { User } = require('../model/User')
const mongoose = require('mongoose')

router.post('/add-point/:userId', async (req, res, next) => {
    let data = {
        _id: mongoose.Types.ObjectId(),
        point: req.body.point,
    };


    User.findById(req.params.userId)
        .then(user => {
            if (!user) throw createError(404);
            user.point.push(data);
            return user.save();
        })
        .then(user => {
            let point = user.point.id(data._id);
            res.json(point);

        })

        .catch(next);

})


module.exports = router;
