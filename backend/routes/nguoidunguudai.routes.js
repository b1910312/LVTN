const NguoiDungUuDai = require("../controllers/NguoiDungUuDai.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", NguoiDungUuDai.create);

    router.get("/", NguoiDungUuDai.findAll);

    router.get("/:NDUD_MaND", NguoiDungUuDai.findOne);

    router.put("/:NDUD_MaND", NguoiDungUuDai.update);

    router.delete("/:NDUD_MaND", NguoiDungUuDai.delete);

    app.use("/api/NguoiDungUuDai", router);
};