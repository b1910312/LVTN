const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const GioHang = db.GioHang;


//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const giohang = new GioHang({
        GH_Ma: req.body.GH_Ma,
        GH_TongCong: req.body.GH_TongCong,
        GH_TongSoLuong: req.body.GH_TongSoLuong,
        GH_MaKH: req.body.GH_MaKH,
        GH_NgayTao: req.body.GH_NgayTao,
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
        GioHang.find(condition, '-ownerId').sort({ 'GH_Ma': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất giỏ hảng với mã ${req.params.GH_Ma}`)
        );
    }

    return res.send(documents);
};



//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOne = async (req, res) => {
    const condition = {
        GH_Ma: req.params.GH_Ma,
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

//*--- Cập nhật thông tin sách thông qua mã sách
exports.update = async (req, res, next) => {

    const condition = {
        GH_Ma: req.params.GH_Ma
    };

    const [error, document] = await handle(
        GioHang.findOneAndUpdate(condition, req.body,  {
            $set: {
                'GH_NgayCapNhat': req.body.GH_NgayCapNhat,
            }
        },{
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
exports.delete = async (req,res) => {    
    const condition = {
        GH_Ma: req.params.GH_Ma
    };

    const [error, document] = await handle(
        GioHang.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500,`Không xóa được giỏ hảng có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa giỏ hảng thành công" });
    }

};

