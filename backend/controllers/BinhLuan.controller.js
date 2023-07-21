const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const BinhLuan = db.BinhLuan;
exports.findAllFavorite = async (req, res) => {
    res.send({ message: "Hello san pham" });
}
//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const binhluan = new BinhLuan({
        BL_Ma: req.body.BL_Ma,
        BL_MaKH: req.body.BL_MaKH,
        BL_MaSach: req.body.BL_MaSach,
        BL_NoiDung: req.body.BL_NoiDung,
        BL_Ten: req.body.BL_Ten,
        BL_NgayTao: req.body.BL_NgayTao,
    });
    // Save product in the DB
    const [error, document] = await handle(binhluan.save());

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
    const BL_MaKH = req.query.ten;

    if (BL_MaKH) {
        condition.BL_MaKH = { $regex: new RegExp(BL_MaKH), $options: "i" };
    }

    const [error, documents] = await handle(
        BinhLuan.find(condition, '-ownerId').sort({ 'BL_MaKH': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất bình luận với mã ${req.params.BL_Ma}`)
        );
    }

    return res.send(documents);
};



//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOne = async (req, res) => {
    const condition = {
        BL_Ma: req.params.BL_Ma,
    };
    const [error, documents] = await handle(
        BinhLuan.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất bình luận!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy bình luận")
    }
    return res.send(documents);
};

//*--- Cập nhật thông tin sách thông qua mã sách
exports.update = async (req, res, next) => {

    const condition = {
        BL_Ma: req.params.BL_Ma
    };

    const [error, document] = await handle(
        BinhLuan.findOneAndUpdate(condition, req.body,  {
            $set: {
                'BL_NgayCapNhat': req.body.BL_NgayCapNhat,
            }
        },{
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin bình luận có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy bình luận"));
    }

    return res.send({ message: "Cập nhật thông tin bình luận thành công." });
};


//Xóa một sách bằng mã sách
exports.delete = async (req,res) => {    
    const condition = {
        BL_Ma: req.params.BL_Ma
    };

    const [error, document] = await handle(
        BinhLuan.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500,`Không xóa được bình luận có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa bình luận thành công" });
    }

};

