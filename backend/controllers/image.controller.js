const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const path = require('path');
var fs = require('file-system');

//*-------------Thêm sản phẩm
exports.create = async (req, res, next) => {
    let formidable = require('formidable');
    const paramName = req.params.MaSach; // Lấy tham số từ URL
    const doituong = req.params.DoiTuong; // Lấy tham số từ URL

    var form = new formidable.IncomingForm();
    form.uploadDir = "./uploads";
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024;
    form.multiples = true;

    form.on('fileBegin', (name, file) => {
        const fileExtension = path.extname(file.originalFilename);

        // Tạo tên tệp mới kết hợp với extension
        file.filepath = form.uploadDir + '/' + doituong + "_" + paramName + '.png'; // Gán giá trị mới
    });
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.json({
                result: "failed",
                data: {},
                message: `Cannot upload, ERR: ${err}`
            });
        }
        var arrayOfFiles = files["image"];
        if (arrayOfFiles.length > 0) {
            var fileNames = [];
            arrayOfFiles.forEach((eachFile) => {
                console.log(fileNames);
                fileNames.push(eachFile);
            });
            res.json({
                result: "ok",
                data: fileNames,
                numberOfImges: fileNames.length,
                message: "Upload successfully"
            });
        } else {
            res.json({
                result: "failed",
                data: {},
                numberOfImges: 0,
                message: "No Image to upload!"
            })
        }
    });
};

//*-------------Thêm sản phẩm
exports.createHMH = async (req, res, next) => {
    let formidable = require('formidable');
    const paramName = req.params.MaSach; // Lấy tham số từ URL
    const doituong = req.params.DoiTuong; // Lấy t""ham số từ URL
    const STT = req.params.STT; // Lấy tham số từ URL
    var form = new formidable.IncomingForm();
    form.uploadDir = "./uploads";
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024;
    form.multiples = true;

    form.on('fileBegin', (name, file) => {
        // Tạo tên tệp mới kết hợp với extension
        file.filepath = form.uploadDir + '/' + doituong + "_" + paramName + "_" + (STT) + '.png'; // Gán giá trị mới
    });
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.json({
                result: "failed",
                data: {},
                message: `Cannot upload, ERR: ${err}`
            });
        }
        var arrayOfFiles = files["images"];
        if (arrayOfFiles.length > 0) {
            var fileNames = [];
            arrayOfFiles.forEach((eachFile) => {
                console.log(fileNames);
                fileNames.push(eachFile);
            });
            res.json({
                result: "ok",
                data: fileNames,
                numberOfImges: fileNames.length,
                message: "Upload successfully"
            });
        } else {
            res.json({
                result: "failed",
                data: {},
                numberOfImges: 0,
                message: "No Image to upload!"
            })
        }
    });
};


exports.XoaHinhAnh = async (req, res, next) => {
    const imageName = req.params.imageName
    const imagePath = path.join("uploads",imageName);

    if (!fs.existsSync(imagePath)) {
        res.send("Tệp ảnh không tồn tại.")
      
    }

    fs.unlinkSync(imagePath);

    res.send("Tệp ảnh đã được xóa thành công.")
  
}

//*----- Truy xuất một sản phẩm bằng mã sách
exports.findOne = async (req, res, next) => {

    res.setHeader('content-Type', 'image/jpeg');

    let imageName = "uploads/" + req.params.DoiTuong + "_" + req.params.MaSach + ".png";

    fs.readFile(imageName, (err, imageData) => {
        if (err) {
            res.json({
                result: "failed",
                message: `cannot read image , ${err}`
            });
        }
        res.end(imageData);
    });
};

exports.findOneHMM = async (req, res, next) => {

    res.setHeader('content-Type', 'image/jpeg');

    let imageName = "uploads/" + req.params.DoiTuong + "_" + req.params.MaSach + "_" + req.params.STT + ".png";

    fs.readFile(imageName, (err, imageData) => {
        if (err) {
            res.json({
                result: "failed",
                message: `cannot read image , ${err}`
            });
        }
        res.end(imageData);
    });
};




//Xóa một sách bằng mã sách
exports.delete = async (req, res) => {
    const condition = {
        NXB_Ma: req.params.NXB_Ma
    };

    const [error, document] = await handle(
        Image.deleteOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, `Không xóa được nhà xuất bản có mã ${req.params.id}`)
        );
    }

    if (document) {
        return res.send({ message: "Xóa nhà xuất bản thành công" });
    }

};

