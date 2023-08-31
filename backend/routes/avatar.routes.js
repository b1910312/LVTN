const avatar = require("../controllers/Avatar.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", avatar.create);

    router.get("/", avatar.findAll);

    router.get("/:AVT_MaKH", avatar.findOne);

    router.put("/:AVT_MaKH", avatar.update);

    router.delete("/:AVT_MaKH", avatar.delete);

    app.use("/api/avatar", router);
};