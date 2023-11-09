const donhang = require("../controllers/DonHang.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", donhang.create);

    router.get("/", donhang.findAll);

    router.get("/undone", donhang.findAllUnDone);

    router.get("/done", donhang.findAllDone);

    router.get("/:DH_Ma", donhang.findOne);

    router.put("/:DH_Ma", donhang.update);
    
    router.put("/capnhattrangthai/:DH_Ma", donhang.updateTrangThai);


    router.delete("/:DH_Ma", donhang.delete);

    app.use("/api/donhang", router);
};