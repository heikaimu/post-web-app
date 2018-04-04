<template>
  <div class="post-item">
    <div class="author-wrapper">
      <div class="publish-time">
        <!--<p class="mounth" v-text="`${data.year}`"></p>-->
        <p class="day" v-text="data.day"></p>
        <p class="mounth" v-text="`${data.month}月`"></p>
      </div>
      <div class="text"><p class="bar-name" v-text="data.theme_name"></p></div>
    </div>
    <div class="content-wrapper">
      <h2 class="desc" @click="openPage(data.ID)" v-text="data.title"></h2>
      <div class="content" @click="openPage(data.ID)">
        <TextContent :text="data.content"></TextContent>
      </div>
      <ListImg v-if="data.images" :imgList="data.images | jsonParse"></ListImg>
      <div class="other-icon">
        <i slot="icon" class="icon fa fa-comment-o fa-lg" v-text="data.reply_count"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import TextContent from '@/base/text-content/index';
  import ListImg from '@/base/list-img/index';
  export default {
    props: ['data'],
    data() {
      return {
        year: '',
        month: '',
        day: ''
      }
    },
    created() {
      const startTime = new Date(parseInt(this.data.add_time));
      const year = startTime.getFullYear();
      const month = startTime.getMonth();
      const day = startTime.getDate();
      this.$set(this.data, 'year', year);
      this.$set(this.data, 'month', month);
      this.$set(this.data, 'day', day);
    },
    methods: {
      openPage(id) {
        this.$router.push(`/post_page/${id}`);
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
      .publish-time{
        flex: 0 0 40px;
        margin-bottom: -15px;
        .day{
          font-size: 22px;
          color: #444;
        }
        .mounth{
          font-size: 12px;
          color: #666;
        }
      }
      .text{
        .bar-name{
          padding-top: 5px;
          font-size: 12px;
          color: #666;
        }
      }

    }
    .content-wrapper{
      padding-left: 40px;
      .desc{
        font-size: 16px;
        color: #333;
        padding-bottom: 5px;
        line-height: 1.5;
        font-weight: 900;
      }
      .content{
        p{
          font-size: 13px;
          color: #444;
          line-height: 1.5;
        }
      }
      .other-icon{
        height: 30px;
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        justify-content: space-between;
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
