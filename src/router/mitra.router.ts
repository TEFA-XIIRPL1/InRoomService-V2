const MitraRoutes = [
  {
    path: '/mitra/minimarket',
    component: () => import('../pages/mitra/MinimarketPage.vue'),
    meta: {
      title: 'Minimarket',
    },
  },
  {
    path: '/mitra/upload',
    component: () => import('../pages/mitra/UploadPage.vue'),
    meta: {
      title: 'Upload',
    },
  },
  {
    path: '/mitra/edit/:id',
    component: () => import('../pages/mitra/EditPage.vue'),
    meta: {
      title: 'Edit',
    },
  },
];

export default MitraRoutes;
