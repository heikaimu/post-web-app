<template>
    <div class="user-page-container">
      <mt-header :style="{background: `${titleBg}`, zIndex: 999}" fixed>
        <router-link to="/main/theme" slot="left">
          <div><i slot="icon" class="fa fa-angle-left fa-lg"></i></div>
        </router-link>
        <router-link to="/background" slot="right">
          <div><i slot="icon" class="fa fa-image fa-lg"></i></div>
        </router-link>
      </mt-header>
      <div class="header-user-ifo" :style="{opacity: 1-mainHeaderOpacity}">
        <div class="avatar">
          <img v-if="loginIfo.data.head_thumb" v-lazy="loginIfo.data.head_thumb"/>
          <i v-else slot="icon" class="fa fa-user fa-lg user-icon"></i>
        </div>
        <p class="name" v-text="loginIfo.data.nickname"></p>
      </div>
      <div class="user-ifo-container">
        <Scroll
          ref="scroll"
          :data="list"
          :startY="parseInt(position)"
          :pullUpLoad="isPullUpLoad"
          :pullDownRefresh="isPullDownRefresh"
          :listenEndScroll="true"
          :listenScroll="true"
          @pullingUp="loadMore"
          @pullingDown="onPullingDown"
          @scrollEnd="scrollEnd"
          @scroll="scroll"
        >
          <div>
            <div class="bg-wrapper" :style="{background: `url(${loginIfo.data.background || userBg}) no-repeat center center / cover`,  transform: `scale(${magnification})`}" ></div>
            <div class="user-ifo-wrapper">
              <div class="avatar" @click="$router.push('/update_head_thumb')" :style="{opacity: mainHeaderOpacity}">
                <img v-if="loginIfo.data.head_thumb" v-lazy="loginIfo.data.head_thumb"/>
                <i v-else slot="icon" class="fa fa-user fa-lg user-icon"></i>
              </div>
              <div class="other-ifo-wrapper" :style="{opacity: mainHeaderOpacity}">
                <div class="ifo">
                  <p class="name" v-text="loginIfo.data.nickname"></p>
                  <p class="age">吧龄：{{loginIfo.data.add_time | getAge}}</p>
                </div>
              </div>
            </div>
            <mt-cell title="编辑个人信息" is-link to="/user_menu"></mt-cell>
            <ul class="page-infinite-list">
              <li v-for="item in list" class="page-infinite-listitem">
                <MyPostItem
                  :data="item"
                ></MyPostItem>
              </li>
            </ul>
          </div>
        </Scroll>
      </div>
    </div>
</template>

<script>
  import Scroll from '@/base/scroll/scroll';
  import MyPostItem from '@/components/post/my-item';
  import { mapGetters } from 'vuex';
  import { getAge } from '@/common/js/time';
  import { getMine } from '@/api/post';
    export default {
      data() {
        return {
          list: [],
          pageId: 1,
          pageSize: 10,
          restNum: 0,
          componentName: 'myPost',
          position: 0,
          isPullUpLoad: true,
          isPullDownRefresh: true,
          showHeaderAndBar: true,
          titleBg: 'rgba(51, 51, 51, 0.1)',
          userBg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521537850349&di=557dffc888a1dafcb1d813050c667a21&imgtype=0&src=http%3A%2F%2Fimg2.dwstatic.com%2Ftv%2F1711%2F373544133017%2F1509588979577.JPG'
        }
      },
      computed: {
        ...mapGetters([
          'loginIfo',
          'scrollIfo'
        ]),
        mainHeaderOpacity() {
          if (this.position < -40) {
            const currentOpacity = this.position < -180 ? 0 : this.position / 180 + 1;
            this.titleBg = `rgba(51, 51, 51, ${1 - currentOpacity})`;
            return currentOpacity;
          } else {
            return 1;
          }
        },
        magnification() {
          let magnification = 1;
          if (this.position >= 0) {
            magnification = 1;
          } else {
            if (this.position > -180) {
              magnification = -this.position / 100 + 1;
            }
          }
          return magnification;
        }
      },
      created() {
        this.pageInit();
      },
      methods: {
        // 初始化数据，主要是获取位置以及离开时的页码方便给pageSize赋值
        pageInit() {
          const indexOfComponent = this.scrollIfo.findIndex((item) => {
            return item.name === this.componentName;
          });
          const componentScrollIfo = this.scrollIfo[indexOfComponent];
          this.position = componentScrollIfo.position || 0;
          this.pageSize = componentScrollIfo.pageId * this.pageSize;
          this._getPostList();
          this.pageId = componentScrollIfo.pageId;
        },
        // 获取列表
        async _getPostList() {
          const params = {
            pageId: this.pageId,
            pageSize: this.pageSize
          }
          const { state, data } = await getMine(params);
          if (state) {
            this.restNum = data.count - ((data.pageId - 1) * data.pageSize + data.list.length);
            if (this.restNum <= 0) this.isPullUpLoad = false; // 上拉加载数据失效
            this.list = this.list.concat(data.list);
          } else {
            this.$refs.scroll.forceUpdate();
          }
        },
        // 上拉加载更多
        loadMore() {
          if (this.restNum > 0) {
            this.pageId += 1;
            this._getPostList();
          }
        },
        // 下拉刷新
        onPullingDown() {
          this.pageId = 1;
          this.list = [];
          this.isPullUpLoad = true;
          this._getPostList();
        },
        // 滚动结束
        scrollEnd(pos) {
          this.position = pos.y;
          this.setScrollIfo();
        },
        // 设置滚动记录
        setScrollIfo() {
          const scrollIfo = {
            name: this.componentName,
            pageId: this.pageId,
            position: this.position
          }
          this.$store.commit('SET_PAGE_SCROLL', scrollIfo);
        },
        // 监听滚动
        scroll(pos) {
          this.position = pos.y;
        }
      },
      components: {
        Scroll,
        MyPostItem
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .user-page-container{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: #f2f2f2;
    .header-user-ifo{
      width: 100px;
      height: 30px;
      left: 50%;
      top: 5px;
      margin-left: -50px;
      z-index: 3444;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      .avatar{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #666;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .name{
        font-size: 14px;
        padding-left: 5px;
        color: #fff;
      }
    }
    .user-bg-wrapper{
      height: 180px;
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      z-index: -1;
    }
    .user-ifo-container {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      .bg-wrapper{
        width: 100%;
        height: 180px;
        transform-origin: 50% 100%;
      }
      .user-ifo-wrapper{
        position: relative;
        height: 100px;
        background: #fff;
        .avatar{
          position: absolute;
          left: 50%;
          margin-left: -35px;
          top: -35px;
          width: 70px;
          height: 70px;
          background: #f2f2f2;
          border: 2px solid #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          overflow: hidden;
          .user-icon{
            color: #666;
            font-size: 34px;
          }
          img{
            max-width: 100%;
            max-height: 100%;
          }
        }
        .other-ifo-wrapper{
          padding-top: 40px;
          width: 100%;
          display: flex;
          justify-content: center;
          .name{
            font-size: 14px;
            padding-top: 5px;
            font-weight: 900;
          }
          .age{
            font-size: 12px;
            padding-top: 5px;
            color: #666;
          }
        }
      }
      .page-infinite-loading {
        display: flex;
        height: 50px;
        justify-content: center;
        align-items: center;
        span{
          display: inline-block;
          margin-left: 5px;
          font-size: 14px;
          color: #666;
        }
      }
      .page-infinite-list{
        background-color: #f2f2f2;
        .page-infinite-listitem {
          margin-bottom: 5px;
          &:first-child {
            border-top: solid 1px #eee;
          }
        }
      }
    }
  }
</style>
