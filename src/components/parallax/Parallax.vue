<template>
    <!-- 
  视差效果：让多层背景以不同的速度去进行移动
  1、至少需要拥有两层背景（缓慢移动区、正常移动区）
  2、将背景设置为相对布局（为缓慢移动区设置top来换冲掉scroll滚动）
  3、监听Parallax组建的滑动，根据滑动来计算缓慢移动区top的值
  -->
    <div class="parallax" @scroll="onScrollChange" ref="parallax">
        <!-- 缓慢移动内容 -->
        <div class="parallax-slow" :style="{ top: slowTop }">
            <slot name="parallax-slow"></slot>
        </div>
        <!-- 正常移动内容 -->
        <div class="parallax-content z-index-2">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            // 速度差
            SPEED_DIFF: 2,
            // 页面滚动距离
            parallaxScroll: 0,
        };
    },
    activated: function () {
        /**
         * 定位页面滑动位置
         */
        this.$refs.parallax.scrollTop = this.parallaxScroll;
    },
    methods: {
        onScrollChange: function ($e) {
            this.parallaxScroll = $e.target.scrollTop;
            this.$emit('onScrollChange', this.parallaxScroll);
        },
    },
    computed: {
        /**
         * 返回 slow 距离顶部的距离
         */
        slowTop: function () {
            // 当前页面的滑动距离 / 速度差 = 该内容区实际应该滑动的距离
            // 当前页面的滑动距离 - 该内容区实际应该滑动的距离 = slow 距离顶部的距离
            return this.parallaxScroll - this.parallaxScroll / this.SPEED_DIFF + 'px';
        },
    },
};
</script>

<style lang="scss" scoped>
.parallax {
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    .parallax-slow {
        width: 100%;
        position: relative;
    }

    .parallax-content {
        height: 100%;
        position: relative;
    }
}
</style>
