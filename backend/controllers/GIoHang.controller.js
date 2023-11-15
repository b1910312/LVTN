const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const GioHang = db.GioHang;


//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const giohang = new GioHang({
        GH_MaGH: req.body.GH_MaGH,
        GH_MaKH: req.body.GH_MaKH,
        GH_NgayTao: req.body.GH_NgayTao,
        GH_NgayCapNhat: req.body.GH_NgayCapNhat,
    });
    // Save product in the DB
    const [error, document] = await handle(giohang.save());

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
    const GH_MaKH = req.query.ten;

    if (GH_MaKH) {
        condition.GH_MaKH = { $regex: new RegExp(GH_MaKH), $options: "i" };
    }

    const [error, documents] = await handle(
        GioHang.find(condition, '-ownerId').sort({ 'GH_MaKH': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất giỏ hảng với mã ${req.params.GH_MaKH}`)
        );
    }

    return res.send(documents);
};



//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOne = async (req, res) => {
    const condition = {
        GH_MaGH: req.params.GH_MaGH,
    };
    const [error, documents] = await handle(
        GioHang.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất giỏ hảng!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy giỏ hảng")
    }
    return res.send(documents);
};
exports.getLastGHMa = async (req, res) => {
    const [error, documents] = await handle(
        GioHang.findOne().sort({ GH_MaGH: -1 })
    );
    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất sách!")
        );
    }
    if (!documents) {
        return res.send("KBGH000")
    }
    return res.send(documents.GH_MaGH);
    // if (!lastRecord) {
    //     console.log('bảng dữ liệu trống'); // Nếu không có bản ghi nào, trả về giá trị mặc định
    // }
    // // Giải mã và tạo mã mới
    // const lastSMa = lastRecord.S_Ma;
    // const numericPart = parseInt(lastSMa.slice(3), 10) + 1;
    // const newSMa = `KBS${numericPart.toString().padStart(3, '0')}`;
    // console.log(newSMa);
};

//*--- Cập nhật thông tin sách thông qua mã sách
exports.update = async (req, res, next) => {

    const condition = {
        GH_MaGH: req.params.GH_MaGH
    };

    const [error, document] = await handle(
        GioHang.findOneAndUpdate(condition, req.body, {
            $set: {
                'GH_NgayCapNhat': req.body.GH_NgayCapNhat,
            }
        }, {
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin giỏ hảng có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy giỏ hảng"));
    }

    return res.send({ message: "Cập nhật thông tin giỏ hảng thành công." });
};


//Xóa một sách bằng mã sách
exports.delete = async (req, res) => {
    const condition = {
        GH_MaGH: req.params.GH_MaGH
    };

    const [error, document] = await handle(
        GioHang.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, `Không xóa được giỏ hảng có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa giỏ hảng thành công" });
    }

};

exports.deletebyMaKH = async (req, res) => {

    const condition = {
        GH_MaKH: req.params.GH_MaKH
    };

    const [error, document] = await handle(
        GioHang.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, `Không xóa được giỏ hảng có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa giỏ hảng thành công" });
    }

};
exports.getGioHangByMaKH = async (req, res) => {

    const GH_MaKH = req.params.GH_MaKH;

    const condition = {
        GH_MaKH: GH_MaKH
    };

    const [error, document] = await handle(GioHang.findOne(condition));

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình lấy giỏ hàng với mã KH ${GH_MaKH}`)
        );
    }

    if (document) {
        return res.send(document.GH_MaGH);
    } else {
        return res.send(null);
    }
};