const donhang = require("../controllers/DonHang.controller");
const express = require("express");
let config = require('config');

module.exports = (app) => {
    var router = express.Router();

    router.post("/", donhang.create);

    router.get("/", donhang.findAll);
    router.get("/all/:DH_MaKH", donhang.findAllByMaKH);

    router.get("/undone/:DH_MaKH", donhang.findAllUnDone);

    router.get("/getid/getlastdhma", donhang.getLastDHMa);

    router.get("/vnpay_return", donhang.ReturnURL);

    router.post("/thanhtoanVNPay", donhang.ThanhToanVNPay);

    router.get("/done", donhang.findAllDone);

    router.get("/:DH_Ma", donhang.findOne);

    router.put("/:DH_Ma", donhang.update);

    router.put("/capnhattrangthai/:DH_Ma", donhang.updateTrangThai);


    router.delete("/:DH_Ma", donhang.delete);

    app.use("/api/donhang", router);
};