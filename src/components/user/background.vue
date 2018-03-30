<template>
    <div class="background-container">
      <mt-header title="修改头像" style="background: #333">
        <router-link to="/user" slot="left">
          <div><i slot="icon" class="fa fa-angle-left fa-lg"></i></div>
        </router-link>
      </mt-header>
      <ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
        <li v-for="item in backgroundList" class="page-infinite-listitem">
          <div class="item" :style="{background: `url(${item}) no-repeat center center / cover`}"></div>
          <div class="btn-box">
          <mt-button type="primary" size="small" plain @click="selecteBg(item)">使用该背景</mt-button>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
  import { updateBackground } from '@/api/user';
  import { Indicator, Toast } from 'mint-ui';
    export default {
      data() {
        return {
          loading: false,
          allLoaded: false,
          backgroundList: [
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522237619275&di=8f7a92cd86f227cfed6afafc74abfdfd&imgtype=0&src=http%3A%2F%2Fpic2.nipic.com%2F20090331%2F2067735_203100023_2.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522238133451&di=6280e34fd1b3148234c87dfaa41bfa29&imgtype=0&src=http%3A%2F%2Ftupian.enterdesk.com%2F2012%2F0917%2Fgha%2F1%2Fenterdesk%2520%25288%2529.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522238133448&di=572d924e5c85276cbff491c7b404bb2b&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01a1a5554bd079000001bf72540950.jpg%402o.jpg'
          ]
        }
      },
      methods: {
        // 修改背景
        async selecteBg(url) {
          Indicator.open('修改中...');
          const params = {
            background: url
          }
          const { state, message, data } = await updateBackground(params);
          if (state) {
            this.$store.commit('SET_BACKGROUND', url);
            Indicator.close();
            this.$router.push(`/user`);
          } else {
            Indicator.close();
            Toast({
              message: message,
              position: 'bottom',
              duration: 2000
            });
          }
        },
        loadMore() {

        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .background-container{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    .page-infinite-list{
      position: absolute;
      left: 0;
      right: 0;
      top: 40px;
      bottom: 0;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      .item{
        width: 100%;
        height: 180px;
        border: 2px solid #fff;
      }
      .btn-box{
        padding: 10px;
        text-align: center;
      }
    }
  }
</style>
