const binhluan = require("../controllers/BinhLuan.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", binhluan.create);

    router.get("/", binhluan.findAll);

    router.get("/:BL_Ma", binhluan.findOne);

    router.put("/:BL_Ma", binhluan.update);

    router.delete("/:BL_Ma", binhluan.delete);

    app.use("/api/binhluan", router);
};