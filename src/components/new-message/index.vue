<template>
  <div class="new-message-container">
    <mt-header :title="`未读信息（${newMessageCount}）`" style="background-color: #333">
      <router-link to="/main/recommend" slot="left">
        <div><i slot="icon" class="fa fa-angle-left fa-lg"></i></div>
      </router-link>
    </mt-header>
    <div class="new-message-wrapper">
      <Scroll>
        <ul>
          <li v-for="item in newMessageList">
            <NewMessageItem :data="item"></NewMessageItem>
          </li>
        </ul>
      </Scroll>
    </div>
  </div>
</template>

<script>
  import Scroll from '@/base/scroll/scroll';
  import { mapGetters } from 'vuex';
  import { getList } from '@/api/new-message';
  import NewMessageItem from '@/components/new-message/item';
  export default {
    data() {
      return {
        newMessageList: [],
        newMessageCount: 0
      }
    },
    computed: {
      ...mapGetters([
        'loginIfo'
      ])
    },
    mounted() {
      this._getList();
    },
    methods: {
      async _getList() {
        if (this.loginIfo.isLogin) {
          const { state, message, data } = await getList();
          if (state) {
            this.newMessageList = data;
            this.newMessageCount = data.length;
          }
        }
      }
    },
    components: {
      NewMessageItem,
      Scroll
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .new-message-container{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    .new-message-wrapper{
      position: absolute;
      left: 0;
      right: 0;
      top: 40px;
      bottom: 0;
    }
  }
</style>
