const giohang = require("../controllers/GIoHang.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", giohang.create);

    router.get("/", giohang.findAll);

    router.get("/:GH_MaKH", giohang.findOne);

    router.put("/:GH_MaKH", giohang.update);

    router.delete("/:GH_MaKH", giohang.delete);

    app.use("/api/giohang", router);
};