module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            TN_Ma: {
                type: String,
                required: [true, "Ma cua tin nhan"],
            },
            TN_MaCTC: {
                type: String,
                required: [true, "Ma cua cuoc tro chuyen"],
            },
            TN_MaND: {
                type: String,
                required: [true, "Ma cua nguoi nhan tin"],
            },
            TN_NoiDung: {
                type: String,
                required: [true, "Noi dung cua tin nhan"],
            },
            TN_NgayTao: {
                type: String,
                required: [true, "Ngay tao tin nhan"],
            }
        });

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


    return mongoose.model("TinNhan", schema);
};