module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            DHT_Ma: {
                type: String,
                required: [true, "Ma cua don hang"],
            },
            DHT_Ho: {
                type: String,
                required: [true, "Ho cua khach hang"],
            },
            DHT_Ten: {
                type: String,
                required: [true, "Ten cua khach hang"],
            },
            DHT_SoDienThoai: {
                type: String,
                required: [true, "So dien thoai cua khach hang"],
            },
            DHT_DiaChi: {
                type: String,
                required: [true, "Dia chi cua khach hang"],
            },
            DHT_PhuongXa: {
                type: String,
                required: [true, "Phuong Xa cua khach hang"],
            },
            DHT_QuanHuyen: {
                type: String,
                required: [true, "Quan Huyenh cua khach hang"],
            },
            DHT_TinhTP: {
                type: String,
                required: [true, "Tinh Thanh Pho cua khach hang"],
            },
            DHT_TrangThai: {
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
            DHT_NgayTao: {
                type: String,
                required: [true, "Ngay tao don hang"],
            },
            DHT_NgayCapNhat: {
                type: String,
            },
        });

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("DonHoanTra", schema);
}
