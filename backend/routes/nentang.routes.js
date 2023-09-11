const NenTang = require("../controllers/NenTang.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", NenTang.create);

    router.get("/", NenTang.findAll);

    router.get("/:NT_MaDT", NenTang.findOne);

    router.put("/:NT_MaDT", NenTang.update);

    router.delete("/:NT_MaDT", NenTang.delete);

    app.use("/api/NenTang", router);
};