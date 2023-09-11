const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const Banner = db.Banner;


//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const banner = new Banner({
        BN_MaSach: req.body.BN_MaSach,
        BN_NgayTao: req.body.BN_NgayTao,
    });
    // Save product in the DB
    const [error, document] = await handle(banner.save());

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
    const BN_MaSach = req.query.ten;

    if (BN_MaSach) {
        condition.BN_MaSach = { $regex: new RegExp(BN_MaSach), $options: "i" };
    }

    const [error, documents] = await handle(
        Banner.find(condition, '-ownerId').sort({ 'BN_MaSach': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất banner với mã ${req.params.BN_MaSach}`)
        );
    }

    return res.send(documents);
};



//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOne = async (req, res) => {
    const condition = {
        BN_Ma: req.params.BN_Ma,
    };
    const [error, documents] = await handle(
        Banner.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất banner!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy banner")
    }
    return res.send(documents);
};

//*--- Cập nhật thông tin sách thông qua mã sách
exports.update = async (req, res, next) => {

    const condition = {
        BN_MaSach: req.params.BN_MaSach
    };

    const [error, document] = await handle(
        Banner.findOneAndUpdate(condition, req.body,  {
            $set: {
                'BN_NgayCapNhat': req.body.BN_NgayCapNhat,
            }
        },{
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin banner có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy banner"));
    }

    return res.send({ message: "Cập nhật thông tin banner thành công." });
};


//Xóa một sách bằng mã sách
exports.delete = async (req,res) => {    
    const condition = {
        BN_MaSach: req.params.BN_MaSach
    };

    const [error, document] = await handle(
        Banner.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500,`Không xóa được banner có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa banner thành công" });
    }

};

