<template>
  <div class="post-list-page-container">
    <transition name="slide-up">
    <mt-header :title="details.name" style="background: #333; z-index: 233;" v-if="movingDirectionY==-1">
        <div @click="handleBack" slot="left"><i slot="icon" class="fa fa-angle-left fa-lg"></i></div>
    </mt-header>
    </transition>
    <div class="post-list-container" :style="{top: movingDirectionY==-1 ? '40px' : 0}">
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
        <ThemeDetails
          :data="details"
          @refreshDetails="_getDetails"
        ></ThemeDetails>
        <ul class="page-infinite-list">
          <li v-for="item in list" class="page-infinite-listitem">
            <PostItem :data="item" @imageLoaded="imageLoaded"></PostItem>
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
        position: 0,
        componentName: 'post',
        position: 0,
        isPullUpLoad: true,
        isPullDownRefresh: true,
        showHeaderAndBar: true
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
        'scrollIfo',
        'movingDirectionY'
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
      // 初始化数据，主要是获取位置以及离开时的页码方便给pageSize赋值
      pageInit() {
        this.$store.commit('SET_MOVINGDIRECTIONY', -1);
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
          themeId: this.$route.params.id,
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
      // 监听滚动
      scroll(pos) {
        this.$store.commit('SET_MOVINGDIRECTIONY', pos.movingDirectionY);
      },
      // 发帖
      async saveMessage(params) {
        params.themeId = this.$route.params.id;
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
      imageLoaded() {
        this.$refs.scroll.forceUpdate();
      },
      handleBack() {
        history.go(-1);
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
      transition: .4s;
      left: 0;
      right: 0;
      bottom: 50px;
      background-color: #f2f2f2;
    }
  }



</style>
