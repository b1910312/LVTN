const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const LichSuTimKiem = db.LichSuTimKiem;


//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const lichsutimkiem = new LichSuTimKiem({
        LSTK_MaND: req.body.LSTK_MaND,
        LSTK_TuKhoa: req.body.LSTK_TuKhoa,
        LSTK_NgayTao: req.body.LSTK_NgayTao,
    });
    // Save product in the DB
    const [error, document] = await handle(lichsutimkiem.save());

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
    const LSTK_MaND = req.query.ten;

    if (LSTK_MaND) {
        condition.LSTK_MaND = { $regex: new RegExp(LSTK_MaND), $options: "i" };
    }

    const [error, documents] = await handle(
        LichSuTimKiem.find(condition, '-ownerId').sort({ 'LSTK_MaND': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất lịch sử tìm kiếm với mã ${req.params.LSTK_MaND}`)
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
        LichSuTimKiem.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất lịch sử tìm kiếm!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy lịch sử tìm kiếm")
    }
    return res.send(documents);
};

//Xóa một sách bằng mã sách
exports.delete = async (req,res) => {    
    const condition = {
        LSTK_MaND: req.params.LSTK_MaND
    };

    const [error, document] = await handle(
        LichSuTimKiem.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500,`Không xóa được lịch sử tìm kiếm có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa lịch sử tìm kiếm thành công" });
    }

};

