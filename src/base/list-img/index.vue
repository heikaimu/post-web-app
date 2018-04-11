<template>
  <div>
    <div :class="{'img-box-type1': !all, 'img-box-type2': all}" ref="imgListWrapper">
      <div class="img-item" :style="{height: `${iHeight}px`}" v-for="(item, index) in imgList" v-if="all ? true : index < 3" @click="openSwiper($event, index)">
        <img v-lazy="item" alt="" :class="{show: item}">
      </div>
      <div class="img-item blank" v-if="imgList.length===2"></div>
    </div>
  </div>
</template>

<script>
  import SwiperZoom from '@/base/swiper/zoom';
  import { mapGetters } from 'vuex';
    export default {
      props: {
        imgList: {
          default: []
        },
        all: false
      },
      data() {
        return {
          iHeight: 'auto'
        }
      },
      computed: {
        ...mapGetters([
          'swiperPictureIfo'
        ])
      },
      mounted() {
        if (!this.all) {
          const boxWidth = this.$refs.imgListWrapper.clientWidth;
          this.iHeight = boxWidth / 3;
        } else {
          this.iHeight = 'auto';
        }
      },
      methods: {
        openSwiper(el, index) {
          const wWidth = document.body.clientWidth;
          const wHeight = 750;
          const enterX = - (wWidth / 2 - el.clientX);
          const enterY = - (wHeight / 2 - el.clientY);
          const swiperPictureIfo = {
            index: index,
            list: this.imgList,
            x: enterX,
            y: enterY,
            show: true
          }
          this.$store.commit('SET_SWIPER_PICTURE', swiperPictureIfo);
          console.log(this.swiperPictureIfo);
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .img-box-type1{
    display: flex;
    width: 100%;
    margin-top: 15px;
    .img-item{
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      margin: 0 2px;
      background: #fff;
      overflow: hidden;
      img{
        &.show{
          width: 100%;
          height: 100%;
          object-fit:cover;
        }
      }
      &.blank{
        background-color: #fff;
      }
    }
  }
  .img-box-type2{
    width: 100%;
    margin-top: 15px;
    .img-item{
      width: 100%;
      min-height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      margin-bottom: 10px;
      img{
        max-width: 100%;
        line-height: 0;
      }
    }
  }
</style>
