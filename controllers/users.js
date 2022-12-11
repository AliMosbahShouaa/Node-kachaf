const express = require('express');
const bcrypt = require('bcrypt')
const router = express.Router();
const jwt = require('jsonwebtoken')
const { User } = require('../model/User')
const { Taliaa } = require('../model/Taliaa')
const { Squad } = require('../model/Squad')
const { validationResult } = require('express-validator');
const { body } = require('express-validator');
const upload = require('../middelware/upload')
var fs = require('fs');
const mongoose = require('mongoose');
const { Moufawadiyeh } = require('../model/Moufawadiyeh');
const saltRounds = 10;

// function base64_encode(file) {
//   // read binary data
//   var bitmap = fs.readFileSync(file);
//   // convert binary data to base64 encoded string
//   return new Buffer(bitmap).toString('base64');
// }



// [
//   // body('Name')
//   //   .trim().isLength({ min: 5, max: 44 }).isString()
//   //   .withMessage('Please enter a valid Name.'),
//   // body('Email')
//   //   .isEmail()
//   //   .normalizeEmail()
//   //   .withMessage('Please enter a valid email.'),
//   // body('password')
//   //   .trim().not().isEmpty().isLength({ min: 5, max: 1024 })
//   //   .withMessage("Please don't send a empty password."),
//   // body('phone')
//   //   .trim().not().isEmpty().isLength({ min: 5, max: 100 })
//   //   .withMessage("Please don't send a empty phone."),
//   // body('city')
//   //   .trim().not().isEmpty().isLength({ min: 4, max: 100 })
//   //   .withMessage("Please don't send a empty phone."),
// ]
const Register = async (req, res, next) => {
  if (req.body.Position === "onsor") {
    var personInfo = JSON.parse(req.body.body);
  }
  var personInfo = req.body;
  // // var personInfo = JSON.parse(req.body.body);
  if (!personInfo.Email || !personInfo.Name || !personInfo.Password || !personInfo.Number || !personInfo.Position) {
    res.send({ message: "The field required is Empty" })

  } else {

    User.findOne({ Email: personInfo.Email }, function (err, data) {
      if (!data) {
        User.findOne({}, function (err, data) {

          if (req.body.Position === "onsor") {
            var newPerson = new User({
              Name: personInfo.Name,
              Email: personInfo.Email,
              Password: personInfo.Password,
              Date: personInfo.Date,
              BloodType: personInfo.BloodType,
              Number: personInfo.Number,
              FatherName: personInfo.FatherName,
              FatherBloodType: personInfo.FatherBloodType,
              FatherWork: personInfo.FatherWork,
              MotherName: personInfo.MotherName,
              MotherBloodType: personInfo.MotherBloodType,
              MotherWork: personInfo.MotherWork,
              PlaceOfBirth: personInfo.PlaceOfBirth,
              Address: personInfo.Address,
              NbOfFamily: personInfo.NbOfFamily,
              AddressType: personInfo.AddressType,
              CurrentEducation: personInfo.CurrentEducation,
              Hobbies: personInfo.Hobbies,
              Insurance: personInfo.Insurance,
              Illness: personInfo.Illness,
              moufawadiyeh: mongoose.Types.ObjectId(personInfo.moufawadiyeh.trim()),
              fawj: mongoose.Types.ObjectId(personInfo.fawj.trim()),
              squad: mongoose.Types.ObjectId(personInfo.squad.trim()),
              taliaa: mongoose.Types.ObjectId(personInfo.taliaa.trim()),
              Position: personInfo.Position,
              file: req.file.path,
              Cloth: personInfo.Cloth,
              isAdmin: personInfo.isAdmin
            });
          } else {
            var newPerson = new User({
              Name: personInfo.Name,
              Email: personInfo.Email,
              Password: personInfo.Password,
              Date: personInfo.Date,
              BloodType: personInfo.BloodType,
              Number: personInfo.Number,
              FatherName: personInfo.FatherName,
              FatherBloodType: personInfo.FatherBloodType,
              FatherWork: personInfo.FatherWork,
              MotherName: personInfo.MotherName,
              MotherBloodType: personInfo.MotherBloodType,
              MotherWork: personInfo.MotherWork,
              PlaceOfBirth: personInfo.PlaceOfBirth,
              Address: personInfo.Address,
              NbOfFamily: personInfo.NbOfFamily,
              AddressType: personInfo.AddressType,
              CurrentEducation: personInfo.CurrentEducation,
              Hobbies: personInfo.Hobbies,
              Insurance: personInfo.Insurance,
              Illness: personInfo.Illness,
              moufawadiyeh: mongoose.Types.ObjectId(personInfo.moufawadiyeh.trim()),
              fawj: mongoose.Types.ObjectId(personInfo.fawj.trim()),
              squad: mongoose.Types.ObjectId(personInfo.squad.trim()),
              Position: personInfo.Position,
              file: req.file.path,
              Cloth: personInfo.Cloth,
              isAdmin: personInfo.isAdmin
            });
          }

          newPerson.save(function (e) {
            if (e) {
              res.status(400).json({ message: "failed" })
            } else {
              res.status(201).json({ message: "success" })

            }

          });

        })
      } else {
        res.send({ "message": "الحساب مسجل مسبقاً" });
      }

    });

  }
  // const errors = validationResult(req);
  // try {
  //   if (!errors.isEmpty()) {
  //     const error = new Error('Validation failed.');
  //     error.statusCode = 422;
  //     error.data = errors.array();
  //     throw error;
  //   }
  //   let management = await Management.findOne({ Email: req.body.Email });
  //   if (management) {
  //     const err = new Error('الحساب مسجل مسبقاً');
  //     next(err);
  //     return;
  //   }
  //   bcrypt.hash(req.body.Password, 10, function (err, hashedPass) {
  //     if (err) {
  //       res.json({
  //         error: err
  //       })
  //     }
  //     // var base64str = base64_encode(req.file.path);

  //     management = new Management({
  //       Name: req.body.Name,
  //       Email: req.body.Email,
  //       Password: hashedPass,
  //       Date: req.body.Date,
  //       BloodType: req.body.BloodType,
  //       Number: req.body.Number,
  //       FatherName: req.body.FatherName,
  //       FatherBloodType: req.body.FatherBloodType,
  //       FatherWork: req.body.FatherWork,
  //       MotherName: req.body.MotherName,
  //       MotherBloodType: req.body.MotherBloodType,
  //       MotherWork: req.body.MotherWork,
  //       PlaceOfBirth: req.body.PlaceOfBirth,
  //       Address: req.body.Address,
  //       NbOfFamily: req.body.NbOfFamily,
  //       AddressType: req.body.AddressType,
  //       CurrentEducation: req.body.CurrentEducation,
  //       Hobbies: req.body.Hobbies,
  //       Insurance: req.body.Insurance,
  //       Illness: req.body.Illness,
  //       moufawadiyeh: mongoose.Types.ObjectId(req.body.moufawadiyeh),
  //       fawj: mongoose.Types.ObjectId(req.body.fawj),
  //       squad: mongoose.Types.ObjectId(req.body.squad),
  //       Position: req.body.Position,
  //       avatar: req.file.path.split('\\')[1]

  //     })

  //     // const management = await Moufawad.findById(moufawad)
  //     // if (!management) {
  //     //   const error = new Error('لا يوجد بيانات');
  //     //   error.statusCode = 404;
  //     //   throw error;
  //     // }


  //     management.save()

  //       .then(management => {
  //         let token = jwt.sign({ Name: management.Name }, 'verySecretValue', { expiresIn: '1h' })
  //         res.json({
  //           message: "تم إنشاء الحساب بنجاح",
  //           token: token, _id: management._id, position: management.position,
  //           moufawadiyeh: management.moufawadiyeh,
  //           fawj: management.fawj,
  //         })
  //       })
  //       .catch(error => {
  //         res.json({
  //           message: 'فشلت العملية!!'
  //         })
  //       })
  //   })
  // }
  // catch (err) {
  //   if (!err.statusCode) {
  //     err.statusCode = 500;
  //   }
  //   next(err);
  // }
}



const Login = async (req, res, next) => {

  User.findOne({ Email: req.body.Email }, function (err, data) {
    if (data) {

      if (data.Password == req.body.Password && data.isAdmin === true) {
        let token = jwt.sign({ Email: data.Email }, 'verySecretValue', { expiresIn: '1h' })

        res.send({
          message: 'تم تسجيل الدخول بنجاح',
          token: token,
          data
        })
      }
      else {
        res.send({ "message": "Wrong Password!" });
      }
    } else {
      res.send({ "message": "This Email Is not regestered!" });
    }
  });

  // var Email = req.body.Email
  // var Password = req.body.Password

  // Management.findOne({ $or: [{ Email: Email }] })
  //   .then(management => {
  //     if (management) {
  //       bcrypt.compare(Password, management.Password, function (err, result) {
  //         if (err) {
  //           res.send({
  //             error: err
  //           })
  //         }
  //         if (result) {
  //           let token = jwt.sign({ Email: management.Email }, 'verySecretValue', { expiresIn: '1h' })
  //           res.send({
  //             message: 'تم تسجيل الدخول بنجاح',
  //             token: token, _id: management._id, position: management.Position,
  //             moufawad: management.moufawad,
  //             fawj: management.fawj,
  //             squad: management.squad
  //           })
  //         } else {
  //           const err = new Error('كلمة السر خاطئة');
  //           next(err);

  //         }
  //       })
  //     } else {
  //       const err = new Error('الحساب غير موجود');
  //       next(err);
  //     }
  //   })

}

const GetOneUser = async (req, res, next) => {
  const user = await User.findById(req.params.userId).populate(["squad", "taliaa"])

  if (!user) {
    const err = new Error('لم يتم العثور على نتائج للبحث');
    next(err);
    return;
  }
  res.status(200).json({ user })
}


const GetUsers = async (req, res, next) => {
  const user = await User.find();
  if (!user) {
    const err = new Error('لم يتم العثور على نتائج للبحث');
    next(err);
    return;
  }
  res.status(200).json({ user })
}


const GetUserManagement = async (req, res, next) => {
  const user = await User.find({ isAdmin: true })
    .populate({
      path: "fawj", select: {
        name: 1,
      }
    });
  if (!user) {
    const err = new Error('لم يتم العثور على نتائج للبحث');
    next(err);
    return;
  }
  res.status(200).json({ user })
}
const DeleteUser = async (req, res, next) => {

  const userId = req.params.userId;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    const error = new Error('لم يتم العثور على نتائج');
    error.statusCode = 404;
    throw error;
  }
  await user.deleteOne({ _id: userId })
  res.status(200).json({ message: 'تم الحذف بنجاح.', user });
}

const GetUserSquad = async (req, res, next) => {
  const user = await User.find({ Position: "onsor", squad: req.params.squadId }).populate({
    path: "taliaa"
  })

  if (!user) {
    const error = new Error('Could not find user.');
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json({ message: 'news fetched.', user });

}
const GetUserFawj = async (req, res, next) => {
  const user = await User.find({ Position: "onsor", fawj: req.params.fawjId }).populate({
    path: "taliaa"
  })

  if (!user) {
    const error = new Error('Could not find user.');
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json({ message: 'news fetched.', user });

}
const GetUserMfd = async (req, res, next) => {
  const user = await User.find({ Position: "onsor", moufawadiyeh: req.params.mfdId }).populate({
    path: "taliaa"
  })

  if (!user) {
    const error = new Error('Could not find user.');
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json({ message: 'news fetched.', user });

}
const GetUserTaliaa = async (req, res, next) => {
  const user = await User.find({ Position: "onsor", taliaa: req.params.taliaaId }).select({
    _id: 1
  })
  if (!user) {
    const error = new Error('Could not find user.');
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json({ message: 'news fetched.', user });

}

const AddSerial = async (req, res, next) => {

  let SerialNumber = req.body.SerialNumber
  await User.findById(req.params.userId)
    .then(user => {
      if (!user) throw createError(404);
      user.SerialNumber = SerialNumber;
      return user.save(function (e) {
        if (e) {
          res.status(400).json({ message: "failed" })
        } else {
          res.status(201).json({ message: "success" })

        }

      });
    })


}

const CheckEmail = async (req, res, next) => {
  const user = await User.findOne({ Email: req.body.email });

  if (!user) {
    return res.status(201).json({ message: 'تم' });

  }
  res.status(400).json({ message: ' موجود مسبقاً' });

}

const UpdateUser = async (req, res, next) => {
  const userId = req.params.userId;
  const { Name, Email, Password, Position, Date, BloodType, Number, FatherName,
    FatherBloodType, FatherWork, MotherName, MotherBloodType, MotherWork, PlaceOfBirth, Address,
    NbOfFamily, AddressType, CurrentEducation, Hobbies, Insurance, Illness,
    moufawadiyeh, fawj, squad, Cloth, taliaa } = req.body
  // const { file } = req.file.path

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.send('user not found')
    }
    user.Name = Name;
    user.Email = Email;
    user.Password = Password;
    user.Position = Position;
    user.Date = Date;
    user.BloodType = BloodType;
    user.Number = Number;
    user.FatherName = FatherName;
    user.FatherBloodType = FatherBloodType;
    user.FatherWork = FatherWork;
    user.MotherName = MotherName;
    user.MotherBloodType = MotherBloodType;
    user.MotherWork = MotherWork;
    user.PlaceOfBirth = PlaceOfBirth;
    user.Address = Address;
    user.NbOfFamily = NbOfFamily;
    user.AddressType = AddressType;
    user.CurrentEducation = CurrentEducation;
    user.Hobbies = Hobbies;
    user.Insurance = Insurance;
    user.Illness = Illness;
    user.moufawadiyeh = moufawadiyeh;
    user.fawj = fawj;
    user.squad = squad;
    user.taliaa = taliaa;
    // user.file = file;
    user.Cloth = Cloth;

    await user.save();


    res.status(201).json({ message: 'News updated!' });
  } catch (e) {
    res.status(201).json({ message: e.message, code: e.statusCode });
  }

}
// router.get('/get-user', async (req, res, next) => {
//   const {page = 1 , limit = 10} = req.query
//   const user = await User.find()
//   .limit(limit * 1)
//   .skip((page - 1) * limit).exec();
//   if (!user) {
//     const error = new Error('لا يوجد بيانات');
//     error.statusCode = 404;
//     throw error;
//   }
//   res.status(200).send({ user });
// })



module.exports = { Register, GetUserMfd, GetUserFawj, Login, GetUsers, GetOneUser, GetUserManagement, GetUserSquad, DeleteUser, GetUserTaliaa, AddSerial, CheckEmail, UpdateUser };
