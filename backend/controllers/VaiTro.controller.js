const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const VaiTro = db.VaiTro;


//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const vaitro = new VaiTro({
        VT_Ma: req.body.VT_Ma,
        VT_TenVaiTro: req.body.VT_TenVaiTro,
        VT_NgayTao: req.body.VT_NgayTao,
    });
    // Save product in the DB
    const [error, document] = await handle(vaitro.save());

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
    const VT_Ma = req.query.ten;

    if (VT_Ma) {
        condition.VT_Ma = { $regex: new RegExp(VT_Ma), $options: "i" };
    }

    const [error, documents] = await handle(
        VaiTro.find(condition, '-ownerId').sort({ 'VT_Ma': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất vai trò với mã ${req.params.VT_Ma}`)
        );
    }

    return res.send(documents);
};

exports.getLastID = async (req, res) => {
    const [error, documents] = await handle(
        VaiTro.findOne().sort({ VT_Ma: -1 })
    );
    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất sách!")
        );
    }
    if (!documents) {
        return res.send("KBVT000")
    }
    return res.send(documents.VT_Ma);
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
exports.findOne = async (req, res) => {
    const condition = {
        VT_Ma: req.params.VT_Ma,
    };
    const [error, documents] = await handle(
        VaiTro.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất vai trò!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy vai trò")
    }
    return res.send(documents);
};

//*--- Cập nhật thông tin sách thông qua mã sách
exports.update = async (req, res, next) => {

    const condition = {
        VT_Ma: req.params.VT_Ma
    };

    const [error, document] = await handle(
        VaiTro.findOneAndUpdate(condition, req.body,  {
            $set: {
                'VT_NgayCapNhat': req.body.VT_NgayCapNhat,
            }
        },{
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin vai trò có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy vai trò"));
    }

    return res.send({ message: "Cập nhật thông tin vai trò thành công." });
};


//Xóa một sách bằng mã sách
exports.delete = async (req,res) => {    
    const condition = {
        VT_Ma: req.params.VT_Ma
    };

    const [error, document] = await handle(
        VaiTro.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500,`Không xóa được vai trò có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa vai trò thành công" });
    }

};

