const danhgiacuahang = require("../controllers/DanhGiaCuaHang.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", danhgiacuahang.create);

    router.get("/", danhgiacuahang.findAll);

    router.get("/:DG_Ma", danhgiacuahang.findOne);

    router.put("/:DG_Ma", danhgiacuahang.update);

    router.delete("/:DG_Ma", danhgiacuahang.delete);

    app.use("/api/danhgiacuahang", router);
};