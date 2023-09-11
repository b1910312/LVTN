const sachngungkinhdoanh = require("../controllers/SachNgungKinhDoanh.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", sachngungkinhdoanh.create);

    router.get("/", sachngungkinhdoanh.findAll);

    router.get("/:SNKD_Ma", sachngungkinhdoanh.findOne);

    router.delete("/:SNKD_Ma", sachngungkinhdoanh.delete);

    app.use("/api/sachngungkinhdoanh", router);
};