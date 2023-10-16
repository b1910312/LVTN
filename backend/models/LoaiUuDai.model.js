module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            LUD_Ma: {
                type: String,
                required: [true, "Ma cua loai uu dai"],
            },
            LUD_Ten: {
                type: String,
                required: [true, "Ten cua loai uu dai"],
            },
            LUD_NgayTao: {
                type: String,
                required: [true, "Ngay tao loai uu dai"],
            },
            LUD_NgayCapNhat: {
                type: String,
            },
        });

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


    return mongoose.model("LoaiUuDai", schema);
};