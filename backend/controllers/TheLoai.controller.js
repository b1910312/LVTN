const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const TheLoai = db.TheLoai;


//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const theloai = new TheLoai({
        TL_Ma: req.body.TL_Ma,
        TL_Ten: req.body.TL_Ten,
        TL_NgayTao: req.body.TL_NgayTao,

    });
    // Save product in the DB
    const [error, document] = await handle(theloai.save());

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
    const TL_Ten = req.query.ten;

    if (TL_Ten) {
        condition.TL_Ten = { $regex: new RegExp(TL_Ten), $options: "i" };
    }

    const [error, documents] = await handle(
        TheLoai.find(condition, '-ownerId').sort({ 'TL_Ma': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất thể loại với mã ${req.params.TL_Ma}`)
        );
    }

    return res.send(documents);
};



//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOne = async (req, res) => {
    const condition = {
        TL_Ma: req.params.TL_Ma,
    };
    const [error, documents] = await handle(
        TheLoai.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất thể loại!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy thể loại")
    }
    return res.send(documents);
};

//*--- Cập nhật thông tin sách thông qua mã sách
exports.update = async (req, res, next) => {

    const condition = {
        TL_Ma: req.params.TL_Ma
    };

    const [error, document] = await handle(
        TheLoai.findOneAndUpdate(condition, req.body,  {
            $set: {
                'TL_NgayCapNhat': req.body.TL_NgayCapNhat,
            }
        },{
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin thể loại có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy thể loại"));
    }

    return res.send({ message: "Cập nhật thông tin thể loại thành công." });
};


//Xóa một sách bằng mã sách
exports.delete = async (req,res) => {    
    const condition = {
        TL_Ma: req.params.TL_Ma
    };

    const [error, document] = await handle(
        TheLoai.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500,`Không xóa được thể loại có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa thể loại thành công" });
    }

};

