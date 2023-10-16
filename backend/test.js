const axios = require('axios');
const fs = require('fs/promises'); // Import fs/promises để sử dụng promises-based fs methods

// Danh sách các địa chỉ truy vấn
const queryAddresses = [
  'http://localhost:3000/api/avatar',
  'http://localhost:3000/api/banner',
  'http://localhost:3000/api/bestsale',
  'http://localhost:3000/api/binhluan',
  'http://localhost:3000/api/chitietdonhang',
  'http://localhost:3000/api/chitietdonhoantra',
  'http://localhost:3000/api/chitietgiohang',
  'http://localhost:3000/api/cuoctrochuyen',
  'http://localhost:3000/api/danhgia',
  'http://localhost:3000/api/danhgiacuahang',
  'http://localhost:3000/api/diachi',
  'http://localhost:3000/api/donhang',
  'http://localhost:3000/api/donhoantra',
  'http://localhost:3000/api/giohang',
  'http://localhost:3000/api/hangmuc',
  'http://localhost:3000/api/hinhminhhoa',
  'http://localhost:3000/api/khachhang',
  'http://localhost:3000/api/lichsutimkiem',
  'http://localhost:3000/api/lienhe',
  'http://localhost:3000/api/loaiuudai',
  'http://localhost:3000/api/logo',
  'http://localhost:3000/api/magiamgia',
  'http://localhost:3000/api/nentang',
  'http://localhost:3000/api/nguoidunguudai',
  'http://localhost:3000/api/nhanvien',
  'http://localhost:3000/api/nxb',
  'http://localhost:3000/api/sach',
  'http://localhost:3000/api/sachmoi',
  'http://localhost:3000/api/sachngungkinhdoanh',
  'http://localhost:3000/api/sachuudai',
  'http://localhost:3000/api/sachyeuthich',
  'http://localhost:3000/api/theloai',
  'http://localhost:3000/api/thongtincuahang',
  'http://localhost:3000/api/thongtinkhachhang',
  'http://localhost:3000/api/thongtinnhanvien',
  'http://localhost:3000/api/thumbnail',
  'http://localhost:3000/api/tinnhan',
  'http://localhost:3000/api/uudai',
  'http://localhost:3000/api/vaitro',  // Thêm các địa chỉ truy vấn khác vào đây
];


// Danh sách các địa chỉ truy vấn
const PutQuery = [
    'http://localhost:3000/api/avatar/KBKH001',
    'http://localhost:3000/api/banner/KBS001',
    'http://localhost:3000/api/bestsale/KBS001',
    'http://localhost:3000/api/binhluan/KBBL001',
    'http://localhost:3000/api/chitietdonhang/KBCTDH001',
    'http://localhost:3000/api/chitietdonhoantra/KBCTDHT001',
    'http://localhost:3000/api/chitietgiohang/KBCTGH001',
    'http://localhost:3000/api/cuoctrochuyen/KBCTC001',
    'http://localhost:3000/api/diachi/KBKH001',
    'http://localhost:3000/api/donhang/KBDH001',
    'http://localhost:3000/api/donhoantra/KBDHT001',
    'http://localhost:3000/api/giohang/KBGH001',
    'http://localhost:3000/api/hangmuc/KBHM001',
    'http://localhost:3000/api/hinhminhhoa/KBHMH001',
    'http://localhost:3000/api/khachhang/KBKH001',
    'http://localhost:3000/api/lienhe/KBLH001',
    'http://localhost:3000/api/loaiuudai/KBLUD001',
    'http://localhost:3000/api/logo/KBLG001',
    'http://localhost:3000/api/magiamgia/KBGG02092023',
    'http://localhost:3000/api/nentang/KBKH001',
    'http://localhost:3000/api/nguoidunguudai/KBKH001',
    'http://localhost:3000/api/nhanvien/KBNV001',
    'http://localhost:3000/api/nxb/KBNXB001',
    'http://localhost:3000/api/sach/KBS001',
    'http://localhost:3000/api/sachmoi/KBS001',
    'http://localhost:3000/api/sachuudai/KBSUD001',
    'http://localhost:3000/api/sachyeuthich/KBKH001',
    'http://localhost:3000/api/theloai/KBTL001',
    'http://localhost:3000/api/thongtincuahang/08020332',
    'http://localhost:3000/api/thongtinkhachhang/KBKH001',
    'http://localhost:3000/api/thongtinnhanvien/KBNV001',
    'http://localhost:3000/api/thumbnail/KBS001',
    'http://localhost:3000/api/uudai/KBUD001',
    'http://localhost:3000/api/vaitro/KBVT001',  // Thêm các địa chỉ truy vấn khác vào đây
  ];
const postData = [
    { AVT_MaKH: "KBKH001", AVT_URL: 'E:/100CANON1/IMG_9057.JPG', AVT_NgayTao: '12-08-2023' },
    { BN_MaSach: "KBS001", BN_NgayTao: '12-08-2023'},
    { BS_MaSach: "KBS001", BS_NgayTao: '12-08-2023'},
    { BL_Ma: "KBBL001", BL_MaKH: "KBKH001", BL_MaSach: "KBS001", BL_NoiDung: "That's great", BL_Ten: "Nguyễn Thanh Tín", BL_NgayTao: '12-08-2023'},
    { CTDH_Ma: "KBCTDH001", CTDH_MaDH: "KBDH001", CTDH_TenSach: "Con dường bình phàm", CTDH_SoLuong: 2, CTDH_Gia: 250000,  CTDH_ThanhTien: 500000, CTDH_NgayTao: '12-08-2023'},
    { CTDHT_Ma: "KBCTDHT001", CTDHT_MaDH: "KBDHT001", CTDHT_TenSach: "Con dường bình phàm", CTDHT_SoLuong: 2, CTDHT_Gia: 250000,  CTDHT_ThanhTien: 500000, CTDHT_NgayTao: '12-08-2023'},
    { CTGH_Ma: "KBCTGH001", CTGH_MaGH: "KBGH001", CTGH_MaSach: "KBS001", CTGH_SoLuong: 2, CTGH_NgayTao: '12-08-2023'},
    { CTC_Ma: "KBCTC001",  CTC_MaKH: "KBKH001", CTC_MaNV: "KBNV001", CTC_NgayTao: '12-08-2023' },
    { DG_Ma: "KBDG001",  DG_MaKH: "KBKH001", DG_MaSach: "KBS001", DG_SoSao: 5,  DG_NgayTao: '12-08-2023' },
    { DG_Ma: "KBDG001",  DG_MaKH: "KBKH001", DG_NoiDung: "Chất lượng sách rất tốt", DG_SoSao: 5,  DG_NgayTao: '12-08-2023' },
    { DC_MaDT: "KBKH001", DC_DiaChi: "Căn hộ mini hoàn hảo hẻm 391 đường 30 tháng 4", DC_PhuongXa: "Hưng Lợi", DC_QuanHuyen: "Xuân Khánh", DC_TinhTP: "TP Cần Thơ", DC_NgayTao: '12-08-2023'},
    { DH_Ma: "KBDH001", DH_Ho: "Nguyễn", DH_Ten: "Thanh Tín", DH_SoDienThoai: "0984442145", DH_DiaChi: "Căn hộ mini hoàn hảo hẻm 391 đường 30 tháng 4", DH_PhuongXa: "Hưng Lợi", DH_QuanHuyen: "Xuân Khánh", DH_TinhTP: "TP Cần Thơ", DH_NgayTao: '12-08-2023'},
    { DHT_Ma: "KBDHT001", DHT_Ho: "Nguyễn", DHT_Ten: "Thanh Tín", DHT_SoDienThoai: "0984442145", DHT_DiaChi: "Căn hộ mini hoàn hảo hẻm 391 đường 30 tháng 4", DHT_PhuongXa: "Hưng Lợi", DHT_QuanHuyen: "Xuân Khánh", DHT_TinhTP: "TP Cần Thơ", DHT_NgayTao: '12-08-2023'},
    { GH_Ma: "KBGH001",  GH_MaKH: "KBKH001", GH_NgayTao: '12-08-2023' },
    { HM_Ma: "KBHM001",  HM_TenHangMuc: "Đồng", HM_NgayTao: '12-08-2023' },
    { HMH_Ma: "KBHMH001",  HMH_MaSach: "KBS001", HMH_URL: 'E:/100CANON1/IMG_9057.JPG', HMH_NgayTao: '12-08-2023' },
    { TKKH_MaKH: "KBKH001",  TKKH_Email: "minhtran24688@gmail.com", TKKH_MatKhau: "$2a$08$NtvCR6cihjWTgicMJYAt0u.nfMU7v9pRfxzOGSXEQb69ou7FyQX1q", TKKH_NgayTao: '12-08-2023' },
    { LSTK_MaND: "KBKH001", LSTK_TuKhoa: "Sách giáo khoa lớp 2", LSTK_NgayTao: '12-08-2023' },
    { LH_Ma: "KBLH001", LH_Email: "minhtran24680@gmail.com", LH_Ho: "Nguyễn", LH_Ten: "Thanh Tín", LH_NoiDung: "Tôi cần hỗ trợ về việc trả hàng", LH_ChuDe: "Hoàn trả hàng", LH_NgayTao: '12-08-2023'},
    { LUD_Ma: "KBLUD001",  LUD_Ten: "Giảm phí vận chuyển", LUD_NgayTao: '12-08-2023' },
    { LG_MaNXB: "KBLG001",  LG_URL: "E:/100CANON1/IMG_9057.JPG", LG_NgayTao: '12-08-2023' },
    { MGG_MaGiamGia: "KBGG02092023",  MGG_TrangThai: 1, MGG_SoLuong: 50, MGG_MaUuDai:"KBUD001", MGG_NgayTao: '12-08-2023' },
    { NT_MaDT: "KBKH001", NT_TenNenTang:"Facebook",  NT_URL: "https://www.facebook.com/NoAccountFoundOut", NT_NgayTao: '12-08-2023' },
    { NDUD_MaND: "KBKH001",  NDUD_MaUuDai: "KBUD001", NDUD_NgayTao: '12-08-2023' },
    { TKNV_MaNV: "KBNV001",  TKNV_VaiTro: "KBVT001",TKNV_MatKhau: "$2a$08$NtvCR6cihjWTgicMJYAt0u.nfMU7v9pRfxzOGSXEQb69ou7FyQX1q", TKNV_NgayTao: '12-08-2023' },
    { NXB_Ma: "KBNXB001", NXB_Ten: "Nhà xuất bản Mặt Trời mới",NXB_Email: "MatTroiMoi.NXB@gmail.com",NXB_SDT: "0909090909" , NXB_NgayTao: '12-08-2023' },
    { S_Ma: "KBS001", S_Ten: "Con đường bình phàm",S_TacGia: "Hà Kim Xuân", S_NXB: "KBNXB001" ,S_SoLuong: 100, S_Gia: 250000, S_TheLoai:"KBTL001", S_NgayNhap: '12-08-2023' },
    { SM_MaSach: "KBS001", SM_NgayTao: '12-08-2023'},
    { SNKD_Ma: "KBS001", SNKD_Ten: "Con đường bình phàm",SNKD_TacGia: "Hà Kim Xuân", SNKD_NXB: "KBNXB001" , SNKD_Gia: 250000, SNKD_TheLoai:"KBDM001", SNKD_NgayNhap: '12-08-2023', SNKD_NgayCapNhat: "", SNKD_NgayXoa: "13-08-2023" },
    { SUD_MaSach: "KBSUD001",  SUD_MaUuDai: "KBUD001", SUD_NgayTao: '12-08-2023' },
    { SYT_MaKH: "KBKH001",  SYT_MaSach: "KBS001", SYT_NgayTao: '12-08-2023' },
    { TL_Ma: "KBTL001",  TL_Ten: "Truyện ngôn tình", TL_NgayTao: '12-08-2023' },
    { MST: "08020332",  TenCuaHang: "Công TNHH MTV Phát hành sách KingBooks", SDT:"0984442145", Email:"minhtran24680@gmail.com", NgayTao: '12-08-2023' },
    { KH_MaKH: "KBKH001",  KH_HoTen: "Nguyễn Thanh Tín", KH_NgaySinh: "04/09/2001", KH_SoDienThoai: "0984442145", KH_NgayTao: '12-08-2023' },
    { NV_MaNV: "KBNV001",  NV_HoTen: "Nguyễn Thanh Tín", NV_NgaySinh: "04/09/2001", NV_SoDienThoai: "0984442145", NV_Email: "minhtran24680@gmail.com", NV_NgayTao: '12-08-2023' },
    { TB_MaSach: "KBS001", TB_URL: 'E:/100CANON1/IMG_9057.JPG', TB_NgayTao: '12-08-2023' },
    { TN_Ma: "KBTN001",  TN_MaCTC: "KBCTC001", TN_MaND: "KBKH001",TN_NoiDung:"XIN CHÀO!", TN_NgayTao: '12-08-2023' },
    { UD_Ma: "KBUD001",  UD_Ten: "Giảm chi phí vận chuyển 15% tổng giá trị đơn hàng", UD_LoaiUD: "KHLUD001", UD_GiaTriUuDai: 0.15, UD_NgayBatDau:"15-08-2023", UD_NgayKetThuc:"20-08-2023", UD_NgayTao: '12-08-2023' },
    { VT_Ma: "KBVT001",  VT_TenVaiTro: "Admin", VT_NgayTao: '12-08-2023' },

    // Thêm dữ liệu cho các yêu cầu PUT khác vào đây
];
  
const putData = [
    { AVT_MaKH: "KBKH001", AVT_URL: 'E:/100CANON1/IMG_9057.JPG', AVT_NgayTao: '12-08-2023' },
    { BN_MaSach: "KBS001", BN_NgayTao: '12-08-2023'},
    { BS_MaSach: "KBS001", BS_NgayTao: '12-08-2023'},
    { BL_Ma: "KBBL001", BL_MaKH: "KBKH001", BL_MaSach: "KBS001", BL_NoiDung: "That's great", BL_Ten: "Nguyễn Thanh Tín", BL_NgayTao: '12-08-2023'},
    { CTDH_Ma: "KBCTDH001", CTDH_MaDH: "KBDH001", CTDH_TenSach: "Con dường bình phàm", CTDH_SoLuong: 2, CTDH_Gia: 250000,  CTDH_ThanhTien: 500000, CTDH_NgayTao: '12-08-2023'},
    { CTDHT_Ma: "KBCTDHT001", CTDHT_MaDH: "KBDHT001", CTDHT_TenSach: "Con dường bình phàm", CTDHT_SoLuong: 2, CTDHT_Gia: 250000,  CTDHT_ThanhTien: 500000, CTDHT_NgayTao: '12-08-2023'},
    { CTGH_Ma: "KBCTGH001", CTGH_MaGH: "KBGH001", CTGH_MaSach: "KBS001", CTGH_SoLuong: 2, CTGH_NgayTao: '12-08-2023'},
    { CTC_Ma: "KBCTC001",  CTC_MaKH: "KBKH001", CTC_MaNV: "KBNV001", CTC_NgayTao: '12-08-2023' },
    { DC_MaDT: "KBKH001", DC_DiaChi: "Căn hộ mini hoàn hảo hẻm 391 đường 30 tháng 4", DC_PhuongXa: "Hưng Lợi", DC_QuanHuyen: "Xuân Khánh", DC_TinhTP: "TP Cần Thơ", DC_NgayTao: '12-08-2023'},
    { DH_Ma: "KBDH001", DH_Ho: "Nguyễn", DH_Ten: "Thanh Tín", DH_SoDienThoai: "0984442145", DH_DiaChi: "Căn hộ mini hoàn hảo hẻm 391 đường 30 tháng 4", DH_PhuongXa: "Hưng Lợi", DH_QuanHuyen: "Xuân Khánh", DH_TinhTP: "TP Cần Thơ", DH_NgayTao: '12-08-2023'},
    { DHT_Ma: "KBDHT001", DHT_Ho: "Nguyễn", DHT_Ten: "Thanh Tín", DHT_SoDienThoai: "0984442145", DHT_DiaChi: "Căn hộ mini hoàn hảo hẻm 391 đường 30 tháng 4", DHT_PhuongXa: "Hưng Lợi", DHT_QuanHuyen: "Xuân Khánh", DHT_TinhTP: "TP Cần Thơ", DHT_NgayTao: '12-08-2023'},
    { GH_Ma: "KBGH001",  GH_MaKH: "KBKH001", GH_NgayTao: '12-08-2023' },
    { HM_Ma: "KBHM001",  HM_TenHangMuc: "Đồng", HM_NgayTao: '12-08-2023' },
    { HMH_Ma: "KBHMH001",  HMH_MaSach: "KBS001", HMH_URL: 'E:/100CANON1/IMG_9057.JPG', HMH_NgayTao: '12-08-2023' },
    { TKKH_MaKH: "KBKH001",  TKKH_Email: "minhtran24688@gmail.com", TKKH_MatKhau: "$2a$08$NtvCR6cihjWTgicMJYAt0u.nfMU7v9pRfxzOGSXEQb69ou7FyQX1q", TKKH_NgayTao: '12-08-2023' },
    { LH_Ma: "KBLH001", LH_Email: "minhtran24680@gmail.com", LH_Ho: "Nguyễn", LH_Ten: "Thanh Tín", LH_NoiDung: "Tôi cần hỗ trợ về việc trả hàng", LH_ChuDe: "Hoàn trả hàng", LH_NgayTao: '12-08-2023'},
    { LUD_Ma: "KBLUD001",  LUD_Ten: "Giảm phí vận chuyển", LUD_NgayTao: '12-08-2023' },
    { LG_MaNXB: "KBLG001",  LG_URL: "E:/100CANON1/IMG_9057.JPG", LG_NgayTao: '12-08-2023' },
    { MGG_MaGiamGia: "KBGG02092023",  MGG_TrangThai: 1, MGG_SoLuong: 50, MGG_MaUuDai:"KBUD001", MGG_NgayTao: '12-08-2023' },
    { NT_MaDT: "KBKH001", NT_TenNenTang:"Facebook",  NT_URL: "https://www.facebook.com/NoAccountFoundOut", NT_NgayTao: '12-08-2023' },
    { NDUD_MaND: "KBKH001",  NDUD_MaUuDai: "KBUD001", NDUD_NgayTao: '12-08-2023' },
    { TKNV_MaNV: "KBNV001",  TKNV_VaiTro: "KBVT001",TKNV_MatKhau: "$2a$08$NtvCR6cihjWTgicMJYAt0u.nfMU7v9pRfxzOGSXEQb69ou7FyQX1q", TKNV_NgayTao: '12-08-2023' },
    { NXB_Ma: "KBNXB001", NXB_Ten: "Nhà xuất bản Mặt Trời mới",NXB_Email: "MatTroiMoi.NXB@gmail.com",NXB_SDT: "0909090909" , NXB_NgayTao: '12-08-2023' },
    { S_Ma: "KBS001",
     S_Ten: "Con đường bình phàm",
     S_TacGia: "Hà Kim Xuân", 
     S_NXB: "KBNXB001" ,
     S_SoLuong: 100, 
     S_Gia: 250000, 
     S_TheLoai:"KBTL001", 
     S_NgayNhap: '12-08-2023', 
     S_NgayCapNhat: '12-08-2023' },
    { SM_MaSach: "KBS001", SM_NgayTao: '12-08-2023'},
    { SUD_MaSach: "KBSUD001",  SUD_MaUuDai: "KBUD001", SUD_NgayTao: '12-08-2023' },
    { SYT_MaKH: "KBKH001",  SYT_MaSach: "KBS001", SYT_NgayTao: '12-08-2023' },
    { TL_Ma: "KBTL001",  TL_Ten: "Truyện ngôn tình", TL_NgayTao: '12-08-2023' },
    { MST: "08020332",  TenCuaHang: "Công TNHH MTV Phát hành sách KingBooks", SDT:"0984442145", Email:"minhtran24680@gmail.com", NgayTao: '12-08-2023' },
    { KH_MaKH: "KBKH001",  KH_HoTen: "Nguyễn Thanh Tín", KH_NgaySinh: "04/09/2001", KH_SoDienThoai: "0984442145", KH_NgayTao: '12-08-2023' },
    { NV_MaNV: "KBNV001",  NV_HoTen: "Nguyễn Thanh Tín", NV_NgaySinh: "04/09/2001", NV_SoDienThoai: "0984442145", NV_Email: "minhtran24680@gmail.com", NV_NgayTao: '12-08-2023' },
    { TB_MaSach: "KBS001", TB_URL: 'E:/100CANON1/IMG_9057.JPG', TB_NgayTao: '12-08-2023' },
    { UD_Ma: "KBUD001",  UD_Ten: "Giảm chi phí vận chuyển 15% tổng giá trị đơn hàng", UD_LoaiUD: "KHLUD001", UD_GiaTriUuDai: 0.15, UD_NgayBatDau:"15-08-2023", UD_NgayKetThuc:"20-08-2023", UD_NgayTao: '12-08-2023' },
    { VT_Ma: "KBVT001",  VT_TenVaiTro: "Admin", VT_NgayTao: '12-08-2023' },

    // Thêm dữ liệu cho các yêu cầu PUT khác vào đây
];
  

// async function testQueries() {
//     try {
//       for (const address of queryAddresses) {
//         const response = await axios.get(address);
//         const responseData = JSON.stringify(response.data);
  
//         // Ghi dữ liệu vào tệp
//         const fileName = `testfile/Get_function/Output_Of_Get_function_${Date.now()}.json`; // Đặt tên tệp theo thời gian
//         await fs.writeFile(fileName, responseData);
  
//         console.log(`Truy vấn đến ${address} thành công. Dữ liệu đã ghi vào tệp ${fileName}`);
//       }
//     } catch (error) {
//       console.error(`Lỗi khi thực hiện truy vấn:`, error.message);
//     }
//   }

// // Gọi hàm kiểm tra để thực hiện các truy vấn hàng loạt
// testQueries();


async function performPostRequests() {
    try {
      for (let i = 0; i < queryAddresses.length; i++) {
        const route = queryAddresses[i];
        const data = postData[i]; // Sử dụng dữ liệu tương ứng
  
        const response = await axios.post(route, data);
        console.log(`Yêu cầu POST đến ${route} thành công.`);
      }
    } catch (error) {
      console.error(`Lỗi khi thực hiện yêu cầu POST:`, error.message);
    }
  }
  
  // Gọi hàm để thực hiện các yêu cầu POST hàng loạt
  performPostRequests();

// async function performPutRequests() {
//     try {
//       for (let i = 0; i < PutQuery.length; i++) {
//         const route = PutQuery[i];
//         const data = putData[i]; // Sử dụng dữ liệu tương ứng
  
//         const response = await axios.put(route, data);
//         console.log(`Yêu cầu PUT đến ${route} thành công.`);
//       }
//     } catch (error) {
//       console.error(`Lỗi khi thực hiện yêu cầu PUT:`, error.message);
//     }
//   }
  
//   // Gọi hàm để thực hiện các yêu cầu PUT hàng loạt
//   performPutRequests();
  
//   async function testQueries() {
//     try {
//       for (const address of PutQuery) {
//         const response = await axios.get(address);
//         const responseData = JSON.stringify(response.data);
  
//         // Ghi dữ liệu vào tệp
//         const fileName = `testfile/Get_function/Output_Of_GetById_function_${Date.now()}.json`; // Đặt tên tệp theo thời gian
//         await fs.writeFile(fileName, responseData);
  
//         console.log(`Truy vấn đến ${address} thành công. Dữ liệu đã ghi vào tệp ${fileName}`);
//       }
//     } catch (error) {
//       console.error(`Lỗi khi thực hiện truy vấn:`, error.message);
//     }
//   }

// // Gọi hàm kiểm tra để thực hiện các truy vấn hàng loạt
// testQueries();


// async function testQueries() {
//   try {
//     for (const address of PutQuery) {
//       const response = await axios.delete(address);
//       const responseData = JSON.stringify(response.data);
//       // Ghi dữ liệu vào tệp
//       const fileName = `testfile/Get_function/Output_Of_GetById_function_${Date.now()}.json`; // Đặt tên tệp theo thời gian
//       await fs.writeFile(fileName, responseData);

//       console.log(`Truy vấn đến ${address} thành công. Dữ liệu đã ghi vào tệp ${fileName}`);
//     }
//   } catch (error) {
//     console.error(`Lỗi khi thực hiện truy vấn:`, error.message);
//   }
// }

// // Gọi hàm kiểm tra để thực hiện các truy vấn hàng loạt
// testQueries();
