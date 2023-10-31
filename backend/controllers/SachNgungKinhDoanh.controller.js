const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const SachNgungKinhDoanh = db.SachNgungKinhDoanh;

//*-------------Thêm sách
exports.create = async (req, res) => {
    const moment = require("moment");

    // Lấy ngày hiện tại ở định dạng chuỗi
    const dateString = moment().format("DD-MM-YYYY");
    // Create a product
    const sachngungkinhdoanh = new SachNgungKinhDoanh({
        SNKD_Ma: req.body.S_Ma,
        SNKD_Ten: req.body.S_Ten,
        SNKD_TacGia: req.body.S_TacGia,
        SNKD_NXB: req.body.S_NXB,
        SNKD_Gia: req.body.S_Gia,
        SNKD_TheLoai: req.body.S_TheLoai,
        SNKD_NgayNhap: req.body.S_NgayNhap,
        SNKD_NgayCapNhat: req.body.S_NgayCapNhat,
        SNKD_NgayXoa: dateString.toString()
    });
    // Save product in the DB
    const [error, document] = await handle(sachngungkinhdoanh.save());

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
        SachNgungKinhDoanh.find(condition, '-ownerId').sort({ 'SNKD_Ma': 1 })
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
        SachNgungKinhDoanh.findOne(condition)
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
exports.delete = async (req, res) => {
    const condition = {
        SNKD_Ma: req.params.SNKD_Ma
    };

    const [error, document] = await handle(
        SachNgungKinhDoanh.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, `Không xóa được sách có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa sách thành công" });
    }

};

