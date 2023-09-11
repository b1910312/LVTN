const SachMoi = require("../controllers/SachMoi.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", SachMoi.create);

    router.get("/", SachMoi.findAll);

    router.get("/:SM_MaSach", SachMoi.findOne);

    router.put("/:SM_MaSach", SachMoi.update);

    router.delete("/:SM_MaSach", SachMoi.delete);

    app.use("/api/SachMoi", router);
};