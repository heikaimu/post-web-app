<template>
  <div class="theme-item">
    <div class="theme-ifo">
      <div class="avatar"><img v-lazy="data.head_thumb" alt=""></div>
      <h2 class="name" v-text="data.name"></h2>
    </div>
    <div class="actions">
      <mt-button v-if="!data.is_focus" size="small" type="primary" plain @click="handleFocus()">关注</mt-button>
      <p v-if="data.is_focus" v-text="`lv${data.level}`"></p>
      <mt-button v-if="data.is_focus" size="small" type="primary" plain @click="handleSign()">签到</mt-button>
    </div>
    <div class="number">
      <p>关注人数：{{data.focus_count}}</p>
      <p>帖子数：{{data.post_count}}</p>
    </div>
    <mt-popup
      v-model="sign"
      position="bottom">
    </mt-popup>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import { focus, unFocus, signIn} from '@/api/theme';
  import { mapGetters } from 'vuex';
  export default {
    props: ['data'],
    data() {
      return {
        sign: false
      }
    },
    computed: {
      ...mapGetters([
        'loginIfo'
      ])
    },
    methods: {
      async handleFocus() {
        if (this.loginIfo.isLogin) {
          const params = {
            themeId: this.data.ID
          }
          const { state, message } = await focus(params);
          if (state) {
            this.$emit('refreshDetails', '');
          }
        } else {
          this.$router.push({
            path: '/login',
            query: { redirect: this.$route.fullPath }
          });
        }
      },
      async handleSign() {
        const params = {
          themeId: this.data.ID
        }
        const { state, message } = await signIn(params);
        if (state) {
          Toast({
            message: message,
            position: 'bottom',
            duration: 2000
          });
          this.$emit('refreshDetails', '');
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .theme-item{
    display: flex;
    background: #fff;
    padding: 10px;
    margin-bottom: 10px;
    position: relative;
    .theme-ifo{
      flex: 1;
      display: flex;
      align-items: center;
      .avatar{
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #444;
        img{
          max-width: 100%;
          max-height: 100%;
        }
      }
      .name{
        padding-left: 10px;
        padding-bottom: 15px;
        font-size: 16px;
        color: #333;
      }
    }
    .actions{
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 100px;
      width: 100px;
      color: #dd4b39;
      p{
        margin: 0 5px;
      }
    }
    .number{
      position: absolute;
      left: 80px;
      top: 50px;
      display: flex;
      p{
        padding-right: 10px;
        font-size: 10px;
        color: #666;
      }
    }
  }
</style>
