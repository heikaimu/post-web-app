<template>
    <div class="user-page-container">
      <mt-header :title="title" :style="{background: `${titleBg}`}">
        <router-link to="/main/theme" slot="left">
          <div><i slot="icon" class="fa fa-angle-left fa-lg"></i></div>
        </router-link>
        <router-link to="/background" slot="right">
          <div><i slot="icon" class="fa fa-image fa-lg"></i></div>
        </router-link>
      </mt-header>
      <div class="user-bg-wrapper" :style="{background: `url(${loginIfo.data.background || userBg}) no-repeat center center / cover`}" ref="userBg"></div>
      <div class="page-infinite-wrapper" ref="wrapper">
        <div class="blank"></div>
        <div class="user-ifo-wrapper">
          <div class="avatar" @click="$router.push('/update_head_thumb')">
            <img v-lazy="loginIfo.data.head_thumb"/>
          </div>
          <div class="other-ifo-wrapper">
            <div class="ifo">
              <p class="name" v-text="loginIfo.data.nickname"></p>
              <p class="age">吧龄：{{loginIfo.data.add_time | getAge}}</p>
            </div>
          </div>
        </div>
        <mt-cell title="编辑个人信息" is-link to="/user_menu"></mt-cell>
        <ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
          <li v-for="item in list" class="page-infinite-listitem">
            <MyPostItem
              :data="item"
            ></MyPostItem>
          </li>
        </ul>
        <p v-show="loading" class="page-infinite-loading">
          <mt-spinner type="fading-circle"></mt-spinner>
          <span>加载中...</span>
        </p>
      </div>
    </div>
</template>

<script>
  import MyPostItem from '@/components/post/my-item';
  import { mapGetters } from 'vuex';
  import { getAge } from '@/common/js/time';
  import { getMine } from '@/api/post';
    export default {
      data() {
        return {
          list: [],
          pageId: 1,
          pageSize: 15,
          restNum: 0,
          loading: false,
          allLoaded: false,
          showPostPage: false,
          title: '我的',
          titleBg: 'rgba(0, 0, 0, 0.2)',
          userBg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521537850349&di=557dffc888a1dafcb1d813050c667a21&imgtype=0&src=http%3A%2F%2Fimg2.dwstatic.com%2Ftv%2F1711%2F373544133017%2F1509588979577.JPG'
        }
      },
      computed: {
        ...mapGetters([
          'loginIfo'
        ])
      },
      mounted() {
        this._getPostList();
      },
      methods: {
        // 获取帖子列表
        async _getPostList() {
          this.loading = true;
          const params = {
            pageId: this.pageId,
            pageSize: this.pageSize
          }
          const { state, message, data } = await getMine(params);
          console.log(data);
          if (state) {
            this.restNum = data.count - ((data.pageId - 1) * data.pageSize + data.list.length);
            this.list = this.list.concat(data.list);
            this.loading = false;
          }
        },
        loadMore() {
          if (this.restNum > 0) {
            this.pageId += 1;
            this._getPostList();
          }
        }
      },
      components: {
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
    .user-bg-wrapper{
      height: 180px;
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      z-index: -1;
    }
    .page-infinite-wrapper {
      position: absolute;
      left: 0;
      right: 0;
      top: 40px;
      bottom: 0;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      .blank{
        height: 140px;
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
          border: 2px solid #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          overflow: hidden;
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
