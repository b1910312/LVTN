const ThongTinCuaHang = require("../controllers/ThongTinCuaHang.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", ThongTinCuaHang.create);

    router.get("/", ThongTinCuaHang.findAll);
    
    router.get("/:MST", ThongTinCuaHang.findAll);

    router.put("/:MST", ThongTinCuaHang.update);

    router.delete("/:MST", ThongTinCuaHang.delete);

    app.use("/api/ThongTinCuaHang", router);
};