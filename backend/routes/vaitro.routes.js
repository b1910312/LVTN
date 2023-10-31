const vaitro = require("../controllers/VaiTro.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", vaitro.create);

    router.get("/", vaitro.findAll);

    router.get("/getid/getlastvtma", vaitro.getLastID);

    router.get("/:VT_Ma", vaitro.findOne);

    router.put("/:VT_Ma", vaitro.update);

    router.delete("/:VT_Ma", vaitro.delete);

    app.use("/api/vaitro", router);
};