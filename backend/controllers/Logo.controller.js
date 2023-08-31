const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const Logo = db.Logo;


//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const logo = new Logo({
        LG_MaNXB: req.body.LG_MaNXB,
        LG_URL: req.body.LG_URL,
        LG_NgayTao: req.body.LG_NgayTao,
    });
    // Save product in the DB
    const [error, document] = await handle(logo.save());

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
    const LG_MaNXB = req.query.ten;

    if (LG_MaNXB) {
        condition.LG_MaNXB = { $regex: new RegExp(LG_MaNXB), $options: "i" };
    }

    const [error, documents] = await handle(
        Logo.find(condition, '-ownerId').sort({ 'LG_MaNXB': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất logo với mã ${req.params.LG_MaNXB}`)
        );
    }

    return res.send(documents);
};



//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOne = async (req, res) => {
    const condition = {
        LG_MaNXB: req.params.LG_MaNXB,
    };
    const [error, documents] = await handle(
        Logo.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất logo!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy logo")
    }
    return res.send(documents);
};

//*--- Cập nhật thông tin sách thông qua mã sách
exports.update = async (req, res, next) => {

    const condition = {
        LG_MaNXB: req.params.LG_MaNXB
    };

    const [error, document] = await handle(
        Logo.findOneAndUpdate(condition, req.body,  {
            $set: {
                'LG_NgayCapNhat': req.body.LG_NgayCapNhat,
            }
        },{
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin logo có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy logo"));
    }

    return res.send({ message: "Cập nhật thông tin logo thành công." });
};


//Xóa một sách bằng mã sách
exports.delete = async (req,res) => {    
    const condition = {
        LG_MaNXB: req.params.LG_MaNXB
    };

    const [error, document] = await handle(
        Logo.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500,`Không xóa được logo có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa logo thành công" });
    }

};

