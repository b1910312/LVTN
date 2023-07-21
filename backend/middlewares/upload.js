const path = require('path');
const multer = require('multer');


var storage = multer.diskStorage ({
    destination: function(req, file, cb) {
        cb(null, '../frontend/src/images/')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname);
      },
})

var upload = multer ({
    storage: storage,
    fileFilter: function(req, file, callback) {
        if(file.mimetype == "image/png" || file.mimetype  =="image/jpg"){
            callback(null, true);
        }
        else {
            console.log(' Chi chon file .png hoac .jpg');
            callback(null, true);
        }
    },
    limits: {
        fieldSize: 1024 * 1024 *2
    }
});
module.exports = upload;