<template>
  <div class="reply-item" @click="checkDetails">
    <div v-if="isReply">
      <div class="reply-author">
        <div class="avatar">
          <img v-if="replyIfo.user_head_thumb" v-lazy="replyIfo.user_head_thumb" alt="">
          <i v-else slot="icon" class="fa fa-user fa-lg user-icon"></i>
        </div>
        <div class="ifo">
          <p class="name">{{replyIfo.user_nickname}}</p>
          <p class="add-time">{{replyIfo.add_time | getPastTime}}</p>
        </div>
      </div>
      <div class="reply-content">
        <TextContent :text="replyIfo.content"></TextContent>
      </div>
      <div class="request-ifo">
        <TextContent :text="`我：${postIfo.title}`"></TextContent>
      </div>
    </div>
    <div v-else>
      <div class="reply-author">
        <div class="avatar"><img v-lazy="subReplyIfo.user_head_thumb" alt=""></div>
        <div class="ifo">
          <p class="name">{{subReplyIfo.user_nickname}}</p>
          <p class="add-time">{{subReplyIfo.add_time | getPastTime}}</p>
        </div>
      </div>
      <div class="reply-content">
        <TextContent :text="subReplyIfo.content"></TextContent>
      </div>
      <div class="request-ifo">
        <TextContent :text="`${role}：${replyIfo.content}`"></TextContent>
      </div>
    </div>
  </div>
</template>

<script>
  import TextContent from '@/base/text-content/index';
  import ListImg from '@/base/list-img/index';
  import { mapGetters } from 'vuex';
  import { deleteOne } from '@/api/new-message';
  export default {
    props: ['data'],
    data() {
      return {
        postIfo: {},
        replyIfo: {},
        subReplyIfo: {},
        isReply: false,
        role: ''
      }
    },
    computed: {
      ...mapGetters([
        'loginIfo'
      ])
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        this.isReply = this.data.type === 'reply' ? true : false;
        if (this.data.post_ifo.length !== 0) this.postIfo =  this.data.post_ifo[0];
        if (this.data.reply_ifo.length !== 0) this.replyIfo =  this.data.reply_ifo[0];
        if (this.data.sub_reply_ifo.length !== 0) this.subReplyIfo =  this.data.sub_reply_ifo[0];
        if (!this.isReply) {
          this.role = this.replyIfo.user_id === this.loginIfo.data.user_id ? '我' : this.replyIfo.user_nickname;
        }
      },
      async checkDetails() {
        const params = {
          messageId: this.data.ID
        }
        console.log(params);
        const { state } = await deleteOne(params);
        if (state) {
          this.$router.push(`/new_message_details/${this.replyIfo.ID}/${this.postIfo.user_id}/${this.subReplyIfo.ID || -1}`);
        }
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
    .request-ifo{
      margin-top: 5px;
      padding: 10px;
      background: #f2f2f2;
    }
  }
</style>
