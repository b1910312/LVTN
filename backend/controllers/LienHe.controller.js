const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const LienHe = db.LienHe;

//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const lienhe = new LienHe({
        LH_Ma: req.body.LH_Ma,
        LH_Email: req.body.LH_Email,
        LH_Ho: req.body.LH_Ho,
        LH_Ten: req.body.LH_Ten,
        LH_NoiDung: req.body.LH_NoiDung,
        LH_ChuDe: req.body.LH_ChuDe,
        LH_NgayTao: req.body.LH_NgayTao,
    });
    // Save product in the DB
    const [error, document] = await handle(lienhe.save());

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
    const LH_Email = req.query.ten;

    if (LH_Email) {
        condition.LH_Email = { $regex: new RegExp(LH_Email), $options: "i" };
    }

    const [error, documents] = await handle(
        LienHe.find(condition, '-ownerId').sort({ 'LH_Email': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất liên hệ với mã ${req.params.LH_Ma}`)
        );
    }

    return res.send(documents);
};



//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOne = async (req, res) => {
    const condition = {
        LH_Ma: req.params.LH_Ma,
    };
    const [error, documents] = await handle(
        LienHe.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất liên hệ!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy liên hệ")
    }
    return res.send(documents);
};

//*--- Cập nhật thông tin sách thông qua mã sách
exports.update = async (req, res, next) => {

    const condition = {
        LH_Ma: req.params.LH_Ma
    };

    const [error, document] = await handle(
        LienHe.findOneAndUpdate(condition, req.body, {
            $set: {
                'LH_TrangThai': req.body.LH_TrangThai,
                'LH_MaNV': req.body.LH_MaNV,
                'LH_NoiDungTraLoi': req.body.LH_NoiDungTraLoi,
                'LH_NgayCapNhat': req.body.LH_NgayCapNhat,
            }
        }, {
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin liên hệ có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy liên hệ"));
    }

    return res.send({ message: "Cập nhật thông tin liên hệ thành công." });
};

exports.updateTrangThai = async (req, res, next) => {

    const condition = {
        LH_Ma: req.params.LH_Ma
    };

    const [error, document] = await handle(
        LienHe.findOneAndUpdate(condition, {
            'LH_TrangThai': req.body.LH_TrangThai,
            'LH_NgayCapNhat': req.body.LH_NgayCapNhat,

        }, {
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin bình luận có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy bình luận"));
    }

    return res.send({ message: "Cập nhật thông tin bình luận thành công." });
};
//Xóa một sách bằng mã sách
exports.delete = async (req, res) => {
    const condition = {
        LH_Ma: req.params.LH_Ma
    };

    const [error, document] = await handle(
        LienHe.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, `Không xóa được liên hệ có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa liên hệ thành công" });
    }

};

