import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory("/"),
    routes: [
        {
            path: '/', redirect: '/trangchu',
        },
        {
            path: '/',
            component: () => import('../layouts/DefaultView.vue'),
            children: [
                {
                    path: 'trangchu',
                    component: () => import('../pages/TrangChu.vue'),
                },
                {
                    path: 'cuahang',
                    component: () => import('../pages/CuaHang.vue'),
                },
                {
                    path: 'chitietsach/:id',
                    component: () => import('../pages/ChiTietSach.vue'),
                },
                {
                    path: 'giohang',
                    component: () => import('../pages/GioHang.vue'),
                },
                {
                    path: 'donhang/:id',
                    component: () => import('../pages/DonHang.vue'),
                },
                {
                    path: 'lienhe',
                    component: () => import('../pages/LienHe.vue'),
                },
                {
                    path: 'trochuyen',
                    component: () => import('../pages/ChatPage.vue'),
                },
                
            ]
        },
        {
            path: '/',
            component: () => import('../layouts/BlackView.vue'),
            children: [
                {
                    path: 'dangnhap',
                    component: () => import('../pages/DangNhap.vue'),
                },
                {
                    path: 'dangky',
                    component: () => import('../pages/DangKy.vue'),
                },
                {
                    path: '/:pathMatch(.*)*',
                    component: () => import('../pages/BlankPage.vue'),
                  },
            ]
        }
    ],
})

export default router
