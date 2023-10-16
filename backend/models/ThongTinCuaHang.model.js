module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            MST: {
                type: String,
                required: [true, "Ma So Thue"],
            },

            TenCuaHang: {
                type: String,
                required: [true, "Ten cua hang"],
            },
            SDT: {
                type: String,
                required: [true, "So dien thoai cua hang"],
            },

            Email: {
                type: String,
                required: [true, "Email cua hang"],
            },
            NgayTao: {
                type: String,
                required: [true, "Ngay tao thông tin"],
            },
            NgayCapNhat: {
                type: String,
            },
        });

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


    return mongoose.model("ThongTinCuaHang", schema);
};