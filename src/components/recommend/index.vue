<template>
  <div class="recommend-page-container">
    <mt-header title="新动态" style="background: #333">
      <router-link to="/new_message" slot="right" v-if="this.loginIfo.isLogin">
        <NewMessageIcon></NewMessageIcon>
      </router-link>
    </mt-header>
    <div class="recommend-list-container">
      <Scroll
        :data="list"
        :startY="position"
        :pullup="true"
        @scrollToEnd="loadMore"
        :afterScroll="true"
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
          details: {},
          list: [],
          pageId: 1,
          pageSize: 10,
          restNum: 0,
          loading: false,
          allLoaded: false,
          showPostPage: false,
          position: 0
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
        pageInit() {
          const indexOfComponent = this.scrollIfo.findIndex((item) => {
            return item.name === 'recommend';
          });
          const componentScrollIfo = this.scrollIfo[indexOfComponent];
          this.position = componentScrollIfo.position || 0;
          let params = {};
          if (componentScrollIfo.pageId === 1) { // 如果现在是第一页的数据
            params = {
              pageId: this.pageId,
              pageSize: this.pageSize
            }
          } else { // 如果当前vuex的页码不为1的情况
            params = {
              pageId: 1,
              pageSize: componentScrollIfo.pageId * this.pageSize
            }
            this.pageId = componentScrollIfo.pageId;
          }
          this._getPostList(params);
        },
        // 获取帖子列表
        async _getPostList(params) {
          const { state, data } = await getPublish(params);
          if (state) {
            this.restNum = data.count - ((data.pageId - 1) * data.pageSize + data.list.length);
            this.list = this.list.concat(data.list);
          }
        },
        // 加载更多
        loadMore() {
          if (this.restNum > 0) {
            this.pageId += 1;
            const params = {
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
            name: 'recommend',
            pageId: this.pageId,
            position: position
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
