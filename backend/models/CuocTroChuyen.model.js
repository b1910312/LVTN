module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            CTC_Ma: {
                type: String,
                required: [true, "Ma cua cuoc tro chuyen"],
            },
            CTC_MaKH: {
                type: String,
                required: [true, "Ma cua khach hang"],
            },
            CTC_MaNV: {
                type: String,
                required: [true, "Ma cua nhan vien tra loi"],
            },
            CTC_NgayTao: {
                type: String,
                required: [true, "Ngay tao avatar"],
            },
            CTC_NgayCapNhat: {
                type: String,
            },
        });

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


    return mongoose.model("CuocTroChuyen", schema);
};