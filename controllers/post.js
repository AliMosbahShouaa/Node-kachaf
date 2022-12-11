const express = require('express')
const router = express.Router();
const { Post } = require('../model/Post')
const { validationResult } = require('express-validator');
const { body } = require('express-validator');
const fetch = require('node-fetch');

router.post('/send', (req, res, next) => {
    let notification = {
        "title": "Title of notification",
        "text": "subtitle"
    }

    let fcm_tokens = ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Iti52YTZiiDYtNi52KfYuSIsImlhdCI6MTY0NDk0ODI2MCwiZXhwIjoxNjQ0OTUxODYwfQ.w9zMnOjKGWpB4JTy0f_y5kAWJeiT_nZXZoGkbqkPeL0'];

    let notification_body = {
        "notification": notification,
        "registration_ids": fcm_tokens
    }
    fetch('test', {
        'method': 'POST',
        'headers': {
            'Authorization': 'key=' + 'AAAAPPa4oug:APA91bFiysq0Ecz4-LalauvAMG7XBXV0q0SyvKrq-0oCFUHHqmFLwt_rTn6_KFVkw8_KVoAUYJPHcB8ZWdyXSz0KuKDTXGSHqx_mwvS8VLuY7YuENLDWe_S6ybOZw3Upf4pZfW1U4OYN',
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify(notification_body) 
    }).then(() => {
        res.status(200).json({ message: "notification send success"})
    }).catch((err) => {
        res.status(400).json({ message: "notification went wrong"})
        console.log(err)

    })
})

// router.post('/add-post', [
//     body('title')
//         .trim().isLength({ min: 3, max: 44 }).isString()
//         .withMessage('الرجاء إدخال حقل العنوان'),
//     body('content')
//         .trim().isLength({ min: 3, max: 1000 }).isString()
//         .withMessage('الرجاء إدخال حقل المحتوى'),
//     body('type')
//         .trim().isLength({ min: 3, max: 100 }).isString()
//         .withMessage('الرجاء إدخال حقل النوع'),
// ],
//     async (req, res, next) => {
//         const errors = validationResult(req);
//         try {
//             if (!errors.isEmpty()) {
//                 const error = new Error('Validation failed.');
//                 error.statusCode = 422;
//                 error.data = errors.array();
//                 throw error;
//             }
//             const post = new Post({
//                 title: req.body.title,
//                 content: req.body.content,
//                 type: req.body.type,

//             })

//             await post.save();
//             res.status(201).json({ message: "تم إضافة منشور جديد", postId: post._id })
//         }
//         catch (err) {
//             if (!err.statusCode) {
//                 err.statusCode = 500;
//             }
//             next(err);
//         }
//     })


router.get('/get-post', async (req, res, next) => {
    const post = await Post.find();
    if (!post) {
        const err = new Error('لا توجد نتائج للبحث');
        next(err);
        return;
    }
    res.status(200).json({ post })
})

router.post('/delete-post/:postId', async (req, res, next) => {

    const postId = req.params.postId;
    const post = await Post.findOne({ _id: postId });
    if (!post) {
        const error = new Error('لم يتم العثور على نتائج');
        error.statusCode = 404;
        throw error;
    }
    await post.deleteOne({ _id: postId })
    res.status(200).json({ message: 'تم الحذف بنجاح.', post });
})


module.exports = router;
