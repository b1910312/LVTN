module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            MGG_MaGiamGia: {
                type: String,
                required: [true, "Ma giam gia"],
            },
            MGG_TrangThai: {
                type: Number,
                required: [true, "Trang thai cua ma giam gia"],
            },
            MGG_SoLuong: {
                type: Number,
                required: [true, "So luong cua ma giam gia"],
            },
            MGG_MaUuDai: {
                type: String,
                required: [true, "Ma uu dai"],
            },
            MGG_NgayTao: {
                type: String,
                required: [true, "Ngay tao ma giam gia"],
            },
            MGG_NgayCapNhat: {
                type: String,
            },
        });

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


    return mongoose.model("MaGiamGia", schema);
};