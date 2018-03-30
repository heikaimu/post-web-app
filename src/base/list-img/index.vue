<template>
  <div>
    <div :class="{'img-box-type1': !all, 'img-box-type2': all}" ref="imgListWrapper">
      <div class="img-item" :style="{height: `${iHeight}px`}" v-for="(item, index) in imgList" v-if="all ? true : index < 3" @click="openSwiper($event, index)">
        <img v-lazy="item" alt="" :class="{show: item}">
      </div>
      <div class="img-item blank" v-if="imgList.length===2"></div>
    </div>
    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave"
      v-bind:css="false"
    >
      <SwiperZoom
        v-if="showSwiperZoom"
        :index="currentIndex"
        :data="imgList"
        @closeSwiper="showSwiperZoom=false"
      ></SwiperZoom>
    </transition>
  </div>
</template>

<script>
  import SwiperZoom from '@/base/swiper/zoom';
    export default {
      props: {
        imgList: {
          default: []
        },
        all: false
      },
      data() {
        return {
          showSwiperZoom: false,
          enterX: 0,
          enterY: 0,
          iHeight: 'auto',
          currentIndex: ''
        }
      },
      mounted() {
        if (!this.all) {
          const boxWidth = this.$refs.imgListWrapper.clientWidth;
          this.iHeight = boxWidth / 3;
        }
      },
      methods: {
        openSwiper(el, index) {
          const wWidth = document.body.clientWidth;
          const wHeight = 750;
          this.enterX = - (wWidth / 2 - el.clientX);
          this.enterY = - (wHeight / 2 - el.clientY);
//          console.log(el.offsetX)
//          console.log(el.offsetY)
//          console.log(el);
          setTimeout(() => {
            this.currentIndex = index;
            this.showSwiperZoom = true;
          }, 100)
        },
        beforeEnter (el) {
          Velocity(el, { translateX: `${this.enterX}px`, translateY: `${this.enterY}px`, scale: 0.1, opacity: 0}, { duration: 0 })
        },
        enter (el, done) {
          Velocity(el, { translateX: 0, translateY: 0, scale: 1, opacity: 1}, { duration: 300 })
        },
        leave (el, done) {
          Velocity(el, { translateX: `${this.enterX}px`, translateY: `${this.enterY}px`, scale: 0.1, opacity: 0 }, { duration: 300 })
        }
      },
      components: {
        SwiperZoom
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
      background: #444;
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
      background: #444;
      margin-bottom: 10px;
      img{
        max-width: 100%;
        line-height: 0;
      }
    }
  }
</style>
