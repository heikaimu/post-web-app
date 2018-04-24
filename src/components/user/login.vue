<template>
  <div class="form-container">
  <mt-header title="登录" style="background-color: #333">
    <router-link :to="decodeURIComponent(this.$route.query.redirect || '/')" slot="left">
      <div><i slot="icon" class="fa fa-angle-left fa-lg"></i></div>
    </router-link>
  </mt-header>
  <div class="main-content-wrapper">
      <div class="form-wrapper">
        <div class="form-list">
          <i class="icon fa fa-user fa-lg"></i>
          <label class="">
            <input type="text" name="" placeholder = "账户" v-model = "account">
          </label>
        </div>
        <div class="form-list">
          <i class="icon fa fa-key fa-lg"></i>
          <label class="">
            <input type="password" name="" placeholder = "密码" v-model = "pwd">
          </label>
        </div>
        <div class="btn-box">
          <button @click="login">登 录</button>
        </div>
        <div class="text-box">
          <p>没有账号？</p>
          <router-link to="/register">去注册</router-link>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
  import { login, getUser } from '@/api/user';
  import { Indicator } from 'mint-ui';
  import { Toast } from 'mint-ui';
  export default {
    data() {
      return {
        account: '',
        pwd: ''
      }
    },
    methods: {
      // 登录
      async login() {
        const params = {
          account: this.account,
          password: this.pwd
        }
        Indicator.open('登录中...');
        const { state, message } = await login(params);
        if (state) {
          this._saveCurrentUser();
        } else {
          Indicator.close();
          Toast(message);
        }
      },
      // 保存当前登录用户信息
      async _saveCurrentUser() {
        const { state, data, message } = await getUser({});
        if (state) {
          const loginIfo = {
            isLogin: true,
            data: data
          }
          this.$store.commit('SET_LOGIN', loginIfo);
          Indicator.close();
          let redirect = decodeURIComponent(this.$route.query.redirect || '/');
          this.$router.replace(redirect);
        } else {
          Indicator.close();
          Toast(message);
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .form-container{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: #3a3a3a;
    .main-content-wrapper{
      position: absolute;
      left: 0;
      right: 0;
      top: 40px;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      .form-wrapper{
        width: 200px;
        &.fade-enter-active, &.fade-leave-active{
          transition: all 0.5s;
        }
        &.fade-enter, &.fade-leave-active{
          opacity: 0;
          transform: scale(0);
        }
        .form-list{
          display: flex;
          width: 100%;
          height: 40px;
          align-items: center;
          margin-bottom: 15px;
          .icon{
            flex: 0 0 40px;
            width: 40px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            font-size: 18px;
            color: #444;
            background: #262a2d;
          }
          label{
            flex: 1;
            height: 40px;
            background: #3a4149;
            input{
              text-indent: 1em;
              border: none;
              width: 100%;
              height: 100%;
              background: transparent;
              color: #cfd2d9;
              font-size: 14px;
              letter-spacing: 1px;
              outline: none;
              &:focus{
                background: #333;
              }
            }
          }
        }
        .btn-box{
          button{
            width: 100%;
            height: 40px;
            background: #4ba1ea;
            border: 1px solid #1f3a57;
            color: #fff;
            font-size: 14px;
            letter-spacing: 1px;
            text-shadow:1px 1px 2px #666;
            position: relative;
            &:active{
              box-shadow: 0 0 3px #111;
              top: 1px;
            }
          }
        }
        .text-box{
          display: flex;
          justify-content: space-around;
          p{
            padding: 15px 0;
            font-size: 14px;
            color: #fff
          }
          a{
            padding: 15px 0;
            font-size: 14px;
            color: #fff
          }
        }
      }
    }
  }
</style>
