module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            VT_Ma: {
                type: String,
                required: [true, "Ma cua vai tro"],
            },
            VT_TenVaiTro: {
                type: String,
                required: [true, "Ten cua vai tro"],
            },
            VT_NgayTao: {
                type: String,
                required: [true, "Ngay tao vai tro"],
            },
            VT_NgayCapNhat: {
                type: String,
            },
        });

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


    return mongoose.model("VaiTro", schema);
};