require('dotenv').config();
const cors = require("cors");

const express = require('express');
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000; // Có thể thay đổi cổng tùy ý
const config = require("./config");
const today = getToday();


const setupSachRoutes                             = require("./routes/sach.routes");
const setupSachNgungKinhDoanhRoutes               = require("./routes/sachngungkinhdoanh.routes");
const setupKhachHangRoutes                        = require("./routes/khachhang.routes");
const setupNhanVienRoutes                         = require("./routes/nhanvien.routes");
const setupThongTinKhachHangRoutes                = require("./routes/thongtinkhachhang.routes");
const setupThongTinNhanVienRoutes                 = require("./routes/thongtinnhanvien.routes");
const setupTheLoaiRoutes                          = require("./routes/theloai.routes");
const setupNXBRoutes                              = require("./routes/nxb.routes");
const setupGioHangRoutes                          = require("./routes/giohang.routes");
const setupDonHangRoutes                          = require("./routes/donhang.routes");
const setupChiTietDonHangRoutes                   = require("./routes/chitietdonhang.routes");
const setupChiTietGioHangRoutes                   = require("./routes/chitietgiohang.routes");   
const setupAvatarRoutes                           = require("./routes/avatar.routes");
const setupLogoRoutes                             = require("./routes/logo.routes");
const setupHinhMinhHoaRoutes                      = require("./routes/hinhminhhoa.routes");
const setupBinhLuanRoutes                         = require("./routes/binhluan.routes");
const setupDanhGiaRoutes                          = require("./routes/danhgia.routes");
const setupDanhGiaCuaHangRoutes                   = require("./routes/danhgiacuahang.routes");
const setupLienHeRoutes                           = require("./routes/lienhe.routes");
const setupDiaChiRoutes                           = require("./routes/diachi.routes");
const setupDonHoanTraRoutes                       = require("./routes/donhoantra.routes");
const setupChiTietDonHoanTraRoutes                = require("./routes/chitietdonhoantra.routes");
const setupBannerRoutes                           = require("./routes/banner.routes");
const setupBestSaleRoutes                         = require("./routes/bestsale.routes");
const setupCuocTroChuyenRoutes                    = require("./routes/cuoctrochuyen.routes");
const setupHangMucRoutes                          = require("./routes/hangmuc.routes");
const setupLichSuTimKiemRoutes                    = require("./routes/lichsutimkiem.routes");
const setupLoaiUuDaiRoutes                        = require("./routes/loaiuudai.routes");
const setupMaGiamGiaRoutes                        = require("./routes/magiamgia.routes");
const setupNenTangRoutes                          = require("./routes/nentang.routes");
const setupNguoiDungUuDaiRoutes                   = require("./routes/nguoidunguudai.routes");
const setupSachUuDaiRoutes                        = require("./routes/sachuudai.routes");
const setupSachYeuThichRoutes                     = require("./routes/sachyeuthich.routes");
const setupThongTinCuaHangRoutes                  = require("./routes/thongtincuahang.routes");
const setupThumbNailRoutes                        = require("./routes/thumbnail.routes");
const setupTinNhanRoutes                          = require("./routes/tinnhan.routes");
const setupUuDaiRoutes                            = require("./routes/uudai.routes");
const setupVaiTroRoutes                           = require("./routes/vaitro.routes");


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
setupAvatarRoutes(app);
setupLogoRoutes(app);
setupHinhMinhHoaRoutes(app);
setupBinhLuanRoutes(app);
setupDanhGiaRoutes(app);
setupDanhGiaCuaHangRoutes(app);
setupLienHeRoutes(app);
setupSachNgungKinhDoanhRoutes(app);
setupDiaChiRoutes(app);
setupDonHoanTraRoutes(app);
setupChiTietDonHoanTraRoutes(app);
setupBannerRoutes(app);
setupBestSaleRoutes(app);
setupCuocTroChuyenRoutes(app);
setupHangMucRoutes(app);
setupLichSuTimKiemRoutes(app);
setupLoaiUuDaiRoutes(app);
setupMaGiamGiaRoutes(app);
setupNenTangRoutes(app);
setupNguoiDungUuDaiRoutes(app);
setupSachUuDaiRoutes(app);
setupSachYeuThichRoutes(app);
setupThongTinCuaHangRoutes(app);
setupThumbNailRoutes(app);
setupTinNhanRoutes(app);
setupUuDaiRoutes(app);
setupVaiTroRoutes(app);