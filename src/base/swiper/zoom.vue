<template>
  <div class="zoom-container">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="item in data">
        <div class="swiper-zoom-container">
          <img v-lazy="item">
        </div>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
      <div class="swiper-scrollbar"   slot="scrollbar"></div>
    </swiper>
  </div>
</template>

<script>
  export default {
    props: ['index', 'data'],
    data() {
      var _this = this;
      return {
        swiperOption: {
          zoom: true,
          initialSlide: _this.index,
          on: {
            click() {
              _this.closeSwiper();
            }
          }
          // some swiper options/callbacks
          // 所有的参数同 swiper 官方 api 参数
          // ...
        }
      }
    },
//      computed: {
//        swiper() {
//          return this.$refs.mySwiper.swiper
//        }
//      },
    mounted() {
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      console.log('this is current swiper instance object', this.swiper)
    },
    methods: {
      closeSwiper() {
        this.$emit('closeSwiper', '');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .zoom-container{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 99;
    .swiper-container{
      height: 100%;
      background: rgba(0, 0, 0, 1);
    }
  }
</style>
