<template>
  <div class="list-wrapper" ref="wrapper">
    <div class="scroll-content">
      <div ref="listWrapper">
        <slot>
          <ul class="list-content">
            <li @click="clickItem($event,item)" class="list-item" v-for="item in data">{{item}}</li>
          </ul>
        </slot>
      </div>
      <slot name="pullup"
            :pullUpLoad="pullUpLoad"
            :isPullUpLoad="isPullUpLoad"
      >
        <div class="pullup-wrapper" v-if="pullUpLoad">
          <div class="before-trigger" v-if="!isPullUpLoad">
            <span>下拉查看更多</span>
          </div>
          <div class="after-trigger" v-else>
            <loading></loading>
          </div>
        </div>
      </slot>
    </div>
    <slot name="pulldown"
          :pullDownRefresh="pullDownRefresh"
          :pullDownStyle="pullDownStyle"
          :beforePullDown="beforePullDown"
          :isPullingDown="isPullingDown"
          :bubbleY="bubbleY"
    >
      <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
        <div class="before-trigger" v-if="beforePullDown">
          <bubble :y="bubbleY"></bubble>
        </div>
        <div class="after-trigger" v-else>
          <div v-if="isPullingDown" class="loading">
            <loading></loading>
          </div>
          <div v-else><span>数据已更新</span></div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
  import Bscroll from 'better-scroll';
  import Loading from '@/base/scroll/loading';
  import Bubble from '@/base/scroll/bubble';
  import { getRect } from '@/common/js/dom';
  export default {
    props: {
      // 列表数据
      data: {
        type: Array,
        default: null
      },
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
      // 是否派发滚动事件
      listenScroll: {
        type: Boolean,
        default: false
      },
      // 上拉加载更多
      pullUpLoad: {
        type: null,
        default: false
      },
      // 下拉刷新
      pullDownRefresh: {
        type: null,
        default: false
      },
      // 是否派发列表滚动开始事件
      listenBeforeScroll: {
        type: Boolean,
        default: false
      },
      // 是否派发列表滚动结束事件
      listenEndScroll: {
        type: Boolean,
        default: false
      },
      // 数据更新后刷新scroll的延迟
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    data() {
      return {
        beforePullDown: true,
        isRebounding: false,
        isPullingDown: false,
        isPullUpLoad: false,
        pullUpDirty: true,
        pullDownStyle: '',
        bubbleY: 0
      }
    },
    created() {
      this.pullDownInitTop = -50
    },
    mounted() {
      this.$nextTick(() => {
        this._initScroll();
      })
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) return;
        if (this.$refs.listWrapper && (this.pullDownRefresh || this.pullUpLoad)) {
          this.$refs.listWrapper.style.minHeight = `${getRect(this.$refs.wrapper).height + 1}px`
        }

        let options = {
          probeType: this.probeType,
          click: this.click,
          pullDownRefresh: this.pullDownRefresh,
          pullUpLoad: this.pullUpLoad,
          startY: this.startY
        }

        // 初始化
        this.scroll = new Bscroll(this.$refs.wrapper, options);

        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos);
          });
        }

        if (this.listenBeforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScrollStart');
          });
        }

        if (this.listenEndScroll) {
          this.scroll.on('scrollEnd', (pos) => {
            this.$emit('scrollEnd', pos);
          });
        }

        if (this.pullDownRefresh) {
          this._initPullDownRefresh();
        }

        if (this.pullUpLoad) {
          this._initPullUpLoad();
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
      },
      destroy() {
        this.scroll.destroy()
      },
      forceUpdate(dirty) {
        if (this.pullDownRefresh && this.isPullingDown) {
          this.isPullingDown = false
          this._reboundPullDown().then(() => {
            this._afterPullDown()
          })
        } else if (this.pullUpLoad && this.isPullUpLoad) {
          this.isPullUpLoad = false
          this.scroll.finishPullUp()
          this.pullUpDirty = dirty
          this.refresh()
        } else {
          this.refresh()
        }
      },
      _initPullDownRefresh() {
        this.scroll.on('pullingDown', () => {
          this.beforePullDown = false
          this.isPullingDown = true
          this.$emit('pullingDown')
        })

        this.scroll.on('scroll', (pos) => {
          if (!this.pullDownRefresh) {
            return
          }
          if (this.beforePullDown) {
            this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
            this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`
          } else {
            this.bubbleY = 0
          }
          if (this.isRebounding) {
            this.pullDownStyle = `top:${10 - (this.pullDownRefresh.stop - pos.y)}px`
          }
        })
      },
      _initPullUpLoad() {
        this.scroll.on('pullingUp', () => {
          this.isPullUpLoad = true;
          this.$emit('pullingUp');
        })
      },
      _reboundPullDown() {
        const {stopTime = 600} = this.pullDownRefresh;
        return new Promise((resolve) => {
          setTimeout(() => {
            this.isRebounding = true;
            this.scroll.finishPullDown();
            resolve();
          }, stopTime);
        })
      },
      _afterPullDown() {
        setTimeout(() => {
          this.pullDownStyle = `top:${this.pullDownInitTop}px`;
          this.beforePullDown = true;
          this.isRebounding = false;
          this.refresh();
        }, this.scroll.options.bounceTime);
      }
    },
    watch: {
      // 监听数据变化，延迟refreshDelay时间后调用refresh方法
      data() {
        setTimeout(() => {
          this.forceUpdate(true);
        }, this.refreshDelay);
      }
    },
    components: {
      Bubble,
      Loading
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .list-wrapper{
    position: relative;
    height: 100%;
    /*position: absolute*/
    /*left: 0*/
    /*top: 0*/
    /*right: 0*/
    /*bottom: 0*/
    overflow: hidden;
    background: #f2f2f2;
    .scroll-content{
      position: relative;
      z-index: 1;
    }
    .list-content{
      position: relative;
      z-index: 10;
      background: #fff;
    }

  }

  .pulldown-wrapper{
    position: absolute;
    width: 100%;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all;
    .after-trigger{
    }
  }

  .pullup-wrapper{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 0;
  }
</style>
