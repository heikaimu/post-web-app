<template>
  <div class="theme-page-container">
    <mt-header title="进吧" style="background-color: #333">
      <router-link to="/search_theme" slot="left">
        <div><i slot="icon" class="fa fa-search fa-lg"></i></div>
      </router-link>
        <div slot="right" @click="createTheme"><i slot="icon" class="fa fa-plus fa-lg"></i></div>
    </mt-header>
    <div class="theme-container" v-if="this.loginIfo.isLogin">
      <div class="page-title">我关注的贴吧</div>
      <ThemeItem v-for="item in myFocusList" :data="item"></ThemeItem>
    </div>
  </div>
</template>

<script>
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
        },
        // 创建贴吧（判断是否登录）
        createTheme() {
          if (this.loginIfo.isLogin) {
            this.$router.push('/add_theme')
          } else {
            this.$router.push('/login')
          }
        }
      },
      components: {
        ThemeItem
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
        margin: 20px auto;
        text-align: center;
        display: block;
        line-height: 1;
      }
    }
  }
</style>
