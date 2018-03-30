<template>
    <div class="face-wrapper">
      <div class="item" v-for = "(item, index) in faces" @click="appendThisFace(item)">
        <img :src="`./static/images/face/fFace_${item.id}.png`">
      </div>
    </div>
</template>

<script>
  import { faces } from '@/common/js/static';
    export default {
      data() {
        return {
          faces: []
        }
      },
      mounted() {
        this.faces = faces;
      },
      methods: {
        appendThisFace(item) {
          this.$emit('appendThisFace', item);
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .face-wrapper{
    position: absolute;
    bottom: 40px;
    left: 0;
    right: 0;
    padding: 5px;
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid #e7e7e7;
    .item{
      display: flex;
      width: 40px;
      height: 40px;
      justify-content: space-around;
      align-items: center;
    }
  }
</style>
