module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            LG_MaNXB: {
                type: String,
                required: [true, "Ma cua logo"],
            },
            LG_URL: {
                type: String,
                required: [true, "Ten cua logo"],
            },
            LG_NgayTao: {
                type: String,
                required: [true, "Ngay tao logo"],
            },
            LG_NgayCapNhat: {
                type: String,
            },
        });

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


    return mongoose.model("Logo", schema);
};