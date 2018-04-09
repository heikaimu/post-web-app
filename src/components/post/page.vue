<template>
  <div class="post-page-container">
    <mt-header title="" style="background: #333">
        <div slot="left" @click="handleBack"><i slot="icon" class="fa fa-angle-left fa-lg"></i></div>
    </mt-header>
    <div class="reply-list-container">
      <Scroll
        :data="list"
        :startY="position"
        :pullup="true"
        @scrollToEnd="loadMore"
        :afterScroll="true"
        @scrollEnd="scrollEnd"
      >
        <div>
          <PostDetails :data="details"></PostDetails>
          <ul class="page-infinite-list">
            <li v-for="(item, index) in list" class="page-infinite-listitem">
              <ReplyItem
                :data="item"
                :index="index"
                :builderId="details.user_id"
              ></ReplyItem>
            </li>
          </ul>
        </div>
      </Scroll>
    </div>
    <!--回复-->
    <ReplyMessage
      @saveMessage="saveMessage"
    >我想说点什么...</ReplyMessage>
  </div>
</template>

<script>
  import Scroll from '@/base/scroll/scroll';
  import ThemeDetails from '@/components/theme/details';
  import PostDetails from '@/components/post/details';
  import ReplyItem from '@/components/reply/item';
  import ReplyMessage from '@/base/reply-message/index';
  import { getDetails } from '@/api/post';
  import { getList, addOne } from '@/api/reply';
  import { Indicator, Toast } from 'mint-ui';
  import { mapGetters } from 'vuex';
  import store from '@/store';
  export default {
    data() {
      return {
        details: {},
        list: [],
        pageId: 1,
        pageSize: 10,
        restNum: 0,
        allLoaded: false,
        position: 0
      }
    },
    beforeRouteEnter (to, from, next) { // 只有当从帖子详情页面路由过来的时候才回到之前状态，其余状态都重置
      var patrn = /^\/sub_reply\//;
      if (!patrn.exec(from.fullPath)) {
        const scrollIfo = {
          name: 'reply',
          pageId: 1,
          position: 0
        }
        store.commit('SET_PAGE_SCROLL', scrollIfo);
      }
      next(vm => {});
    },
    computed: {
      ...mapGetters([
        'scrollIfo'
      ])
    },
    created() {
      this._getDetails();
      this.pageInit();
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
      pageInit() {
        const indexOfComponent = this.scrollIfo.findIndex((item) => {
          return item.name === 'reply';
        });
        const componentScrollIfo = this.scrollIfo[indexOfComponent];
        this.position = componentScrollIfo.position || 0;
        let params = {};
        const id = this.$route.params.id;
        if (componentScrollIfo.pageId === 1) { // 如果现在是第一页的数据
          params = {
            postId: id,
            pageId: this.pageId,
            pageSize: this.pageSize
          }
        } else { // 如果当前vuex的页码不为1的情况
          params = {
            postId: id,
            pageId: 1,
            pageSize: componentScrollIfo.pageId * this.pageSize
          }
          this.pageId = componentScrollIfo.pageId;
        }
        this._getReplyList(params);
      },
      async _getReplyList(params) {
        const { state, data } = await getList(params);
        if (state) {
          this.restNum = data.count - ((data.pageId - 1) * data.pageSize + data.list.length);
          this.list = this.list.concat(data.list);
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
          const params = {
            postId: this.$route.params.id,
            pageId: this.pageId,
            pageSize: this.pageSize
          }
          this._getReplyList(params);
        }
        Indicator.close();
        Toast({
          message: message,
          position: 'bottom',
          duration: 2000
        });
      },
      // 加载更多
      loadMore() {
        if (this.restNum > 0) {
          this.pageId += 1;
          const params = {
            postId: this.$route.params.id,
            pageId: this.pageId,
            pageSize: this.pageSize
          }
          this._getReplyList(params);
        }
      },
      // 滚动结束
      scrollEnd(pos) {
        const position = pos.y;
        const scrollIfo = {
          name: 'reply',
          pageId: this.pageId,
          position: position
        }
        this.$store.commit('SET_PAGE_SCROLL', scrollIfo);
      },
      handleBack() {
        history.go(-1);
      }
    },
    components: {
      ReplyItem,
      ThemeDetails,
      PostDetails,
      ReplyMessage,
      Scroll
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
    .reply-list-container {
      position: absolute;
      left: 0;
      right: 0;
      top: 40px;
      bottom: 50px;
      background-color: #f2f2f2;
    }
  }



</style>
