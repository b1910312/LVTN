const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const DonHang = db.DonHang;

const moment = require("moment");
//*-------------Thêm sản phẩm
exports.create = async (req, res) => {
    // Create a product
    const donhang = new DonHang({
        DH_Ma: req.body.DH_Ma,
        DH_MaKH: req.body.DH_MaKH,
        DH_Ho: req.body.DH_Ho,
        DH_Ten: req.body.DH_Ten,
        DH_SoDienThoai: req.body.DH_SoDienThoai,
        DH_DiaChi: req.body.DH_DiaChi,
        DH_PhuongXa: req.body.DH_PhuongXa,
        DH_QuanHuyen: req.body.DH_QuanHuyen,
        DH_TinhTP: req.body.DH_TinhTP,
        DH_NgayTao: req.body.DH_NgayTao,
    });
    // Save product in the DB
    const [error, document] = await handle(donhang.save());

    if (error) {
        return console.log(error);

    }

    return res.send(document);

}
exports.ThanhToanVNPay = async (req, res, next) => {

    var ipAddr = "127.0.0.1"

    var config = require('config');
    var moment = require('moment');


    var tmnCode = config.get('vnp_TmnCode');
    var secretKey = config.get('vnp_HashSecret');
    var vnpUrl = config.get('vnp_Url');
    var returnUrl = config.get('vnp_ReturnUrl');

    var date = new Date();

    var createDate = moment().format('YYYYMMDDHHmmss');;
    var orderId = moment().format('HHmmss');;
    var amount = req.body.amount;
    var bankCode = req.body.bankCode;
    var TxnRef = req.body.TxnRef;

    var orderInfo = req.body.orderDescription;
    var orderType = req.body.orderType;
    var locale = req.body.language;
    if (locale === null || locale === '') {
        locale = 'vn';
    }
    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_TxnRef'] = TxnRef + "_" + moment().format('hh:ss_DD-MM-YYYY');
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer.alloc(signData.length, signData)).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    res.send(vnpUrl)
};

exports.ReturnURL = async (req, res, next) => {
    var vnp_Params = req.query;

    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    var config = require('config');
    var tmnCode = config.get('vnp_TmnCode');
    var secretKey = config.get('vnp_HashSecret');

    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer.alloc(signData.length, signData)).digest("hex");

    if (secureHash === signed) {
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

        res.render('success', { code: vnp_Params['vnp_ResponseCode'] })
    } else {
        res.render('success', { code: '97' })
    }
};
exports.updateTrangThai = async (req, res, next) => {

    const condition = {
        DH_Ma: req.params.DH_Ma
    };

    const [error, document] = await handle(
        DonHang.findOneAndUpdate(condition, req.body, {
            $set: {
                'DH_TrangThai': req.body.DH_TrangThai,
                'DH_NgayCapNhat': req.body.DH_NgayCapNhat,
            }
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

//*--------Truy xuất tất cả sản phẩm trong cơ sở dữ liệu
exports.findAll = async (req, res) => {

    console.log('');

    const condition = {
        ownerId: req.userId
    };
    const DH_Email = req.query.ten;

    if (DH_Email) {
        condition.DH_Email = { $regex: new RegExp(DH_Email), $options: "i" };
    }

    const [error, documents] = await handle(
        DonHang.find(condition, '-ownerId').sort({ 'DH_Email': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất đơn hàng với mã ${req.params.DH_Ma}`)
        );
    }

    return res.send(documents);
};
exports.getLastDHMa = async (req, res) => {
    const [error, documents] = await handle(
        DonHang.findOne().sort({ DH_Ma: -1 })
    );
    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất sách!")
        );
    }
    if (!documents) {
        return res.send("KBDH000")
    }
    return res.send(documents.DH_Ma);
    // if (!lastRecord) {
    //     console.log('bảng dữ liệu trống'); // Nếu không có bản ghi nào, trả về giá trị mặc định
    // }
    // // Giải mã và tạo mã mới
    // const lastSMa = lastRecord.S_Ma;
    // const numericPart = parseInt(lastSMa.slice(3), 10) + 1;
    // const newSMa = `KBS${numericPart.toString().padStart(3, '0')}`;
    // console.log(newSMa);
};
exports.findAllUnDone = async (req, res) => {

    console.log('');

    const condition = {
        DH_MaKH: req.params.DH_MaKH,
        DH_TrangThai: { $ne: 5 }
    };
   
    const [error, documents] = await handle(
        DonHang.find(condition, '-ownerId').sort({ 'DH_Ma': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất đơn hàng với mã ${req.params.DH_Ma}`)
        );
    }

    return res.send(documents);
};
exports.findAllByMaKH = async (req, res) => {

    console.log('');

    const condition = {
        DH_MaKH: req.params.DH_MaKH,
    };
   
    const [error, documents] = await handle(
        DonHang.find(condition, '-ownerId').sort({ 'DH_TrangThai': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất đơn hàng với mã ${req.params.DH_Ma}`)
        );
    }

    return res.send(documents);
};
exports.findAllDone = async (req, res) => {

    console.log('');

    const condition = {
        ownerId: req.userId,
        DH_TrangThai: 5
    };
    const DH_Email = req.query.ten;

    if (DH_Email) {
        condition.DH_Email = { $regex: new RegExp(DH_Email), $options: "i" };
    }

    const [error, documents] = await handle(
        DonHang.find(condition, '-ownerId').sort({ 'DH_Email': 1 })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất đơn hàng với mã ${req.params.DH_Ma}`)
        );
    }

    return res.send(documents);
};

//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOne = async (req, res) => {
    const condition = {
        DH_Ma: req.params.DH_Ma,
    };
    const [error, documents] = await handle(
        DonHang.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất đơn hàng!")
        );
    }
    if (!documents) {
        return res.send("Không tìm thấy đơn hàng")
    }
    return res.send(documents);
};

//*--- Cập nhật thông tin sách thông qua mã sách
exports.update = async (req, res, next) => {

    const condition = {
        DH_Ma: req.params.DH_Ma
    };

    const [error, document] = await handle(
        DonHang.findOneAndUpdate(condition, req.body, {
            $set: {
                'DH_TrangThai': req.body.DH_TrangThai,
                'DH_NgayCapNhat': req.body.DH_NgayCapNhat,
            }
        }, {
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin đơn hàng có mã =${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy đơn hàng"));
    }

    return res.send({ message: "Cập nhật thông tin đơn hàng thành công." });
};


//Xóa một sách bằng mã sách
exports.delete = async (req, res) => {
    const condition = {
        DH_Ma: req.params.DH_Ma
    };

    const [error, document] = await handle(
        DonHang.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, `Không xóa được đơn hàng có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa đơn hàng thành công" });
    }

};

function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}