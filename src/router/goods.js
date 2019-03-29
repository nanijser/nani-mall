export default [
  {
    path: '/goods/list',
    name: '商品列表',
    component: () => import(/* webpackChunkName: 'goods' */'@/views/goods/list')
  },{
      path: '/goods/detail/:id',
      name: '商品信息',
      component: () => import(/* webpackChunkName: 'goods' */'@/views/goods/detail')
  }
]
