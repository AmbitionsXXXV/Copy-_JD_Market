<template>
  <div class="number-manager">
    <span class="number-manager-less" :disabled="number === 1" @click="onLessClick">-</span>
    <span class="number-manager-number">{{ number }}</span>
    <span class="number-manager-add" @click="onAddClick">+</span>
  </div>
</template>

<script>
export default {
  /**
   * 商品数量发生变化时，通知父组件，具体某个商品的数量发生了变化，
   * 在指向数量变化的具体某个商品的时候，有两个方法实现。
   * 1、GoodsNumberManager 接收商品对象，当数量发生变化的时候，把接收到的商品对象，传回给父组件。
   *      使用这种方式把商品对象来回传递，会在逻辑上略显混乱，每次使用该组件都需要绑定商品对象，并且不符合商品数量控制器组件的定位。
   * 2、使用arguments,获取子组件传递过来的数据，在父组件中单独传参商品对象
   */
  props: {
    // goods: {
    //     type: Object
    // },
    defaultNumber: {
      type: Number,
      default: 1
    }
  },
  data: function() {
    return {
      number: 1
    };
  },
  methods: {
    onLessClick: function() {
      console.log('onLessClick');
      if (this.number === 1) {
        return;
      }
      this.number -= 1;
    },
    onAddClick: function() {
      this.number += 1;
    }
  },
  watch: {
    defaultNumber: function(newValue) {
      this.number = newValue;
    },
    number: function(newValue, oldValue) {
      this.$emit('onNumberChange', newValue);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.number-manager {
  display: flex;
  font-size: $infoSize;
  height: px2rem(20);
  line-height: px2rem(20);
  span {
    width: px2rem(30);
    text-align: center;
    display: inline-block;
    font-weight: 500;
  }

  &-less {
  }

  &-number {
    background-color: $bgColor;
    padding: 0 px2rem(4);
  }

  &-add {
  }

  &-disabled {
    color: $textHintColor;
  }
}
</style>
