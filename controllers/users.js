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
  // if (req.body.Position === "onsor") {
  //   var personInfo = JSON.parse(req.body.body);
  // }
  // var personInfo = req.body;
  var personInfo = JSON.parse(req.body.body);
  if (!personInfo.Email || !personInfo.Name || !personInfo.Password || !personInfo.Number || !personInfo.Position) {
    res.send({ message: "The field required is Empty" })

  } else {

    User.findOne({ Email: personInfo.Email }, function (err, data) {
      if (!data) {
        User.findOne({}, function (err, data) {
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
            moufawadiyeh: personInfo.moufawadiyeh,
            fawj: personInfo.fawj,
            squad: personInfo.squad,
            taliaa: personInfo.taliaa,
            Position: personInfo.Position,
            file: req.file.path,
            Cloth: personInfo.Cloth,
            isAdmin: personInfo.isAdmin
          });


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



}

const GetOneUser = async (req, res, next) => {
  const user = await User.findById(req.params.userId).populate(["moufawadiyeh", "fawj", "squad", "taliaa"])

  if (!user) {
    const err = new Error('لم يتم العثور على نتائج للبحث');
    next(err);
    return;
  }
  res.status(200).json({ message: 'success', user })
}


const GetUsers = async (req, res, next) => {
  const user = await User.find();
  if (!user) {
    const err = new Error('لم يتم العثور على نتائج للبحث');
    next(err);
    return;
  }
  res.status(200).json({ message: 'success', user })
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
  res.status(200).json({ message: 'success', user })
}
const DeleteUser = async (req, res, next) => {

  const userId = req.params.userId;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    const error = new Error('لم يتم العثور على نتائج');
    error.statusCode = 404;
    throw error;
  }

  await user.deleteOne(function (e) {
    if (e) {
      res.status(400).json({ message: "failed" })
    } else {
      res.status(201).json({ message: "success", _id: userId })

    }

  });
}

const GetUserSquad = async (req, res, next) => {
  const user = await User.find({ Position: "onsor", squad: req.params.squadId }).populate(["moufawadiyeh", "fawj", "squad", "taliaa"])

  if (!user) {
    const error = new Error('Could not find user.');
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json({ message: 'success', user });

}
const GetUserFawj = async (req, res, next) => {
  const user = await User.find({ Position: "onsor", fawj: req.params.fawjId }).populate(["moufawadiyeh", "fawj", "squad", "taliaa"])
  if (!user) {
    const error = new Error('Could not find user.');
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json({ message: 'success', user });

}
const GetUserMfd = async (req, res, next) => {
  const user = await User.find({ Position: "onsor", moufawadiyeh: req.params.mfdId }).populate(["moufawadiyeh", "fawj", "squad", "taliaa"])
  if (!user) {
    const error = new Error('Could not find user.');
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json({ message: 'success', user });

}
const GetNameMfd = async (req, res, next) => {
  const user = await User.find({ Name: req.body.userName, moufawadiyeh: req.params.mfdId }).populate(["moufawadiyeh", "fawj", "squad", "taliaa"])
  if (!user) {
    const error = new Error('Could not find user.');
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json({ message: 'success', user });

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
  res.status(200).json({ message: 'success', user });

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
  const user = await User.findOne({ Email: req.body.Email });

  if (!user) {
    res.status(201).json({ message: 'success' });
    return;
  }
  res.status(400).json({ message: 'failed' });

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


    res.status(201).json({ message: 'success' });
  } catch (e) {
    res.status(201).json({ message: "failed", code: e.statusCode });
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



module.exports = { Register, GetUserMfd, GetUserFawj, GetNameMfd, Login, GetUsers, GetOneUser, GetUserManagement, GetUserSquad, DeleteUser, GetUserTaliaa, AddSerial, CheckEmail, UpdateUser };
