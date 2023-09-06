const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const DiaChi = db.DiaChi;


//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const diachi = new DiaChi({
        DC_MaDT: req.body.DC_MaDT,
        DC_DiaChi: req.body.DC_DiaChi,
        DC_PhuongXa: req.body.DC_PhuongXa,
        DC_QuanHuyen: req.body.DC_QuanHuyen,
        DC_TinhTP: req.body.DC_TinhTP,
        DC_NgayTao: req.body.DC_NgayTao,
    });
    // Save product in the DB
    const [error, document] = await handle(diachi.save());

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
    const DC_MaDT = req.query.ten;

    if (DC_MaDT) {
        condition.DC_MaDT = { $regex: new RegExp(DC_MaDT), $options: "i" };
    }

    const [error, documents] = await handle(
        DiaChi.find(condition, '-ownerId').sort({ 'DC_MaDT': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất địa chỉ với mã ${req.params.DC_MaDT}`)
        );
    }

    return res.send(documents);
};



//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOne = async (req, res) => {
    const condition = {
        DC_MaDT: req.params.DC_MaDT,
    };
    const [error, documents] = await handle(
        DiaChi.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất địa chỉ!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy địa chỉ")
    }
    return res.send(documents);
};

//*--- Cập nhật thông tin sách thông qua mã sách
exports.update = async (req, res, next) => {

    const condition = {
        DC_MaDT: req.params.DC_MaDT
    };

    const [error, document] = await handle(
        DiaChi.findOneAndUpdate(condition, req.body,  {
            $set: {
                'DC_NgayCapNhat': req.body.DC_NgayCapNhat,
            }
        },{
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin địa chỉ có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy địa chỉ"));
    }

    return res.send({ message: "Cập nhật thông tin địa chỉ thành công." });
};


//Xóa một sách bằng mã sách
exports.delete = async (req,res) => {    
    const condition = {
        DC_MaDT: req.params.DC_MaDT
    };

    const [error, document] = await handle(
        DiaChi.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500,`Không xóa được địa chỉ có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa địa chỉ thành công" });
    }

};

