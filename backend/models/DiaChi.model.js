module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
           DC_MaDT: {
                type: String,
                required: [true, "Ma cua Doi tuong"],
            },
           DC_DiaChi: {
                type: String,
                required: [true, "Ten duong, so nha cua dia chi"],
            },
            DC_PhuongXa: {
                type: String,
                required: [true, "Phuong, Xa cua dia chi"],
            },
            DC_QuanHuyen: {
                type: String,
                required: [true, "Quan, Huyen cua dia chi"],
            },
            DC_TinhTP: {
                type: String,
                required: [true, "Tinh, Thanh pho cua dia chi"],
            },
           DC_NgayTao: {
                type: String,
                required: [true, "Ngay tao avatar"],
            },
           DC_NgayCapNhat: {
                type: String,
            },
        });

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


    return mongoose.model("DiaChi", schema);
};