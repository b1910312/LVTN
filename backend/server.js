require('dotenv').config();
const cors = require("cors");

const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000; // Có thể thay đổi cổng tùy ý
const config = require("./config");
const today = getToday();


const setupSachRoutes                      = require("./routes/sach.routes");
const setupSachNgungKinhDoanhRoutes        = require("./routes/sachngungkinhdoanh.routes");
const setupKhachHangRoutes                 = require("./routes/khachhang.routes");
const setupNhanVienRoutes                  = require("./routes/nhanvien.routes");
const setupThongTinKhachHangRoutes         = require("./routes/thongtinkhachhang.routes");
const setupThongTinNhanVienRoutes          = require("./routes/thongtinnhanvien.routes");
const setupTheLoaiRoutes                   = require("./routes/theloai.routes");
const setupNXBRoutes                       = require("./routes/nxb.routes");
const setupGioHangRoutes                   = require("./routes/giohang.routes");
const setupDonHangRoutes                   = require("./routes/donhang.routes");
const setupChiTietDonHangRoutes            = require("./routes/chitietdonhang.routes");
const setupChiTietGioHangRoutes            = require("./routes/chitietgiohang.routes");   
const setupAvatar                          = require("./routes/avatar.routes");
const setupLogo                            = require("./routes/logo.routes");
const setupHinhMinhHoa                     = require("./routes/hinhminhhoa.routes");
const setupBinhLuan                        = require("./routes/binhluan.routes");
const setupDanhGia                         = require("./routes/danhgia.routes");
const setupDanhGiaCuaHang                  = require("./routes/danhgiacuahang.routes");
const setupLienHe                          = require("./routes/lienhe.routes");
const setupDiaChi                          = require("./routes/diachi.routes");
const setupDonHoanTra                      = require("./routes/donhoantra.routes");
const setupChiTietDonHoanTra               = require("./routes/chitietdonhoantra.routes");


function getToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
}

const db = require("./models");
db.mongoose
    .connect(config.db.url)
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch((error) => {
        console.log("Cannot connect to the database!", error);
        process.exit();
    });

app.get('/', (req, res) => {
    res.send('Server đang ok chưa có bug đâu yên tâm');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

setupSachRoutes(app);
setupKhachHangRoutes(app);
setupNhanVienRoutes(app);
setupThongTinKhachHangRoutes(app);
setupThongTinNhanVienRoutes(app);
setupTheLoaiRoutes(app);
setupNXBRoutes(app);
setupGioHangRoutes(app);
setupDonHangRoutes(app); 
setupChiTietDonHangRoutes(app);
setupChiTietGioHangRoutes(app);
setupAvatar(app);
setupLogo(app);
setupHinhMinhHoa(app);
setupBinhLuan(app);
setupDanhGia(app);
setupDanhGiaCuaHang(app);
setupLienHe(app);
setupSachNgungKinhDoanhRoutes(app);
setupDiaChi(app);
setupDonHoanTra(app);
setupChiTietDonHoanTra(app);