const CuocTroChuyen = require("../controllers/CuocTroChuyen.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", CuocTroChuyen.create);

    router.get("/", CuocTroChuyen.findAll);

    router.get("/:CTC_Ma", CuocTroChuyen.findOne);

    router.put("/:CTC_Ma", CuocTroChuyen.update);

    router.delete("/:CTC_Ma", CuocTroChuyen.delete);

    app.use("/api/CuocTroChuyen", router);
};