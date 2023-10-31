module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            NV_MaNV: {
                type: String,
                required: [true, "Ma cua nhan vien"],
            },
            NV_HoTen: {
                type: String,
                required: [true, "Ho Ten cua nhan vien"],
            },
            NV_NgaySinh: {
                type: String,
                required: [true, "Ngay sinh cua nhan vien"],
            },
            NV_GioiTinh: {
                type: String,
                required: [true, "Giới tính của nhân viên"],
            },
            NV_CCCD: {
                type: String,
                required: [true, "Căn cước công dân cua nhan vien"],
            },
            NV_SoDienThoai: {
                type: String,
                required: [true, "So dien thoai cua nhan vien"],
            },
            NV_Email: {
                type: String,
                required: [true, "Email cua nhan vien"],
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
