const diachi = require("../controllers/DiaChi.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", diachi.create);

    router.get("/", diachi.findAll);

    router.get('/getid/getlastdcma', diachi.getLastDCMa);

    router.get("/:DC_MaDT", diachi.findOne);

    router.put("/:DC_MaDT", diachi.update);

    router.delete("/:DC_MaDT", diachi.delete);

    app.use("/api/diachi", router);
};