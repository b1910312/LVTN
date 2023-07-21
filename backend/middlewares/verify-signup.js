const { BadRequestError } = require("../helpers/errors");
const db = require("../models");
const KhachHang = db.KhachHang;

const checkDuplicateSDT = async (req, res, next) => {
    try {
        const userBySDT = await KhachHang.findOne({
            TKKH_Email: req.body.TKKH_Email,
        }).exec();

        if (userBySDT) {
            return next(new BadRequestError(422, "Email đã được đăng ký"));
        }

        return next();
    } catch (error) {
        console.log(error);
        return next(new BadRequestError(500));
    }
};

module.exports = {
    checkDuplicateSDT,
};
