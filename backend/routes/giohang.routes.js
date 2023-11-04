const giohang = require("../controllers/GIoHang.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", giohang.create);

    router.get("/", giohang.findAll);

    router.get('/getid/getlastghma', giohang.getLastGHMa);

    router.get("/:GH_Ma", giohang.findOne);

    router.put("/:GH_Ma", giohang.update);

    router.delete("/:GH_Ma", giohang.delete);

    app.use("/api/giohang", router);
};