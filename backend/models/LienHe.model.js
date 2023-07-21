module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            LH_Ma: {
                type: String,
                required: [true, "Ma cua lien he"],
            },
        
            LH_Email: {
                type: String,
                required: [true, "Email cua khach hang"],
            },
            LH_Ho: {
                type: String,
                required: [true, "Ho cua khach hang"],
            },
            LH_Ten: {
                type: String,
                required: [true, "Ten cua khach hang"],
            },
            LH_NoiDung: {
                type: String,
                required: [true, "Noi dung cua lien he"],
            },
            LH_TrangThai: {
                type: Boolean,
                default: false,
            },
            LH_NgayTao: {
                type: String,
                required: [true, "Ngay tao lien he"],
            },
            LH_NgayCapNhat: {
                type: String,
             },
        });

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


    return mongoose.model("LienHe", schema);
};