const donhoantra = require("../controllers/DonHoanTra.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", donhoantra.create);

    router.get("/", donhoantra.findAll);

    router.get("/:DHT_Ma", donhoantra.findOne);

    router.put("/:DHT_Ma", donhoantra.update);

    router.delete("/:DHT_Ma", donhoantra.delete);

    app.use("/api/donhoantra", router);
};