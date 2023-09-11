const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const ThongTinCuaHang = db.ThongTinCuaHang;


exports.create = async (req, res) => {
    // Create a product
    const thongtincuahang = new ThongTinCuaHang({
        MST: req.body.MST,
        TenCuaHang: req.body.TenCuaHang,
        SDT: req.body.SDT,
        Email: req.body.TenCuaHang,
        ngayTao: req.body.ngayTao,
    });
    // Save product in the DB
    const [error, document] = await handle(thongtincuahang.save());

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
    const MST = req.query.MST;

    if (MST) {
        condition.MST = { $regex: new RegExp(MST), $options: "i" };
    }

    const [error, documents] = await handle(
        ThongTinCuaHang.find(condition, '-ownerId').sort({ 'MST': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất thông tin cửa hàng với mã ${req.params.MST}`)
        );
    }

    return res.send(documents);
};

//*--- Cập nhật thông tin sách thông qua mã sách
exports.update = async (req, res, next) => {
    const condition = {
        MST: req.params.MST
    };

    const [error, document] = await handle(
        ThongTinCuaHang.findOneAndUpdate(condition, req.body,  {
            $set: {
                'AVT_NgayCapNhat': req.body.AVT_NgayCapNhat,
            }
        },{
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin thông tin cửa hàng có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy thông tin cửa hàng"));
    }

    return res.send({ message: "Cập nhật thông tin thông tin cửa hàng thành công." });
};


//Xóa một sách bằng mã sách
exports.delete = async (req,res) => {    
    const condition = {
        MST: req.params.MST
    };

    const [error, document] = await handle(
        ThongTinCuaHang.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500,`Không xóa được thông tin cửa hàng có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa thông tin cửa hàng thành công" });
    }

};

