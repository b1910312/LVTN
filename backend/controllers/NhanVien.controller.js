const { BadRequestError } = require("../helpers/errors");
const config = require("../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const handle = require("../helpers/promise");
const db = require("../models");
const NhanVien = db.NhanVien;
const upload = require("../middlewares/upload");

//*-------------Tạo một tài khoản nhân viên
exports.create = async (req, res) => {
    // Tạo tài khoản khách hàng
    const nhanvien = new NhanVien({
        TKNV_Ten: req.body.TKNV_Ten,
        TKNV_Ma: req.body.TKNV_Ma,
        TKNV_VaiTro: req.body.TKNV_VaiTro,
        TKNV_MatKhau: bcrypt.hashSync(req.body.TKNV_MatKhau, 8),
        TKNV_NgayTao: req.body.TKNV_NgayTao,
    });
    // Lưu tài khoản nhân viên vào cơ sở dữ liệu
    const [error, document] = await handle(nhanvien.save());

    if (error) {
        return res.send(error);

    }
    return res.send(document);
}



//*--------Truy xuất toàn bộ tài khoản nhân viên có trong cơ sở dữ liệu
exports.findAll = async (req, res, next) => {
    const condition = { ownerId: req.userId };
    const TKNV_Ma = req.query.TKNV_Ma;
    console.log(req.query.TKNV_Email);
    if (TKNV_Ma) {
        condition.TKNV_Ma = { $regex: new RegExp(TKNV_Ma), $options: "i" };
    }
    const [error, documents] = await handle(
        NhanVien.find(condition, '-ownerId')
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất tài khoản nhân viên với mã nhân viên ${req.params.TKNV_Ma}`)
        );
    }
    console.log(documents)
    return res.send(documents);
};

//*-------Tìm kiếm một kháchh hàng bằng mã khách hàng
exports.findOneByID = async (req, res, next) => {
    const condition = {
        TKNV_Ma: req.params.TKNV_Ma,

    };
    const [error, documents] = await handle(
        NhanVien.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất tài khoản nhân viên!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy tài khoản nhân viên");
    }
    return res.send(documents);
};


//*----Cập nhật thông tin tài khoản nhân viên thông qua request
exports.update = async (req, res, next) => {
    if (!req.body) {
        return next(
            new BadRequestError(400, "Dữ liệu cập nhật tài khoản nhân viên không thể trống!")
        );
    }

    const condition = {
        TKNV_Ma: req.params.TKNV_Ma,
    };

    const [error, document] = await handle(
        NhanVien.findOneAndUpdate(condition, req.body, {
            $set: {
                "TKNV_NgayCapNhat": req.body.TKNV_NgayCapNhat
            }
        }, {
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật tài khoản nhân viên`)
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy tài khoản nhân viên!"));
    }

    return res.send({ message: "Cập nhật tài khoản nhân viên thành công." });
};

//Delete a customer with the specified id in the request
exports.delete = async (req, res, next) => {
    const condition = {
        TKNV_Ma: req.params.TKNV_Ma,
    };

    const [error, document] = await handle(
       NhanVien.deleteOne(condition)
    );
    if (error) {
        return next(
            new BadRequestError(500, `Không xóa được tài khoản nhân viên có mã ${req.params.id}`)
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy tài khoản nhân viên"));
    }

    return res.send({ message: "Xóa tài khoản nhân viên thành công" });

};

exports.signin = async (req, res, next) => {
    const [error, nhanvien] = await handle(
        NhanVien.findOne({
            TKNV_Ma: req.body.TKNV_Ma,
        }).exec()
    );

    if (error) {
        return next(new BadRequestError(500));
    }
    if (!nhanvien) {
        return next(new BadRequestError(401, "Incorrect username"));
    }

    const passwordIsValid = bcrypt.compareSync(
        req.body.TKNV_MatKhau,
        nhanvien.TKNV_MatKhau,
    );
    console.log(passwordIsValid)
    if (!passwordIsValid) {
        return next(new BadRequestError(401, "password"));
    }

    const token = jwt.sign({ TKNV_Ma: nhanvien.TKNV_Ma }, config.jwt.secret, {
        expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
        TKNV_Ma: nhanvien._id,
        TKNV_Ten: nhanvien.TKNV_Ten,
        accessToken: token,
    });
};


