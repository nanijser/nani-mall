export default [
  {
    path: '/account/my',
    name: '我的账户',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: 'account' */'@/views/account/my')
  },
  {
      path: '/account/record',
      name: '购买记录',
      meta: { requiresAuth: true },
      component: () => import(/* webpackChunkName: 'account' */'@/views/account/record')
  }
]
