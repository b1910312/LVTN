module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            CTDH_Ma: {
                type: String,
                required: [true, "Ma cua chi tiet don hang"],
            },
        
           CTDH_MaDH: {
                type: String,
                required: [true, "Ma cua khach hang"],
            },
           CTDH_TenSach: {
                type: String,
                required: [true, "Ten cua sach"],
            },
           CTDH_SoLuong: {
                type: Number,
                required: [true, "So luong cua sach"],
            },
           CTDH_Gia: {
                type: Number,
                required: [true, "Gia cua sach"],
            },
            CTDH_ThanhTien: {
                type: Number,
                required: [true, "Thanh tien cua sach"],
            },
           CTDH_NgayTao: {
                type: String,
                required: [true, "Ngay tao chi tiet don hang"],
            },
           CTDH_NgayCapNhat: {
                type: String,
            },
        });

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("ChiTietDonHang", schema);
}
