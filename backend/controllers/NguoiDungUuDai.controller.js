const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const NguoiDungUuDai = db.NguoiDungUuDai;


//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const nguoidunguudai = new NguoiDungUuDai({
        NDUD_MaND: req.body.NDUD_MaND,
        NDUD_MaUuDai: req.body.NDUD_MaUuDai,
        NDUD_NgayTao: req.body.NDUD_NgayTao,
    });
    // Save product in the DB
    const [error, document] = await handle(nguoidunguudai.save());

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
    const NDUD_MaND = req.query.ten;

    if (NDUD_MaND) {
        condition.NDUD_MaND = { $regex: new RegExp(NDUD_MaND), $options: "i" };
    }

    const [error, documents] = await handle(
        NguoiDungUuDai.find(condition, '-ownerId').sort({ 'NDUD_MaND': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất người dùng ưu đãi với mã ${req.params.NDUD_MaND}`)
        );
    }

    return res.send(documents);
};



//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOne = async (req, res) => {
    const condition = {
        NDUD_Ma: req.params.NDUD_Ma,
    };
    const [error, documents] = await handle(
        NguoiDungUuDai.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất người dùng ưu đãi!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy người dùng ưu đãi")
    }
    return res.send(documents);
};

//*--- Cập nhật thông tin sách thông qua mã sách
exports.update = async (req, res, next) => {

    const condition = {
        NDUD_MaND: req.params.NDUD_MaND
    };

    const [error, document] = await handle(
        NguoiDungUuDai.findOneAndUpdate(condition, req.body,  {
            $set: {
                'NDUD_NgayCapNhat': req.body.NDUD_NgayCapNhat,
            }
        },{
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin người dùng ưu đãi có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy người dùng ưu đãi"));
    }

    return res.send({ message: "Cập nhật thông tin người dùng ưu đãi thành công." });
};


//Xóa một sách bằng mã sách
exports.delete = async (req,res) => {    
    const condition = {
        NDUD_MaND: req.params.NDUD_MaND
    };

    const [error, document] = await handle(
        NguoiDungUuDai.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500,`Không xóa được người dùng ưu đãi có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa người dùng ưu đãi thành công" });
    }

};

