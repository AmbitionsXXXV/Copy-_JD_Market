<template>
    <!-- 业务逻辑：
    1、在商品详情中点击加入购物车，系统会通过 alert 弹出“添加成功”的提示，然后页面跳转到购物车组件
    2、跳转到购物车页面之后，购物车会展示我们添加的商品。默认状态下商品处于未选中状态
    3、可以在购物车中，改变商品数量，数字为1时不能再减少
    4、如果购物车中已经有该商品，则数量会自动加一
    5、购物车中会栈是亦轩的商品总价格及总数量 -->
    <div class="shopping">
        <navgation-bar :isShowBack="false" :pageName="'购物车'"></navgation-bar>

        <div class="shopping-content">
            <div class="shopping-content-list">
                <div class="shopping-content-list-item" v-for="(item, index) in shoppingDatas" :key="index">
                    <img class="shopping-content-list-item-check" :src="checkIcon(item.isCheck)" @click="onCheckClick(item)" />
                    <img class="shopping-content-list-item-img" :src="item.img" />
                    <div class="shopping-content-list-item-desc">
                        <p class="shopping-content-list-item-desc-name" :class="{ 'shopping-content-list-item-desc-name-hint': !item.isHave }">
                            <direct v-if="item.isDirect"></direct>
                            <no-have v-if="!item.isHave"></no-have>
                            {{ item.name }}
                        </p>
                        <div class="shopping-content-list-item-desc-data">
                            <p class="shopping-content-list-item-desc-data-price">￥{{ item.price | priceValue }}</p>
                            <goods-number-manager :defaultNumber="item.number" @onNumberChange="onNumberChange(arguments, item, index)"></goods-number-manager>
                        </div>
                    </div>
                </div>
            </div>

            <div class="shopping-content-total">
                <div class="shopping-content-total-check">
                    <img :src="checkIcon(totalDatas.isAll)" @click="onCheckAllClick()" />
                    <p>全选</p>
                </div>

                <div class="shopping-content-total-price">
                    <p class="shopping-content-total-price-total">
                        合计：<span>￥{{ totalDatas.totalPrice | priceValue }}</span>
                    </p>
                    <p class="shopping-content-total-price-all">
                        总额:<span>￥{{ totalDatas.totalPrice | priceValue }}</span
                        >&nbsp;&nbsp;立减:<span>￥00.00</span>
                    </p>
                </div>

                <div class="shopping-content-total-settlement">去结算({{ totalDatas.goodsNumber }})</div>
            </div>
        </div>
    </div>
</template>

<script>
import NavgationBar from '@c/currency/NavigationBar';
import direct from '@c/goods/Direct';
import NoHave from '@c/goods/NoHave';
import GoodsNumberManager from '@c/goods/GoodsNumberManager';
export default {
    components: {
        NavgationBar,
        direct,
        NoHave,
        GoodsNumberManager,
    },
    methods: {},
    data: function () {
        return {
            shoppingDatas: this.$store.state.shoppingDatas,
            totalDatas: {
                isAll: false,
                totalPrice: 0,
                goodsNumber: 0,
            },
        };
    },
    methods: {
        /**
         * 商品是否选中的点击事件
         */
        onCheckClick: function (item) {
            item.isCheck = !item.isCheck;
            this.computeGoodsTotal();
        },
        /**
         * 返回check图标
         */
        checkIcon: function (check) {
            return check ? require('@img/check.svg') : require('@img/no-check.svg');
        },
        /**
         * 全选按钮
         */
        onCheckAllClick: function () {
            this.totalDatas.isAll = !this.totalDatas.isAll;

            this.shoppingDatas.forEach((item) => (item.isCheck = this.totalDatas.isAll));
            this.computeGoodsTotal();
        },
        /**
         * 监听选中变化
         */
        computeGoodsTotal: function () {
            this.totalDatas = {
                isAll: true,
                totalPrice: 0,
                goodsNumber: 0,
            };

            this.shoppingDatas.forEach((item) => {
                if (!item.isCheck) {
                    this.totalDatas.isAll = false;
                } else {
                    this.totalDatas.totalPrice += parseFloat(item.price) * parseInt(item.number);
                    this.totalDatas.goodsNumber += parseInt(item.number);
                }
            });
        },
        /**
         * 监听商品数量的变化
         */
        onNumberChange: function ($arguments, item, index) {
            let number = $arguments[0];
            this.$store.commit('changeShoppingDataNumber', {
                index: index,
                number: number,
            });

            if (item.isCheck) {
                this.computeGoodsTotal();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.shopping {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-flow: column;

    .shopping-content {
        background-color: $bgColor;
        border-top: px2rem(1) solid $lineColor;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;

        &-list {
            height: 100%;
            overflow: hidden;
            overflow-y: auto;

            &-item {
                background-color: white;
                padding: $marginSize;
                display: flex;
                border-bottom: px2rem(1) solid $lineColor;

                &-check {
                    width: $checkSize;
                    align-self: center;
                    padding: px2rem(6);
                }

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
                        overflow: hidden;
                        text-overflow: ellipsis;
                        word-break: break-word;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        display: -webkit-box;
                        line-height: px2rem(18);

                        &-hint {
                            color: $textHintColor;
                        }
                    }

                    &-data {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-top: $marginSize;

                        &-price {
                            font-size: $titleSize;
                            color: $mainColor;
                            font-weight: 500;
                        }
                    }
                }
            }
        }

        &-total {
            height: px2rem(56);
            box-sizing: border-box;
            display: flex;
            align-items: center;
            background-color: white;
            border-top: px2rem(1) solid $lineColor;

            &-check {
                display: flex;
                align-items: center;
                margin-left: $marginSize;
                margin-right: $marginSize;
                img {
                    width: $checkSize;
                    padding: px2rem(6);
                }

                p {
                    font-size: $infoSize;
                }
            }

            &-price {
                flex-grow: 2;
                display: flex;
                flex-direction: column;
                &-total {
                    font-size: $titleSize;
                    margin-bottom: px2rem(6);
                    span {
                        font-weight: bold;
                    }
                }

                &-all {
                    font-size: $minInfoSize;
                    span {
                        font-weight: bold;
                    }
                }
            }

            &-settlement {
                width: px2rem(120);
                height: 100%;
                font-size: $titleSize;
                background-color: $mainColor;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
}
</style>
