<template>
    <div class="main-page-container">
      <!--主体内容-->
      <div class="main-container">
        <transition name="slide-fade" mode="in-out">
          <router-view/>
        </transition>
      </div>
      <!--选项卡-->
      <transition name="slide-down">
      <mt-tabbar v-model="selected" v-if="movingDirectionY==-1" fixed>
        <mt-tab-item id="recommend">
          <i slot="icon" class="fa fa-home fa-lg"></i>
          推荐
        </mt-tab-item>
        <mt-tab-item id="theme">
          <i slot="icon" class="fa fa-comment-o fa-lg"></i>
          进吧
        </mt-tab-item>
        <mt-tab-item id="user">
          <i slot="icon" class="fa fa-user-o fa-lg"></i>
          我的
        </mt-tab-item>
      </mt-tabbar>
      </transition>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex';
    export default {
      data() {
        return {
          selected: 'recommend'
        }
      },
      computed: {
        ...mapGetters([
          'loginIfo',
          'movingDirectionY'
        ])
      },
      mounted() {
        this.setSelected();
      },
      methods: {
        setSelected() {
          switch(this.$route.path) {
            case '/main/recommend': this.selected = 'recommend'
              break;
            case '/main/theme': this.selected = 'theme'
              break;
          }
        }
      },
      watch: {
        'selected'() {
          switch(this.selected) {
            case 'recommend': this.$router.push('/main/recommend')
              break;
            case 'theme': this.$router.push('/main/theme')
              break;
            case 'user': this.$router.push('/user')
              break;
          }
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .main-page-container{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    .main-container{
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: #fff;
    }
  }
</style>
