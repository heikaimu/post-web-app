<template>
  <div id="app">
    <transition name="slide-fade" mode="out-in">
      <router-view/>
    </transition>
    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave"
      v-bind:css="false"
    >
      <SwiperZoom
        v-if="swiperPictureIfo.show"
        :index="swiperPictureIfo.index"
        :data="swiperPictureIfo.list"
        @closeSwiper="closeSwiper"
      ></SwiperZoom>
    </transition>
  </div>
</template>

<script>
  import SwiperZoom from '@/base/swiper/zoom';
  import { mapGetters } from 'vuex';
  export default {
    name: 'App',
    computed: {
      ...mapGetters([
        'swiperPictureIfo'
      ])
    },
    methods: {
      beforeEnter (el) {
        Velocity(el, {
          translateX: `${this.swiperPictureIfo.x}px`,
          translateY: `${this.swiperPictureIfo.y}px`,
          scale: 0,
          opacity: 0
        }, { duration: 0 })
      },
      enter (el, done) {
        Velocity(el, {
          translateX: 0,
          translateY: 0,
          scale: 1,
          opacity: 1
        }, { duration: 300 })
      },
      leave (el, done) {
        Velocity(el, {
          translateX: `${this.swiperPictureIfo.x}px`,
          translateY: `${this.swiperPictureIfo.y}px`,
          scale: 0,
          opacity: 0
        }, { complete: done })
      },
      // 关闭
      closeSwiper() {
        this.swiperPictureIfo.show = false;
        this.$store.commit('SET_SWIPER_PICTURE', this.swiperPictureIfo);
      }
    },
    components: {
      SwiperZoom
    }
  }
</script>

<style>
  .slide-fade-enter-active {
    transition: all .2s ease;
  }
  .slide-fade-leave-active {
    transition: all .2s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to{
    transform: translateX(10px);
    opacity: 0;
  }
  .mint-tab-item-icon{
    margin: 4px auto 0px;
  }
  .mint-tabbar{

  }
  .mint-tabbar .mint-tab-item.is-selected{
    color: #333;
  }

</style>
