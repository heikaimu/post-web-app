<template>
  <div class="search-theme-page-container">
    <mt-header title="" style="background: #333">
      <router-link to="/main/theme" slot="left">
        <div><i slot="icon" class="fa fa-angle-left fa-lg"></i></div>
      </router-link>
    </mt-header>
    <div class="search-wrapper">
      <mt-search
        v-model="keyword"
        cancel-text="取消"
        placeholder="搜索">
        <div class="search-result-wrapper">
          <p class="no-result" v-if="searchResult.length===0">没有搜索结果</p>
          <router-link class="item" v-for="item in searchResult" :to="`/post/${item.ID}`">{{item.name}}</router-link>
        </div>
      </mt-search>
    </div>
  </div>
</template>

<script>
  import { getList } from '@/api/theme';
  import debounce from '@/common/js/debounce';
    export default {
      data() {
        return {
          keyword: '',
          searchResult: [],
          timer: 4
        }
      },
      created() {
        this.$watch('keyword', debounce(() => {
          this._getList(this.keyword);
        }, 300));
      },
      methods: {
        async _getList(keyword) {
          const params = {
            keyword: keyword
          }
          const {state, data, message} = await getList(params);
          if (state) {
            this.searchResult = data;
          }
        }
      },
      watch: {
        keyword() {
          if (this.keyword !== '') {

          }
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .search-theme-page-container{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: #fff;
    .search-wrapper{
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 40px;
      .search-result-wrapper{
        padding: 10px;
        display: flex;
        flex-wrap: wrap;
        .no-result{
          width: 100%;
          text-align: center;
          color: #444;
        }
        .item{
          width: 48%;
          margin: 1%;
          padding: 10px;
          font-size: 12px;
          border-bottom: 1px solid #e7e7e7;
        }
      }
    }

  }

</style>
