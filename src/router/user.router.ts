const UserRoutes = [
  {
    path: '/minimarket',
    component: () => import('../pages/user/MinimarketPage.vue'),
    meta: {
      title: 'Minimarket',
    },
  },
  {
    path: '/foodbev',
    component: () => import('../pages/user/FoodPage.vue'),
    meta: {
      title: 'Food Beverage',
    },
  },
  {
    path: '/laundry',
    component: () => import('../pages/user/LaundryPage.vue'),
    meta: {
      title: 'Laundry',
    },
  },
];

export default UserRoutes;
