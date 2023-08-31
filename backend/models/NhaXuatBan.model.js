module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            NXB_Ma: {
                type: String,
                required: [true, "Ma cua nha xuat ban sach"],
            },

            NXB_Ten: {
                type: String,
                required: [true, "Ten cua nha xuat ban sach"],
            },
            NXB_Email: {
                type: String,
                required: [true, "Ten cua nha xuat ban sach"],
            },
            NXB_SDT: {
                type: String,
                required: [true, "Ten cua nha xuat ban sach"],
            },
            NXB_NgayTao: {
                type: String,
                required: [true, "Ngay tao nha xuat ban sach"],
            },
            NXB_NgayCapNhat: {
                type: String,
            },
        });


    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    return mongoose.model("NhaXuatBan", schema);
}
