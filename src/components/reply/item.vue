<template>
    <div class="reply-item">
      <div class="reply-author">
        <div class="avatar"><img v-lazy="data.user_head_thumb" alt=""></div>
        <div class="ifo">
          <p class="name">{{data.user_nickname}} <i v-if="data.user_id===builderId">楼主</i></p>
          <p class="add-time"><i>第{{index+1}}楼</i> {{data.add_time | getPastTime}}</p>
        </div>
      </div>
      <div class="reply-content">
        <div @click="openSubReply">
          <TextContent :text="data.content"></TextContent>
        </div>
        <ListImg :imgList="data.images | jsonParse" :all="true"></ListImg>
        <div v-if="data.sub_reply && data.sub_reply_count!=0" class="sub-reply-wrapper" @click="openSubReply">
          <div class="sub-item" v-for="i in data.sub_reply">
            <a class="name" v-text="`${i.nickname}:`"></a>
            <div class="content">
              <TextContent :text="i.content" :inline="true" :size="'small'"></TextContent>
            </div>
          </div>
          <p class="check-all" v-if="data.sub_reply_count >= 2">查看全部{{data.sub_reply_count}}条评论 <i slot="icon" class="fa fa-angle-right fa-lg"></i></p>
        </div>
      </div>
    </div>
</template>

<script>
  import TextContent from '@/base/text-content/index';
  import ListImg from '@/base/list-img/index';
  export default {
    props: ['index', 'data', 'builderId'],
    methods: {
      openSubReply() {
        this.$router.push(`/sub_reply/${this.data.ID}/${this.index}/${this.builderId}`);
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
  .reply-item{
    padding: 10px;
    background-color: #fff;
    margin-bottom: 10px;
    .reply-author{
      display: flex;
      height: 60px;
      align-items: center;
      .avatar{
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 1px solid #ddd;
        overflow: hidden;
        background: #666;
        img{
          max-width: 100%;
          max-height: 100%;
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
          i{
            font-size: 12px;
            font-style: normal;
            display: inline-block;
            margin-right: 10px;
          }
        }

      }
    }
    .reply-content{
      padding-left: 35px;
      .sub-reply-wrapper{
        background: #e7e7e7;
        padding: 10px 10px 0 10px;
        .sub-item{
          display: flex;
          padding-bottom: 5px;
          .name{
            font-size: 13px;
            color: #49a9ee;
            line-height: 1.5;
          }
          .content{
            flex: 1;
            padding-left: 5px;
            font-size: 13px;
            color: #444;
          }
        }
        .check-all{
          padding: 5px 10px 10px 0;
          font-size: 13px;
          color: #666;
        }
      }
      .reply-text{
        font-size: 16px;
        line-height: 1.5;
      }
    }
  }
</style>
