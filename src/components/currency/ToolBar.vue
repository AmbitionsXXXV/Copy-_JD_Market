<template>
  <div class="tool-bar" :class="{ 'iphonex-bottom': isIphoneX }">
    <div class="tool-bar-item" @click="onItemClick(item, index)" v-for="(item, index) in toolBarData" :key="index">
      <img class="tool-bar-item-img" :src="[index === selectIndex ? item.hIcon : item.nIcon]" />
      <p class="tool-bar-item-name" :class="{ 'tool-bar-item-name-h': index === selectIndex }">{{ item.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      toolBarData: [
        {
          nIcon: require('@img/home-n.svg'),
          hIcon: require('@img/home-h.svg'),
          name: '首页',
          componentName: 'home'
        },
        {
          nIcon: require('@img/shopping-n.svg'),
          hIcon: require('@img/shopping-h.svg'),
          name: '购物车',
          componentName: 'shopping'
        },
        {
          nIcon: require('@img/my-n.svg'),
          hIcon: require('@img/my-h.svg'),
          name: '我的',
          componentName: 'my'
        }
      ],
      selectIndex: 0,
      isIphoneX: window.isIphoneX
    };
  },
  created: function() {},
  methods: {
    onItemClick: function(item, index) {
      this.selectIndex = index;
      this.$emit('onChangeFragment', item.componentName);
    },
    onChangeComponent: function(index) {
      this.onItemClick(this.toolBarData[index], index);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.tool-bar {
  width: 100%;
  height: px2rem(46);
  display: flex;
  justify-content: space-around;
  background-color: white;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.2);
  border-top: 1px solid $lineColor;
  .tool-bar-item {
    text-align: center;
    padding: px2rem(4) 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .tool-bar-item-img {
      width: px2rem(22);
      height: px2rem(22);
    }
    .tool-bar-item-name {
      font-size: $minInfoSize;
      margin-top: px2rem(4);
      &-h {
        color: $mainColor;
      }
    }
  }
}
</style>
