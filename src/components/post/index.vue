<template>
  <div class="post-list-page-container">
    <mt-header :title="details.name" style="background: #333">
      <router-link to="/main/theme" slot="left">
        <div><i slot="icon" class="fa fa-angle-left fa-lg"></i></div>
      </router-link>
    </mt-header>
    <div class="post-list-container">
      <Scroll
        :data="list"
        :startY="position"
        :pullup="true"
        @scrollToEnd="loadMore"
        :afterScroll="true"
        @scrollEnd="scrollEnd"
      >
        <div>
        <ThemeDetails
          :data="details"
          @refreshDetails="_getDetails"
        ></ThemeDetails>
        <ul class="page-infinite-list">
          <li v-for="item in list" class="page-infinite-listitem">
            <PostItem :data="item"></PostItem>
          </li>
        </ul>
        </div>
      </Scroll>
    </div>
    <!--发帖-->
    <ReplyMessage
      :showTitle="true"
      @saveMessage="saveMessage"
    >我要发帖...</ReplyMessage>
  </div>
</template>

<script>
  import Scroll from '@/base/scroll/scroll';
  import PostItem from '@/components/post/item';
  import ThemeDetails from '@/components/theme/details';
  import ReplyMessage from '@/base/reply-message/index';
  import { Indicator, Toast } from 'mint-ui';
  import { getDetails } from '@/api/theme';
  import { getList, addOne } from '@/api/post';
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
      var patrn = /^\/post_page\//;
      if (!patrn.exec(from.fullPath)) {
        const scrollIfo = {
          name: 'post',
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
      // 获取贴吧详情
      async _getDetails() {
        const id = this.$route.params.id;
        const params = {
          themeId: id
        }
        const { state, data } = await getDetails(params);
        if (state) {
          this.details = data;
        }
      },
      pageInit() {
        const indexOfComponent = this.scrollIfo.findIndex((item) => {
          return item.name === 'post';
        });
        const componentScrollIfo = this.scrollIfo[indexOfComponent];
        this.position = componentScrollIfo.position || 0;
        let params = {};
        const id = this.$route.params.id;
        if (componentScrollIfo.pageId === 1) { // 如果现在是第一页的数据
          params = {
            themeId: id,
            pageId: this.pageId,
            pageSize: this.pageSize
          }
        } else { // 如果当前vuex的页码不为1的情况
          params = {
            themeId: id,
            pageId: 1,
            pageSize: componentScrollIfo.pageId * this.pageSize
          }
          this.pageId = componentScrollIfo.pageId;
        }
        this._getPostList(params);
      },
      // 获取帖子列表
      async _getPostList(params) {
        const { state, data } = await getList(params);
        if (state) {
          this.restNum = data.count - ((data.pageId - 1) * data.pageSize + data.list.length);
          this.list = this.list.concat(data.list);
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
          const params = {
            themeId: this.$route.params.id,
            pageId: this.pageId,
            pageSize: this.pageSize
          }
          this._getPostList(params);
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
            themeId: this.$route.params.id,
            pageId: this.pageId,
            pageSize: this.pageSize
          }
          this._getPostList(params);
        }
      },
      // 滚动结束
      scrollEnd(pos) {
        const position = pos.y;
        const scrollIfo = {
          name: 'post',
          pageId: this.pageId,
          position: position
        }
        this.$store.commit('SET_PAGE_SCROLL', scrollIfo);
      }
    },
    components: {
      PostItem,
      ThemeDetails,
      ReplyMessage,
      Scroll
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
    .post-list-container {
      position: absolute;
      left: 0;
      right: 0;
      top: 40px;
      bottom: 50px;
      background-color: #f2f2f2;
    }
  }



</style>
