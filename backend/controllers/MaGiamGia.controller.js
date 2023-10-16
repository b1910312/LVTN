const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const MaGiamGia = db.MaGiamGia;


//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const magiamgia = new MaGiamGia({
        MGG_MaGiamGia: req.body.MGG_MaGiamGia,
        MGG_TrangThai: req.body.MGG_TrangThai,
        MGG_SoLuong: req.body.MGG_SoLuong,
        MGG_MaUuDai: req.body.MGG_MaUuDai,
        MGG_NgayTao: req.body.MGG_NgayTao,
    });
    // Save product in the DB
    const [error, document] = await handle(magiamgia.save());

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
    const MGG_MaGiamGia = req.query.ten;

    if (MGG_MaGiamGia) {
        condition.MGG_MaGiamGia = { $regex: new RegExp(MGG_MaGiamGia), $options: "i" };
    }

    const [error, documents] = await handle(
        MaGiamGia.find(condition, '-ownerId').sort({ 'MGG_MaGiamGia': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất mã giảm giá với mã ${req.params.MGG_MaGiamGia}`)
        );
    }

    return res.send(documents);
};



//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOne = async (req, res) => {
    const condition = {
        MGG_Ma: req.params.MGG_Ma,
    };
    const [error, documents] = await handle(
        MaGiamGia.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất mã giảm giá!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy mã giảm giá")
    }
    return res.send(documents);
};

//*--- Cập nhật thông tin sách thông qua mã sách
exports.update = async (req, res, next) => {

    const condition = {
        MGG_MaGiamGia: req.params.MGG_MaGiamGia
    };

    const [error, document] = await handle(
        MaGiamGia.findOneAndUpdate(condition, req.body,  {
            $set: {
                'MGG_NgayCapNhat': req.body.MGG_NgayCapNhat,
            }
        },{
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin mã giảm giá có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy mã giảm giá"));
    }

    return res.send({ message: "Cập nhật thông tin mã giảm giá thành công." });
};


//Xóa một sách bằng mã sách
exports.delete = async (req,res) => {    
    const condition = {
        MGG_MaGiamGia: req.params.MGG_MaGiamGia
    };

    const [error, document] = await handle(
        MaGiamGia.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500,`Không xóa được mã giảm giá có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa mã giảm giá thành công" });
    }

};

