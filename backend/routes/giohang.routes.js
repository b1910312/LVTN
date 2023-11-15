const giohang = require("../controllers/GIoHang.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", giohang.create);

    router.get("/", giohang.findAll);

    router.get("/:GH_MaGH", giohang.findOne);

    router.get("/getid/getlastghma", giohang.getLastGHMa);

    router.get("/getGH/:GH_MaKH", giohang.getGioHangByMaKH);

    router.put("/:GH_MaGH", giohang.update);

    router.delete("/:GH_MaGH", giohang.delete);

    router.delete("/deleteKH/:GH_MaKH", giohang.deletebyMaKH);


    app.use("/api/giohang", router);
};