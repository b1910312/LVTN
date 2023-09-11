const SachUuDai = require("../controllers/SachUuDai.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", SachUuDai.create);

    router.get("/", SachUuDai.findAll);

    router.get("/:SUD_MaSach", SachUuDai.findOne);

    router.put("/:SUD_MaSach", SachUuDai.update);

    router.delete("/:SUD_MaSach", SachUuDai.delete);

    app.use("/api/SachUuDai", router);
};