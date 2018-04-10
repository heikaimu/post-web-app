<template>
  <div class="theme-page-container">
    <mt-header title="进吧" style="background-color: #333">
      <router-link to="/search_theme" slot="left">
        <div><i slot="icon" class="fa fa-search fa-lg"></i></div>
      </router-link>
      <router-link to="/add_theme" slot="right">
        <div><i slot="icon" class="fa fa-plus fa-lg"></i></div>
      </router-link>
    </mt-header>
    <div class="theme-container" v-if="this.loginIfo.isLogin">
      <Scroll>
        <div>
        <div class="page-title">我关注的贴吧</div>
        <ul>
          <li v-for="item in myFocusList" class="theme-item">
            <ThemeItem :data="item"></ThemeItem>
          </li>
        </ul>
        </div>
      </Scroll>
    </div>
  </div>
</template>

<script>
  import Scroll from '@/base/scroll/scroll';
  import ThemeItem from '@/components/theme/item';
  import { mapGetters } from 'vuex';
  import { focusList } from '@/api/theme';
    export default {
      data() {
        return {
          myFocusList: []
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
          const { state, message, data } = await focusList({});
          if (state) {
            this.myFocusList = data;
          }
        }
      },
      components: {
        ThemeItem,
        Scroll
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .theme-page-container{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    .theme-container{
      position: absolute;
      left: 0;
      right: 0;
      top: 40px;
      bottom: 0;
      margin-top: -1px;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      background-color: #f2f2f2;
      .page-title{
        font-size: 20px;
        padding: 20px 0;
        text-align: center;
        display: block;
        line-height: 1;
      }
    }
  }
</style>
