module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            CTDHT_Ma: {
                type: String,
                required: [true, "Ma cua chi tiet don hang"],
            },
        
           CTDHT_MaDH: {
                type: String,
                required: [true, "Ma cua khach hang"],
            },
           CTDHT_TenSach: {
                type: String,
                required: [true, "Ten cua sach"],
            },
           CTDHT_SoLuong: {
                type: Number,
                required: [true, "So luong cua sach"],
            },
           CTDHT_Gia: {
                type: Number,
                required: [true, "Gia cua sach"],
            },
            CTDHT_ThanhTien: {
                type: Number,
                required: [true, "Thanh tien cua sach"],
            },
           CTDHT_NgayTao: {
                type: String,
                required: [true, "Ngay tao chi tiet don hang"],
            },
           CTDHT_NgayCapNhat: {
                type: String,
            },
        });

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("ChiTietDonHoanTra", schema);
}
