<template>
  <div class="theme-add-page-container">
    <mt-header title="修改头像" style="background: #333">
      <router-link to="/user_menu" slot="left">
        <div><i slot="icon" class="fa fa-angle-left fa-lg"></i></div>
      </router-link>
    </mt-header>
    <div class="form-container">
      <div class="form-wrapper">
        <div class="croppa-wrapper">
          <croppa v-model="croppa"
                  :initial-image="loginIfo.data.head_thumb"
                  :width="240"
                  :height="240"
                  placeholder="点击选择头像"
                  placeholder-color="#000"
                  :placeholder-font-size="14">
          </croppa>
        </div>
        <div class="sub-btn-wrapper">
          <mt-button type="primary" @click="updateHeadThumb">确定修改</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { convertBase64UrlToBlob } from '@/common/js/baseToBlob';
  import { mapGetters } from 'vuex';
  import qiniu from '@/api/img';
  import { updateHeadThumb } from '@/api/user';
  export default {
    data() {
      return {
        croppa: {},
        headThumb: '',
        name: ''
      }
    },
    computed: {
      ...mapGetters([
        'loginIfo'
      ])
    },
    methods: {
      async updateHeadThumb() {
        this.headThumb = this.croppa.generateDataUrl('image/jpeg');
        const file = convertBase64UrlToBlob(this.headThumb);
        const url = await qiniu.upload(file);
        const params = {
          headThumb: url
        }
        const { state, message } = await updateHeadThumb(params);
        if (state) {
          this.$store.commit('SET_HEAD_THUMB', url);
          this.$router.push('/user');
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
