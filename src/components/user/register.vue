<template>
    <div class="form-container">
      <mt-header title="注册" style="background-color: #333">
        <router-link to="/login" slot="left">
          <div><i slot="icon" class="fa fa-angle-left fa-lg"></i></div>
        </router-link>
      </mt-header>
      <div class="main-content-wrapper">
        <mt-field label="账户" placeholder="请输入账户" v-model="account" :state="accountState"><span v-if="accountState=='error'" class="error-msg">{{accountMessage}}</span></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="pwd" :state="pwdState"><span v-if="pwdState=='error'" class="error-msg">{{pwdMessage}}</span></mt-field>
        <mt-field label="确认密码" placeholder="请输入密码" type="password" v-model="pwdAgain" :state="pwdAgainState"><span v-if="pwdAgainState=='error'" class="error-msg">{{pwdAgainMessage}}</span></mt-field>
        <mt-field label="昵称" placeholder="请输入昵称" v-model="nickname" :state="nicknameState"><span v-if="nicknameState=='error'" class="error-msg">{{nicknameMessage}}</span></mt-field>
        <mt-radio
          title="性别"
          v-model="gender"
          :options="options">
        </mt-radio>
        <div class="btn-box">
          <mt-button type="primary" @click="register">注册</mt-button>
        </div>
      </div>
    </div>
</template>

<script>
  import { login, chargeIsRegister, register, getUser } from '@/api/user';
  import { Indicator } from 'mint-ui';
  import { Toast } from 'mint-ui';
    export default {
      data() {
        return {
          account: '',
          pwd: '',
          pwdAgain: '',
          nickname: '',
          gender: 'famale',
          options: [
            {
              label: '男',
              value: 'male'
            },
            {
              label: '女',
              value: 'famale'
            }
          ],
          accountState: '',
          accountMessage: '',
          pwdState: '',
          pwdMessage: '',
          pwdAgainState: '',
          pwdAgainMessage: '',
          nicknameState: '',
          nicknameMessage: '',
        }
      },
      methods: {
        // 判断账号是否注册
        async _chargeIsRegister() {
          if (this.account === '') {
            this.accountState = 'error';
            this.accountMessage = '账户不能为空';
          } else {
            const params = {
              account: this.account
            }
            const { state, message } = await chargeIsRegister(params);
            if (state) {
              this.accountState = 'success';
            } else {
              this.accountState = 'error';
              this.accountMessage = message;
            }
          }
        },
        // 判断密码长度是否正确
        _chargePassword() {
          if (this.pwd.length >= 6 && this.pwd.length <= 18) {
            this.pwdState = 'success';
          } else {
            this.pwdState = 'error';
            this.pwdMessage = '密码长度为6-18';
          }
        },
        // 判断确认密码是否正确
        _chargePasswordAgain() {
          if (this.pwdAgain === '') {
            this.pwdAgainState = 'error';
            this.pwdAgainMessage = '确认密码不能为空';
          } else {
            if (this.pwd === this.pwdAgain) {
              this.pwdAgainState = 'success';
            } else {
              this.pwdAgainState = 'error';
              this.pwdAgainMessage = '前后密码不一致';
            }
          }
        },
        // 判断昵称是否为空
        _chargeNickname() {
          if (this.nickname !== '') {
            this.nicknameState = 'success';
          } else {
            this.nicknameState = 'error';
            this.nicknameMessage = '昵称不能为空';
          }
        },
        // 判断所有验证是否通过
        ifChargeSuccess() {
          this._chargeIsRegister();
          this._chargePassword();
          this._chargePasswordAgain();
          this._chargeNickname();
          if (this.accountState === 'success' && this.pwdState === 'success' && this.pwdAgainState === 'success' && this.nicknameState === 'success') {
            return true;
          } else {
            return false;
          }
        },
        // 注册
        async register() {
          if (!this.ifChargeSuccess) return false;
          const params = {
            account: this.account,
            password: this.pwd,
            nickname: this.nickname,
            gender: this.gender
          }
          Indicator.open('注册中...');
          const { state, message } = await register(params);
          if (state) {
            Indicator.close();
            this._login(params);
          } else {
            Indicator.close();
            Toast(message);
          }
        },
        // 登录
        async _login(params) {
          Indicator.open('注册成功，登录中...');
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
            console.log(data);
            const loginIfo = {
              isLogin: true,
              data: data
            }
            this.$store.commit('SET_LOGIN', loginIfo)
            Indicator.close();
            this.$router.push('/main');
          } else {
            Indicator.close();
            Toast(message);
          }
        }
      },
      watch: {
        'account'() {
          this._chargeIsRegister();
        },
        'pwd'() {
          this._chargePassword();
        },
        'pwdAgain'() {
          this._chargePasswordAgain();
        },
        'nickname'() {
          this._chargeNickname();
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
      .error-msg{
        font-size: 12px;
        color: red;
      }
      .btn-box{
        padding: 10px;
        button{
          width: 100%;
        }
      }
    }
  }
</style>
