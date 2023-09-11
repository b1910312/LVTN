module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            SYT_MaKH: {
                type: String,
                required: [true, "Ma cua khach hang"],
            },
            SYT_Sach: {
                type: String,
                required: [true, "Ma cua sach"],
            },
            SYT_NgayTao: {
                type: String,
                required: [true, "Ngay tao yeu thich"],
            },
            SYT_NgayCapNhat: {
                type: String,
            },
        });

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


    return mongoose.model("SachYeuThich", schema);
};