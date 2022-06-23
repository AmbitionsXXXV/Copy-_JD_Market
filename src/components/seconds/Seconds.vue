<template>
  <div class="seconds">
    <div class="seconds-wrap">
      <p class="seconds-wrap-title">京东秒杀</p>
      <count-down :endHours="16"></count-down>
    </div>
    <div class="seconds-content">
      <div class="seconds-item" v-for="(item, index) in dataSource" :key="index">
        <img class="seconds-item-icon" :src="item.icon" alt="" srcset="" />
        <p class="seconds-item-price">￥{{ item.price | priceValue }}</p>
        <p class="seconds-item-old-price">￥{{ item.oldPrice | priceValue }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import CountDown from '@c/seconds/CountDown.vue';
export default {
  props: {
    dataSource: {
      type: Array,
      required: true,
      default: function() {
        return [
          {
            id: '',
            icon: '',
            price: '',
            oldPrice: ''
          }
        ];
      }
    }
  },
  components: {
    CountDown
  }
};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.seconds {
  background-color: white;
  border-radius: $radiusSize;
  margin: $marginSize;

  &-wrap {
    display: flex;
    padding: $marginSize;
    &-title {
      font-size: $titleSize;
      display: inline-block;
    }
  }

  &-content {
    padding: $marginSize 0;
    display: flex;
    overflow: hidden;
    overflow-x: scroll;

    .seconds-item {
      padding: 0 px2rem(12);
      text-align: center;

      &-icon {
        width: px2rem(66);
        height: px2rem(66);
      }

      &-price {
        color: $mainColor;
        font-size: $titleSize;
      }

      &-old-price {
        color: $textHintColor;
        font-size: $infoSize;
        margin-top: px2rem(6);
        text-decoration: line-through;
      }
    }
  }
}
</style>
