<template>
  <div class="nav-bar z-index-max" :class="[{ 'iphonex-top': isIphoneX }, { 'bottom-line': pageName }]" :style="navBarStyle">
    <div class="left" @click="$emit('onLeftClick')">
      <!-- 默认状态 -->
      <img v-if="isDefault && isShowBack" src="@img/back.svg" alt="" srcset="" />
      <!-- 定制具名插槽 -->
      <slot name="nav-left"></slot>
    </div>
    <div class="center">
      <!-- 默认状态 -->
      <span class="page-title" v-if="isDefault">{{ pageName }}</span>
      <!-- 定制具名插槽 -->
      <slot name="nav-center"></slot>
    </div>
    <div class="right">
      <!-- 定制具名插槽 -->
      <slot name="nav-right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 是否展示默认状态
    isDefault: {
      default: true,
      type: Boolean
    },
    // 是否展示默认后退按钮
    isShowBack: {
      default: true,
      type: Boolean
    },
    // 默认状态下页面标题的名称
    pageName: {
      default: '',
      type: String
    },
    // navBar样式
    navBarStyle: {
      type: Object,
      default: function() {
        return {
          backgroundColor: 'white'
        };
      }
    }
  },
  data: function() {
    return {
      isIphoneX: window.isIphoneX
    };
  }
};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.nav-bar {
  width: 100%;
  height: $navBarHeight;
  line-height: $navBarHeight;
  display: flex;
  justify-content: space-between;
  // 适配手机 stateBar
  padding-top: $stateBarHeight;

  .left,
  .right {
    display: flex;
    height: 100%;
    width: px2rem(26);
    padding: 0 8px;
    img {
      width: 100%;
      align-self: center;
    }
  }

  .center {
    display: flex;
    height: 100%;
    flex-grow: 1;
    .page-title {
      align-self: center;
      margin: 0 auto;
      font-size: $titleSize;
    }
  }
}

.bottom-line {
  border-bottom: 1px solid $lineColor;
}
</style>
