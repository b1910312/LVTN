module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            BL_Ma: {
                type: String,
                required: [true, "Ma cua binh luan"],
            },
        
            BL_MaKH: {
                type: String,
                required: [true, "Ma cua khach hang"],
            },
            BL_MaSach: {
                type: String,
                required: [true, "Ma cua sach"],
            },
            BL_NoiDung: {
                type: String,
                required: [true, "Noi dung cua binh luan"],
            },
            BL_ReplyId: {
                type: String,
            },
            BL_TrangThai: {
                type: Boolean,
                default: true,
            },
            BL_NgayTao: {
                type: String,
                required: [true, "Ngay tao binh luan"],
            },
            BL_NgayCapNhat: {
                type: String,
            },
        });

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


    return mongoose.model("BinhLuan", schema);
};