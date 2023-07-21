const chitietgiohang = require("../controllers/ChiTietGioHang.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", chitietgiohang.create);

    router.get("/", chitietgiohang.findAll);

    router.get("/:CTGH_Ma", chitietgiohang.findOne);

    router.put("/:CTGH_Ma", chitietgiohang.update);

    router.delete("/:CTGH_Ma", chitietgiohang.delete);

    app.use("/api/chitietgiohang", router);
};