const binhluan = require("../controllers/BinhLuan.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", binhluan.create);

    router.get("/", binhluan.findAll);

    router.get("/getbyMasach/:MaSach", binhluan.findAllByMaSach);

    router.get('/getid/getlastblma', binhluan.getLastBLMa);

    router.get("/:BL_Ma", binhluan.findOne);

    router.put("/:BL_Ma", binhluan.update);
    
    router.put("/capnhattrangthai/:BL_Ma", binhluan.updateTrangThai);

    router.delete("/:BL_Ma", binhluan.delete);
    
    router.delete("/deleteSach/:BL_MaSach", binhluan.deleteSach);

    router.delete("/deleteKH/:BL_MaKH", binhluan.deleteKH);

    app.use("/api/binhluan", router);
};