<template>
  <div class="post-detail-container">
    <h2 class="desc" v-if="data.title!=''" v-text="data.title"></h2>
    <div class="author">
      <div class="avatar">
        <img v-if="data.user_head_thumb" v-lazy="data.user_head_thumb" alt="">
        <i v-else slot="icon" class="fa fa-user fa-lg user-icon"></i>
      </div>
      <div class="ifo">
        <p class="name">{{data.user_nickname}} <i>楼主</i></p>
        <p class="add-time">{{data.add_time | getPastTime}}</p>
      </div>
    </div>
    <div class="content">
      <TextContent :text="data.content"></TextContent>
      <ListImg v-if="data.images" :imgList="data.images | jsonParse" :all="true"></ListImg>
    </div>
  </div>
</template>

<script>
  import TextContent from '@/base/text-content/index';
  import ListImg from '@/base/list-img/index';
  export default {
    props: ['data'],
    components: {
      TextContent,
      ListImg
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .post-detail-container{
    padding: 10px;
    background-color: #fff;
    margin-bottom: 10px;
    .desc{
      font-size: 22px;
      font-weight: 900;
      line-height: 1.8;
      letter-spacing: 1px;
      color: #333;
      padding-top: 10px;
    }
    .author{
      display: flex;
      height: 80px;
      align-items: center;
      .avatar{
        width: 36px;
        height: 36px;
        border: 1px solid #e7e7e7;
        line-height: 36px;
        text-align: center;
        border-radius: 50%;
        overflow: hidden;
        background: #f2f2f2;
        .user-icon{
          color: #666;
        }
        img{
          width: 100%;
          height: 100%;
        }
      }
      .ifo{
        padding-left: 5px;
        .name{
          font-size: 14px;
          i{
            font-size: 12px;
            display: inline-block;
            padding-left: 10px;
            font-style: normal;
            color: deepskyblue;
          }
        }
        .add-time{
          color: #666;
          font-weight: 300;
          padding-top: 5px;
          font-size: 12px;
        }
      }
    }

  }
</style>
