module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            SUD_MaSach: {
                type: String,
                required: [true, "ma cua sach"],
            },
            SUD_MaUuDai: {
                type: String,
                required: [true, "ma cua uu dai"],
            },
            SUD_NgayTao: {
                type: String,
                required: [true, "Ngay tao sach uu dai"],
            },
            SUD_NgayCapNhat: {
                type: String,
            },
        });

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


    return mongoose.model("SachUuDai", schema);
};