const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const ChiTietDonHang = db.ChiTietDonHang;

//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const chitietdonhang = new ChiTietDonHang({
        CTDH_Ma: req.body.CTDH_Ma,
        CTDH_MaDH: req.body.CTDH_MaDH,
        CTDH_MaSach: req.body.CTDH_MaSach,
        CTDH_TenSach: req.body.CTDH_TenSach,
        CTDH_SoLuong: req.body.CTDH_SoLuong,
        CTDH_Gia: req.body.CTDH_Gia,
        CTDH_ThanhTien: req.body.CTDH_ThanhTien,
        CTDH_NgayTao: req.body.CTDH_NgayTao,
    });
    // Save product in the DB
    const [error, document] = await handle(chitietdonhang.save());

    if (error) {
        return console.log(error);

    }

    return res.send(document);

}

exports.getLastCTDHMa = async (req, res) => {
    const [error, documents] = await handle(
        ChiTietDonHang.findOne().sort({ CTDH_Ma: -1 })
    );
    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất sách!")
        );
    }
    if (!documents) {
        return res.send("KBCTDH000")
    }
    return res.send(documents.CTDH_Ma);
    // if (!lastRecord) {
    //     console.log('bảng dữ liệu trống'); // Nếu không có bản ghi nào, trả về giá trị mặc định
    // }
    // // Giải mã và tạo mã mới
    // const lastSMa = lastRecord.S_Ma;
    // const numericPart = parseInt(lastSMa.slice(3), 10) + 1;
    // const newSMa = `KBS${numericPart.toString().padStart(3, '0')}`;
    // console.log(newSMa);
};
//*--------Truy xuất tất cả sản phẩm trong cơ sở dữ liệu
exports.findAll = async (req, res) => {

    console.log('');

    const condition = {
        ownerId: req.userId
    };
    const CTDH_MaDH = req.query.ten;

    if (CTDH_MaDH) {
        condition.CTDH_MaDH = { $regex: new RegExp(CTDH_MaDH), $options: "i" };
    }

    const [error, documents] = await handle(
        ChiTietDonHang.find(condition, '-ownerId').sort({ 'CTDH_MaDH': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất chi tiết đơn hàng với mã ${req.params.CTDH_Ma}`)
        );
    }

    return res.send(documents);
};


//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOne = async (req, res) => {
    const condition = {
        CTDH_Ma: req.params.CTDH_Ma,
    };
    const [error, documents] = await handle(
        ChiTietDonHang.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất chi tiết đơn hàng!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy chi tiết đơn hàng")
    }
    return res.send(documents);
};
//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOneDH = async (req, res) => {
    const condition = {
        CTDH_MaDH: req.params.CTDH_MaDH,
    };
    const [error, documents] = await handle(
        ChiTietDonHang.find(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất chi tiết đơn hàng!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy chi tiết đơn hàng")
    }
    return res.send(documents);
};

//*--- Cập nhật thông tin sách thông qua mã sách
exports.update = async (req, res, next) => {

    const condition = {
        CTDH_Ma: req.params.CTDH_Ma
    };

    const [error, document] = await handle(
        ChiTietDonHang.findOneAndUpdate(condition, req.body, {
            $set: {
                'CTDH_NgayCapNhat': req.body.CTDH_NgayCapNhat,
            }
        }, {
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin chi tiết đơn hàng có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy chi tiết đơn hàng"));
    }

    return res.send({ message: "Cập nhật thông tin chi tiết đơn hàng thành công." });
};


//Xóa một sách bằng mã sách
exports.delete = async (req, res) => {
    const condition = {
        CTDH_Ma: req.params.CTDH_Ma
    };

    const [error, document] = await handle(
        ChiTietDonHang.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, `Không xóa được chi tiết đơn hàng có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa chi tiết đơn hàng thành công" });
    }

};

exports.deleteByDHMa = async (req, res) => {
    const condition = {
        CTDH_MaDH: req.params.DH_Ma
    };

    const [error, document] = await handle(
        ChiTietDonHang.deleteMany(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, `Không xóa được chi tiết đơn hàng có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa chi tiết đơn hàng thành công" });
    }

};
