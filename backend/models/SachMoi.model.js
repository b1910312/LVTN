module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            SM_MaSach: {
                type: String,
                required: [true, "Ma cua sach"],
            },
            SM_TrangThai: {
                type: Number,
                default: 1,
                //Trang thai banner: (1) đang hiển thị, (0) đẫ ẩn
            },
            SM_NgayTao: {
                type: String,
                required: [true, "Ngay tao sach moi"],
            },
            SM_NgayCapNhat: {
                type: String,
            },
        });

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


    return mongoose.model("SachMoi", schema);
};