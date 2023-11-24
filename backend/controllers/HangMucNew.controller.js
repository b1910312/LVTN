const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const HangMuc = db.HangMuc;


//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const hangmuc = new HangMuc({
        HM_Ma: req.body.HM_Ma,
        HM_TenHangMuc: req.body.HM_TenHangMuc,
        HM_NgayTao: req.body.HM_NgayTao,
    });
    // Save product in the DB
    const [error, document] = await handle(hangmuc.save());

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
    const HM_Ma = req.query.ten;

    if (HM_Ma) {
        condition.HM_Ma = { $regex: new RegExp(HM_Ma), $options: "i" };
    }

    const [error, documents] = await handle(
        HangMuc.find(condition, '-ownerId').sort({ 'HM_Ma': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất hạng mức với mã ${req.params.HM_Ma}`)
        );
    }

    return res.send(documents);
};


exports.getLastID = async (req, res) => {
    const [error, documents] = await handle(
        HangMuc.findOne().sort({ HM_Ma: -1 })
    );
    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất sách!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy sách")
    }
    return res.send(documents.HM_Ma);
    // if (!lastRecord) {
    //     console.log('bảng dữ liệu trống'); // Nếu không có bản ghi nào, trả về giá trị mặc định
    // }
    // // Giải mã và tạo mã mới
    // const lastSMa = lastRecord.S_Ma;
    // const numericPart = parseInt(lastSMa.slice(3), 10) + 1;
    // const newSMa = `KBS${numericPart.toString().padStart(3, '0')}`;
    // console.log(newSMa);
};
//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOne = async (req, res, next) => {
    const condition = {
        HM_Ma: req.params.HM_Ma,
    };
    const [error, documents] = await handle(
        HangMuc.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất hạng mức!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy hạng mức")
    }
    return res.send(documents);
};

//*--- Cập nhật thông tin sách thông qua mã sách
exports.update = async (req, res, next) => {

    const condition = {
        HM_Ma: req.params.HM_Ma
    };

    const [error, document] = await handle(
        HangMuc.findOneAndUpdate(condition, req.body, {
            $set: {
                'HM_NgayCapNhat': req.body.HM_NgayCapNhat,
            }
        }, {
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin hạng mức có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy hạng mức"));
    }

    return res.send({ message: "Cập nhật thông tin hạng mức thành công." });
};


//Xóa một sách bằng mã sách
exports.delete = async (req, res) => {
    const condition = {
        HM_Ma: req.params.HM_Ma
    };

    const [error, document] = await handle(
        HangMuc.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, `Không xóa được hạng mức có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa hạng mức thành công" });
    }

};

