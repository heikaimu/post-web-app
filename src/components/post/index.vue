<template>
  <div class="post-list-page-container">
    <mt-header :title="details.name" style="background: #333">
      <router-link to="/main/theme" slot="left">
        <div><i slot="icon" class="fa fa-angle-left fa-lg"></i></div>
      </router-link>
    </mt-header>
    <div class="page-infinite-wrapper" ref="wrapper">
      <ThemeDetails
        :data="details"
        @refreshDetails="_getDetails"
      ></ThemeDetails>
      <ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
        <li v-for="item in list" class="page-infinite-listitem">
          <PostItem :data="item"></PostItem>
        </li>
      </ul>
      <p v-show="loading" class="page-infinite-loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        <span>加载中...</span>
      </p>
    </div>
    <!--发帖-->
    <ReplyMessage
      :showTitle="true"
      @saveMessage="saveMessage"
    >我要发帖...</ReplyMessage>
  </div>
</template>

<script>
  import PostItem from '@/components/post/item';
  import ThemeDetails from '@/components/theme/details';
  import ReplyMessage from '@/base/reply-message/index';
  import { Indicator, Toast } from 'mint-ui';
  import { getDetails } from '@/api/theme';
  import { getList, addOne } from '@/api/post';
  export default {
    data() {
      return {
        details: {},
        list: [],
        pageId: 1,
        pageSize: 10,
        restNum: 0,
        loading: false,
        allLoaded: false
      }
    },
    mounted() {
      this._getDetails();
      this._getPostList();
    },
    methods: {
      // 获取贴吧详情
      async _getDetails() {
        const id = this.$route.params.id;
        const params = {
          themeId: id
        }
        const { state, message, data } = await getDetails(params);
        if (state) {
          this.details = data;
        }
      },
      // 获取帖子列表
      async _getPostList() {
        this.loading = true;
        const id = this.$route.params.id;
        const params = {
          themeId: id,
          pageId: this.pageId,
          pageSize: this.pageSize
        }
        const { state, message, data } = await getList(params);
        if (state) {
          this.restNum = data.count - ((data.pageId - 1) * data.pageSize + data.list.length);
          this.list = this.list.concat(data.list);
          this.loading = false;
        }
      },
      // 发帖
      async saveMessage(params) {
        params.themeId = this.$route.params.id;
        Indicator.open('保存中...');
        const { state, message } = await addOne(params);
        if (state) {
          this.list = [];
          this.pageId = 1;
          this._getPostList();
        }
        Indicator.close();
        Toast({
          message: message,
          position: 'bottom',
          duration: 2000
        });
      },
      loadMore() {
        if (this.restNum > 0) {
          this.pageId += 1;
          this._getPostList();
        }
      }
    },
    components: {
      PostItem,
      ThemeDetails,
      ReplyMessage
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .post-list-page-container{
    position: fixed;
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
      bottom: 50px;
      background-color: #f2f2f2;
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
