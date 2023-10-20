const theloai = require("../controllers/TheLoai.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", theloai.create);

    router.get("/", theloai.findAll);

    router.get("/getid/getlastTheLoaima", theloai.getlastTheLoaima);
    
    router.get("/:TL_Ma", theloai.findOne);

    router.put("/:TL_Ma", theloai.update);

    router.delete("/:TL_Ma", theloai.delete);

    app.use("/api/theloai", router);
};