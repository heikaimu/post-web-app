<template>
  <div class="post-page-container">
    <mt-header title="" style="background: #333">
        <div slot="left" @click="handleBack"><i slot="icon" class="fa fa-angle-left fa-lg"></i></div>
    </mt-header>
    <div class="page-infinite-wrapper" ref="wrapper">
      <PostDetails :data="details"></PostDetails>
      <ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
        <li v-for="(item, index) in list" class="page-infinite-listitem">
          <ReplyItem
            :data="item"
            :index="index"
            :builderId="details.user_id"
          ></ReplyItem>
        </li>
      </ul>
      <p v-show="loading" class="page-infinite-loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        <span>加载中...</span>
      </p>
    </div>
    <!--回复-->
    <ReplyMessage
      @saveMessage="saveMessage"
    >我想说点什么...</ReplyMessage>
  </div>
</template>

<script>
  import ThemeDetails from '@/components/theme/details';
  import PostDetails from '@/components/post/details';
  import ReplyItem from '@/components/reply/item';
  import ReplyMessage from '@/base/reply-message/index';
  import { getDetails } from '@/api/post';
  import { getList, addOne } from '@/api/reply';
  import { Indicator, Toast } from 'mint-ui';
  export default {
    data() {
      return {
        details: {},
        list: [],
        pageId: 1,
        pageSize: 10,
        restNum: 0,
        loading: false,
        allLoaded: false,
        loading: false
      }
    },
    mounted() {
      this._getDetails();
      this._getReplyList();
      this.loading = true;
    },
    methods: {
      // 获取帖子详情
      async _getDetails() {
        const id = this.$route.params.id;
        const params = {
          postId: id
        }
        const { data } = await getDetails(params);
        this.details = data;
      },
      // 获取回复列表
      async _getReplyList() {
        this.loading = true;
        const id = this.$route.params.id;
        const params = {
          postId: id,
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
      // 保存回复
      async saveMessage(params) {
        params.postId = this.details.ID;
        Indicator.open('保存中...');
        const { state, message } = await addOne(params);
        if (state) {
          this.list = [];
          this.pageId = 1;
          this._getReplyList();
        }
        Indicator.close();
        Toast({
          message: message,
          position: 'bottom',
          duration: 2000
        });
      },
      loadMore() {
        if (this.restNum > 0 && this.loading) {
          this.pageId += 1;
          this._getReplyList();
        }
      },
      handleBack() {
        history.go(-1);
      }
    },
    components: {
      ReplyItem,
      ThemeDetails,
      PostDetails,
      ReplyMessage
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .page-infinite-listitem {
    border-bottom: solid 1px #eee;
    &:first-child {
      border-top: solid 1px #eee;
    }
  }
  .post-page-container{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: #fff;
    z-index: 23;
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
