const { checkDuplicateSDT } = require("./verify-signup");
const { verifyToken } = require("./khachhang-jwt");

module.exports = {
    checkDuplicateSDT,
    verifyToken,
};
