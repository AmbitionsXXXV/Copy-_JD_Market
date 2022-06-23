<template>
  <div class="buy-page">
    <navgation-bar :pageName="'立即购买'" @onLeftClick="onBackClick"> </navgation-bar>

    <div class="buy-page-content">
      <div class="buy-page-content-goods">
        <img class="buy-page-content-goods-img" :src="goodsData.img" />
        <div class="buy-page-content-goods-desc">
          <p class="buy-page-content-goods-desc-name">
            {{ goodsData.name }}
          </p>
          <p class="buy-page-content-goods-desc-price">￥{{ goodsData.price | priceValue }}</p>
        </div>
      </div>
      <ul class="buy-page-content-list">
        <li class="buy-page-content-list-item" v-for="(item, index) in paymentDatas" :key="index" @click="onPaymentItemClick(item)">
          <img class="buy-page-content-list-item-icon" :src="item.icon" alt="" srcset="" />
          <div class="buy-page-content-list-item-desc">
            <p class="buy-page-content-list-item-desc-name">{{ item.name }}</p>
            <p class="buy-page-content-list-item-desc-desc">{{ item.desc }}</p>
          </div>
          <img class="buy-page-content-list-item-check" :src="checkIcon(selectPayment.id === item.id)" alt="" srcset="" />
        </li>
      </ul>
    </div>

    <div class="pay page-commit" @click="onPayClick">
      立即购买
    </div>
  </div>
</template>

<script>
import NavgationBar from '@c/currency/NavigationBar';
export default {
  components: {
    NavgationBar
  },
  data: function() {
    return {
      goodsData: {},
      paymentDatas: [
        {
          id: '1',
          name: '支付宝支付',
          desc: '数亿用户都在用，安全可托付',
          icon: require('@img/alipay.svg')
        },
        {
          id: '2',
          name: '微信支付',
          desc: '亿万用户选择，更快更安全',
          icon: require('@img/weichat.png')
        }
      ],
      selectPayment: {}
    };
  },
  created: function() {
    this.selectPayment = this.paymentDatas[0];
    this.loadGoodsData();
  },
  methods: {
    /**
     * 后退到商品详情页面，会使得商品参数丢失。解决这个问题可以使用vuex
     * 使用vuex保存进入商品详情的数据，只有在刷新的时候，参数才会丢失
     */
    onBackClick: function() {
      this.$router.go(-1);
    },
    /**
     * 根据商品id ， 获取到商品数据
     */
    loadGoodsData: function() {
      this.$http
        .get('/goodsDetail', {
          params: {
            goodsId: this.$route.query.goodsId
          }
        })
        .then(data => {
          this.goodsData = data.goodsData;
        });
    },
    /**
     * 返回check图标
     */
    checkIcon: function(check) {
      return check ? require('@img/check.svg') : require('@img/no-check.svg');
    },
    /**
     * 支付方式点击事件
     */
    onPaymentItemClick: function(item) {
      this.selectPayment = item;
    },
    /**
     * 立即支付
     */
    onPayClick: function() {
      // 支付宝支付
      if (this.selectPayment.id === '1') {
        this.aliPay();
      }
      // 微信支付
      else if (this.selectPayment.id === '2') {
        this.wxPay();
      }
    },
    /**
            支付宝支付
         */
    aliPay: function() {
      if (window.androidJSBridge) {
        window.androidJSBridge.aliPay(JSON.stringify(this.goodsData));
      } else if (window.webkit) {
      }
    },
    /**
            微信支付
         */
    wxPay: function() {
      if (window.androidJSBridge) {
        window.androidJSBridge.wxPay(JSON.stringify(this.goodsData));
      } else if (window.webkit) {
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.buy-page {
  position: absolute;
  height: 100%;
  width: 100%;
  // 添加 overflow: hidden; 处理在 APP 中页面产生滑动的问题。
  overflow: hidden;

  &-content {
    height: 100%;

    &-goods {
      background-color: white;
      padding: $marginSize;
      display: flex;
      border-bottom: px2rem(1) solid $lineColor;
      border-top: px2rem(1) solid $lineColor;
      margin-top: $marginSize;
      &-img {
        width: px2rem(100);
        height: px2rem(100);
      }

      &-desc {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0 $marginSize;

        &-name {
          font-size: $infoSize;
          line-height: px2rem(18);
        }

        &-price {
          font-size: $titleSize;
          color: $mainColor;
          font-weight: 500;
        }
      }
    }

    &-list {
      margin-top: $marginSize;
      &-item {
        display: flex;
        background-color: white;
        border-bottom: 1px solid $lineColor;
        padding: $marginSize;
        align-items: center;
        &-icon {
          height: px2rem(30);
        }

        &-desc {
          margin-left: px2rem(12);
          flex-grow: 1;
          &-name {
            font-size: $infoSize;
          }

          &-desc {
            font-size: $minInfoSize;
            margin-top: px2rem(6);
            color: $textHintColor;
          }
        }

        &-check {
          width: px2rem(16);
          height: px2rem(16);
        }
      }
    }
  }

  .pay {
    position: absolute;
    bottom: px2rem(52);
  }
}
</style>
