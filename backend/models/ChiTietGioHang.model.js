module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            CTGH_Ma: {
                type: String,
                required: [true, "Ma cua chi tiet gio hang"],
            },
        
           CTGH_MaGH: {
                type: String,
                required: [true, "Ma cua gio hang"],
            },
           CTGH_MaSach: {
                type: String,
                required: [true, "Ma cua sach"],
            },
           CTGH_SoLuong: {
                type: Number,
                required: [true, "So luong cua sach"],
            },
           CTGH_NgayTao: {
                type: String,
                required: [true, "Ngay tao chi tiet gio hang"],
            },
           CTGH_NgayCapNhat: {
                type: String,
            },
        });

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object; 
    });

    return mongoose.model("ChiTietGioHang", schema);
}
