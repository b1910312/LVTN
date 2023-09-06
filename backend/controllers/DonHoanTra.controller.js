const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const DonHoanTra = db.DonHoanTra;


//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const donhoantra = new DonHoanTra({
        DHT_Ma: req.body.DHT_Ma,
        DHT_Ho: req.body.DHT_Ho,
        DHT_Ten: req.body.DHT_Ten,
        DHT_SoDienThoai: req.body.DHT_SoDienThoai,
        DHT_DiaChi: req.body.DHT_DiaChi,
        DHT_PhuongXa: req.body.DHT_PhuongXa,
        DHT_QuanHuyen: req.body.DHT_QuanHuyen,
        DHT_TinhTP: req.body.DHT_TinhTP,
        DHT_NgayTao: req.body.DHT_NgayTao,
    });
    // Save product in the DB
    const [error, document] = await handle(donhoantra.save());

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
    const DHT_Email = req.query.ten;

    if (DHT_Email) {
        condition.DHT_Email = { $regex: new RegExp(DHT_Email), $options: "i" };
    }

    const [error, documents] = await handle(
        DonHoanTra.find(condition, '-ownerId').sort({ 'DHT_Email': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất đơn hàng với mã ${req.params.DHT_Ma}`)
        );
    }

    return res.send(documents);
};



//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOne = async (req, res) => {
    const condition = {
        DHT_Ma: req.params.DHT_Ma,
    };
    const [error, documents] = await handle(
        DonHoanTra.findOne(condition)
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
        DHT_Ma: req.params.DHT_Ma
    };

    const [error, document] = await handle(
        DonHoanTra.findOneAndUpdate(condition, req.body,  {
            $set: {
                'DHT_TrangThai': req.body.DHT_TrangThai,
                'DHT_NgayCapNhat': req.body.DHT_NgayCapNhat,
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
        DHT_Ma: req.params.DHT_Ma
    };

    const [error, document] = await handle(
        DonHoanTra.deleteOne(condition)
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

