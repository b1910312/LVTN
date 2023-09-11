const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const UuDai = db.UuDai;


//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const uudai = new UuDai({
        UD_Ma: req.body.UD_Ma,
        UD_Ten: req.body.UD_Ten,
        UD_LoaiUD: req.body.UD_LoaiUD,
        UD_GiaTriUuDai: req.body.UD_GiaTriUuDai,
        UD_NgayBatDau: req.body.UD_NgayBatDau,
        UD_NgayKetThuc: req.body.UD_NgayKetThuc,
        UD_NgayTao: req.body.UD_NgayTao,
    });
    // Save product in the DB
    const [error, document] = await handle(uudai.save());

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
    const UD_Ma = req.query.ten;

    if (UD_Ma) {
        condition.UD_Ma = { $regex: new RegExp(UD_Ma), $options: "i" };
    }

    const [error, documents] = await handle(
        UuDai.find(condition, '-ownerId').sort({ 'UD_Ma': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất ưu đãi với mã ${req.params.UD_Ma}`)
        );
    }

    return res.send(documents);
};



//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOne = async (req, res) => {
    const condition = {
        UD_Ma: req.params.UD_Ma,
    };
    const [error, documents] = await handle(
        UuDai.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất ưu đãi!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy ưu đãi")
    }
    return res.send(documents);
};

//*--- Cập nhật thông tin sách thông qua mã sách
exports.update = async (req, res, next) => {

    const condition = {
        UD_Ma: req.params.UD_Ma
    };

    const [error, document] = await handle(
        UuDai.findOneAndUpdate(condition, req.body,  {
            $set: {
                'UD_NgayCapNhat': req.body.UD_NgayCapNhat,
            }
        },{
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin ưu đãi có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy ưu đãi"));
    }

    return res.send({ message: "Cập nhật thông tin ưu đãi thành công." });
};


//Xóa một sách bằng mã sách
exports.delete = async (req,res) => {    
    const condition = {
        UD_Ma: req.params.UD_Ma
    };

    const [error, document] = await handle(
        UuDai.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500,`Không xóa được ưu đãi có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa ưu đãi thành công" });
    }

};

