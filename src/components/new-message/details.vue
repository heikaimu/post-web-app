<template>
  <div class="sub-reply-container">
    <mt-header :title="`${details.building_num}楼`" style="background: #333">
      <div slot="left" @click="closeSubReply"><i slot="icon" class="fa fa-angle-left fa-lg"></i></div>
    </mt-header>
    <div class="sub-reply-wrapper">
      <div class="builder">
        <div class="ifo">
          <div class="avatar"><img v-lazy="details.user_head_thumb" alt=""></div>
          <p class="name" v-text="details.user_nickname"></p>
          <i v-if="details.user_id===builderId">楼主</i>
        </div>
        <ListImg v-if="details.images" :imgList="details.images | jsonParse" :all="true"></ListImg>
        <TextContent :text="details.content"></TextContent>
      </div>
      <ul class="sub-list">
        <li class="sub-item" v-for="item in subList">
          <a class="name">{{item.nickname}}<i class="builder" v-if="item.user_id===builderId">楼主</i>:</a>
          <div class="content" @click="replyThisGay(item.nickname)" :class="{'chose': subReplyId===item.ID}">
            <TextContent :text="item.content" :inline="true" :size="'small'">
              <span class="time">{{item.add_time | getPastTime}}</span>
            </TextContent>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import TextContent from '@/base/text-content/index';
  import ListImg from '@/base/list-img/index';
  import { addOne, getList } from '@/api/sub-reply';
  import { getDetails } from '@/api/reply';
  import { Indicator, Toast } from 'mint-ui';
  export default {
    data() {
      return {
        details: {},
        subList: [],
        index: 0,
        builderId: 0,
        subReplyId: 0
      }
    },
    mounted() {
      this.init();
      this._getDetails();
      this._getList();
    },
    methods: {
      init() {
        this.index = parseInt(this.$route.params.index);
        this.builderId = parseInt(this.$route.params.builderId);
        this.subReplyId = parseInt(this.$route.params.subReplyId);
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
        } else {
          Toast({
            message: message,
            position: 'bottom',
            duration: 2000
          });
        }
      },
      // 新增
      async saveMessage(data) {
        const params = {
          postId: this.details.post_id,
          replyId: this.details.ID,
          content: data.content
        }
        Indicator.open('回复中...');
        const { state, message } = await addOne(params);
        if (state) {
          this._getList();
        }
        Indicator.close();
        Toast({
          message: message,
          position: 'bottom',
          duration: 2000
        });
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
      TextContent,
      ListImg
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
      .ifo{
        padding: 10px 0;
        display: flex;
        align-items: center;
        .avatar{
          flex: 0 0 36px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          overflow: hidden;
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
      bottom: 0;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      .sub-list{
        padding-top: 10px;
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
            &.chose{
              border: 1px solid #00bfff;
            }
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
