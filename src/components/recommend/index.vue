<template>
  <div class="recommend-page-container">
    <mt-header title="新动态" style="background: #333" fixed v-if="showHeaderAndBar">
      <router-link to="/new_message" slot="right" v-if="this.loginIfo.isLogin">
        <NewMessageIcon></NewMessageIcon>
      </router-link>
    </mt-header>
    <div class="recommend-list-container">
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
        <ul>
          <li v-for="item in list" class="page-infinite-listitem">
            <PostItem :data="item" showBarName="true"></PostItem>
          </li>
        </ul>
      </Scroll>
    </div>
  </div>
</template>

<script>
  import Scroll from '@/base/scroll/scroll';
  import PostItem from '@/components/post/item';
  import { getPublish } from '@/api/post';
  import NewMessageIcon from '@/components/new-message/icon';
  import { mapGetters } from 'vuex';
    export default {
      data() {
        return {
          list: [],
          pageId: 1,
          pageSize: 10,
          restNum: 0,
          componentName: 'recommend',
          position: 0,
          isPullUpLoad: true,
          isPullDownRefresh: true,
          showHeaderAndBar: true
        }
      },
      computed: {
        ...mapGetters([
          'loginIfo',
          'scrollIfo'
        ])
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
          const { state, data } = await getPublish(params);
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
        }
      },
      components: {
        PostItem,
        NewMessageIcon,
        Scroll
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
    .recommend-list-container {
      position: absolute;
      left: 0;
      right: 0;
      top: 40px;
      bottom: 0;
    }
  }
</style>
