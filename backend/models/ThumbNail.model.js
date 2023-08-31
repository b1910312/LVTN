module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
           TB_MaSach: {
                type: String,
                required: [true, "Ma cua thumbnail"],
            },
           TB_URL: {
                type: String,
                required: [true, "Ten cua thumbnail"],
            },
           TB_NgayTao: {
                type: String,
                required: [true, "Ngay tao thumbnail"],
            },
           TB_NgayCapNhat: {
                type: String,
            },
        });

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


    return mongoose.model("ThumbNail", schema);
};