const thongtinkhachhang = require("../controllers/ThongTinKhachHang.controller");
const middlewares = require("../middlewares");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    //create a customer
    router.post("/", thongtinkhachhang.create); 
    //Retrieve all customers
    router.get("/", thongtinkhachhang.findAll);

    //Retrieve a single customer with id
    router.get("/:KH_MaKH", thongtinkhachhang.findOneByID);
    
    //Update a customer with id
    router.put("/:KH_MaKH", thongtinkhachhang.update);

    //Delete a customer with id
    router.delete("/:KH_MaKH", thongtinkhachhang.delete);

    // //Delete all customers
    // router.delete("/", khachhang.deleteAll);
   
    app.use("/api/thongtinkhachhang", router);

};