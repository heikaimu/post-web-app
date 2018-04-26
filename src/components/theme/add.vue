<template>
    <div class="theme-add-page-container">
      <mt-header title="新建贴吧" style="background: #333">
        <router-link to="/main/theme" slot="left">
          <div><i slot="icon" class="fa fa-angle-left fa-lg"></i></div>
        </router-link>
      </mt-header>
      <div class="form-container">
        <div class="form-wrapper">
        <div class="croppa-wrapper">
          <croppa v-model="croppa"
                  :width="240"
                  :height="240"
                  placeholder="点击选择封面图片"
                  placeholder-color="#000"
                  :placeholder-font-size="14">
          </croppa>
        </div>
        <div class="name-wrapper">
          <input type="text" v-model="name" placeholder="请输入贴吧名字">
        </div>
        <div class="sub-btn-wrapper">
          <mt-button type="primary" @click="handleCreate()">新建贴吧</mt-button>
        </div>
        </div>
      </div>
    </div>
</template>

<script>
  import { convertBase64UrlToBlob } from '@/common/js/baseToBlob';
  import { Toast } from 'mint-ui';
  import qiniu from '@/api/img';
  import { addOne } from '@/api/theme';
    export default {
      data() {
        return {
          croppa: {},
          headThumb: '',
          name: ''
        }
      },
      methods: {
        async handleCreate() {
          this.headThumb = this.croppa.generateDataUrl('image/jpeg');
          const file = convertBase64UrlToBlob(this.headThumb);
          if (this.headThumb === '') {
            Toast({
              message: '封面不能为空',
              position: 'bottom',
              duration: 2000
            });
            return false;
          }
          if (this.name === '') {
            Toast({
              message: '吧名不能为空',
              position: 'bottom',
              duration: 2000
            });
            return false;
          }
          const url = await qiniu.upload(file);
          const params = {
            name: this.name,
            headThumb: url
          }
          const { state, message, data } = await addOne(params);
          if (state) {
            this.$router.push(`/post/${data.insertId}`);
          }
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .theme-add-page-container{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: #fff;
    .form-container{
      position: absolute;
      left: 0;
      right: 0;
      top: 40px;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      .form-wrapper{
        width: 240px;
        height: 370px;
        .croppa-wrapper{
          text-align: center;
        }
        .name-wrapper{
          margin-top: 20px;
          text-align: center;
          input{
            border: 1px solid #e7e7e7;
            width: 240px;
            padding: 10px;
            background-color: #f2f2f2;
            outline: none;
          }
        }
        .sub-btn-wrapper{
          margin-top: 20px;
          text-align: center;
          button{
            width: 240px;
          }
        }
      }
    }
  }

</style>
