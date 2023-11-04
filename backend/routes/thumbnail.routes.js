const thumbnail = require("../controllers/ThumbNail.controller");
const image = require("../controllers/image.controller");

const express = require("express");
const upload = require("../middlewares/upload");
const db = require("../models");
const handle = require("../helpers/promise");
const path = require('path');


module.exports = (app) => {
    var router = express.Router();
    router.post("/", thumbnail.create);
    router.post('/upload_images/:DoiTuong/:MaSach', image.create)
    router.get("/image/:DoiTuong/:MaSach", image.findOne)
    router.put("/:TB_MaSach", thumbnail.update);
    router.delete("/:TB_MaSach", thumbnail.delete);

    app.use("/api/thumbnail", router);
};