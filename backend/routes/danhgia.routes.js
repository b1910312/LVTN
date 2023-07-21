const danhgia = require("../controllers/DanhGia.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", danhgia.create);

    router.get("/", danhgia.findAll);

    router.get("/:DG_Ma", danhgia.findOne);

    router.put("/:DG_Ma", danhgia.update);

    router.delete("/:DG_Ma", danhgia.delete);

    app.use("/api/danhgia", router);
};