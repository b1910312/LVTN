const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const SachMoi = db.SachMoi;


//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const sachmoi = new SachMoi({
        SM_MaSach: req.body.SM_MaSach,
        SM_NgayTao: req.body.SM_NgayTao,
    });
    // Save product in the DB
    const [error, document] = await handle(sachmoi.save());

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
    const SM_MaSach = req.query.ten;

    if (SM_MaSach) {
        condition.SM_MaSach = { $regex: new RegExp(SM_MaSach), $options: "i" };
    }

    const [error, documents] = await handle(
        SachMoi.find(condition, '-ownerId').sort({ 'SM_MaSach': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất SachMoi với mã ${req.params.SM_MaSach}`)
        );
    }

    return res.send(documents);
};



//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOne = async (req, res) => {
    const condition = {
        SM_Ma: req.params.SM_Ma,
    };
    const [error, documents] = await handle(
        SachMoi.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất SachMoi!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy SachMoi")
    }
    return res.send(documents);
};

//*--- Cập nhật thông tin sách thông qua mã sách
exports.update = async (req, res, next) => {

    const condition = {
        SM_MaSach: req.params.SM_MaSach
    };

    const [error, document] = await handle(
        SachMoi.findOneAndUpdate(condition, req.body,  {
            $set: {
                'SM_NgayCapNhat': req.body.SM_NgayCapNhat,
            }
        },{
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin SachMoi có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy SachMoi"));
    }

    return res.send({ message: "Cập nhật thông tin SachMoi thành công." });
};


//Xóa một sách bằng mã sách
exports.delete = async (req,res) => {    
    const condition = {
        SM_MaSach: req.params.SM_MaSach
    };

    const [error, document] = await handle(
        SachMoi.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500,`Không xóa được SachMoi có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa SachMoi thành công" });
    }

};

