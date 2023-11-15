const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const ChiTietGioHang = db.ChiTietGioHang;


exports.getLastCTGHMa = async (req, res) => {
    const [error, documents] = await handle(
        ChiTietGioHang.findOne().sort({ CTGH_Ma: -1 })
    );
    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất sách!")
        );
    }
    if (!documents) {
        return res.send("KBCTGH000")
    }
    return res.send(documents.CTGH_Ma);
    // if (!lastRecord) {
    //     console.log('bảng dữ liệu trống'); // Nếu không có bản ghi nào, trả về giá trị mặc định
    // }
    // // Giải mã và tạo mã mới
    // const lastSMa = lastRecord.S_Ma;
    // const numericPart = parseInt(lastSMa.slice(3), 10) + 1;
    // const newSMa = `KBS${numericPart.toString().padStart(3, '0')}`;
    // console.log(newSMa);
};

//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const chitietgiohang = new ChiTietGioHang({
        CTGH_Ma: req.body.CTGH_Ma,
        CTGH_MaGH: req.body.CTGH_MaGH,
        CTGH_MaSach: req.body.CTGH_MaSach,
        CTGH_SoLuong: req.body.CTGH_SoLuong,
        CTGH_NgayTao: req.body.CTGH_NgayTao,
    });
    // Save product in the DB
    const [error, document] = await handle(chitietgiohang.save());

    if (error) {
        return console.log(error);

    }

    return res.send(document);

}


//*--------Truy xuất tất cả sản phẩm trong cơ sở dữ liệu
exports.findAll = async (req, res) => {

    console.log('');

    const condition = {
        ownerId: req.userId
    };
    const CTGH_MaGH = req.query.ten;

    if (CTGH_MaGH) {
        condition.CTGH_MaGH = { $regex: new RegExp(CTGH_MaGH), $options: "i" };
    }

    const [error, documents] = await handle(
        ChiTietGioHang.find(condition, '-ownerId').sort({ 'CTGH_MaGH': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất chi tiết giỏ hàng với mã ${req.params.CTGH_Ma}`)
        );
    }

    return res.send(documents);
};

exports.findAllByID = async (req, res) => {

    console.log('');

    const condition = {
        ownerId: req.userId
    };
    const CTGH_MaGH = req.params.CTGH_MaGH;

    if (CTGH_MaGH) {
        condition = condition.and({ CTGH_MaGH: CTGH_MaGH });
    }

    const [error, documents] = await handle(
        ChiTietGioHang.find(condition, '-ownerId').sort({ 'CTGH_MaGH': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất chi tiết giỏ hàng với mã ${req.params.CTGH_Ma}`)
        );
    }

    return res.send(documents);
};

//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOne = async (req, res) => {
    const condition = {
        CTGH_Ma: req.params.CTGH_Ma,
    };
    const [error, documents] = await handle(
        ChiTietGioHang.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất chi tiết giỏ hàng!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy chi tiết giỏ hàng")
    }
    return res.send(documents);
};
exports.findOneByMaSach = async (req, res) => {
    const condition = {
        CTGH_MaSach: req.params.MaSach,
        CTGH_MaGH: req.params.MaGH
    };
    const [error, documents] = await handle(
        ChiTietGioHang.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất chi tiết giỏ hàng!")
        );
    }
    if (!documents) {
        return res.send(null)
    }
    return res.send(documents);
};
//*--- Cập nhật thông tin sách thông qua mã sách
exports.update = async (req, res, next) => {

    const condition = {
        CTGH_Ma: req.params.CTGH_Ma
    };

    const [error, document] = await handle(
        ChiTietGioHang.findOneAndUpdate(condition, req.body, {
            $set: {
                'CTGH_NgayCapNhat': req.body.CTGH_NgayCapNhat,
            }
        }, {
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin chi tiết giỏ hàng có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy chi tiết giỏ hàng"));
    }

    return res.send({ message: "Cập nhật thông tin chi tiết giỏ hàng thành công." });
};
exports.updateSoLuong = async (req, res, next) => {

    const condition = {
        CTGH_Ma: req.params.CTGH_Ma
    };
    const [error, document] = await handle(
        ChiTietGioHang.findOneAndUpdate(condition, {
            'CTGH_SoLuong': req.body.CTGH_SoLuong,
            'CTGH_NgayCapNhat': req.body.CTGH_NgayCapNhat,

        }, {
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật sách có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy sách"));
    }

    return res.send({ message: "Cập nhật sách thành công." });
};

//Xóa một sách bằng mã sách
exports.delete = async (req, res) => {
    const condition = {
        CTGH_Ma: req.params.CTGH_Ma
    };

    const [error, document] = await handle(
        ChiTietGioHang.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, `Không xóa được chi tiết giỏ hàng có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa chi tiết giỏ hàng thành công" });
    }

};

