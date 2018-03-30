<template>
  <div class="text-content-wrapper" :class="{'inline': inline}">
    <p v-html="contentText" :class="[size]"></p>
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      text: {
        type: String,
        default() {
          return ''
        }
      },
      inline: {
        default: false
      },
      size: {
        default: 'middle'
      }
    },
    data() {
      return {
        faces: [{id: '01', name: '#(呵呵)'}, {id: '02', name: '#(哈哈)'}, {id: '03', name: '#(吐舌)'}, {id: '04', name: '#(啊)'}, {id: '05', name: '#(酷)'}, {id: '06', name: '#(怒)'}, {id: '07', name: '#(开心)'}, {id: '08', name: '#(汗)'}, {id: '09', name: '#(泪)'}, {id: '10', name: '#(黑线)'}, {id: '11', name: '#(鄙视)'}, {id: '12', name: '#(不高兴)'}, {id: '13', name: '#(真棒)'}, {id: '14', name: '#(钱)'}, {id: '15', name: '#(疑问)'}, {id: '16', name: '#(阴险)'}, {id: '17', name: '#(吐)'}, {id: '18', name: '#(咦)'}, {id: '19', name: '#(委屈)'}, {id: '20', name: '#(开心)'}, {id: '21', name: '#(呼)'}, {id: '22', name: '#(笑眼)'}, {id: '23', name: '#(冷)'}, {id: '24', name: '#(太开心)'}, {id: '25', name: '#(斜眼)'}, {id: '26', name: '#(勉强)'}, {id: '27', name: '#(狂汗)'}, {id: '28', name: '#(乖)'}, {id: '29', name: '#(睡觉)'}, {id: '30', name: '#(惊吓)'}, {id: '31', name: '#(生气)'}, {id: '32', name: '#(惊讶)'}, {id: '33', name: '#(喷)'}]
      }
    },
    computed: {
      contentText() {
        let currentText = this.text
        const face = this.faces
        const l = face.length
        for (let i = 0; i < l; i++) {
          const id = face[i].id
          const faceName = face[i].name
          if (currentText.indexOf(faceName) !== -1) {
            const img = '<img src="./static/images/face/fFace_' + id + '.png"/>'
            const rep = faceName.replace(/#|\(|\)/g, '')
            currentText = currentText.replace(new RegExp('#\\(' + rep + '\\)', 'g'), img)
          }
          if (i === l - 1) {
            return currentText
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  .text-content-wrapper{
    p{
      display: inline-block;
      line-height: 1.5;
      font-size: 16px;
      color: #555;
      img{
        width: 26px;
        margin-bottom: -6px;
      }
      &.small{
        font-size: 14px;
        img{
          width: 16px;
          margin-bottom: -2px;
        }
      }
    }
    &.inline{
      display: inline-block;
    }
  }
</style>
