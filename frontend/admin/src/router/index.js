import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/dashboard' },
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: 'dashboard',
          component: () => import('../pages/dashboard.vue'),
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
          name: 'SachNgungKinhDoanh',
          path: 'quanlysachngungkinhdoanh',
          component: () => import('@/pages/QLSachNgungKD/QuanLySachNgungKD.vue')
        },
        {
          name: 'NXBSua',
          path: 'quanlynxb/suanxb/:id',
          component: () => import('@/pages/QLNXB/suanxb.vue')
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
