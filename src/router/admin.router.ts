const AdminRoutes = [
  {
    path: '/admin/foodbev',
    component: () => import('../pages/admin/FoodPage.vue'),
    meta: {
      title: 'Food & beverage',
    },
  },
  {
    path: '/admin/minimarket',
    component: () => import('pages/admin/MarketPage.vue'),
    meta: {
      title: 'Minimarket',
    },
  },
  {
    path: '/admin/partners',
    component: () => import('pages/admin/PartnerPage.vue'),
    meta: {
      title: 'Partner',
    },
  },
  {
    path: '/admin/partners/:id',
    component: () => import('pages/admin/DetailPage.vue'),
    meta: {
      title: 'Partner',
    },
  },
  {
    path: '/admin/summarize',
    component: () => import('pages/admin/ReportDataPage.vue'),
    meta: {
      title: 'Report Data',
    },
  },
];

export default AdminRoutes;
