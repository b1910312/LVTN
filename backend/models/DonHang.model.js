module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            DH_Ma: {
                type: String,
                required: [true, "Ma cua don hang"],
            },
            DH_Email: {
                type: String,
                required: [true, "Email cua khach hang"],
            },
            DH_Ho: {
                type: String,
                required: [true, "Ho cua khach hang"],
            },
            DH_Ten: {
                type: String,
                required: [true, "Ten cua khach hang"],
            },
            DH_SoDienThoai: {
                type: String,
                required: [true, "So dien thoai cua khach hang"],
            },
            DH_DiaChi: {
                type: String,
                required: [true, "Dia chi cua khach hang"],
            },
            DH_TongCong: {
                type: Number,
                required: [true, "Tong gia tri cua don hangs"],
            },
            DH_TongSoLuong: {
                type: Number,
                required: [true, "Tong so luong cua don hangs"],
            },
            DH_TrangThai: {
                type: Number,
                default: 1,
            },
            DH_NgayTao: {
                type: String,
                required: [true, "Ngay tao don hang"],
            },
            DH_NgayCapNhat: {
                type: String,
            },
        });

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("DonHang", schema);
}
