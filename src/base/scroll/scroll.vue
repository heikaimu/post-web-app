<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import Bscroll from 'better-scroll';
  export default {
    props: {
      startY: {
        type: Number,
        default: 0
      },
      // 1会截流，2不会截流，3有swiper的时候用
      probeType: {
        type: Number,
        default: 1
      },
      // 点击列表是否派发click事件
      click: {
        type: Boolean,
        default: true
      },
      // 是否开启横向滚动
      scrollX: {
        type: Boolean,
        default: false
      },
      // 是否派发滚动事件
      listenScroll: {
        type: Boolean,
        default: false
      },
      // 列表数据
      data: {
        type: Array,
        default: null
      },
      // 是否派发到底部事件，用于下拉
      pullup: {
        type: Boolean,
        default: false
      },
      // 是否派发到顶部事件，用于上拉
      pullup: {
        type: Boolean,
        default: false
      },
      // 是否派发列表滚动开始事件
      beforeScroll: {
        type: Boolean,
        default: false
      },
      // 是否派发列表滚动结束事件
      afterScroll: {
        type: Boolean,
        default: false
      },
      // 数据更新后刷新scroll的延迟
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._initScroll();
      })
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) return;
        // 初始化
        this.scroll = new Bscroll(this.$refs.wrapper, {
          startY: this.startY,
          probeType: this.probeType,
          click: this.click,
          scrollX: this.scrollX
        });
        // 派发滚动事件
        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos);
          });
        }
        // 到底部事件（下拉加载）
        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd');
            }
          });
        }
        // 到顶部事件（上拉刷新）
        if (this.pulldown) {
          this.scroll.on('scrollend', (pos) => {
            alert();
            if (pos.y > 50) {
              this.$emit('pulldown');
            }
          });
        }
        // 是否派发列表滚动开始事件
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll');
          });
        }
        // 是否派发列表滚动结束事件
        if (this.afterScroll) {
          this.scroll.on('scrollEnd', (pos) => {
            this.$emit('scrollEnd', pos);
          });
        }
      },
      disable() {
        // 代理better-scroll的disable方法
        this.scroll && this.scroll.disable();
      },
      enable() {
        // 代理better-enable的enable方法
        this.scroll && this.scroll.enable();
      },
      refresh() {
        // 代理better-scroll的refresh方法
        this.scroll && this.scroll.refresh();
      },
      scrollTo() {
        // 代理better-scroll的scrollTo方法
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
      },
      scrollToElement() {
        // 代理better-scroll的scrollElement方法
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
      }
    },
    watch: {
      // 监听数据变化，延迟refreshDelay时间后调用refresh方法
      data() {
        setTimeout(() => {
          this.refresh();
        }, this.refreshDelay);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrapper{
    height: 100%;
    overflow: hidden;
  }
</style>
