const LoaiUuDai = require("../controllers/LoaiUuDai.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", LoaiUuDai.create);

    router.get("/", LoaiUuDai.findAll);

    router.get("/:LUD_Ma", LoaiUuDai.findOne);

    router.put("/:LUD_Ma", LoaiUuDai.update);

    router.delete("/:LUD_Ma", LoaiUuDai.delete);

    app.use("/api/LoaiUuDai", router);
};