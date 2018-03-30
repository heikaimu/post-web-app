<template>
    <div class="theme-item" @click="$router.push(`/post/${data.theme_id}`)">
      <div class="theme-ifo">
        <div class="avatar"><img v-lazy="data.head_thumb" alt=""></div>
        <h2 class="name" v-text="data.name"></h2>
      </div>
      <div class="level">
        <p v-text="`lv${data.level}`"></p>
      </div>
    </div>
</template>

<script>
    export default {
      props: ['data']
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .theme-item{
    display: flex;
    background: #fff;
    padding: 10px;
    margin-bottom: 10px;
    .theme-ifo{
      flex: 1;
      display: flex;
      align-items: center;
      .avatar{
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #444;
        img{
          max-width: 100%;
          max-height: 100%;
        }
      }
      .name{
        padding-left: 10px;
        color: #333;
      }
    }
    .level{
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 80px;
      width: 80px;
      color: #dd4b39;
    }
  }
</style>
