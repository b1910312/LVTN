const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const TinNhan = db.TinNhan;


//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const tinnhan = new TinNhan({
        TN_Ma: req.body.TN_Ma,
        TN_MaCTC: req.body.TN_MaCTC,
        TN_MaND: req.body.TN_MaND,
        TN_NoiDung: req.body.TN_NoiDung,
        TN_NgayTao: req.body.TN_NgayTao,
    });
    // Save product in the DB
    const [error, document] = await handle(tinnhan.save());

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
    const TN_Ma = req.query.ten;

    if (TN_Ma) {
        condition.TN_Ma = { $regex: new RegExp(TN_Ma), $options: "i" };
    }

    const [error, documents] = await handle(
        TinNhan.find(condition, '-ownerId').sort({ 'TN_Ma': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất ảnh đại diện với mã ${req.params.TN_Ma}`)
        );
    }

    return res.send(documents);
};



//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOne = async (req, res) => {
    const condition = {
        AVT_Ma: req.params.AVT_Ma,
    };
    const [error, documents] = await handle(
        TinNhan.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất ảnh đại diện!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy ảnh đại diện")
    }
    return res.send(documents);
};

//Xóa một sách bằng mã sách
exports.delete = async (req,res) => {    
    const condition = {
        TN_Ma: req.params.TN_Ma
    };

    const [error, document] = await handle(
        TinNhan.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500,`Không xóa được ảnh đại diện có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa ảnh đại diện thành công" });
    }

};

