const thongtinnhanvien = require("../controllers/ThongTinNhanVien.controller");
const middlewares = require("../middlewares");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    //create a customer
    router.post("/", thongtinnhanvien.create); 
    //Retrieve all customers
    router.get("/", thongtinnhanvien.findAll);

    //Retrieve a single customer with id
    router.get("/:NV_MaNV", thongtinnhanvien.findOneByID);

    router.get('/getid/getlastttnvma', thongtinnhanvien.getLastTTNVMa);

    //Update a customer with id
    router.put("/:NV_MaNV", thongtinnhanvien.update);

    //Delete a customer with id
    router.delete("/:NV_MaNV", thongtinnhanvien.delete);

    // //Delete all customers
    // router.delete("/", khachhang.deleteAll);
   
    app.use("/api/thongtinnhanvien", router);

};