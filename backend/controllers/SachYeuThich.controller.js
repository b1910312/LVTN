const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const SachYeuThich = db.SachYeuThich;


//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const sachyeuthich = new SachYeuThich({
        SYT_MaKH: req.body.SYT_MaKH,
        SYT_MaSach: req.body.SYT_MaSach,
        SYT_NgayTao: req.body.SYT_NgayTao,
    });
    // Save product in the DB
    const [error, document] = await handle(sachyeuthich.save());

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
    const SYT_MaKH = req.query.ten;

    if (SYT_MaKH) {
        condition.SYT_MaKH = { $regex: new RegExp(SYT_MaKH), $options: "i" };
    }

    const [error, documents] = await handle(
        SachYeuThich.find(condition, '-ownerId').sort({ 'SYT_MaKH': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất SachYeuThich với mã ${req.params.SYT_MaKH}`)
        );
    }

    return res.send(documents);
};



//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOne = async (req, res) => {
    const condition = {
        SYT_Ma: req.params.SYT_Ma,
    };
    const [error, documents] = await handle(
        SachYeuThich.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất SachYeuThich!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy SachYeuThich")
    }
    return res.send(documents);
};

//*--- Cập nhật thông tin sách thông qua mã sách
exports.update = async (req, res, next) => {

    const condition = {
        SYT_MaKH: req.params.SYT_MaKH
    };

    const [error, document] = await handle(
        SachYeuThich.findOneAndUpdate(condition, req.body,  {
            $set: {
                'SYT_NgayCapNhat': req.body.SYT_NgayCapNhat,
            }
        },{
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin SachYeuThich có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy SachYeuThich"));
    }

    return res.send({ message: "Cập nhật thông tin SachYeuThich thành công." });
};


//Xóa một sách bằng mã sách
exports.delete = async (req,res) => {    
    const condition = {
        SYT_MaKH: req.params.SYT_MaKH
    };

    const [error, document] = await handle(
        SachYeuThich.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500,`Không xóa được SachYeuThich có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa SachYeuThich thành công" });
    }

};

