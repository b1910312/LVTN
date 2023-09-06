const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const ChiTietDonHoanTra = db.ChiTietDonHoanTra;

//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const chitietdonhoantra = new ChiTietDonHoanTra({
        CTDHT_Ma: req.body.CTDHT_Ma,
        CTDHT_MaDH: req.body.CTDHT_MaDH,
        CTDHT_TenSach: req.body.CTDHT_TenSach,
        CTDHT_SoLuong: req.body.CTDHT_SoLuong,
        CTDHT_Gia: req.body.CTDHT_Gia,
        CTDHT_ThanhTien: req.body.CTDHT_ThanhTien,
        CTDHT_NgayTao: req.body.CTDHT_NgayTao,
    });
    // Save product in the DB
    const [error, document] = await handle(chitietdonhoantra.save());

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
    const CTDHT_MaDH = req.query.ten;

    if (CTDHT_MaDH) {
        condition.CTDHT_MaDH = { $regex: new RegExp(CTDHT_MaDH), $options: "i" };
    }

    const [error, documents] = await handle(
        ChiTietDonHoanTra.find(condition, '-ownerId').sort({ 'CTDHT_MaDH': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất chi tiết đơn hàng với mã ${req.params.CTDHT_Ma}`)
        );
    }

    return res.send(documents);
};



//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOne = async (req, res) => {
    const condition = {
        CTDHT_Ma: req.params.CTDHT_Ma,
    };
    const [error, documents] = await handle(
        ChiTietDonHoanTra.findOne(condition)
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
        CTDHT_Ma: req.params.CTDHT_Ma
    };

    const [error, document] = await handle(
        ChiTietDonHoanTra.findOneAndUpdate(condition, req.body,  {
            $set: {
                'CTDHT_NgayCapNhat': req.body.CTDHT_NgayCapNhat,
            }
        },{
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
exports.delete = async (req,res) => {    
    const condition = {
        CTDHT_Ma: req.params.CTDHT_Ma
    };

    const [error, document] = await handle(
        ChiTietDonHoanTra.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500,`Không xóa được chi tiết đơn hàng có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa chi tiết đơn hàng thành công" });
    }

};

