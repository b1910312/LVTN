module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            S_Ma: {
                type: String,
                required: [true, "Ma cua dau sach"],
            },

            S_Ten: {
                type: String,
                required: [true, "Ten sach"],
            },
            S_TacGia: {
                type: String,
                required: [true, "Tac gia"],
            },
            S_SoLuong: {
                type: Number,
                required: [true, "So luong sach ton kho"],
            },
            S_Gia: {
                type: Number,
                required: [true, "Gia ban ra cua sach"],
            },
            S_TheLoai: {
                type: String,
                required: [true, "Ma the loai sach"],
            },
            S_NXB: {
                type: String,
                required: [true, "Ma nha xuat ban"],
            },
            S_NgayNhap: {
                type: String,
                required: [true, "Ngay nhap sach"],
            },
            S_NgayCapNhat: {
                type: String,
            },
            ownerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            },
        });

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("Sach", schema);
}
