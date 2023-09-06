module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            LSTK_Ma: {
                type: String,
                required: [true, "Ma cua tim kiem"],
            },
            LSTK_MaND: {
                type: String,
                required: [true, "Ma cua nguoi dung"],
            },
            LSTK_TuKhoa: {
                type: String,
                required: [true, "Tu khoa tim kiem"],
            },
            LSTK_NgayTao: {
                type: String,
            },
        });

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


    return mongoose.model("LichSuTimKiem", schema);
};