const { BadRequestError } = require("../helpers/errors");
const config = require("../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const handle = require("../helpers/promise");
const db = require("../models");
const KhachHang = db.KhachHang;
const upload = require("../middlewares/upload");

//*-------------Tạo một tài khoản khách hàng
exports.create = async (req, res) => {
    // Tạo tài khoản khách hàng
    const khachhang = new KhachHang({
        TKKH_MaKH: req.body.TKKH_MaKH,
        TKKH_Email: req.body.TKKH_Email,
        TKKH_MatKhau: bcrypt.hashSync(req.body.TKKH_MatKhau, 8),
        TKKH_HangMuc: req.body.TKKH_HangMuc,
        TKKH_TrangThai: req.body.TKKH_TrangThai,
        TKKH_NgayTao: req.body.TKKH_NgayTao,
        TKKH_NgayCapNhat: req.body.TKKH_NgayCapNhat
    });
    // Lưu tài khoản khách hàng vào cơ sở dữ liệu
    const [error, document] = await handle(khachhang.save());

    if (error) {
        return res.send(error);

    }
    return res.send(document);
}


exports.updateTrangThai = async (req, res, next) => {

    const condition = {
        TKKH_MaKH: req.params.TKKH_MaKH
    };

    const [error, document] = await handle(
        KhachHang.findOneAndUpdate(condition, {
            'TKKH_TrangThai': req.body.TKKH_TrangThai,
            'TKKH_NgayCapNhat': req.body.TKKH_NgayCapNhat,

        }, {
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật Tài khoản khách hàng có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy bình luận"));
    }

    return res.send({ message: "Cập nhật Tài khoản khách hàng thành công." });
};
exports.updateHangMuc = async (req, res, next) => {

    const condition = {
        TKKH_MaKH: req.params.TKKH_MaKH
    };
    const [error, document] = await handle(
        KhachHang.findOneAndUpdate(condition, {
            'TKKH_HangMuc': req.body.TKKH_HangMuc,
            'TKKH_NgayCapNhat': req.body.TKKH_NgayCapNhat,

        }, {
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật Tài khoản khách hàng có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy bình luận"));
    }

    return res.send({ message: "Cập nhật Tài khoản khách hàng thành công." });
};

exports.ResetPassword = async (req, res, next) => {

    const condition = {
        TKKH_MaKH: req.params.TKKH_MaKH
    };
    const hashedPassword = bcrypt.hashSync(req.body.TKKH_MatKhau, 10);

    const [error, document] = await handle(

        KhachHang.findOneAndUpdate(condition, {
            'TKKH_MatKhau': hashedPassword,
            'TKKH_NgayCapNhat': req.body.TKKH_NgayCapNhat,
        }, {
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật Tài khoản khách hàng có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy bình luận"));
    }

    return res.send({ message: "Cập nhật Tài khoản khách hàng thành công." + hashedPassword });
};

//*--------Truy xuất toàn bộ tài khoản khách hàng có trong cơ sở dữ liệu
exports.findAll = async (req, res, next) => {
    const condition = { ownerId: req.userId };
    const TKKH_Email = req.query.TKKH_Email;
    console.log(req.query.TKKH_Email);
    if (TKKH_Email) {
        condition.TKKH_Email = { $regex: new RegExp(TKKH_Email), $options: "i" };
    }
    const [error, documents] = await handle(
        KhachHang.find(condition, '-ownerId')
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất tài khoản khách hàng với Email ${req.params.TKKH_Email}`)
        );
    }
    console.log(documents)
    return res.send(documents);
};

//*-------Tìm kiếm một kháchh hàng bằng mã khách hàng
exports.findOneByID = async (req, res, next) => {
    const condition = {
        TKKH_MaKH: req.params.TKKH_MaKH,

    };
    const [error, documents] = await handle(
        KhachHang.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất tài khoản khách hàng!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy tài khoản khách hàng");
    }
    return res.send(documents);
};
//*-------Tìm kiếm một kháchh hàng bằng mã khách hàng
exports.findOneByEmail = async (req, res, next) => {
    const condition = {
        TKKH_Email: req.params.TKKH_Email,

    };
    const [error, documents] = await handle(
        KhachHang.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất tài khoản khách hàng!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy tài khoản khách hàng");
    }
    return res.send(documents);
};
exports.findPassByEmail = async (req, res, next) => {
    const condition = {
        TKKH_Email: req.params.TKKH_Email,

    };
    const [error, documents] = await handle(
        KhachHang.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất tài khoản khách hàng!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy tài khoản khách hàng");
    }

    // Lấy mật khẩu từ req.body
    const password = req.params.TKKH_MatKhau;

    // Hash mật khẩu

    // So sánh mật khẩu đã hash với mật khẩu trong documents
    const isCorrect = bcrypt.compareSync(password, documents.TKKH_MatKhau);

    // Trả về kết quả so sánh
    return res.send(isCorrect);
};

//*-----Update a customer by the is in the request
exports.update = async (req, res, next) => {
    if (!req.body) {
        return next(
            new BadRequestError(400, "Dữ liệu cập nhật tài khoản khách hàng không thể trống!")
        );
    }

    const condition = {
        TKKH_MaKH: req.params.TKKH_MaKH,
    };

    const [error, document] = await handle(
        KhachHang.findOneAndUpdate(condition, req.body, {
            $set: {
                'TKKH_HangMuc': req.body.TKKH_HangMuc,
                'TKKH_NgayCapNhat': req.body.TKKH_NgayCapNhat,
            }
        }, {
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật tài khoản khách hàng`)
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy tài khoản khách hàng!"));
    }

    return res.send({ message: "Cập nhật tài khoản khách hàng thành công." });
};

//Delete a customer with the specified id in the request
exports.delete = async (req, res, next) => {
    const condition = {
        TKKH_MaKH: req.params.TKKH_MaKH,
    };

    const [error, document] = await handle(
        KhachHang.deleteOne(condition)
    );
    if (error) {
        return next(
            new BadRequestError(500, `Không xóa được tài khoản khách hàng có mã ${req.params.id}`)
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy tài khoản khách hàng"));
    }

    return res.send({ message: "Xóa tài khoản khách hàng thành công" });

};


exports.signup = async (req, res, next) => {
    const khachhang = new KhachHang({
        TKKH_MaKH: req.body.TKKH_MaKH,
        TKKH_Ten: req.body.TKKH_Ten,
        TKKH_Email: req.body.TKKH_Email,
        TKKH_MatKhau: bcrypt.hashSync(req.body.TKKH_MatKhau, 8),
        TKKH_NgayTao: req.body.TKKH_NgayTao,
    });

    const [error] = await handle(khachhang.save());

    if (error) {
        let statusCode = 400;
        let { TKKH_Ten = {}, TKKH_Email = {}, TKKH_MatKhau = {} } = error.errors;

        const errorMessage =
            TKKH_Ten.message || TKKH_Email.message || TKKH_MatKhau.message;
        if (!errorMessage) {
            statusCode = 500;
        }

        return next(new BadRequestError(statusCode, errorMessage));
    }

    res.send({ message: "Đăng ký tài khoản khách hàng thành công" });
};

exports.signin = async (req, res, next) => {
    const [error, khachhang] = await handle(
        KhachHang.findOne({
            TKKH_Email: req.body.TKKH_Email,
        }).exec()
    );

    if (error) {
        return next(new BadRequestError(500));
    }
    if (!khachhang) {
        return next(new BadRequestError(401, "Incorrect username"));
    }

    const passwordIsValid = bcrypt.compareSync(
        req.body.TKKH_MatKhau,
        khachhang.TKKH_MatKhau,
    );
    console.log(passwordIsValid)
    if (!passwordIsValid) {
        return next(new BadRequestError(401, "password"));
    }

    const token = jwt.sign({ TKKH_MaKH: khachhang.TKKH_MaKH }, config.jwt.secret, {
        expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
        TKKH_MaKH: khachhang.TKKH_MaKH,
        TKKH_Ten: khachhang.TKKH_Ten,
        TKKH_Email: khachhang.TKKH_Email,
        TKKH_HangMuc: khachhang.TKKH_HangMuc,
        TKKH_TrangThai: khachhang.TKKH_TrangThai,
        accessToken: token,
    });
};


