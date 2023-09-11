const hangmuc = require("../controllers/HangMuc.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", hangmuc.create);

    router.get("/", hangmuc.findAll);

    router.get("/:HM_Ma", hangmuc.findOne);

    router.put("/:HM_Ma", hangmuc.update);

    router.delete("/:HM_Ma", hangmuc.delete);

    app.use("/api/hangmuc", router);
};