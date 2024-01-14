const CoRoutes = [
  {
    path: '/checkout/minimarket',
    component: () => import('pages/checkout/MinimarketCo.vue'),
  },
  {
    path: '/checkout/foodbev',
    component: () => import('pages/checkout/FoodCO.vue'),
  },
  {
    path: '/checkout/laundry',
    component: () => import('pages/checkout/LaundryCo.vue'),
  },
];

export default CoRoutes;
