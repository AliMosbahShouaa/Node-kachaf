const express = require('express')
const router = express.Router();
const { Mosque } = require('../model/Mosque')
const upload = require('../middelware/upload')
const { validationResult } = require('express-validator');
const { body } = require('express-validator');

router.post('/add-mosque',upload.single('avatar'),  [
    body('name')
        .trim().isLength({ min: 3, max: 44 }).isString()
        .withMessage('الرجاء إدخال حقل الإسم'),
    body('location')
        .trim().isLength({ min: 3, max: 100 }).isString()
        .withMessage('الرجاء إدخال حقل الموقع'),
], async (req, res, next) => {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const mosque = new Mosque({
            name: req.body.name,
            location: req.body.location,
            avatar : req.file.path.split('\\')[1],

        })

        await mosque.save();
        res.status(201).json({ message: "تم إضافة مسجد جديد", mosqueId: mosque._id })
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
})

router.get('/get-mosque', async (req, res, next) => {
    const mosque = await Mosque.find();
    if (!mosque) {
        const err = new Error('لا توجد نتائج للبحث');
        next(err);
        return;
    }
    res.status(200).json({ mosque })
})

router.post('/delete-mosque/:mosqueId', async (req, res, next) => {

    const mosqueId = req.params.mosqueId;
    const mosque = await Mosque.findOne({ _id: mosqueId });
    if (!mosque) {
        const error = new Error('لم يتم العثور على نتائج');
        error.statusCode = 404;
        throw error;
    }
    await mosque.deleteOne({ _id: mosqueId })
    res.status(200).json({ message: 'تم الحذف بنجاح.', mosque });
})


module.exports = router;
