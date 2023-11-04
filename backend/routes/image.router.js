// const image = require("../controllers/image.controller");
const express = require("express");
const upload = require("../middlewares/upload");
const db = require("../models");
const Image = db.Image;
module.exports = (app) => {
    var router = express.Router();
''

    router.post("/", upload.single('image'),async (req, res) => {

    console.log(req.file);
    
        // Create a customer
        const image = new Image({
            filename: req.file.filename,
            ownerId: req.userId,
        });
        // Save customer in the DB
        const [error, document] =  await handle(image.save());
    
        if (error) {
            return res.send(error);
    
        }
        return res.send(document);
    },
);
    router.get("/",async(req,res) => {

        const [error, documents] = await handle(
            Image.find()
        );
    
        if(error) {
            return next(
                new BadRequestError(500, "Lỗi trong quá trình truy xuất hoa don!")
            );
        }
        if(!documents){
            return res.send("Chua ton tai");
        }
        return res.send(documents);}
    );
        
    app.use("/api/image", router);

};