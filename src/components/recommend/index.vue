<template>
  <div class="recommend-page-container">
    <mt-header title="新动态" style="background: #333">
      <!--<router-link to="/login" slot="right">-->
        <!--<div><i slot="icon" class="fa fa-bell-o fa-lg"></i><mt-badge size="small" type="error">10</mt-badge></div>-->
      <!--</router-link>-->
    </mt-header>
    <div class="page-infinite-wrapper" ref="wrapper">
      <ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
        <li v-for="item in list" class="page-infinite-listitem">
          <PostItem :data="item" showBarName="true"></PostItem>
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
  import PostItem from '@/components/post/item';
  import { getPublish } from '@/api/post';
    export default {
      data() {
        return {
          details: {},
          list: [],
          pageId: 1,
          pageSize: 15,
          restNum: 0,
          loading: false,
          allLoaded: false,
          showPostPage: false
        }
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
          const { state, message, data } = await getPublish(params);
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
        PostItem
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .recommend-page-container{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    .page-infinite-listitem {
      border-bottom: solid 1px #eee;
      &:first-child {
        border-top: solid 1px #eee;
      }
    }
    .page-infinite-wrapper {
      position: absolute;
      left: 0;
      right: 0;
      top: 40px;
      bottom: 0;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
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
  }



</style>
