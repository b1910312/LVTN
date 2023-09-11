const BestSale = require("../controllers/BestSale.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", BestSale.create);

    router.get("/", BestSale.findAll);

    router.get("/:BS_MaSach", BestSale.findOne);

    router.put("/:BS_MaSach", BestSale.update);

    router.delete("/:BS_MaSach", BestSale.delete);

    app.use("/api/BestSale", router);
};