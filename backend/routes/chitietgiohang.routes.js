const chitietgiohang = require("../controllers/ChiTietGioHang.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", chitietgiohang.create);

    router.get("/", chitietgiohang.findAll);

    router.get("/getbyMaGH/:CTGH_MaGH", chitietgiohang.findAllByID);

    router.get("/getid/getlastctghma", chitietgiohang.getLastCTGHMa);

    router.get("/:CTGH_Ma", chitietgiohang.findOne);

    router.get("/GetbySach/:MaSach/:MaGH", chitietgiohang.findOneByMaSach);

    router.put("/:CTGH_Ma", chitietgiohang.update);

    router.put("/CapNhatSoLuong/:CTGH_Ma", chitietgiohang.updateSoLuong);

    router.delete("/:CTGH_Ma", chitietgiohang.delete);

    router.delete("/deleteGH/:CTGH_MaGH", chitietgiohang.deleteDH);

    router.delete("/deleteSach/:CTGH_MaSach", chitietgiohang.deleteSach);


    app.use("/api/chitietgiohang", router);
};