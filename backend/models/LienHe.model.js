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
                
            },
            LH_Ten: {
                type: String,
           
            },
            LH_ChuDe: {
                type: String,
                required: [true, "Chu de cua lien he"],
            },
            LH_NoiDung: {
                type: String,
                required: [true, "Noi dung cua lien he"],
            },
            LH_MaNV: {
                type: String,
                
            },
            LH_NoiDungTraLoi: {
                type: String,
       
            },
            LH_TrangThai: {
                type: Boolean,
                default: 0,
                //Các trạng thái
                //      - trạng thái 0 khi liên hệ chưa được trả lời
                //      - trạng thái 1 khi liên hệ đã được trả lời
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