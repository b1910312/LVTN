module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            AVT_Ma: {
                type: String,
                required: [true, "Ma cua avatar"],
            },

            AVT_MaKH: {
                type: String,
                required: [true, "Ma cua khach hang"],
            },
            AVT_Ten: {
                type: String,
                required: [true, "Ten cua avatar"],
            },
            AVT_NgayTao: {
                type: String,
                required: [true, "Ngay tao avatar"],
            },
            AVT_NgayCapNhat: {
                type: String,
            },
        });

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


    return mongoose.model("Avatar", schema);
};