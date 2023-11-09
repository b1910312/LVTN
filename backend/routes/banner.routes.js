const Banner = require("../controllers/Banner.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", Banner.create);

    router.get("/", Banner.findAll);

    router.get("/getid/getlastbnma", Banner.getLastBNMa);

    router.get("/:BN_Ma", Banner.findOne);

    router.put("/:BN_Ma", Banner.update);

    router.put("/CapNhatTrangThai/:BN_Ma", Banner.updateTrangThai);

    router.delete("/:BN_Ma", Banner.delete);

    app.use("/api/banner", router);
};