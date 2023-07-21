const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const DanhGia = db.DanhGia;
exports.findAllFavorite = async (req, res) => {
    res.send({ message: "Hello san pham" });
}
//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const danhgia = new DanhGia({
        DG_Ma: req.body.DG_Ma,
        DG_MaKH: req.body.DG_MaKH,
        DG_MaSach: req.body.DG_MaSach,
        DG_SoSao: req.body.DG_SoSao,
        DG_NgayTao: req.body.DG_NgayTao,
    });
    // Save product in the DB
    const [error, document] = await handle(danhgia.save());

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
    const DG_MaKH = req.query.ten;

    if (DG_MaKH) {
        condition.DG_MaKH = { $regex: new RegExp(DG_MaKH), $options: "i" };
    }

    const [error, documents] = await handle(
        DanhGia.find(condition, '-ownerId').sort({ 'DG_MaKH': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất đánh giá với mã ${req.params.DG_Ma}`)
        );
    }

    return res.send(documents);
};



//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOne = async (req, res) => {
    const condition = {
        DG_Ma: req.params.DG_Ma,
    };
    const [error, documents] = await handle(
        DanhGia.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất đánh giá!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy đánh giá")
    }
    return res.send(documents);
};

//*--- Cập nhật thông tin sách thông qua mã sách
exports.update = async (req, res, next) => {

    const condition = {
        DG_Ma: req.params.DG_Ma
    };

    const [error, document] = await handle(
        DanhGia.findOneAndUpdate(condition, req.body,  {
            $set: {
                'DG_NgayCapNhat': req.body.DG_NgayCapNhat,
            }
        },{
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin đánh giá có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy đánh giá"));
    }

    return res.send({ message: "Cập nhật thông tin đánh giá thành công." });
};


//Xóa một sách bằng mã sách
exports.delete = async (req,res) => {    
    const condition = {
        DG_Ma: req.params.DG_Ma
    };

    const [error, document] = await handle(
        DanhGia.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500,`Không xóa được đánh giá có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa đánh giá thành công" });
    }

};

