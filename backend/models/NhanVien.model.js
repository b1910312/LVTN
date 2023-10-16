module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            TKNV_MaNV: {
                type: String,
                required: [true, "Ma cua nhan vien"],
            },
            TKNV_MatKhau: {
                type: String,
                required: [true, "Mat khau cua tai nhan vien"],
            },
            TKNV_VaiTro: {
                type: String,
                required: ["true", "Vai tro"],
                // Vai tro (1) Admin (2) quản lý cộng đồng (3) Xử lý đôn hàng
            },
            TKNV_NgayTao: {
                type: String,
                required: [true, "Ngay tao tai khoan nhan vien"],
            },
            TKNV_NgayCapNhat: {
                type: String,
            },
        });

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("NhanVien", schema);
}
