const TinNhan = require("../controllers/TinNhan.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", TinNhan.create);

    router.get("/", TinNhan.findAll);

    router.get('/getid/getlasttnma', TinNhan.getLastTNMa);

    router.get("/getTN/:TN_MaCTC", TinNhan.findAllwithIdCTC);

    router.get("/:TN_Ma", TinNhan.findOne);

    router.delete("/deleteTN/:TN_MaCTC", TinNhan.deleteWithCTCMa);

    router.delete("/:TN_Ma", TinNhan.delete);

    app.use("/api/TinNhan", router);
};