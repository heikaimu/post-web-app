<template>
  <div class="form-container">
    <mt-header title="编辑资料" style="background-color: #333">
      <router-link to="/user" slot="left">
        <div><i slot="icon" class="fa fa-angle-left fa-lg"></i></div>
      </router-link>
    </mt-header>
    <div class="main-content-wrapper">
      <mt-cell title="修改密码" is-link to="/update_pwd"></mt-cell>
      <mt-cell title="修改昵称" is-link to="/update_nickname"></mt-cell>
      <mt-cell title="修改头像" is-link to="/update_head_thumb"></mt-cell>
      <div class="btn-box">
        <mt-button type="danger" @click="logout">切换账号</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { logout } from '@/api/user';
  export default {
    data() {
      return {}
    },
    methods: {
      async logout() {
        const { state } = await logout();
        if (state) {
          this.$store.commit('LOGOUT');
          this.$router.push('/login');
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
