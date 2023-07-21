const hinhminhhoa = require("../controllers/HinhMinhHoa.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", hinhminhhoa.create);

    router.get("/", hinhminhhoa.findAll);

    router.get("/:HMH_Ma", hinhminhhoa.findOne);

    router.put("/:HMH_Ma", hinhminhhoa.update);

    router.delete("/:HMH_Ma", hinhminhhoa.delete);

    app.use("/api/hinhminhhoa", router);
};