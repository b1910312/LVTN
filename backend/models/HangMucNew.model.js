module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            HM_Ma: {
                type: String,
                required: [true, "Ma cua hang muc"],
            },
            HM_TenHangMuc: {
                type: String,
                required: [true, "Ten cua hang muc"],
            },
            HM_NgayTao: {
                type: String,
                required: [true, "Ngay tao hang muc"],
            },
            HM_NgayCapNhat: {
                type: String,
            },
        });

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


    return mongoose.model("HangMuc", schema);
};