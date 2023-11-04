module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            NK_Ma: {
                type: String,
                required: [true, "Ma cua lan nhap kho"],
            },

            NK_MaSach: {
                type: String,
                required: [true, "Ma sach"],
            },
            NK_MaNV: {
                type: String,
                required: [true, "Ma Nhan vien"],
            },
            NK_SoLuong: {
                type: Number,
                required: [true, "So luong sach duoc nhap"],
            },
            NK_Gia: {
                type: Number,
                required: [true, "Gia sach duoc nhap"],
            },
            NK_NgayNhap: {
                type: String,
                required: [true, "Ngay nhap sach"],
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

    return mongoose.model("NhapKho", schema);
}
