<template>
    <div class="picture-wall">
      <div class="item" v-for="(i, index) in imgList">
        <div class="avatar" :style="{background: `url(${i}) no-repeat center center / cover`}"></div>
        <div class="icon" @click="removePicture(index)"><i slot="icon" class="fa fa-close fa-lg"></i></div>
      </div>
    </div>
</template>

<script>
    export default {
      props: ['imgList'],
      data() {
        return {
          avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521537850349&di=557dffc888a1dafcb1d813050c667a21&imgtype=0&src=http%3A%2F%2Fimg2.dwstatic.com%2Ftv%2F1711%2F373544133017%2F1509588979577.JPG'
        }
      },
      methods: {
        removePicture(index) {
          this.imgList.splice(index, 1);
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .picture-wall{
    display: flex;
    flex-wrap: wrap;
    .item{
      width: 80px;
      height: 80px;
      margin-left: 10px;
      margin-bottom: 10px;
      border: 1px solid #e7e7e7;
      border-radius: 5px;
      position: relative;
      overflow: hidden;
      .avatar{
        width: 80px;
        height: 80px;
      }
      .icon{
        position: absolute;
        right: 2px;
        top: 2px;
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-radius: 50%;
        font-size: 14px;
        background-color: rgba(0,0,0,0.3);
        color: #fff;
      }
    }
  }
</style>
