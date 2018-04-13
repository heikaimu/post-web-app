<template>
    <div class="test" ref="test">
      <input type="text" @focus="focusInput">
      <!--<ReplyMessage-->
        <!--@saveMessage="saveMessage"-->
      <!--&gt;我想说点什么...</ReplyMessage>-->
      <button :style="{bottom: `${currentBottom}px`}">点我</button>
    </div>
</template>

<script>
  import ReplyMessage from '@/base/reply-message/index';
    export default {
      data() {
        return {
          currentBottom: 0
        }
      },
      methods: {
        focusInput() {
          const screenHeight = plus.screen.resolutionHeight;
          console.log(screenHeight);
          this.currentBottom = 200;
          console.log(this.currentBottom);
        }
      },
      components: {
        ReplyMessage
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .test{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    button{
      position: absolute;
      background: #ccc;
    }
  }
</style>
