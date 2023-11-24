const danhgia = require("../controllers/DanhGia.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", danhgia.create);

    router.get("/", danhgia.findAll);

    router.get("/GetBySach/:DG_MaSach", danhgia.findOneBySach);

    router.get("/TBDanhGia/:DG_MaSach", danhgia.TBDanhGia);

    router.get("/:DG_Ma", danhgia.findOne);

    router.get("/CheckKH/:DG_MaSach/:DG_MaKH", danhgia.CheckKH);

    router.get('/getid/getlastdgma', danhgia.getLastDGMa);

    router.delete("/:DG_Ma", danhgia.delete);

    app.use("/api/danhgia", router);
};