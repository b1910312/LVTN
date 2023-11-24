const khachhang = require("../controllers/KhachHang.controller");
const middlewares = require("../middlewares");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    //create a customer
    router.post("/", khachhang.create); 
    //Retrieve all customers
    router.get("/", khachhang.findAll);

    //Retrieve a single customer with id
    router.get("/:TKKH_MaKH", khachhang.findOneByID);
    
    router.get("/GetByEmail/:TKKH_Email", khachhang.findOneByEmail);

    router.get("/GetPass/:TKKH_Email/:TKKH_MatKhau", khachhang.findPassByEmail);

    router.get("/GetByHangMuc/:TKKH_HangMuc", khachhang.FindSachHangMuc)

    router.put("/CapNhatTrangThai/:TKKH_MaKH", khachhang.updateTrangThai);

    router.put("/CapNhatHangMuc/:TKKH_MaKH", khachhang.updateHangMuc);
    
    //Delete a customer with id

    router.put("/ResetPassword/:TKKH_MaKH", khachhang.ResetPassword);
    //Delete a customer with id
    
    //Update a customer with id
    router.put("/:TKKH_MaKH", khachhang.update);

    //Delete a customer with id
    router.delete("/:TKKH_MaKH", khachhang.delete);

    // //Delete all customers
    // router.delete("/", khachhang.deleteAll);
    router.post(
        "/signup",
        [middlewares.checkDuplicateSDT],
        khachhang.signup
    );

    router.post("/signin", khachhang.signin);
    app.use("/api/khachhang", router);

};