const logo = require("../controllers/Logo.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", logo.create);

    router.get("/", logo.findAll);

    router.get("/:LG_MaNXB", logo.findOne);

    router.put("/:LG_MaNXB", logo.update);

    router.delete("/:LG_MaNXB", logo.delete);

    app.use("/api/logo", router);
};