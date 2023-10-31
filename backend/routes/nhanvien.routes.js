const nhanvien = require("../controllers/NhanVien.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    //create a customer
    router.post("/", nhanvien.create);
    //Retrieve all customers
    router.get("/", nhanvien.findAll);

    //Retrieve a single customer with id
    router.get("/:TKNV_MaNV", nhanvien.findOneByID);
    //Update a customer with id
    router.put("/:TKNV_MaNV", nhanvien.update);
    //Update a customer with id

    router.put("/CapNhatTrangThai/:TKNV_MaNV", nhanvien.updateTrangThai);
    //Delete a customer with id

    router.put("/ResetPassword/:TKNV_MaNV", nhanvien.ResetPassword);
    //Delete a customer with id
    
    router.delete("/:TKNV_MaNV", nhanvien.delete);

    // //Delete all customers
    // router.delete("/", nhanvien.deleteAll);

    router.post("/signin", nhanvien.signin);
    app.use("/api/nhanvien", router);

};