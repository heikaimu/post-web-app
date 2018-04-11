<template>
  <div class="post-page-container">
    <mt-header title="" style="background: #333">
      <div slot="left" @click="handleBack"><i slot="icon" class="fa fa-angle-left fa-lg"></i></div>
      <div v-if="loginIfo.isLogin && loginIfo.data.ID===details.user_id" slot="right" @click="handleDelete"><i slot="icon" class="fa fa-trash-o fa-lg"></i></div>
    </mt-header>
    <div class="reply-list-container">
      <Scroll
        ref="scroll"
        :data="list"
        :startY="parseInt(position)"
        :pullUpLoad="isPullUpLoad"
        :pullDownRefresh="isPullDownRefresh"
        :listenEndScroll="true"
        @pullingUp="loadMore"
        @pullingDown="onPullingDown"
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
                @deleteFloor="deleteFloor"
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
  import { getDetails, deleteOne } from '@/api/post';
  import { getList, addOne, deleteFloor } from '@/api/reply';
  import { Indicator, Toast, MessageBox } from 'mint-ui';
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
        position: 0,
        componentName: 'reply',
        position: 0,
        isPullUpLoad: true,
        isPullDownRefresh: true,
        showHeaderAndBar: true
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
        'loginIfo',
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
          postId: this.$route.params.id,
          pageId: this.pageId,
          pageSize: this.pageSize
        }
        const { state, data } = await getList(params);
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
      // 保存回复
      async saveMessage(params) {
        params.postId = this.details.ID;
        Indicator.open('保存中...');
        const { state, message } = await addOne(params);
        if (state) {
          this.list = [];
          this.pageId = 1;
          this.isPullUpLoad = true;
          this._getPostList();
        }
        Indicator.close();
        Toast({
          message: message,
          position: 'bottom',
          duration: 2000
        });
      },
      handleBack() {
        history.go(-1);
      },
      // 删除改帖子
      handleDelete() {
        const _this = this;
        MessageBox.confirm('你真的要删除当前帖子吗?').then(action => {
          _this._delete();
        });
      },
      async _delete() {
        Indicator.open('删除中...');
        const params = {
          postId: this.details.ID
        };
        const { state, message } = await deleteOne(params);
        Indicator.close();
        Toast({
          message: message,
          position: 'bottom',
          duration: 2000
        });
        if (state) {
          this.$router.back();
        }
      },
      // 删除某一楼
      deleteFloor(id) {
        const _this = this;
        MessageBox.confirm('你真的要删除当前楼层吗?').then(action => {
          _this._deleteFloor(id);
        });
      },
      async _deleteFloor(id) {
        Indicator.open('删除中...');
        const params = {
          replyId: id
        };
        const { state, message } = await deleteFloor(params);
        Indicator.close();
        if (state) {
          this.list = [];
          this.pageId = 1;
          this.isPullUpLoad = true;
          this._getPostList();
        }
        Toast({
          message: message,
          position: 'bottom',
          duration: 2000
        });
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
