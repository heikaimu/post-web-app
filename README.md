## 很久之前我做了贴吧的第一版本，当时功能不够完善，算是学习vue路上的联系项目。
最近想自己又做个项目，思来想去觉得不如把我之前的贴吧重构下，让他功能更完善，代码质量更高，于是乎重构后的贴吧诞生了。

该项目依然是移动端布局，所以手机模式效果最佳，推荐谷歌浏览器打开

[旧版本代码](https://github.com/heikaimu/L-bar)

[新版本项目演示地址](http://heikaimu.top:5000/)

[新版本功能描述帖子地址](http://heikaimu.top:5000/#/post_page/66)

[服务端代码地址](https://github.com/heikaimu/post-server)

## 设置公共路由拦截器
我的，发布，关注，新增主题等功能及页面需要我是登录状态才能操作，
所以我们需要设置一个公共的拦截器判断是否已经登录，
如果未登录则跳转到登录页面，并且在登录成功之后跳转到之前点击的路由页面

* 实现代码

给目的路由添加一个meta，属性为requireAuth，用来判断该路由是否需要登录状态

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

在beforeEach钩子中判断目的路由

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

在登录成功后跳转参数路由地址

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

## 实现列表页面在分页的情况下，跳转时记录位置，返回时候回到之前点击跳转时的位置
在我们查看详情的时候，可能数据已经是加载多页之后的了，之后时候我们要记录状态就要比一页的数据麻烦一些。

首先我们创建滚动的状态管理器（我们以推荐为例）。
```
import * as types from '../mutation-types';

const state = {
  scrollIfo: [
    {
      name: 'recommend',
      pageId: 1,
      position: 0
    }
  ]
}

const mutations = {
  [types.SET_PAGE_SCROLL](state, data) {
    const { name } = data;
    const indexOfComponent = state.scrollIfo.findIndex((item) => {
      return item.name === name;
    });
    state.scrollIfo[indexOfComponent] = data;
  }
}

export default {
  state,
  mutations
}

```

然后使用强大的better-scroll插件来实现div滚动。插件已经封装成了组件，可以直接使用。其中用到了3个prop属性和2个方法。

```
<Scroll
        :data="list"
        :startY="position"
        :pullup="true"
        @scrollToEnd="loadMore"
        :afterScroll="true"
        @scrollEnd="scrollEnd"
      >
        <ul>
          <li v-for="item in list" class="page-infinite-listitem">
            <PostItem :data="item" showBarName="true"></PostItem>
          </li>
        </ul>
      </Scroll>
```

但滚动结束后派发scrollEnd方法记录当前组件的滚动信息到vuex。

```
scrollEnd(pos) {
          const position = pos.y;
          const scrollIfo = {
            name: 'recommend',
            pageId: this.pageId,
            position: position
          }
          this.$store.commit('SET_PAGE_SCROLL', scrollIfo);
        }
```

此时我们保存信息的代码就写完了。接下来就是初始化的时候。

我们进入当前路由，pageId可能有2种情况，常规的1，或者！=1（表明了之前加载了多页数据），所以所以我们需要判断情况给接口传递不同的参数。

```
pageInit() {
          const indexOfComponent = this.scrollIfo.findIndex((item) => {
            return item.name === 'recommend';
          });
          const componentScrollIfo = this.scrollIfo[indexOfComponent];
          this.position = componentScrollIfo.position || 0;
          let params = {};
          if (componentScrollIfo.pageId === 1) { // 如果现在是第一页的数据
            params = {
              pageId: this.pageId,
              pageSize: this.pageSize
            }
          } else { // 如果当前vuex的页码不为1的情况
            params = {
              pageId: 1,
              pageSize: componentScrollIfo.pageId * this.pageSize
            }
            this.pageId = componentScrollIfo.pageId;
          }
          this._getPostList(params);
        },
        // 获取帖子列表
        async _getPostList(params) {
          const { state, data } = await getPublish(params);
          if (state) {
            this.restNum = data.count - ((data.pageId - 1) * data.pageSize + data.list.length);
            this.list = this.list.concat(data.list);
          }
        }
```

如果我们需要某些特定的页面才保存状态则使用路由守卫判断from组件然后重置vuex。

```
beforeRouteEnter (to, from, next) {
      var patrn = /^\/post_page\//;
      if (!patrn.exec(from.fullPath)) {
        const scrollIfo = {
          name: 'recommend',
          pageId: 1,
          position: 0
        }
        store.commit('SET_PAGE_SCROLL', scrollIfo);
      }
      next(vm => {});
    },
```

最终就能实现我们需要的效果。

