const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const SachUuDai = db.SachUuDai;


//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const sachuudai = new SachUuDai({
        SUD_MaSach: req.body.SUD_MaSach,
        SUD_MaUuDai: req.body.SUD_MaUuDai,
        SUD_NgayTao: req.body.SUD_NgayTao,
    });
    // Save product in the DB
    const [error, document] = await handle(sachuudai.save());

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
    const SUD_MaSach = req.query.ten;

    if (SUD_MaSach) {
        condition.SUD_MaSach = { $regex: new RegExp(SUD_MaSach), $options: "i" };
    }

    const [error, documents] = await handle(
        SachUuDai.find(condition, '-ownerId').sort({ 'SUD_MaSach': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất ảnh đại diện với mã ${req.params.SUD_MaSach}`)
        );
    }

    return res.send(documents);
};



//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOne = async (req, res) => {
    const condition = {
        SUD_Ma: req.params.SUD_Ma,
    };
    const [error, documents] = await handle(
        SachUuDai.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất ảnh đại diện!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy ảnh đại diện")
    }
    return res.send(documents);
};

//*--- Cập nhật thông tin sách thông qua mã sách
exports.update = async (req, res, next) => {

    const condition = {
        SUD_MaSach: req.params.SUD_MaSach
    };

    const [error, document] = await handle(
        SachUuDai.findOneAndUpdate(condition, req.body,  {
            $set: {
                'SUD_NgayCapNhat': req.body.SUD_NgayCapNhat,
            }
        },{
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin ảnh đại diện có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy ảnh đại diện"));
    }

    return res.send({ message: "Cập nhật thông tin ảnh đại diện thành công." });
};


//Xóa một sách bằng mã sách
exports.delete = async (req,res) => {    
    const condition = {
        SUD_MaSach: req.params.SUD_MaSach
    };

    const [error, document] = await handle(
        SachUuDai.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500,`Không xóa được ảnh đại diện có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa ảnh đại diện thành công" });
    }

};

