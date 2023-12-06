const danhgiacuahang = require("../controllers/DanhGiaCuaHang.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", danhgiacuahang.create);

    router.get("/", danhgiacuahang.findAll);

    router.get('/getid/getlastdgma', danhgiacuahang.getLastDGMa);

    router.get("/CheckKH/:DG_MaKH", danhgiacuahang.CheckKH);

    router.get("/:DG_Ma", danhgiacuahang.findOne);

    router.delete("/:DG_Ma", danhgiacuahang.delete);

    router.delete("/deleteKH/:DG_MaKH", danhgiacuahang.deleteKH);

    app.use("/api/danhgiacuahang", router);
};