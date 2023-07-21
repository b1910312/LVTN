const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const Avatar = db.Avatar;

exports.findAllFavorite = async (req, res) => {
    res.send({ message: "Hello san pham" });
}
//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const avatar = new Avatar({
        AVT_Ma: req.body.AVT_Ma,
        AVT_MaKH: req.body.AVT_MaKH,
        AVT_Ten: req.body.AVT_Ten,
        AVT_NgayTao: req.body.AVT_NgayTao,
    });
    // Save product in the DB
    const [error, document] = await handle(avatar.save());

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
    const AVT_MaKH = req.query.ten;

    if (AVT_MaKH) {
        condition.AVT_MaKH = { $regex: new RegExp(AVT_MaKH), $options: "i" };
    }

    const [error, documents] = await handle(
        Avatar.find(condition, '-ownerId').sort({ 'AVT_MaKH': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất ảnh đại diện với mã ${req.params.AVT_Ma}`)
        );
    }

    return res.send(documents);
};



//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOne = async (req, res) => {
    const condition = {
        AVT_Ma: req.params.AVT_Ma,
    };
    const [error, documents] = await handle(
        Avatar.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất ảnh đại diện!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy ảnh đại diện")
    }
    return res.send(documents);
};

//*--- Cập nhật thông tin sách thông qua mã sách
exports.update = async (req, res, next) => {

    const condition = {
        AVT_Ma: req.params.AVT_Ma
    };

    const [error, document] = await handle(
        Avatar.findOneAndUpdate(condition, req.body,  {
            $set: {
                'AVT_NgayCapNhat': req.body.AVT_NgayCapNhat,
            }
        },{
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin ảnh đại diện có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy ảnh đại diện"));
    }

    return res.send({ message: "Cập nhật thông tin ảnh đại diện thành công." });
};


//Xóa một sách bằng mã sách
exports.delete = async (req,res) => {    
    const condition = {
        AVT_Ma: req.params.AVT_Ma
    };

    const [error, document] = await handle(
        Avatar.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500,`Không xóa được ảnh đại diện có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa ảnh đại diện thành công" });
    }

};

