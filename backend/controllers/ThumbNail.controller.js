const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const ThumbNail = db.ThumbNail;


//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const thumbnail = new ThumbNail({
        TB_MaSach: req.body.TB_MaSach,
        TB_URL: req.body.TB_URL,
        TB_NgayTao: req.body.TB_NgayTao,
    });
    // Save product in the DB
    const [error, document] = await handle(ThumbNail.save());

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
    const TB_MaSach = req.query.ten;

    if (TB_MaSach) {
        condition.TB_MaSach = { $regex: new RegExp(TB_MaSach), $options: "i" };
    }

    const [error, documents] = await handle(
        ThumbNail.find(condition, '-ownerId').sort({ 'TB_MaSach': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất ThumbNail với mã ${req.params.TB_MaSach}`)
        );
    }

    return res.send(documents);
};



//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOne = async (req, res) => {
    const condition = {
        TB_MaSach: req.params.TB_MaSach,
    };
    const [error, documents] = await handle(
        ThumbNail.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất Thumbnail!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy Thumbnail")
    }
    return res.send(documents);
};

//*--- Cập nhật thông tin sách thông qua mã sách
exports.update = async (req, res, next) => {

    const condition = {
        TB_MaSach: req.params.TB_MaSach
    };

    const [error, document] = await handle(
        ThumbNail.findOneAndUpdate(condition, req.body,  {
            $set: {
                'TB_NgayCapNhat': req.body.TB_NgayCapNhat,
            }
        },{
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin Thumbnail có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy Thumbnail"));
    }

    return res.send({ message: "Cập nhật thông tin Thumbnail thành công." });
};


//Xóa một sách bằng mã sách
exports.delete = async (req,res) => {    
    const condition = {
        TB_MaSach: req.params.TB_MaSach
    };

    const [error, document] = await handle(
        ThumbNail.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500,`Không xóa được Thumbnail có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa Thumbnail thành công" });
    }

};

