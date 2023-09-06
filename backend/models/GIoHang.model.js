module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            GH_Ma: {
                type: String,
                required: [true, "Ma cua gio hang"],
            },
            GH_MaKH: {
                type: String,
                required: [true, "Ma cua khach hang"],
            },
            GH_NgayTao: {
                type: String,
                required: [true, "Ngay tao gia hang"],
            },
            GH_NgayCapNhat: {
                type: String,
            },
        });

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("GioHang", schema);
}
