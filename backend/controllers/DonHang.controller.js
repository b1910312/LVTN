const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const DonHang = db.DonHang;


//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const donhang = new DonHang({
        DH_Ma: req.body.DH_Ma,
        DH_Ho: req.body.DH_Ho,
        DH_Ten: req.body.DH_Ten,
        DH_SoDienThoai: req.body.DH_SoDienThoai,
        DH_DiaChi: req.body.DH_DiaChi,
        DH_PhuongXa: req.body.DH_PhuongXa,
        DH_QuanHuyen: req.body.DH_QuanHuyen,
        DH_TinhTP: req.body.DH_TinhTP,
        DH_NgayTao: req.body.DH_NgayTao,
    });
    // Save product in the DB
    const [error, document] = await handle(donhang.save());

    if (error) {
        return console.log(error);

    }

    return res.send(document);

}
exports.updateTrangThai = async (req, res, next) => {

    const condition = {
        DH_Ma: req.params.DH_Ma
    };

    const [error, document] = await handle(
        DonHang.findOneAndUpdate(condition, req.body,  {
            $set: {
                'DH_TrangThai': req.body.DH_TrangThai,
                'DH_NgayCapNhat': req.body.DH_NgayCapNhat,
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

//*--------Truy xuất tất cả sản phẩm trong cơ sở dữ liệu
exports.findAll = async (req, res) => {

    console.log('');

    const condition = {
        ownerId: req.userId
    };
    const DH_Email = req.query.ten;

    if (DH_Email) {
        condition.DH_Email = { $regex: new RegExp(DH_Email), $options: "i" };
    }

    const [error, documents] = await handle(
        DonHang.find(condition, '-ownerId').sort({ 'DH_Email': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất đơn hàng với mã ${req.params.DH_Ma}`)
        );
    }

    return res.send(documents);
};
exports.findAllUnDone = async (req, res) => {

    console.log('');

    const condition = {
        ownerId: req.userId,
        DH_TrangThai: { $ne: 5 }
    };
    const DH_Email = req.query.ten;

    if (DH_Email) {
        condition.DH_Email = { $regex: new RegExp(DH_Email), $options: "i" };
    }

    const [error, documents] = await handle(
        DonHang.find(condition, '-ownerId').sort({ 'DH_Email': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất đơn hàng với mã ${req.params.DH_Ma}`)
        );
    }

    return res.send(documents);
};
exports.findAllDone = async (req, res) => {

    console.log('');

    const condition = {
        ownerId: req.userId,
        DH_TrangThai: 5
    };
    const DH_Email = req.query.ten;

    if (DH_Email) {
        condition.DH_Email = { $regex: new RegExp(DH_Email), $options: "i" };
    }

    const [error, documents] = await handle(
        DonHang.find(condition, '-ownerId').sort({ 'DH_Email': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất đơn hàng với mã ${req.params.DH_Ma}`)
        );
    }

    return res.send(documents);
};

//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOne = async (req, res) => {
    const condition = {
        DH_Ma: req.params.DH_Ma,
    };
    const [error, documents] = await handle(
        DonHang.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất đơn hàng!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy đơn hàng")
    }
    return res.send(documents);
};

//*--- Cập nhật thông tin sách thông qua mã sách
exports.update = async (req, res, next) => {

    const condition = {
        DH_Ma: req.params.DH_Ma
    };

    const [error, document] = await handle(
        DonHang.findOneAndUpdate(condition, req.body,  {
            $set: {
                'DH_TrangThai': req.body.DH_TrangThai,
                'DH_NgayCapNhat': req.body.DH_NgayCapNhat,
            }
        },{
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin đơn hàng có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy đơn hàng"));
    }

    return res.send({ message: "Cập nhật thông tin đơn hàng thành công." });
};


//Xóa một sách bằng mã sách
exports.delete = async (req,res) => {    
    const condition = {
        DH_Ma: req.params.DH_Ma
    };

    const [error, document] = await handle(
        DonHang.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500,`Không xóa được đơn hàng có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa đơn hàng thành công" });
    }

};

