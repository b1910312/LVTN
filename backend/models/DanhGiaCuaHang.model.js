module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            DG_Ma: {
                type: String,
                required: [true, "Ma cua danh gia"],
            },
        
            DG_MaKH: {
                type: String,
                required: [true, "Ma cua khach hang"],
            },
            DG_NoiDung: {
                type: String,
                required: [true, "Noi dung cua danh gia"],
            },
            DG_SoSao: {
                type: Number,
                required: [true, "So sao cua danh gia"],
            },
            DG_NgayTao: {
                type: String,
                required: [true, "Ngay tao danh gia"],
            },
        });

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


    return mongoose.model("DanhGiaCuaHang", schema);
};