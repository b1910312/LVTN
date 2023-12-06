const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const Sach = db.Sach;
const NhapKho = db.NhapKho;
exports.findAllFavorite = async (req, res) => {
    res.send({ message: "Hello san pham" });
}
//*-------------Thêm sách
exports.create = async (req, res) => {
    // Create a product
    const sach = new Sach({
        S_Ma: req.body.S_Ma,
        S_Ten: req.body.S_Ten,
        S_TacGia: req.body.S_TacGia,
        S_NXB: req.body.S_NXB,
        S_SoLuong: req.body.S_SoLuong,
        S_Gia: req.body.S_Gia,
        S_TheLoai: req.body.S_TheLoai,
        S_NgayNhap: req.body.S_NgayNhap,
        S_NgayCapNhat: ''
    });
    // Save product in the DB
    const [error, document] = await handle(sach.save());

    if (error) {
        return console.log(error);

    }

    return res.send(document);

}


//*--------Truy xuất tất cả sách trong cơ sở dữ liệu
exports.findAll = async (req, res) => {

    console.log('');

    const condition = {
        ownerId: req.userId
    };
    const S_Ten = req.query.S_Ma;

    if (S_Ten) {
        condition.S_Ten = { $regex: new RegExp(S_Ten), $options: "i" };
    }

    const [error, documents] = await handle(
        Sach.find(condition, '-ownerId').sort({ 'S_Ma': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất sách với mã ${req.params.S_Ma}`)
        );
    }

    return res.send(documents);
};
//*--------Truy xuất tất cả sách trong cơ sở dữ liệu
exports.FindSachByNoiDung = async (req, res) => {

    console.log('');

    const condition = {
        ownerId: req.userId
    };

    const ND = req.params.NoiDung;

    if (ND) {
        condition.S_Ten = { $regex: new RegExp(ND, "i") };
    }

    const [error, documents] = await handle(
        Sach.find(condition, '-ownerId').sort({ 'S_Ma': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất sách với mã ${req.params.S_Ma}`)
        );
    }

    return res.send(documents);
};
exports.FindSachByDanhMuc = async (req, res) => {

    console.log('');

    const condition = {
        S_TheLoai: req.params.S_TheLoai
    };


    const [error, documents] = await handle(
        Sach.find(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất sách với mã ${req.params.S_Ma}`)
        );
    }

    return res.send(documents);
};
exports.FindSachByNXB = async (req, res) => {

    console.log('');

    const condition = {
        S_NXB: req.params.S_NXB
    };


    const [error, documents] = await handle(
        Sach.find(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất sách với mã ${req.params.S_Ma}`)
        );
    }

    return res.send(documents);
};
exports.findLatestBooks = async (req, res) => {
    const condition = {
        ownerId: req.userId
    };
    const S_Ten = req.query.S_Ma;

    if (S_Ten) {
        condition.S_Ten = { $regex: new RegExp(S_Ten), $options: "i" };
    }

    const [error, documents] = await handle(
        Sach.find(condition, '-ownerId')
            .sort({ 'S_NgayTao': -1 }) // Sắp xếp theo ngày tạo giảm dần (mới nhất lên đầu)
            .limit(20) // Giới hạn kết quả trả về 20 dòng đầu tiên
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất sách với mã ${req.params.S_Ma}`)
        );
    }

    return res.send(documents);
};
exports.SapBanHet = async (req, res) => {
    const condition = {
        S_SoLuong: { $lt: 20 } 
    };
   

    const [error, documents] = await handle(
        Sach.find(condition, '-ownerId') // Sắp xếp theo ngày tạo giảm dần (mới nhất lên đầu)
             // Giới hạn kết quả trả về 20 dòng đầu tiên
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất sách với mã ${req.params.S_Ma}`)
        );
    }

    return res.send(documents);
};
exports.findLowestQuantityBooks = async (req, res) => {
    const condition = {
        ownerId: req.userId
    };
    const S_Ten = req.query.S_Ma;

    if (S_Ten) {
        condition.S_Ten = { $regex: new RegExp(S_Ten), $options: "i" };
    }

    const [error, documents] = await handle(
        Sach.find(condition, '-ownerId')
            .sort({ 'S_SoLuong': 1 }) // Sắp xếp theo số lượng tăng dần
            .limit(20) // Giới hạn kết quả trả về 20 dòng đầu tiên
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất sách với mã ${req.params.S_Ma}`)
        );
    }

    return res.send(documents);
};
exports.findNhapKhoAll = async (req, res) => {

    console.log('');

    const condition = {
        ownerId: req.userId
    };
    const NK_Ma = req.query.NK_Ma;

    if (NK_Ma) {
        condition.NK_Ma = { $regex: new RegExp(NK_Ma), $options: "i" };
    }

    const [error, documents] = await handle(
        NhapKho.find(condition, '-ownerId').sort({ 'NK_Ma': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất sách với mã ${req.params.S_Ma}`)
        );
    }

    return res.send(documents);
};
exports.updateSoLuong = async (req, res, next) => {

    const condition = {
        S_Ma: req.params.S_Ma
    };
    const [error, document] = await handle(
        Sach.findOneAndUpdate(condition, {
            'S_SoLuong': req.body.S_SoLuong,
            'S_NgayCapNhat': req.body.S_NgayCapNhat,

        }, {
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật sách có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy sách"));
    }

    return res.send({ message: "Cập nhật sách thành công." });
};

exports.NhapKho = async (req, res, next) => {
    const nhapkho = new NhapKho({
        NK_Ma: req.body.NK_Ma,
        NK_MaSach: req.body.NK_MaSach,
        NK_MaNV: req.body.NK_MaNV,
        NK_Gia: req.body.NK_Gia,
        NK_SoLuong: req.body.NK_SoLuong,
        NK_NgayNhap: req.body.NK_NgayNhap,
    });
    // Save product in the DB
    const [error, document] = await handle(nhapkho.save());

    if (error) {
        return console.log(error);

    }

    return res.send(document);

};
exports.getLastNKMa = async (req, res) => {
    const [error, documents] = await handle(
        NhapKho.findOne().sort({ NK_Ma: -1 })
    );
    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất nhap kho!")
        );
    }
    if (!documents) {
        return res.send("KBNK000")
    }
    return res.send(documents.NK_Ma);
    // if (!lastRecord) {
    //     console.log('bảng dữ liệu trống'); // Nếu không có bản ghi nào, trả về giá trị mặc định
    // }
    // // Giải mã và tạo mã mới
    // const lastSMa = lastRecord.S_Ma;
    // const numericPart = parseInt(lastSMa.slice(3), 10) + 1;
    // const newSMa = `KBS${numericPart.toString().padStart(3, '0')}`;
    // console.log(newSMa);
};
exports.getLastSMa = async (req, res) => {
    const [error, documents] = await handle(
        Sach.findOne().sort({ S_Ma: -1 })
    );
    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất sách!")
        );
    }
    if (!documents) {
        return res.send("KBS000")
    }
    return res.send(documents.S_Ma);
    // if (!lastRecord) {
    //     console.log('bảng dữ liệu trống'); // Nếu không có bản ghi nào, trả về giá trị mặc định
    // }
    // // Giải mã và tạo mã mới
    // const lastSMa = lastRecord.S_Ma;
    // const numericPart = parseInt(lastSMa.slice(3), 10) + 1;
    // const newSMa = `KBS${numericPart.toString().padStart(3, '0')}`;
    // console.log(newSMa);
};
//*----- Truy xuất một sách bằng mã sách
exports.findOne = async (req, res) => {
    const condition = {
        S_Ma: req.params.S_Ma,
    };
    const [error, documents] = await handle(
        Sach.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất sách!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy sách")
    }
    return res.send(documents);
};
exports.findOneName = async (req, res) => {
    const condition = {
        S_Ma: req.params.S_Ma,
    };
    const [error, documents] = await handle(
        Sach.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất sách!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy sách")
    }
    // Chỉ trả về giá trị của thuộc tính S_Ten
    const tenSach = documents.S_Ten;

    // Chuyển đổi object thành chuỗi
    const tenSachString = tenSach.toString();

    return res.send(tenSachString);
};
exports.findNhapKhoSMa = async (req, res) => {
    const condition = {
        NK_MaSach: req.params.NK_MaSach,
    };
    const [error, documents] = await handle(
        NhapKho.find(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất sách!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy sách")
    }
    return res.send(documents);
};

//*--- Cập nhật thông tin sách thông qua mã sách
exports.update = async (req, res, next) => {

    const condition = {
        S_Ma: req.params.S_Ma
    };

    const [error, document] = await handle(
        Sach.findOneAndUpdate(condition, req.body, {
            $set: {
                'S_NgayCapNhat': req.body.S_NgayCapNhat,
            }
        }, {
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin sách có mã id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy sách!"));
    }

    return res.send({ message: "Cập nhật thông tin sách thành công." });
};


//Xóa một sách bằng mã sách
exports.delete = async (req, res) => {
    const condition = {
        S_Ma: req.params.S_Ma
    };

    const [error, document] = await handle(
        Sach.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, `Không xóa được sách có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa sách thành công" });
    }

};

