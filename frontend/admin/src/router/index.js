import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', redirect: '/dashboard', },
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: 'dashboard',
          component: () => import('../pages/dashboard.vue'),
        },
        {
          path: 'quanlybanner',
          component: () => import('../pages/QLBanner/quanlybanner.vue'),
        },
        {
          path: 'account-settings',
          component: () => import('../pages/account-settings.vue'),
        },
        {
          name: 'QLSach',
          path: 'quanlysach',
          component: () => import('../pages/QLSach/quanlysach.vue'),
        },
        {
          name: 'SachThem',
          path: 'quanlysach/themsach',
          component: () => import('@/pages/QLSach/themsach.vue')
        },
        {
          name: 'SachSua',
          path: 'quanlysach/suasach/:id',
          component: () => import('@/pages/QLSach/suasach.vue')
        },
        {
          name: 'QLNXB',
          path: 'quanlynxb',
          component: () => import('../pages/QLNXB/quanlynxb.vue'),
        },
        {
          name: 'NXBThem',
          path: 'quanlymxb/themnxb',
          component: () => import('@/pages/QLNXB/themnxb.vue')
        },
        {
          name: 'NXBSua',
          path: 'quanlynxb/suanxb/:id',
          component: () => import('@/pages/QLNXB/suanxb.vue')
        },
        {
          name: 'QLTheLoai',
          path: 'quanlyTheLoai',
          component: () => import('../pages/QLTheLoai/quanlyTheLoai.vue'),
        },
        {
          name: 'TheLoaiThem',
          path: 'quanlyTheLoai/themTheLoai',
          component: () => import('@/pages/QLTheLoai/themTheLoai.vue')
        },
        {
          name: 'TheLoaiSua',
          path: 'quanlyTheLoai/suaTheLoai/:id',
          component: () => import('@/pages/QLTheLoai/suaTheLoai.vue')
        },
        {
          name: 'SachNgungKinhDoanh',
          path: 'quanlysachngungkinhdoanh',
          component: () => import('@/pages/QLSachNgungKD/QuanLySachNgungKD.vue')
        },
        {
          name: 'QLBinLuan',
          path: 'quanlybinhluan',
          component: () => import('../pages/QLBinhLuan/quanlybinhluan.vue'),
        },
        {
          name: 'QLDonHang',
          path: 'quanlydonhang',
          component: () => import('../pages/QLDonHang/quanlydonhang.vue'),
        },
        {
          name: 'QLNhanVien',
          path: 'quanlynhanvien',
          component: () => import('../pages/QLNhanVien/quanlynhanvien.vue'),
        },
        {
          name: 'QLNguoiDung',
          path: 'quanlynguoidung',
          component: () => import('../pages/QLNguoiDung/quanlynguoidung.vue'),
        },
        {
          name: 'QLDanhGia',
          path: 'quanlydanhgia',
          component: () => import('../pages/QLDangGia/quanlydanhgia.vue'),
        },
        {
          name: 'QLCuocTroChuyen',
          path: 'quanlycuoctrochuyen',
          component: () => import('../pages/QLCuocTroChuyen/quanlycuoctrochuyen.vue'),
        },
        {
          name: 'QLVaiTro',
          path: 'quanlyvaitro',
          component: () => import('../pages/QLVaiTro/quanlyvaitro.vue'),
        },
        {
          name: 'QLHangMuc',
          path: 'quanlyhangmuc',
          component: () => import('../pages/QLHangMuc/quanlyhangmuc.vue'),
        },
        {
          name: 'QLLienHe',
          path: 'quanlylienhe',
          component: () => import('../pages/QLLienHe/quanlylienhe.vue'),
        },
        {
          path: 'typography',
          component: () => import('../pages/typography.vue'),
        },
        {
          path: 'icons',
          component: () => import('../pages/icons.vue'),
        },
        {
          path: 'cards',
          component: () => import('../pages/cards.vue'),
        },
        {
          path: 'tables',
          component: () => import('../pages/tables.vue'),
        },
        {
          path: 'form-layouts',
          component: () => import('../pages/form-layouts.vue'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/blank.vue'),
      children: [
        {
          path: 'login',
          component: () => import('../pages/login.vue'),
        },
        {
          path: 'register',
          component: () => import('../pages/register.vue'),
        },
        {
          path: '/:pathMatch(.*)*',
          component: () => import('../pages/[...all].vue'),
        },
      ],
    },
  ],
})

export default router
