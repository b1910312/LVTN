const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const HinhMinhHoa = db.HinhMinhHoa;


//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const hinhminhhoa = new HinhMinhHoa({
        HMH_Ma: req.body.HMH_Ma,
        HMH_MaSach: req.body.HMH_MaSach,
        HMH_URL: req.body.HMH_URL,
        HMH_NgayTao: req.body.HMH_NgayTao,
    });
    // Save product in the DB
    const [error, document] = await handle(hinhminhhoa.save());

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
    const HMH_MaSach = req.query.ten;

    if (HMH_MaSach) {
        condition.HMH_MaSach = { $regex: new RegExp(HMH_MaSach), $options: "i" };
    }

    const [error, documents] = await handle(
        db.HinhMinhHoa.find(condition, '-ownerId').sort({ 'HMH_MaSach': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất hình minh họa với mã ${req.params.HMH_Ma}`)
        );
    }

    return res.send(documents);
};



//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOne = async (req, res) => {
    const condition = {
        HMH_Ma: req.params.HMH_Ma,
    };
    const [error, documents] = await handle(
        HinhMinhHoa.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất hình minh họa!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy hình minh họa")
    }
    return res.send(documents);
};

//*--- Cập nhật thông tin sách thông qua mã sách
exports.update = async (req, res, next) => {

    const condition = {
        HMH_Ma: req.params.HMH_Ma
    };

    const [error, document] = await handle(
        HinhMinhHoa.findOneAndUpdate(condition, req.body,  {
            $set: {
                'HMH_NgayCapNhat': req.body.HMH_NgayCapNhat,
            }
        },{
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin hình minh họa có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy hình minh họa"));
    }

    return res.send({ message: "Cập nhật thông tin hình minh họa thành công." });
};


//Xóa một sách bằng mã sách
exports.delete = async (req,res) => {    
    const condition = {
        AVT_Ma: req.params.AVT_Ma
    };

    const [error, document] = await handle(
        HinhMinhHoa.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500,`Không xóa được hình minh họa có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa hình minh họa thành công" });
    }

};

