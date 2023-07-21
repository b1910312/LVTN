const avatar = require("../controllers/Avatar.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", avatar.create);

    router.get("/", avatar.findAll);

    router.get("/:AVT_Ma", avatar.findOne);

    router.put("/:AVT_Ma", avatar.update);

    router.delete("/:AVT_Ma", avatar.delete);

    app.use("/api/avatar", router);
};