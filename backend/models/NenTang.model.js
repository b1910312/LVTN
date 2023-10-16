module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            NT_MaDT: {
                type: String,
                required: [true, "Ma doi tuong"],
            },
            NT_TenNenTang: {
                type: String,
                required: [true, "TenNenTang"],
            },
            NT_URL: {
                type: String,
                required: [true, "Ten cua avatar"],
            },
            NT_NgayTao: {
                type: String,
                required: [true, "Ngay tao avatar"],
            },
            NT_NgayCapNhat: {
                type: String,
            },
        });

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


    return mongoose.model("NenTang", schema);
};