module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            DH_Ma: {
                type: String,
                required: [true, "Ma cua don hang"],
            },
            DH_Ho: {
                type: String,
                required: [true, "Ho cua khach hang"],
            },
            DH_Ten: {
                type: String,
                required: [true, "Ten cua khach hang"],
            },
            DH_SoDienThoai: {
                type: String,
                required: [true, "So dien thoai cua khach hang"],
            },
            DH_DiaChi: {
                type: String,
                required: [true, "Dia chi cua khach hang"],
            },
            DH_PhuongXa: {
                type: String,
                required: [true, "Phuong Xa cua khach hang"],
            },
            DH_QuanHuyen: {
                type: String,
                required: [true, "Quan Huyenh cua khach hang"],
            },
            DH_TinhTP: {
                type: String,
                required: [true, "Tinh Thanh Pho cua khach hang"],
            },
            DH_TrangThai: {
                type: Number,
                default: 0,
                //Các trạng thái
                //      - trạng thái 0 khi đơn hàng chưa xác nhận
                //      - trạng thái 1 khi đơn hàng đã được xác nhận
                //      - trạng thái 2 khi đơn hàng đã được thanh toán
                //      - trạng thái 3 khi đơn hàng đang vận chuyển
                //      - trạng thái 4 khi đơn hàng đang giao 
                //      - trạng thái 5 khi đơn hàng đã được giao
            },
            DH_NgayTao: {
                type: String,
                required: [true, "Ngay tao don hang"],
            },
            DH_NgayCapNhat: {
                type: String,
            },
        });

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("DonHang", schema);
}
