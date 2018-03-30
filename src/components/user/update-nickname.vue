<template>
  <div class="form-container">
    <mt-header title="修改昵称" style="background-color: #333">
      <router-link to="/user_menu" slot="left">
        <div><i slot="icon" class="fa fa-angle-left fa-lg"></i></div>
      </router-link>
    </mt-header>
    <div class="main-content-wrapper">
      <mt-field label="昵称" placeholder="请输入昵称" v-model="nickname"></mt-field>
      <div class="btn-box">
        <mt-button type="primary" @click="updateNickname">确定修改</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { Indicator } from 'mint-ui';
  import { Toast } from 'mint-ui';
  import { updateNickname } from '@/api/user';
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        nickname: ''
      }
    },
    computed: {
      ...mapGetters([
        'loginIfo'
      ])
    },
    mounted() {
      this.nickname = this.loginIfo.data.nickname;
    },
    methods: {
      async updateNickname() {
        const params = {
          nickname: this.nickname
        }
        Indicator.open('修改中...');
        const { state, message } = await updateNickname(params);
        if (state) {
          Indicator.close();
          this.$store.commit('SET_NICKNAME', this.nickname);
          this.$router.push('/user');
        } else {
          Indicator.close();
          Toast({
            message: message,
            position: 'bottom',
            duration: 2000
          });
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .form-container {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: #f2f2f2;
    .main-content-wrapper {
      position: absolute;
      left: 0;
      right: 0;
      top: 40px;
      bottom: 0;
      .btn-box{
        padding: 10px;
        button{
          width: 100%;
        }
      }
    }
  }
</style>
