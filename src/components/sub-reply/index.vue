<template>
    <div class="sub-reply-container">
      <mt-header :title="`${details.building_num}楼`" style="background: #333">
        <div slot="left" @click="closeSubReply"><i slot="icon" class="fa fa-angle-left fa-lg"></i></div>
      </mt-header>
      <div class="sub-reply-wrapper">
        <Scroll>
          <div>
            <div class="builder">
              <div class="ifo">
                <div class="avatar">
                  <img v-if="details.user_head_thumb" v-lazy="details.user_head_thumb" alt="">
                  <i v-else slot="icon" class="fa fa-user fa-lg user-icon"></i>
                </div>
                <p class="name" v-text="details.user_nickname"></p>
                <i v-if="details.user_id===builderId">楼主</i>
              </div>
              <ListImg v-if="details.images" :imgList="details.images | jsonParse" :all="true"></ListImg>
              <TextContent :text="details.content"></TextContent>
            </div>
            <ul class="sub-list">
              <li class="sub-item" v-for="item in subList">
                <a class="name">{{item.nickname}}<i class="builder" v-if="item.user_id===builderId">楼主</i>:</a>
                <div class="content" @click="replyThisGay(item.nickname)">
                  <TextContent :text="item.content" :inline="true" :size="'small'">
                    <span class="time">{{item.add_time | getPastTime}}</span>
                  </TextContent>
                </div>
              </li>
            </ul>
          </div>
        </Scroll>
      </div>
      <!--回复-->
      <ReplyMessage
        ref="message"
        :showPic="false"
        @saveMessage="saveMessage"
      >我想说点什么....</ReplyMessage>
    </div>
</template>

<script>
  import ReplyMessage from '@/base/reply-message/index';
  import Scroll from '@/base/scroll/scroll';
  import TextContent from '@/base/text-content/index';
  import ListImg from '@/base/list-img/index';
  import { addOne, getList } from '@/api/sub-reply';
  import { getDetails } from '@/api/reply';
  import { Toast } from 'mint-ui';
    export default {
      data() {
        return {
          details: {},
          subList: [],
          builderId: 0
        }
      },
      mounted() {
        this.init();
        this._getDetails();
        this._getList();
      },
      methods: {
        init() {
          this.builderId = parseInt(this.$route.params.builderId);
        },
        // 获取详情
        async _getDetails() {
          const id = this.$route.params.id;
          const params = {
            replyId: id
          }
          const { data } = await getDetails(params);
          this.details = data;
        },
        // 获取列表
        async _getList() {
          const id = this.$route.params.id;
          const params = {
            replyId: id
          }
          const { state, message, data } = await getList(params);
          if (state) {
            this.subList = data;
          }
        },
        // 新增
        async saveMessage(data) {
          const params = {
            postId: this.details.post_id,
            replyId: this.details.ID,
            content: data.content
          }
          const { state, message } = await addOne(params);
          if (state) {
            Toast({
              message: message,
              position: 'bottom',
              duration: 2000
            });
            this._getList();
          }
        },
        closeSubReply() {
          history.go(-1);
        },
        replyThisGay(name) {
          const psesonName = `回复 ${name}: `;
          this.$refs.message.openMessageBox(psesonName);
        }
      },
      components: {
        ReplyMessage,
        TextContent,
        ListImg,
        Scroll
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .sub-reply-container {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: #fff;
    z-index: 999;
    .builder{
      border-bottom: 1px solid #e7e7e7;
      padding: 10px;
      background: #fff;
      .ifo{
        padding: 10px 0;
        display: flex;
        align-items: center;
        .avatar{
          flex: 0 0 36px;
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
            font-size: 18px;
          }
          img{
            width: 100%;
            height: 100%;
          }
        }
        .name{
          flex: 1;
          padding-left: 10px;
          font-size: 14px;
          color: #333;
        }
        i{
          font-size: 12px;
          color: #49a9ee;
        }
      }
    }
    .sub-reply-wrapper{
      position: absolute;
      left: 0;
      right: 0;
      top: 40px;
      bottom: 50px;
      background: #fff;
      .sub-list{
        padding-top: 10px;
        background: #fff;
        .sub-item{
          padding: 10px;
          display: flex;
          .builder{
            font-size: 12px;
            color: #ccc;
            padding: 3px;
            font-style: normal;
            border: 1px solid #e7e7e7;
          }
          .name{
            font-size: 14px;
            line-height: 1.5;
            color: #49a9ee;
          }
          .content{
            flex: 1;
            padding-left: 5px;
          }
          .time{
            font-size: 13px;
            color: #ccc;
          }
        }
      }
    }
  }
</style>
