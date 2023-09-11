const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const BestSale = db.BestSale;


//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const bestsale = new BestSale({
        BS_MaSach: req.body.BS_MaSach,
        BS_NgayTao: req.body.BS_NgayTao,
    });
    // Save product in the DB
    const [error, document] = await handle(bestsale.save());

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
    const BS_MaSach = req.query.ten;

    if (BS_MaSach) {
        condition.BS_MaSach = { $regex: new RegExp(BS_MaSach), $options: "i" };
    }

    const [error, documents] = await handle(
        BestSale.find(condition, '-ownerId').sort({ 'BS_MaSach': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất bestsale với mã ${req.params.BS_MaSach}`)
        );
    }

    return res.send(documents);
};



//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOne = async (req, res) => {
    const condition = {
        BS_Ma: req.params.BS_Ma,
    };
    const [error, documents] = await handle(
        BestSale.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất bestsale!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy bestsale")
    }
    return res.send(documents);
};

//*--- Cập nhật thông tin sách thông qua mã sách
exports.update = async (req, res, next) => {

    const condition = {
        BS_MaSach: req.params.BS_MaSach
    };

    const [error, document] = await handle(
        BestSale.findOneAndUpdate(condition, req.body,  {
            $set: {
                'BS_NgayCapNhat': req.body.BS_NgayCapNhat,
            }
        },{
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin bestsale có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy bestsale"));
    }

    return res.send({ message: "Cập nhật thông tin bestsale thành công." });
};


//Xóa một sách bằng mã sách
exports.delete = async (req,res) => {    
    const condition = {
        BS_MaSach: req.params.BS_MaSach
    };

    const [error, document] = await handle(
        BestSale.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500,`Không xóa được bestsale có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa bestsale thành công" });
    }

};

