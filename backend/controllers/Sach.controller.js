const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const Sach = db.Sach;

exports.findAllFavorite = async (req, res) => {
    res.send({ message: "Hello san pham" });
}
//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const sach = new Sach({
        S_Ma: req.body.S_Ma,
        S_Ten: req.body.S_Ten,
        S_SoLuong: req.body.S_SoLuong,
        S_Gia: req.body.S_Gia,
        S_TheLoai: req.body.S_TheLoai,
        S_NgayNhap: req.body.S_NgayNhap,

    });
    // Save product in the DB
    const [error, document] = await handle(sach.save());

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
    const S_Ten = req.query.S_Ma;

    if (S_Ten) {
        condition.S_Ten = { $regex: new RegExp(S_Ten), $options: "i" };
    }

    const [error, documents] = await handle(
        Sach.find(condition, '-ownerId').sort({ 'S_Ma': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất sản phẩm với mã ${req.params.S_Ma}`)
        );
    }

    return res.send(documents);
};



//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOne = async (req, res) => {
    const condition = {
        S_Ma: req.params.S_Ma,
    };
    const [error, documents] = await handle(
        Sach.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất sách!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy sách")
    }
    return res.send(documents);
};

//*--- Cập nhật thông tin sách thông qua mã sách
exports.update = async (req, res, next) => {

    const condition = {
        S_Ma: req.params.S_Ma
    };

    const [error, document] = await handle(
        Sach.findOneAndUpdate(condition, req.body,  {
            $set: {
                'S_NgayCapNhat': req.body.S_NgayCapNhat,
            }
        },{
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin sách có mã id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy sách!"));
    }

    return res.send({ message: "Cập nhật thông tin sách thành công." });
};


//Xóa một sách bằng mã sách
exports.delete = async (req,res) => {    
    const condition = {
        S_Ma: req.params.S_Ma
    };

    const [error, document] = await handle(
        Sach.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500,`Không xóa được sách có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa sách thành công" });
    }

};

