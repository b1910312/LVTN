const thumbnail = require("../controllers/ThumbNail.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", thumbnail.create);

    router.get("/", thumbnail.findAll);

    router.get("/:TB_MaSach", thumbnail.findOne);

    router.put("/:TB_MaSach", thumbnail.update);

    router.delete("/:TB_MaSach", thumbnail.delete);

    app.use("/api/thumbnail", router);
};