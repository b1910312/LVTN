const chitietdonhoantra = require("../controllers/ChiTietDonHoanTra.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", chitietdonhoantra.create);

    router.get("/", chitietdonhoantra.findAll);

    router.get("/:CTDHT_Ma", chitietdonhoantra.findOne);

    router.put("/:CTDHT_Ma", chitietdonhoantra.update);

    router.delete("/:CTDHT_Ma", chitietdonhoantra.delete);

    app.use("/api/chitietdonhoantra", router);
};