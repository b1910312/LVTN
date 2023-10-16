const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const LoaiUuDai = db.LoaiUuDai;


//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const loaiuudai = new LoaiUuDai({
        LUD_Ma: req.body.LUD_Ma,
        LUD_Ten: req.body.LUD_Ten,
        LUD_NgayTao: req.body.LUD_NgayTao,
    });
    // Save product in the DB
    const [error, document] = await handle(loaiuudai.save());

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
    const LUD_Ma = req.query.ten;

    if (LUD_Ma) {
        condition.LUD_Ma = { $regex: new RegExp(LUD_Ma), $options: "i" };
    }

    const [error, documents] = await handle(
        LoaiUuDai.find(condition, '-ownerId').sort({ 'LUD_Ma': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất loại ưu đãi với mã ${req.params.LUD_Ma}`)
        );
    }

    return res.send(documents);
};



//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOne = async (req, res) => {
    const condition = {
        LUD_Ma: req.params.LUD_Ma,
    };
    const [error, documents] = await handle(
        LoaiUuDai.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất loại ưu đãi!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy loại ưu đãi")
    }
    return res.send(documents);
};

//*--- Cập nhật thông tin sách thông qua mã sách
exports.update = async (req, res, next) => {

    const condition = {
        LUD_Ma: req.params.LUD_Ma
    };

    const [error, document] = await handle(
        LoaiUuDai.findOneAndUpdate(condition, req.body,  {
            $set: {
                'LUD_NgayCapNhat': req.body.LUD_NgayCapNhat,
            }
        },{
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin loại ưu đãi có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy loại ưu đãi"));
    }

    return res.send({ message: "Cập nhật thông tin loại ưu đãi thành công." });
};


//Xóa một sách bằng mã sách
exports.delete = async (req,res) => {    
    const condition = {
        LUD_Ma: req.params.LUD_Ma
    };

    const [error, document] = await handle(
        LoaiUuDai.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500,`Không xóa được loại ưu đãi có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa loại ưu đãi thành công" });
    }

};

