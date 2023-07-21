module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            NV_Ma: {
                type: String,
                required: [true, "Ma cua nhan vien"],
            },
            NV_SoDienThoai: {
                type: String,
                required: [true, "So dien thoai cua nhan vien"],
            },
            NV_Email: {
                type: String,
                required: [true, "Dia chi email cua nhan vien"],
            },
            NV_DiaChi: {
                type: String,
                required: [true, "Dia chi cua nhan vien"],
            },
            NV_NgayTao: {
                type: String,
                required: [true, "Ngay tao thong tin nhan vien"],
            },
            NV_NgayCapNhat: {
                type: String,
                required: [false, "Ngay cap nhat thong tin nhan vien"],
            },
        });

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    return mongoose.model("ThongTinNhanVien", schema);
}
