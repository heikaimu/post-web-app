## 设置公共路由拦截器
我的，发布，关注，新增主题等功能及页面需要我是登录状态才能操作，
所以我们需要设置一个公共的拦截器判断是否已经登录，
如果未登录则跳转到登录页面，并且在登录成功之后跳转到之前点击的路由页面

* 实现代码

router.js
```
export default new Router({
  routes: [
    {
      path: '/xxx',
      component: xxxComponent,
      meta: {
        requireAuth: true
      }
    }
  ]
})
```

main.js
```
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断前往的路由是否包含有requireAuth, 有则进行登录认证判断, 没有则直接跳转
    if (store.state.loginIfo.isLogin) { // 登录则直接跳转
      next();
    } else { // 未登录则跳转至登录交界面并且将本应该跳转的路由作为参数方便登录成功之后的跳转操作
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
})
```

login.vue
```
export default {
  methods: {
    login() {
      .....
      let redirect = decodeURIComponent(this.$route.query.redirect || '/'); // 需要转码
      this.$router.push(redirect);
    }
  }
}
```
