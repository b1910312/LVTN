const MaGiamGia = require("../controllers/MaGiamGia.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", MaGiamGia.create);

    router.get("/", MaGiamGia.findAll);

    router.get("/:MGG_MaGiamGia", MaGiamGia.findOne);

    router.put("/:MGG_MaGiamGia", MaGiamGia.update);

    router.delete("/:MGG_MaGiamGia", MaGiamGia.delete);

    app.use("/api/MaGiamGia", router);
};