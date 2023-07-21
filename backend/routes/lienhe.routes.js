const lienhe = require("../controllers/LienHe.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", lienhe.create);

    router.get("/", lienhe.findAll);

    router.get("/:LH_Ma", lienhe.findOne);

    router.put("/:LH_Ma", lienhe.update);

    router.delete("/:LH_Ma", lienhe.delete);

    app.use("/api/lienhe", router);
};