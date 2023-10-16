const lichsutimkiem = require("../controllers/LichSuTimKiem.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", lichsutimkiem.create);

    router.get("/", lichsutimkiem.findAll);

    router.get("/:LSTK_Ma", lichsutimkiem.findOne);

    router.delete("/:LSTK_Ma", lichsutimkiem.delete);

    app.use("/api/lichsutimkiem", router);
};