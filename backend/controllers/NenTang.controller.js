const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const NenTang = db.NenTang;


//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const nentang = new NenTang({
        NT_MaDT: req.body.NT_MaDT,
        NT_TenNenTang: req.body.NT_TenNenTang,
        NT_URL: req.body.NT_URL,
        NT_NgayTao: req.body.NT_NgayTao,
    });
    // Save product in the DB
    const [error, document] = await handle(nentang.save());

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
    const NT_MaDT = req.query.ten;

    if (NT_MaDT) {
        condition.NT_MaDT = { $regex: new RegExp(NT_MaDT), $options: "i" };
    }

    const [error, documents] = await handle(
        NenTang.find(condition, '-ownerId').sort({ 'NT_MaDT': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất nền tảng với mã ${req.params.NT_MaDT}`)
        );
    }

    return res.send(documents);
};



//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOne = async (req, res) => {
    const condition = {
        NT_Ma: req.params.NT_Ma,
    };
    const [error, documents] = await handle(
        NenTang.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất nền tảng!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy nền tảng")
    }
    return res.send(documents);
};

//*--- Cập nhật thông tin sách thông qua mã sách
exports.update = async (req, res, next) => {

    const condition = {
        NT_MaDT: req.params.NT_MaDT
    };

    const [error, document] = await handle(
        NenTang.findOneAndUpdate(condition, req.body,  {
            $set: {
                'NT_NgayCapNhat': req.body.NT_NgayCapNhat,
            }
        },{
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin nền tảng có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy nền tảng"));
    }

    return res.send({ message: "Cập nhật thông tin nền tảng thành công." });
};


//Xóa một sách bằng mã sách
exports.delete = async (req,res) => {    
    const condition = {
        NT_MaDT: req.params.NT_MaDT
    };

    const [error, document] = await handle(
        NenTang.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500,`Không xóa được nền tảng có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa nền tảng thành công" });
    }

};

