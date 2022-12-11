// const express = require('express');
// const bcrypt = require('bcrypt')
// const router = express.Router();
// const jwt = require('jsonwebtoken')
// const { User } = require('../model/User')
// const { Taliaa } = require('../model/Taliaa')
// const { validationResult } = require('express-validator');
// const { body } = require('express-validator');
// const upload = require('../middelware/upload')
// var fs = require('fs');
// const mongoose = require('mongoose')
// // function base64_encode(file) {
// //   // read binary data
// //   var bitmap = fs.readFileSync(file);
// //   // convert binary data to base64 encoded string
// //   return new Buffer(bitmap).toString('base64');
// // }
// router.post('/register_user',
//   upload.single('file'),
//   [
//     // body('Name')
//     //   .trim().isLength({ min: 5, max: 44 }).isString()
//     //   .withMessage('Please enter a valid Name.'),
//     // body('email')
//     //   .isEmail()
//     //   .normalizeEmail()
//     //   .withMessage('Please enter a valid email.'),
//     // body('password')
//     //   .trim().not().isEmpty().isLength({ min: 5, max: 1024 })
//     //   .withMessage("Please don't send a empty password."),
//     // body('phone')
//     //   .trim().not().isEmpty().isLength({ min: 5, max: 100 })
//     //   .withMessage("Please don't send a empty phone."),
//     // body('city')
//     //   .trim().not().isEmpty().isLength({ min: 4, max: 100 })
//     //   .withMessage("Please don't send a empty phone."),
//   ], async (req, res, next) => {


//     const errors = validationResult(req);
//     try {

//       if (!errors.isEmpty()) {
//         const error = new Error('Validation failed.');
//         error.statusCode = 422;
//         error.data = errors.array();
//         throw error;
//       }
//       let user = await User.findOne({ Email: req.body.Email });
//       if (user) {
//         const err = new Error('الحساب مسجل مسبقاً');
//         next(err);
//         return;
//       }
//       // bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
//       //   if (err) {
//       //     res.json({
//       //       error: err
//       //     })
//       //   }
//       const request = JSON.parse(req.body.body)
//       user = new User({
//         Name: request.Name,
//         Email: request.Email,
//         Date: request.Date,
//         BloodType: request.BloodType,
//         Number: request.Number,
//         FatherName: request.FatherName,
//         FatherBloodType: request.FatherBloodType,
//         FatherWork: request.FatherWork,
//         FatherNumber: request.FatherNumber,
//         MotherName: request.MotherName,
//         MotherBloodType: request.MotherBloodType,
//         MotherWork: request.MotherWork,
//         MotherNumber: request.MotherNumber,
//         PlaceOfBirth: request.PlaceOfBirth,
//         Address: request.Address,
//         NbOfFamily: request.NbOfFamily,
//         AddressType: request.AddressType,
//         CurrentEducation: request.CurrentEducation,
//         Hobbies: request.Hobbies,
//         Insurance: request.Insurance,
//         Illness: request.Illness,
//         moufawadiyeh: mongoose.Types.ObjectId(request.moufawadiyeh),
//         fawj: mongoose.Types.ObjectId(request.fawj),
//         squad: mongoose.Types.ObjectId(request.squad),
//         // taliaa: mongoose.Types.ObjectId(req.body.taliaa),
//         avatar: req.file.path
//       })
//       user.save()
//         // مراجعة if null


//         .then(user => {

//           // Taliaa.findById(user.taliaa)
//           //   .then(taliaa => {
//           //     if (!taliaa) throw createError(404);
//           //     taliaa.user.push({ user: user._id });
//           //     return taliaa.save();
//           //   })

//           let token = jwt.sign({ Name: user.Name }, 'verySecretValue', { expiresIn: '1h' })
//           res.json({
//             message: "ok",
//             token: token, _id: user._id
//           })

//         })

//       // .catch(error => {
//       //   res.json({
//       //     message: 'فشلت العملية!!'
//       //   })
//       // })
//       // })
//     }
//     catch (err) {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     }
//   })



// router.post('/login-user', async (req, res, next) => {

//   var email = req.body.email
//   var password = req.body.password

//   User.findOne({ $or: [{ email: email }] })
//     .then(user => {
//       if (user) {
//         bcrypt.compare(password, user.password, function (err, result) {
//           if (err) {
//             res.send({
//               error: err
//             })
//           }
//           if (result) {
//             let token = jwt.sign({ email: user.email }, 'verySecretValue', { expiresIn: '1h' })
//             res.send({
//               message: 'تم تسجيل الدخول بنجاح',
//               token: token, _id: user._id
//             })
//           } else {
//             const err = new Error('كلمة السر خاطئة');
//             next(err);

//           }
//         })
//       } else {
//         const err = new Error('الحساب غير موجود');
//         next(err);
//       }
//     })

// })


// router.get('/get-user', async (req, res, next) => {
//   const user = await User.find().populate({
//     path: 'fawj', select : {
//       name: 1,
//       _id: 1
//     }
//   })
//   if (!user) {
//     const error = new Error('لا يوجد بيانات');
//     error.statusCode = 404;
//     throw error;
//   }
//   res.status(200).send({ user });
// })
// // router.get('/get-user', async (req, res, next) => {
// //   const {page = 1 , limit = 10} = req.query
// //   const user = await User.find()
// //   .limit(limit * 1)
// //   .skip((page - 1) * limit).exec();
// //   if (!user) {
// //     const error = new Error('لا يوجد بيانات');
// //     error.statusCode = 404;
// //     throw error;
// //   }
// //   res.status(200).send({ user });
// // })

// router.post('/get-one-user/:userId', async (req, res, next) => {
//   const user = await User.findById(req.params.userId).populate({
//     path : "squad" , select : {
//       _id : 1,
//       name : 1
//     }
//   })
//   if (!user) {
//     const err = new Error('لم يتم العثور على نتائج للبحث');
//     next(err);
//     return;
//   }
//   res.status(200).json({ user })
// })

// router.post('/delete-user/:userId', async (req, res, next) => {

//   const userId = req.params.userId;
//   const user = await User.findOne({ _id: userId });
//   if (!user) {
//     const error = new Error('لم يتم العثور على نتائج');
//     error.statusCode = 404;
//     throw error;
//   }
//   await user.deleteOne({ _id: userId })
//   res.status(200).json({ message: 'تم الحذف بنجاح.', user });
// })
// router.get('/get-user-mfd/:mfdId', async (req, res, next) => {
//   const user = await User.find({ moufawadiyeh: req.params.mfdId }).select({
//     _id: 1,
//     Name: 1,
//     SerialNumber: 1
//   })
//   if (!user) {
//     const error = new Error('Could not find user.');
//     error.statusCode = 404;
//     throw error;
//   }
//   res.status(200).json({ message: 'news fetched.', user });

// })
// router.get('/get-user-fawj/:fawjId', async (req, res, next) => {
//   const user = await User.find({ fawj: req.params.fawjId }).select({
//     _id: 1,
//     Name: 1,
//     SerialNumber: 1
//   })
//   if (!user) {
//     const error = new Error('Could not find user.');
//     error.statusCode = 404;
//     throw error;
//   }
//   res.status(200).json({ message: 'news fetched.', user });

// })
// router.post('/get-user-squad/:squadId', async (req, res, next) => {
//   const user = await User.find({ squad: req.params.squadId }).select({
//     _id: 1,
//     Name: 1,
//     SerialNumber: 1,
//     avatar : 1

//   })
//   if (!user) {
//     const error = new Error('Could not find user.');
//     error.statusCode = 404;
//     throw error;
//   }
//   res.status(200).json({ message: 'news fetched.', user });

// })

// router.post('/add_Serial/:userId', async (req, res, next) => {

//   let SerialNumber = req.body.SerialNumber


//   User.findById(req.params.userId)
//     .then(user => {
//       if (!user) throw createError(404);
//       user.SerialNumber = SerialNumber;
//       return user.save();
//     })

//     .then(user => {
//       res.status(201).json({ message: "تم إضافة الرقم التسلسلي ", SerialNumber: user.SerialNumber })

//     })

//     .catch(next);

// })
// router.post('/add_Check/:userId', async (req, res, next) => {

//   let Check = req.body.Check


//   User.findById(req.params.userId)
//     .then(user => {
//       if (!user) throw createError(404);
//       user.Check = Check;
//       return user.save();
//     })

//     .then(user => {
//       res.status(201).json({ message: "ok", Check: user.Check })

//     })

//     .catch(next);

// })
// router.post('/check-Email/:EmailId', async (req, res, next) => {
//   const user = await User.find({ Email: req.params.EmailId })
//   if (!user) {
//     const error = new Error('Could not find user.');
//     error.statusCode = 404;
//     throw error;
//   }
//   res.status(200).json({ message: 'الحساب موجود مسبقاً', user });

// })
// module.exports = router;
