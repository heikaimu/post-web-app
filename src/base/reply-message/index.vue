<template>
  <div class="reply-message-container">
    <div class="click-text" @click="openReplyMessage"><slot></slot></div>
    <transition name="slide-fade">
      <div class="content" v-if="showContent">
        <mt-header title="" style="background: #333">
          <div slot="left" @click="closeMessageBox"><i slot="icon" class="fa fa-close fa-lg"></i></div>
          <div slot="right" @click="saveMessage">发布</div>
        </mt-header>
        <div class="form-wrapper">
          <div class="form-item" v-if="showTitle">
            <input type="text" placeholder="标题..." v-model="title" ref="title" v-focus="showTitle && showContent">
          </div>
          <div class="form-item">
            <textarea name="" id="" cols="30" rows="10" placeholder="我想说点什么..." v-model="content" ref="content" v-focus="!showTitle && showContent"></textarea>
          </div>
          <PictureWall :imgList="imgList" :loading="uploading"></PictureWall>
        </div>
        <div class="function-btn-wrapper">
          <div class="icon" @click="showFace=!showFace" :class="{'check': showFace}"><i slot="icon" class="fa fa-smile-o fa-lg"></i></div>
          <label for="picture_btn" class="icon" v-if="showPic">
            <i slot="icon" class="fa fa-image fa-lg"></i>
            <input type="file" id="picture_btn" @change="uploadImg">
          </label>
        </div>
        <FaceBox v-if="showFace" @appendThisFace="appendThisFace"></FaceBox>
      </div>
    </transition>
  </div>
</template>

<script>
  import PictureWall from '@/base/reply-message/picture-wall';
  import FaceBox from '@/base/reply-message/face';
  import qiniu from '@/api/img';
  import { Indicator, Toast } from 'mint-ui';
  import { mapGetters } from 'vuex';
  export default {
    props: {
      showTitle: {
        default: false
      },
      showPic: {
        default: true
      }
    },
    data() {
      return {
        showContent: false,
        showFace: false,
        title: '',
        content: '',
        imgList: [],
        uploading: false
      }
    },
    computed: {
      ...mapGetters([
        'loginIfo'
      ])
    },
    methods: {
      // 打开回复层
      openReplyMessage() {
        this.title = '';
        this.content = '';
        this.imgList = [];
        this.showFace = false;
        if (this.loginIfo.isLogin) {
          this.showContent = true;
        } else {
          this.$router.replace({
            path: '/login',
            query: { redirect: this.$route.fullPath }
          });
        }
      },
      appendThisFace(item) {
        this.content += item.name;
      },
      openMessageBox(msg) {
        this.content = msg;
        this.showContent = true;
      },
      async uploadImg(e) {
        if (this.imgList.length === 0) {
          Toast('图片最多上传4张');
          return false;
        }
        let file = e.target.files[0];
        this.uploading = true;
        const url = await qiniu.upload(file);
        this.uploading = false;
        this.imgList.push(url);
      },
      // 保存
      async saveMessage() {
        const params = {
          title: this.title,
          content: this.content,
          imgList: JSON.stringify(this.imgList)
        }
        this.showContent = false;
        this.scrollTop = 0;
        this.$emit('saveMessage', params);
      },
      // 关闭
      closeMessageBox() {
        this.showContent = false;
      }
    },
    components: {
      PictureWall,
      FaceBox
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .reply-message-container{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px;
    z-index: 23333;
    background-color: #fff;
    box-shadow: 1px 0 3px #ccc;
    .click-text{
      border-radius: 3px;
      padding: 8px 10px;
      background-color: #f2f2f2;
      font-size: 12px;
    }
    .content{
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      z-index: 98;
      background-color: #f2f2f2;
      .form-wrapper{
        height: 192px;
        background: #fff;
        .form-item{
          textarea{
            box-sizing: border-box;
            width: 100%;
            height: 100px;
            outline: none;
            padding: 10px;
            border: none;
            font-size: 14px;
            color: #444;
          }
          input{
            box-sizing: border-box;
            width: 100%;
            height: 40px;
            outline: none;
            padding: 10px;
            border: none;
            border-bottom: 1px solid #e7e7e7;
            font-size: 14px;
            color: #444;
          }
        }
      }
      .function-btn-wrapper{
        background: #fff;
        position: absolute;
        left: 0;
        right: 0;
        top: 233px;
        height: 40px;
        border-bottom: 1px solid #e7e7e7;
        display: flex;
        .icon{
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #444;
          font-size: 16px;
          &.check{
            color: deepskyblue;
          }
          input{
            display: none;
          }
        }
      }
    }
  }
</style>
