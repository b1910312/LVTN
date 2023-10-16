const sach = require("../controllers/Sach.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", sach.create);

    router.get("/", sach.findAll);

    router.get('/getid/getlastsma', sach.getLastSMa);
    
    router.get("/:S_Ma", sach.findOne);

    router.put("/:S_Ma", sach.update);

    router.delete("/:S_Ma", sach.delete);

    app.use("/api/sach", router);
};