<template>
  <div>
    <i slot="icon" class="fa fa-bell-o fa-lg"></i>
    <mt-badge size="small" type="error" v-if="this.newMessageCount!==0">{{this.newMessageCount}}</mt-badge>
  </div>
</template>

<script>
  import { getList } from '@/api/new-message';
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        newMessageList: [],
        newMessageCount: 0
      }
    },
    computed: {
      ...mapGetters([
        'loginIfo'
      ])
    },
    mounted() {
      this._getList();
    },
    methods: {
      async _getList() {
        if (this.loginIfo.isLogin) {
          const { state, message, data } = await getList();
          if (state) {
            this.newMessageList = data;
            this.newMessageCount = data.length;
          }
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
