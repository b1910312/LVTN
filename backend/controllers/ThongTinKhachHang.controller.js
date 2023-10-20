const { BadRequestError } = require("../helpers/errors");
const config = require("../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const handle = require("../helpers/promise");
const db = require("../models");
const ThongTinKhachHang = db.ThongTinKhachHang;
const upload = require("../middlewares/upload");

//*-------------Tạo một tài khoản khách hàng
exports.create = async (req, res) => {
    // Tạo tài khoản khách hàng
    const thongtinkhachhang = new ThongTinKhachHang({
        KH_MaKH: req.body.KH_MaKH,
        KH_HoTen: req.body.KH_HoTen,
        KH_NgaySinh: req.body.KH_NgaySinh,
        KH_SoDienThoai: req.body.KH_SoDienThoai,
        KH_NgayTao: req.body.KH_NgayTao,
    });
    // Lưu tài khoản khách hàng vào cơ sở dữ liệu
    const [error, document] = await handle(thongtinkhachhang.save());

    if (error) {
        return res.send(error);

    }
    return res.send(document);
}



//*--------Truy xuất toàn bộ tài khoản khách hàng có trong cơ sở dữ liệu
exports.findAll = async (req, res, next) => {
    const condition = { ownerId: req.userId };
    const KH_MaKH = req.query.KH_MaKH;
    console.log(req.query.KH_MaKH);
    if (KH_MaKH) {
        condition.KH_MaKH = { $regex: new RegExp(KH_MaKH), $options: "i" };
    }
    const [error, documents] = await handle(
        ThongTinKhachHang.find(condition, '-ownerId')
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất thông tin khách hàng với Mã khách hàng ${req.params.KH_MaKH}`)
        );
    }
    return res.send(documents);
};

//*-------Tìm kiếm một kháchh hàng bằng mã khách hàng
exports.findOneByID = async (req, res, next) => {
    const condition = {
        KH_MaKH: req.params.KH_MaKH,
    };
    const [error, documents] = await handle(
        ThongTinKhachHang.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất thông tin khách hàng!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy thông tin khách hàng");
    }
    return res.send(documents);
};


//*-----Update a customer by the is in the request
exports.update = async (req, res, next) => {
    if (!req.body) {
        return next(
            new BadRequestError(400, "Dữ liệu cập nhật thông tin khách hàng không thể trống!")
        );
    }

    const condition = {
        KH_MaKH: req.params.KH_MaKH,
    };

    const [error, document] = await handle(
        ThongTinKhachHang.findOneAndUpdate(condition, req.body, {
            $set: {
                'KH_NgayCapNhat': req.body.KH_NgayCapNhat,
            }
        }, {
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin khách hàng`)
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy thông tin  khách hàng!"));
    }

    return res.send({ message: "Cập nhật thông tin khách hàng thành công." });
};

//Delete a customer with the specified id in the request
exports.delete = async (req, res, next) => {
    const condition = {
        KH_MaKH: req.params.KH_MaKH,
    };

    const [error, document] = await handle(
        ThongTinKhachHang.deleteOne(condition)
    );
    if (error) {
        return next(
            new BadRequestError(500, `Không xóa được thông tin khách hàng có mã ${req.params.id}`)
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy thông tin khách hàng"));
    }

    return res.send({ message: "Xóa thông tin khách hàng thành công" });

};

