<template>
    <div class="goods-detail">
        <navgation-bar :isDefault="false" :navBarStyle="navBarStyle">
            <template v-slot:nav-left>
                <div class="goods-detail-nav-left" @click="onBackClick">
                    <img src="@img/back-2.svg" :style="{ opacity: leftImgOpacity }" />
                    <img src="@img/back-white.svg" :style="{ opacity: navBarOpactity }" />
                </div>
            </template>
            <template v-slot:nav-center>
                <p class="goods-detail-nav-title" :style="{ opacity: navBarOpactity }">商品详情</p>
            </template>
        </navgation-bar>

        <div class="goods-detail-content">
            <parallax @onScrollChange="onScrollChange">
                <template v-slot:parallax-slow>
                    <!-- 轮播 -->
                    <my-swiper :height="SWIPER_IMAGE_HEIGHT + 'px'" :swiperImgs="goodsData.swiperImgs" :paginationType="'2'"></my-swiper>
                </template>

                <template>
                    <div class="goods-detail-content-desc">
                        <div class="goods-detail-content-desc-item">
                            <p class="goods-detail-content-desc-item-price">￥{{ goodsData.price | priceValue }}</p>
                            <p class="goods-detail-content-desc-item-name">
                                <direct v-if="goodsData.isDirect"></direct>
                                {{ goodsData.name }}
                            </p>
                        </div>

                        <div class="goods-detail-content-desc-item">
                            <!-- 已选商品 -->
                            <p class="goods-detail-content-desc-item-select">
                                已选 <span class="single-row-text">{{ goodsData.name }}</span>
                            </p>
                            <!-- 附加服务 -->
                            <div class="goods-detail-content-desc-item-support">
                                <ul class="goods-detail-content-desc-item-support-list">
                                    <li class="goods-detail-content-desc-item-support-list-item" v-for="(item, index) in supportDatas" :key="index">
                                        <img src="@img/support.svg" alt="" srcset="" />
                                        <span>{{ item }}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="goods-detail-content-desc-detail">
                            <img v-for="(item, index) in goodsData.detailImgs" :key="index" :src="item" alt="" srcset="" />
                        </div>
                    </div>
                </template>
            </parallax>
        </div>

        <!-- 加入购物车、立即购买 -->
        <div class="goods-detail-buy" :class="{ 'iphonex-bottom': isIphoneX }">
            <div class="goods-detail-buy-add" @click="onAddGoodsClick">加入购物车</div>
            <div class="goods-detail-buy-now" @click="onBuyClick">立即购买</div>
        </div>
    </div>
</template>

<script>
import NavgationBar from '@c/currency/NavigationBar';
import MySwiper from '@c/swiper/MySwiper';
import direct from '@c/goods/Direct';
import Parallax from '@c/parallax/Parallax';
export default {
    name: 'goodsDetails',
    components: {
        NavgationBar,
        MySwiper,
        direct,
        Parallax,
    },
    data: function () {
        return {
            SWIPER_IMAGE_HEIGHT: 364,
            ANCHOR_SCROLL_TOP: 310,
            goodsData: {},
            // 滚动值
            scrollTopValue: -1,
            isIphoneX: window.isIphoneX,
            supportDatas: ['可配送海外', '京东发货&售后', '京准达', '211限时达', '可自提', '不可使用优惠卷'],
            parallaxScroll: 0,
        };
    },
    methods: {
        onBackClick: function () {
            this.$router.go(-1);
        },
        /**
         * 根据商品id ， 获取到商品数据
         */
        loadGoodsData: function () {
            this.$http
                .get('/goodsDetail', {
                    params: {
                        goodsId: this.$route.query.goodsId,
                    },
                })
                .then((data) => {
                    this.goodsData = data.goodsData;
                });
        },
        /**
         * 页面滑动距离
         */
        onScrollChange: function (parallaxScroll) {
            this.parallaxScroll = parallaxScroll;
            // this.leftImgOpacity = 1 - parallaxScroll / this.SWIPER_IMAGE_HEIGHT;
            // this.navBarOpactity = 1 - this.leftImgOpacity;
        },
        /**
         * 添加商品到购物车
         */
        onAddGoodsClick: function () {
            this.$store.commit('addShoppiongData', this.goodsData);
            alert('添加成功');
            this.$router.push({
                name: 'imooc',
                params: {
                    routerType: 'push',
                    componentIndex: 1,
                },
            });
        },
        /**
         * 立即购买点击事件
         */
        onBuyClick: function () {
            this.$router.push({
                name: 'buy',
                params: {
                    routerType: 'push',
                },
                query: {
                    goodsId: this.goodsData.id,
                },
            });
        },
    },
    created: function () {
        /**
         * 问题：
         *  当我们直接在浏览器中，刷新页面的时候，vueRouter 里面的 params 数据会被重置。
         * 这个时候 ， 我们拿到的 goods === undefined。
         * 解决方案：
         * 在页面里面，无论我们如何去刷新页面，我们都可以获取到这个商品的数据。
         *   1、在网页的 URL 中，添加上商品的标记（goodsId）
         *  2、通过后台提供的接口，根据这个商品的标记来获取到对应的商品数据。
         *  3、goodsData = 从后台获取到的商品数据。
         *
         */
        this.loadGoodsData();
    },
    computed: {
        leftImgOpacity: function () {
            return 1 - this.parallaxScroll / this.ANCHOR_SCROLL_TOP;
        },
        navBarOpactity: function () {
            return 1 - this.leftImgOpacity;
        },
        navBarStyle: function () {
            return {
                backgroundColor: 'rgba(216, 30, 6, ' + this.navBarOpactity + ')',
                position: 'fixed',
                top: 0,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.goods-detail {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;

    &-nav-left {
        position: relative;
        width: 100%;
        img {
            position: absolute;
            left: 0;
            top: 50%;
            margin-top: px2rem(-13);
        }
    }

    &-nav-title {
        width: 100%;
        height: 100%;
        font-size: $titleSize;
        font-weight: bold;
        text-align: center;
        color: white;
    }

    &-content {
        overflow: hidden;
        height: 100%;

        &-desc {
            width: 100%;
            background-color: $bgColor;
            box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.2);
            &-item {
                background-color: white;
                padding: $marginSize;
                margin-bottom: $marginSize;
                // 价格
                &-price {
                    font-size: px2rem(20);
                    color: $mainColor;
                    font-weight: 500;
                }
                // 名称
                &-name {
                    margin-top: $marginSize;
                    font-size: $titleSize;
                    font-weight: 500;
                    line-height: px2rem(20);
                    &-hint {
                        color: $textHintColor;
                    }
                }
                // 已选商品
                &-select {
                    font-size: $infoSize;
                    color: $textHintColor;
                    height: px2rem(44);
                    display: flex;
                    align-items: center;
                    border-bottom: px2rem(1) solid $lineColor;

                    span {
                        color: $textColor;
                        font-size: $titleSize;
                        font-weight: bolder;
                        margin-left: px2rem(4);
                        width: 80%;
                    }
                }
                // 附加服务
                &-support {
                    margin-top: $marginSize;

                    &-list {
                        display: flex;
                        flex-wrap: wrap;

                        &-item {
                            display: flex;
                            align-items: center;
                            padding: px2rem(6) 0;
                            margin-right: $marginSize;

                            img {
                                width: px2rem(12);
                                margin-right: px2rem(4);
                            }

                            span {
                                font-size: $minInfoSize;
                                color: $textHintColor;
                            }
                        }
                    }
                }
            }

            &-detail {
                img {
                    width: 100%;
                }
            }
        }
    }

    &-buy {
        background-color: white;
        border-top: px2rem(1) solid $lineColor;
        height: px2rem(46);
        line-height: px2rem(46);
        text-align: right;

        div {
            display: inline-block;
            width: px2rem(100);
            text-align: center;
            font-size: $infoSize;
            color: white;
        }

        &-add {
            background-color: $mainColor;
        }

        &-now {
            background-color: darkgoldenrod;
        }
    }
}
</style>
