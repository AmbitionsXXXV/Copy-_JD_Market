<template>
  <div class="count-down">
    <!-- 12点场 00:32:18 -->
    <span class="count-down-end-time">{{ endHours }}点场</span>
    <span class="count-down-surplus">{{ surplus | filterTime }}</span>
  </div>
</template>

<script>
import { setInterval, clearInterval } from 'timers';
/**
 * 接收一个时间(时间场)，自动计算时间并且倒计时
 */
export default {
  props: {
    endHours: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data: function() {
    return {
      // 展示活动状态
      surplus: '',
      // 活动开始差距秒数
      diffSeconds: 0,
      interval: undefined
    };
  },
  created: function() {
    this.computedSurplusTime();
  },
  methods: {
    /**
     * 计算时间
     */
    computedSurplusTime: function() {
      if (this.interval) clearInterval(this.interval);
      const date = new Date();
      /**
       * 当前时间大于活动时间，活动已结束
       */
      if (date.getHours() > this.endHours) {
        this.surplus = '活动已结束';
        return;
      }

      /**
       * 当前时间等于活动时间，活动进行中
       */
      if (date.getHours() === this.endHours) {
        this.surplus = '活动进行中';
        return;
      }

      /**
       * 当前时间小于活动时间，活动未开始，进行倒计时,
       * -1 表示 预计时间为 16点 ， 当前为 12点00分，
       * 那么差距应该是 3个小时 59分 59秒，而不是4个小时
       */
      const diffHours = this.endHours - date.getHours() - 1;
      const diffMinutes = 60 - date.getMinutes() - 1;
      const diffSeconds = 60 - date.getSeconds();
      /**
       * 获取差距秒数
       */
      this.diffSeconds = diffHours * 3600 + diffMinutes * 60 + diffSeconds;
      this.interval = setInterval(() => {
        this.diffSeconds -= 1;
      }, 1000);
    }
  },
  watch: {
    /**
     * 监听秒数变化，转化为对应的时间，
     * 时间补0，可以直接在这里补0，也可以使用 filters 去补0，
     * 课程中为了介绍filters的概念，将使用 filters 补0
     */
    diffSeconds: function(newV, oldV) {
      // math.floor  向下取整
      /**
       * 当前的秒数 / 3600 向下取整 获取所有的小时数
       * 当前的秒数 / 60 向下取整 获取所有的分钟数，对 60 进行取模，获取到超过小时的分钟数
       * 当前秒数直接对 60 取模 ， 获取单独的描述
       */
      const hours = Math.floor(newV / 3600);
      const minutes = Math.floor(newV / 60) % 60;
      const seconds = newV % 60;
      this.surplus = hours + ':' + minutes + ':' + seconds;

      // 如果当前倒计时秒数已经为 0 的情况下，重新去计算时间
      if (newV === 0) {
        this.computedSurplusTime();
      }
    },
    /**
     * 父组件主动修改了时间的话，
     * 那么重新计算时间
     */
    endHours: function() {
      this.computedSurplusTime();
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.count-down {
  display: flex;
  font-size: px2rem(14);
  margin-left: $marginSize;

  span {
    display: inline-block;
    padding: px2rem(2) px2rem(4) px2rem(2) px2rem(4);
  }

  &-end-time {
    background-color: $mainColor;
    border-top-left-radius: px2rem(4);
    border-bottom-left-radius: px2rem(4);
    border: px2rem(1) solid $mainColor;
    color: white;
  }

  &-surplus {
    background-color: white;
    border-top-right-radius: px2rem(4);
    border-bottom-right-radius: px2rem(4);
    color: $mainColor;
    border: px2rem(1) solid $mainColor;
  }
}
</style>
