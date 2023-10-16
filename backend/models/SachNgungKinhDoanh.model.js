module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            SNKD_Ma: {
                type: String,
                required: [true, "Ma cua dau sach"],
            },

            SNKD_Ten: {
                type: String,
                required: [true, "Ten sach"],
            },
            SNKD_TacGia: {
                type: String,
                required: [true, "Tac gia"],
            },
            SNKD_Gia: {
                type: Number,
                required: [true, "Gia ban ra cua sach"],
            },
            SNKD_TheLoai: {
                type: String,
                required: [true, "Ma the loai sach"],
            },
            SNKD_NXB: {
                type: String,
                required: [true, "Ma nha xuat ban"],
            },
            SNKD_NgayNhap: {
                type: String,
                required: [true, "Ngay nhap sach"],
            },
            SNKD_NgayCapNhat: {
                type: String,
            },
            SNKD_NgayXoa: {
                type: String,
                required: [true, "Ngay ngung kinh doanh"],
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

    return mongoose.model("SachNgungKinhDoanh", schema);
}
