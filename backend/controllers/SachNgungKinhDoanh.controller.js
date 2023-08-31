const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const Sach = db.Sach;

//*-------------Thêm sách
exports.create = async (req, res) => {
    // Create a product
    const sach = new Sach({
        SNKD_Ma: req.body.SNKD_Ma,
        SNKD_Ten: req.body.SNKD_Ten,
        SNKD_TacGia: req.body.SNKD_TacGia,
        SNKD_NXB: req.body.SNKD_NXB,
        SNKD_Gia: req.body.SNKD_Gia,
        SNKD_TheLoai: req.body.SNKD_TheLoai,
        SNKD_NgayNhap: req.body.SNKD_NgayNhap,
        SNKD_NgayCapNhat: req.body.SNKD_NgayCapNhat,
        SNKD_NgayXoa: req.body.SNKD_NgayXoa,
    });
    // Save product in the DB
    const [error, document] = await handle(sach.save());

    if (error) {
        return console.log(error);

    }

    return res.send(document);

}


//*--------Truy xuất tất cả sách trong cơ sở dữ liệu
exports.findAll = async (req, res) => {

    console.log('');

    const condition = {
        ownerId: req.userId
    };
    const SNKD_Ten = req.query.SNKD_Ma;

    if (SNKD_Ten) {
        condition.SNKD_Ten = { $regex: new RegExp(SNKD_Ten), $options: "i" };
    }

    const [error, documents] = await handle(
        Sach.find(condition, '-ownerId').sort({ 'SNKD_Ma': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất sách với mã ${req.params.SNKD_Ma}`)
        );
    }

    return res.send(documents);
};



//*----- Truy xuất một sách bằng mã sách
exports.findOne = async (req, res) => {
    const condition = {
        SNKD_Ma: req.params.SNKD_Ma,
    };
    const [error, documents] = await handle(
        Sach.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất sách!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy sách")
    }
    return res.send(documents);
};

//Xóa một sách bằng mã sách
exports.delete = async (req,res) => {    
    const condition = {
        SNKD_Ma: req.params.SNKD_Ma
    };

    const [error, document] = await handle(
        Sach.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500,`Không xóa được sách có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa sách thành công" });
    }

};

