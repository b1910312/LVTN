const { BadRequestError } = require("../helpers/errors");
const config = require("../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const handle = require("../helpers/promise");
const db = require("../models");
const ThongTinNhanVien = db.ThongTinNhanVien;
const upload = require("../middlewares/upload");

//*-------------Tạo một tài khoản khách hàng
exports.create = async (req, res) => {
    // Tạo tài khoản khách hàng
    const thongtinnhanvien = new ThongTinNhanVien({
        NV_Ma: req.body.NV_Ma,
        NV_SoDienThoai: req.body.NV_SoDienThoai,
        NV_Email: req.body.NV_Email,
        NV_DiaChi: req.body.NV_DiaChi,
        NV_NgayTao: req.body.NV_NgayTao,
    });
    // Lưu tài khoản khách hàng vào cơ sở dữ liệu
    const [error, document] = await handle(thongtinnhanvien.save());

    if (error) {
        return res.send(error);

    }
    return res.send(document);
}



//*--------Truy xuất toàn bộ tài khoản khách hàng có trong cơ sở dữ liệu
exports.findAll = async (req, res, next) => {
    const condition = { ownerId: req.userId };
    const NV_Ma = req.query.NV_Ma;
    console.log(req.query.NV_Ma);
    if (NV_Ma) {
        condition.NV_Ma = { $regex: new RegExp(NV_Ma), $options: "i" };
    }
    const [error, documents] = await handle(
        ThongTinNhanVien.find(condition, '-ownerId')
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất thông tin khách hàng với Email ${req.params.NV_Ma}`)
        );
    }
    console.log(documents)
    return res.send(documents);
};

//*-------Tìm kiếm một kháchh hàng bằng mã khách hàng
exports.findOneByID = async (req, res, next) => {
    const condition = {
        NV_Ma: req.params.NV_Ma,
    };
    const [error, documents] = await handle(
        ThongTinNhanVien.findOne(condition)
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
        NV_Ma: req.params.NV_Ma,
    };

    const [error, document] = await handle(
        ThongTinNhanVien.findOneAndUpdate(condition, req.body, {
            $set: {
                'NV_NgayCapNhat': req.body.NV_NgayCapNhat,
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
        NV_Ma: req.params.NV_Ma,
    };

    const [error, document] = await handle(
        ThongTinNhanVien.deleteOne(condition)
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

