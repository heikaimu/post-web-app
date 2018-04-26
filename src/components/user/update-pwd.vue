<template>
  <div class="form-container">
    <mt-header title="修改密码" style="background-color: #333">
      <router-link to="/user_menu" slot="left">
        <div><i slot="icon" class="fa fa-angle-left fa-lg"></i></div>
      </router-link>
    </mt-header>
    <div class="main-content-wrapper">
      <mt-field label="原始密码" placeholder="请输入原始密码" type="password" v-model="currentPwd"></mt-field>
      <mt-field label="新密码" placeholder="请输入新密码" type="password" v-model="newPwd"></mt-field>
      <mt-field label="确认新密码" placeholder="请再次输入新密码" type="password" v-model="newPwdAgain"></mt-field>
      <div class="btn-box">
        <mt-button type="primary" @click="updatePwd">确定修改</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
  import { updatePassword, logout } from '@/api/user';
  export default {
    data() {
      return {
        currentPwd: '',
        newPwd: '',
        newPwdAgain: ''
      }
    },
    methods: {
      async updatePwd() {
        const params = {
          oldPwd: this.currentPwd,
          newPwd: this.newPwd
        }
        const { state, message } = await updatePassword(params);
        if (state) {
          MessageBox.alert('修改成功，需要重新登录!').then(action => {
            this.logout();
          });
        }
      },
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
