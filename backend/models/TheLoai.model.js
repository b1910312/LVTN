module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            TL_Ma: {
                type: String,
                required: [true, "Ma cua the loai sach"],
            },

            TL_Ten: {
                type: String,
                required: [true, "Ten cua the loai sach"],
            },
            TL_NgayTao: {
                type: String,
                required: [true, "Ngay tao the loai sach"],
            },
            TL_NgayCapNhat: {
                type: String,
            },
        });

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("TheLoai", schema);
}
