const SachYeuThich = require("../controllers/SachYeuThich.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", SachYeuThich.create);

    router.get("/", SachYeuThich.findAll);

    router.get("/:SYT_MaKH", SachYeuThich.findOne);

    router.put("/:SYT_MaKH", SachYeuThich.update);

    router.delete("/:SYT_MaKH", SachYeuThich.delete);

    app.use("/api/SachYeuThich", router);
};