const path = require('path')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/[\/\\:]/g, "_") + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, calback) {
        if (
            file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/jpg"
        ) {
            calback(null, true)
        } else {
            console.log('only jpg & png file supported ! ')
            calback(null, false)
        }
    },
    limite: {
        fileSize: 1024 * 1024 * 2
    }
})


module.exports = upload