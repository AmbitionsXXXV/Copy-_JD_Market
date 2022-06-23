<template>
  <div class="goods-list-page">
    <navgation-bar :pageName="'商品列表'" @onLeftClick="onBackClick">
      <template v-slot:nav-right>
        <img :src="layoutType.icon" @click="onChangelayoutTypeClick()" />
      </template>
    </navgation-bar>

    <div class="goods-list-page-content" :class="{ 'iphonex-bottom': isIphoneX }">
      <goods-options @optionsChange="onOptionsChange"></goods-options>
      <!-- <goods></goods> -->
      <goods :sort="sortType" :layoutType="layoutType.type"></goods>
    </div>
  </div>
</template>

<script>
import NavgationBar from '@c/currency/NavigationBar';
import GoodsOptions from '@c/goods/GoodsOptions';
import goods from '@c/goods/goods';
export default {
  name: 'goodsList',
  components: {
    NavgationBar,
    GoodsOptions,
    goods
  },
  data: function() {
    return {
      isIphoneX: window.isIphoneX,
      sortType: '1',
      layoutTypeDatas: [
        {
          type: '1',
          icon: require('@img/list-type.svg')
        },
        {
          type: '2',
          icon: require('@img/grid-type.svg')
        },
        {
          type: '3',
          icon: require('@img/waterfall-type.svg')
        }
      ],
      layoutType: {}
    };
  },
  created: function() {
    this.layoutType = this.layoutTypeDatas[0];
  },
  methods: {
    /**
     * 后退按钮点击事件
     */
    onBackClick: function() {
      this.$router.go(-1);
    },
    /**
     * 监听筛选项的变化
     */
    onOptionsChange: function(option) {
      this.sortType = option.id;
    },
    /**
     * 修改数据的排列方式
     */
    onChangelayoutTypeClick: function() {
      if (this.layoutType.type === '1') {
        this.layoutType = this.layoutTypeDatas[1];
      } else if (this.layoutType.type === '2') {
        this.layoutType = this.layoutTypeDatas[2];
      } else {
        this.layoutType = this.layoutTypeDatas[0];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.goods-list-page {
  height: 100%;
  width: 100%;
  background-color: $bgColor;
  display: flex;
  flex-direction: column;
  position: absolute;
  &-content {
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
}
</style>
