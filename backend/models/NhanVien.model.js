module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            TKNV_Ma: {
                type: String,
                required: [true, "Ma cua nhan vien"],
            },
            TKNV_Ten: {
                type: String,
                required: [true, "Ten cua nhan vien"],
            },
            TKNV_MatKhau: {
                type: String,
                required: [true, "Ten cua nhan vien"],
            },
            TKNV_VaiTro: {
                type: Number,
                required: ["true", "Vai tro"],
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
