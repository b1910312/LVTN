const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const CuocTroChuyen = db.CuocTroChuyen;


//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const cuoctrochuyen = new CuocTroChuyen({
        CTC_Ma: req.body.CTC_Ma,
        CTC_MaKH: req.body.CTC_MaKH,
        CTC_MaNV: req.body.CTC_MaNV,
        CTC_NgayTao: req.body.CTC_NgayTao,
    });
    // Save product in the DB
    const [error, document] = await handle(cuoctrochuyen.save());

    if (error) {
        return console.log(error);

    }

    return res.send(document);

}

exports.getLastID = async (req, res) => {
    const [error, documents] = await handle(
        CuocTroChuyen.findOne().sort({ CTC_Ma: -1 })
    );
    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất sách!")
        );
    }
    if (!documents) {
        return res.send("KBCTC000")
    }
    return res.send(documents.CTC_Ma);
    // if (!lastRecord) {
    //     console.log('bảng dữ liệu trống'); // Nếu không có bản ghi nào, trả về giá trị mặc định
    // }
    // // Giải mã và tạo mã mới
    // const lastSMa = lastRecord.S_Ma;
    // const numericPart = parseInt(lastSMa.slice(3), 10) + 1;
    // const newSMa = `KBS${numericPart.toString().padStart(3, '0')}`;
    // console.log(newSMa);
};
//*--------Truy xuất tất cả sản phẩm trong cơ sở dữ liệu
exports.findAll = async (req, res) => {

    console.log('');

    const condition = {
        ownerId: req.userId
    };
    const CTC_Ma = req.query.ten;

    if (CTC_Ma) {
        condition.CTC_Ma = { $regex: new RegExp(CTC_Ma), $options: "i" };
    }

    const [error, documents] = await handle(
        CuocTroChuyen.find(condition, '-ownerId').sort({ 'CTC_Ma': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất cuộc trò chuyện với mã ${req.params.CTC_Ma}`)
        );
    }

    return res.send(documents);
};



//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOne = async (req, res) => {
    const condition = {
        CTC_Ma: req.params.CTC_Ma,
    };
    const [error, documents] = await handle(
        CuocTroChuyen.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất cuộc trò chuyện!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy cuộc trò chuyện")
    }
    return res.send(documents);
};

//*--- Cập nhật thông tin sách thông qua mã sách
exports.update = async (req, res, next) => {

    const condition = {
        CTC_Ma: req.params.CTC_Ma
    };

    const [error, document] = await handle(
        CuocTroChuyen.findOneAndUpdate(condition, req.body,  {
            $set: {
                'CTC_NgayCapNhat': req.body.CTC_NgayCapNhat,
            }
        },{
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin cuộc trò chuyện có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy cuộc trò chuyện"));
    }

    return res.send({ message: "Cập nhật thông tin cuộc trò chuyện thành công." });
};


//Xóa một sách bằng mã sách
exports.delete = async (req,res) => {    
    const condition = {
        CTC_Ma: req.params.CTC_Ma
    };

    const [error, document] = await handle(
        CuocTroChuyen.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500,`Không xóa được cuộc trò chuyện có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa cuộc trò chuyện thành công" });
    }

};

