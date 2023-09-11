const UuDai = require("../controllers/UuDai.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", UuDai.create);

    router.get("/", UuDai.findAll);

    router.get("/:UD_Ma", UuDai.findOne);

    router.put("/:UD_Ma", UuDai.update);

    router.delete("/:UD_Ma", UuDai.delete);

    app.use("/api/UuDai", router);
};