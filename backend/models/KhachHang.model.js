module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            TKKH_Ma: {
                type: String,
                required: [true, "Ma cua khach hang"],
            },
            TKKH_Ten: {
                type: String,
                required: [true, "Ten cua khach hang"],
            },
            TKKH_Email: {
                type: String,
                required: [true, "Email cua khach hang"],
            },
            TKKH_MatKhau: {
                type: String,
                required: [true, "Ten cua khach hang"],
            },
            TKKH_GioHang: {
                type: String,
            },
            TKKH_NgayTao: {
                type: String,
                required: [true, "Ngay tao tai khoan khach hang"],
            },
            TKKH_NgayCapNhat: {
                type: String,
            },
        });


    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    return mongoose.model("KhachHang", schema);
}
