const Banner = require("../controllers/Banner.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", Banner.create);

    router.get("/", Banner.findAll);

    router.get("/:BN_MaSach", Banner.findOne);

    router.put("/:BN_MaSach", Banner.update);

    router.delete("/:BN_MaSach", Banner.delete);

    app.use("/api/banner", router);
};