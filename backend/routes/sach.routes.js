const sach = require("../controllers/Sach.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", sach.create);

    router.get("/", sach.findAll);

    router.get("/nhapkho", sach.findNhapKhoAll);
    
    router.get("/nhapkho/:NK_MaSach", sach.findNhapKhoSMa);


    router.get('/getid/getlastsma', sach.getLastSMa);
    
    router.get("/:S_Ma", sach.findOne);

    router.put("/:S_Ma", sach.update);

    router.put("/CapNhatSoLuong/:S_Ma", sach.updateSoLuong);

    router.post("/NhapKho", sach.NhapKho);

    router.get("/NhapKho/getid/getlastnkma", sach.getLastNKMa);

    router.delete("/:S_Ma", sach.delete);

    app.use("/api/sach", router);
};