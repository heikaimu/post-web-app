<template>
  <div class="post-item">
    <div class="author-wrapper">
      <div class="author-avatar">
        <img v-if="data.user_head_thumb" v-lazy="data.user_head_thumb"/>
        <i v-else slot="icon" class="fa fa-user fa-lg user-icon"></i>
      </div>
      <div class="text">
        <p class="name" v-text="data.user_nickname"></p>
        <p class="add-time">{{data.add_time | getPastTime}}</p>
      </div>
    </div>
    <div class="content-wrapper">
      <h2 class="desc" @click="openPage(data.ID)" v-text="data.title"></h2>
      <!--<div class="content" @click="openPage(data.ID)">-->
        <!--<TextContent :text="data.content"></TextContent>-->
      <!--</div>-->
      <ListImg v-if="data.images" :imgList="data.images | jsonParse"></ListImg>
      <div class="god-reply" v-if="data.god_reply">
        <TextContent :text="data.god_reply.content"></TextContent>
      </div>
      <div class="other-icon">
        <i slot="icon" class="icon fa fa-comment-o fa-lg" v-text="data.reply_count"></i>
        <router-link v-if="showBarName" :to="`/post/${data.theme_id}`" class="bar-name" v-text="data.theme_name"></router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import TextContent from '@/base/text-content/index';
  import ListImg from '@/base/list-img/index';
    export default {
      props: {
        data: {
          default: {}
        },
        showBarName: {
          default: false
        }
      },
      methods: {
        openPage(id) {
          this.$router.push(`/post_page/${id}`)
        }
      },
      components: {
        TextContent,
        ListImg
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .post-item{
    padding: 10px;
    background: #fff;
    .author-wrapper{
      display: flex;
      align-items: center;
      height: 50px;
      padding-bottom: 10px;
      .author-avatar{
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
      .text{
        padding: 0 10px;
        .name{
          padding-top: 3px;
          font-size: 14px;
          i{
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
          color: #666;
        }
      }

    }
    .content-wrapper{
      padding-top: 0px;
      .desc{
        font-size: 18px;
        color: #333;
        padding-bottom: 5px;
        line-height: 1.5;
      }
      .content{
        p{
          font-size: 13px;
          color: #444;
          line-height: 1.5;
        }
      }
      .god-reply{
        background: #f2f2f2;
        padding: 10px;
      }
      .other-icon{
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row-reverse;
        .bar-name{
          font-size: 12px;
          color: #333;
        }
        .icon{
          font-size: 12px;
          color: #444;
          margin: 0 10px;
          &:before{
            margin-right: 5px;
          }
        }
      }

    }
  }
</style>
