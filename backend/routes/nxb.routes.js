const nxb = require("../controllers/NhaXuatBan.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", nxb.create);

    router.get("/", nxb.findAll);

    router.get('/getid/getlastnxbma', nxb.getLastNxbMa);

    router.get("/:NXB_Ma", nxb.findOne);

    router.put("/:NXB_Ma", nxb.update);

    router.delete("/:NXB_Ma", nxb.delete);

    app.use("/api/nxb", router);
};