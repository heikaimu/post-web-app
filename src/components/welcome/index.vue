<template>
    <div class="welcome-wrapper">
      <div class="ad-wrapper">
        <div class="ad-avatar" :style="{backgroundImage: `url(${adImg})`}"></div>
        <span class="time" @click="goToRecommed">{{time}} 跳过</span>
      </div>
      <div class="welcome-words">
        <p>MINI贴吧</p>
      </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          timer: '',
          time: 4,
          adImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521537850349&di=557dffc888a1dafcb1d813050c667a21&imgtype=0&src=http%3A%2F%2Fimg2.dwstatic.com%2Ftv%2F1711%2F373544133017%2F1509588979577.JPG'
        }
      },
      mounted() {
        this.timer = setInterval(() => {
          if (this.time <= 1) {
            clearInterval(this.timer);
            this.$router.push('/main');
          }
          this.time -= 1;
        }, 1000);
      },
      methods: {
        goToRecommed() {
          clearInterval(this.timer);
          this.$router.push('/main');
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .welcome-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;

    .ad-wrapper{
      position: absolute;
      left: 0;
      right: 0;
      bottom: 60px;
      top: 0;
      background: #f2f2f2;

      .ad-avatar{
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
      }

      .time{
        position: absolute;
        right: 20px;
        top: 20px;
        width: 60px;
        height: 20px;
        background: rgba(0, 0, 0, 0.7);
        border-radius: 10px;
        text-align: center;
        line-height: 20px;
        font-size: 12px;
        color: #e7e7e7;
      }
    }

    .welcome-words{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 60px;
      padding: 0 20px;
      line-height: 60px;
      &>p{
        text-shadow: 1px 1px 1px #ccc;
        letter-spacing: 2px;
      }
    }
  }
</style>
