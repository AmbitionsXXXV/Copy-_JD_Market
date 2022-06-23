<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <!-- slides -->
    <swiper-slide v-for="(item, index) in swiperImgs" :key="index">
      <img class="swiper-slide-img" :src="item" alt="" srcset="" :style="{ height: height }" />
    </swiper-slide>
    <!-- Optional controls -->
    <template v-slot:pagination>
      <div class="swiper-pagination"></div>
    </template>
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
  components: {
    swiper,
    swiperSlide
  },
  props: {
    height: {
      type: String,
      default: 'auto'
    },
    swiperImgs: {
      type: Array,
      required: true,
      default: function() {
        return [];
      }
    },
    /**
     * 1、圆点切换
     * 2、数字
     */
    paginationType: {
      type: String,
      default: '1'
    }
  },
  data: function() {
    return {
      // swiper 配置
      swiperOption: {
        // 自动切换
        autoplay: true,
        // 自动高度，让 siwper 的高度跟随 slide 的高度变化
        autoHeight: true,
        // 设置分页器效果
        pagination: {
          // 分页器对应的 html 元素
          el: '.swiper-pagination',
          // 分页器的样式
          type: 'bullets',
          // 分页器内元素的类名
          bulletClass: 'custom-bullet-class'
        }
      }
    };
  },
  created: function() {
    this.initPaginationLayout();
  },
  methods: {
    /**
     * 根据分页器类型配置对应的分页器
     */
    initPaginationLayout: function() {
      switch (this.paginationType) {
        case '1':
          this.swiperOption.pagination = {
            el: '.swiper-pagination',
            type: 'bullets',
            bulletClass: 'custom-bullet-class'
          };
          break;
        case '2':
          this.swiperOption.pagination = {
            el: '.swiper-pagination',
            type: 'fraction'
          };
          break;
      }
    }
  }
};
</script>

<style lang="scss">
@import '@css/style.scss';
.swiper-container {
  .swiper-wrapper {
    .swiper-slide {
      background-color: white;
      .swiper-slide-img {
        width: 100%;
      }
    }
  }

  .swiper-pagination {
    bottom: px2rem(12);
    .custom-bullet-class {
      box-sizing: border-box;
      border-radius: 100%;
      height: px2rem(6);
      width: px2rem(6);
      border: px2rem(1) solid #fff;
      margin: 0 px2rem(4);
      display: inline-block;
      opacity: 1;
    }

    .swiper-pagination-bullet-active {
      background: white;
    }
  }

  .swiper-pagination-fraction {
    left: auto;
    right: 0;
    width: auto;
    font-size: $infoSize;
    background-color: rgba(0, 0, 0, 0.3);
    padding: px2rem(6) px2rem(18);
    border-top-left-radius: px2rem(16);
    border-bottom-left-radius: px2rem(16);
    bottom: px2rem(32);
    color: white;

    .swiper-pagination-current {
      font-size: $titleSize;
      font-weight: bold;
    }
  }
}
</style>
