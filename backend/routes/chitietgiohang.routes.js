const chitietgiohang = require("../controllers/ChiTietGioHang.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", chitietgiohang.create);

    router.get("/", chitietgiohang.findAll);

    router.get("/getbyMaKH/:CTGH_MaKH", chitietgiohang.findAllByID);

    router.get("/getid/getlastctghma", chitietgiohang.getLastCTGHMa);

    router.get("/:CTGH_Ma", chitietgiohang.findOne);

    router.get("/GetbySach/:MaSach/:MaGH", chitietgiohang.findOneByMaSach);

    router.put("/:CTGH_Ma", chitietgiohang.update);

    router.put("/CapNhatSoLuong/:CTGH_Ma", chitietgiohang.updateSoLuong);

    router.delete("/:CTGH_Ma", chitietgiohang.delete);

    app.use("/api/chitietgiohang", router);
};