module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            KH_MaKH: {
                type: String,
                required: [true, "Ma cua khach hang"],
            },
            KH_HoTen: {
                type: String,
                required: [true, "Ho Ten cua khach hang"],
            },
            KH_NgaySinh: {
                type: String,
                required: [true, "Ngay sinh cua khach hang"],
            },
            KH_GioiTinh: {
                type: Number,
                required: [true, "Gioi tinh cua khach hang"],
            },
            KH_SoDienThoai: {
                type: String,
                required: [true, "So dien thoai cua khach hang"],
            },
            KH_NgayTao: {
                type: String,
                required: [true, "Ngay tao thong tin khach hang"],
            },
            KH_NgayCapNhat: {
                type: String,
                required: [false, "Ngay cap nhat thong tin khach hang"],
            },
        });

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    return mongoose.model("ThongTinKhachHang", schema);
}
