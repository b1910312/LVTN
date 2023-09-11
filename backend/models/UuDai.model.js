module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            UD_Ma: {
                type: String,
                required: [true, "Ma cua dau uu dai"],
            },

            UD_Ten: {
                type: String,
                required: [true, "Ten uu dai"],
            },
            UD_LoaiUD: {
                type: String,
                required: [true, "Loai uu dai"],
            },
            UD_GiaTriUuDai: {
                type: Number,
                required: [true, "Gia tri uu dai"],
            },
            UD_NgayBatDau: {
                type: Number,
                required: [true, "ngay bat dau uu dai"],
            },
            UD_NgayKetThuc: {
                type: Number,
                required: [true, "Ngay ket thuc uu dai"],
            },
            UD_NgayTao: {
                type: String,
                required: [true, "Ngay tao uu dai"],
            },
            UD_NgayCapNhat: {
                type: String,
            },
            ownerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            },
        }
    );

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("UuDai", schema);
}
