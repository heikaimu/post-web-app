<template>
  <div id="app">
    <transition name="slide-fade" mode="in-out">
    <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      selected: '我的'
    }
  }
}
</script>

<style>
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to{
    /*transform: translateX(10px);*/
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
