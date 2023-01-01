const express = require('express');
const router = express.Router();
const mosque = require('../controllers/mosque');
const point = require('../controllers/point');
const prayer = require('../controllers/prayer');
const post = require('../controllers/post');
const moufawad = require('../controllers/moufawad');
const fawj = require('../controllers/fawj');
const squad = require('../controllers/squad');
const taliaa = require('../controllers/taliaa');
const users = require('../controllers/users');
const categorie = require('../controllers/categorie');
const activities = require('../controllers/activities');
const upload  = require('../middelware/upload')

router.post('/add-moufawadiyeh', moufawad.AddMouafwadiyeh)
// router.post('/add-moufawad/:mfdId', moufawad.AddMoufawad)
router.get('/get-moufawadiyeh', moufawad.GetMfd)
// router.post('/delete-mfd/:mfdId', moufawad.DeleteMfd)
router.post('/add-fawj', fawj.AddFawj)
router.post('/add-amid/:fawjId', fawj.AddAmid)
router.get('/get-fawj', fawj.GetFawj)
router.get('/get-fawj/:mfdId', fawj.GetFawjMfd)
// router.post('/delete-fwj/:fwjId', fawj.DeleteFawj)
router.post('/add-leader/:squadId', squad.AddLeader)
router.get('/get-squad', squad.GetSquad)
router.get('/get-squad-fawj/:fawjId', squad.GetSquadFawj)
router.post('/update-squad/:squadId', squad.UpdateSquad)
// router.post('/delete-sqd/:sqdId', squad.DeleteSquad)
router.post('/add-taliaa', taliaa.AddTaliaa)
router.post('/add-areef/:taliaaId', taliaa.AddAreef)
router.post('/add-user-taliaa/:taliaaId', taliaa.AddUserTaliaa)
router.post('/get-taliaas', taliaa.GetTaliaa)
router.post('/get-taliaa/:squadId', taliaa.GetTaliaaToSquad)
router.post('/get-one-taliaa/:taliaaId', taliaa.GetOneTaliaa)
router.post('/delete-user-taliaa/:userId', taliaa.DeleteUserTaliaa)
router.post('/delete-taliaa/:taliaaId', taliaa.DeleteTaliaa)
///////////////////////////////////////////////
router.post('/register', upload.single('file'), users.Register)
router.post('/login', users.Login)
router.post('/update-user/:userId', users.UpdateUser)
router.post('/get-one-user/:userId', users.GetOneUser)
router.post('/get-users', users.GetUsers)
router.post('/get-users-management', users.GetUserManagement)
router.post('/delete-user/:userId', users.DeleteUser)
router.post('/get-user-squad/:squadId', users.GetUserSquad)
router.post('/get-user-taliaa/:taliaaId', users.GetUserTaliaa)
router.post('/get-user-mfd/:mfdId', users.GetUserMfd)
router.post('/get-user-fawj/:fawjId', users.GetUserFawj)
router.post('/get-name-mfd/:mfdId', users.GetNameMfd)
router.post('/add_Serial/:userId', users.AddSerial)
router.post('/check-Email', users.CheckEmail)
router.post('/get-squad-categories/:squadId', categorie.GetSquadCategorie)
router.post('/get-mfd-categories/:mfdId', categorie.GetMfdCategorie)
router.post('/update-categorie/:categorieId', categorie.UpdateCategorie)
router.post('/delete-categorie/:categorieId', categorie.DeleteCategorie)
// router.post('/check-onsor/:categorieId', categorie.CheckOnsor)
router.post('/add-activities', activities.AddActivities)
router.post('/add-user-activities/:activitiesId', activities.AddUserActivities)
router.post('/get-squad-activities/:categorieId', activities.GetSquadActivities)
router.post('/delete-activities/:activitiesId', activities.DeleteActivities)
router.post('/delete-user-activities/:activitiesId', activities.DeleteUserActivities)
router.post('/update-note-activities/:activitiesId', activities.UpdateNote)
router.post('/add-categorie-mfd', categorie.AddCategorieMoufawad)




module.exports = router