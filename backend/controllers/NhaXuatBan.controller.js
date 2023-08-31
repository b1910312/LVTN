const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const NhaXuatBan = db.NhaXuatBan;


//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const nhaxuatban = new NhaXuatBan({
        NXB_Ma: req.body.NXB_Ma,
        NXB_Ten: req.body.NXB_Ten,
        NXB_Email: req.body.NXB_Email,
        NXB_SDT: req.body.NXB_SDT,
        NXB_NgayTao: req.body.NXB_NgayTao,

    });
    // Save product in the DB
    const [error, document] = await handle(nhaxuatban.save());

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
    const NXB_Ten = req.query.ten;

    if (NXB_Ten) {
        condition.NXB_Ten = { $regex: new RegExp(NXB_Ten), $options: "i" };
    }

    const [error, documents] = await handle(
        NhaXuatBan.find(condition, '-ownerId').sort({ 'NXB_Ma': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất nhà xuất bản với mã ${req.params.NXB_Ma}`)
        );
    }

    return res.send(documents);
};



//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOne = async (req, res) => {
    const condition = {
        NXB_Ma: req.params.NXB_Ma,
    };
    const [error, documents] = await handle(
        NhaXuatBan.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất nhà xuất bản!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy nhà xuất bản")
    }
    return res.send(documents);
};

//*--- Cập nhật thông tin sách thông qua mã sách
exports.update = async (req, res, next) => {

    const condition = {
        NXB_Ma: req.params.NXB_Ma
    };

    const [error, document] = await handle(
        NhaXuatBan.findOneAndUpdate(condition, req.body,  {
            $set: {
                'NXB_NgayCapNhat': req.body.NXB_NgayCapNhat,
            }
        },{
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin nhà xuất bản có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy nhà xuất bản"));
    }

    return res.send({ message: "Cập nhật thông tin nhà xuất bản thành công." });
};


//Xóa một sách bằng mã sách
exports.delete = async (req,res) => {    
    const condition = {
        NXB_Ma: req.params.NXB_Ma
    };

    const [error, document] = await handle(
        NhaXuatBan.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500,`Không xóa được nhà xuất bản có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa nhà xuất bản thành công" });
    }

};

