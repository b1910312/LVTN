module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            HMH_Ma: {
                type: String,
                required: [true, "Ma cua hinh minh hoa"],
            },
        
            HMH_MaSach: {
                type: String,
                required: [true, "Ma cua sach"],
            },
            HMH_Ten: {
                type: String,
                required: [true, "Ten cua hinh minh hoa"],
            },
            HMH_NgayTao: {
                type: String,
                required: [true, "Ngay tao hinh minh hoa"],
            },
            HMH_NgayCapNhat: {
                type: String,
            },
        });

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


    return mongoose.model("HinhMinhHoa", schema);
};