const chitietdonhang = require("../controllers/ChiTietDonHang.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", chitietdonhang.create);

    router.get("/", chitietdonhang.findAll);

    router.get("/:CTDH_Ma", chitietdonhang.findOne);

    router.get("/getbyDHMa/:CTDH_MaDH", chitietdonhang.findOneDH);
    

    router.put("/:CTDH_Ma", chitietdonhang.update);

    router.delete("/:CTDH_Ma", chitietdonhang.delete);

    app.use("/api/chitietdonhang", router);
};