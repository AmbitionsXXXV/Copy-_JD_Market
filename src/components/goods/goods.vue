<template>
    <!-- 如何在同一个组件中去展示不同的样式 -->
    <div class="goods" :class="[layoutClass, { 'goods-scroll': isScroll }]" :style="{ height: goodsViewHeight }" @scroll="onScrollChange" ref="goods">
        <div class="goods-item" :class="layoutItemClass" :style="goodsItemStyles[index]" v-for="(item, index) in sortGoodsData" :key="index" ref="goodsItem" @click="onGoodsItemClick(item)">
            <!-- 图片 -->
            <img class="goods-item-img" :src="item.img" alt="" srcset="" :style="imgStyles[index]" />
            <!-- 描述 -->
            <div class="goods-item-desc">
                <p class="goods-item-desc-name" :class="{ 'goods-item-desc-name-hint': !item.isHave }">
                    <!-- 是否为直营 -->
                    <direct v-if="item.isDirect"></direct>
                    <!-- 是否有库存 -->
                    <no-have v-if="!item.isHave"></no-have>
                    {{ item.name }}
                </p>
                <div class="goods-item-desc-data">
                    <p class="goods-item-desc-data-price">￥{{ item.price | priceValue }}</p>
                    <p class="goods-item-desc-data-volume">销量：{{ item.volume }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import direct from '@c/goods/Direct';
import NoHave from '@c/goods/NoHave';
export default {
    components: {
        direct,
        NoHave,
    },
    props: {
        sort: {
            type: String,
            default: '1',
        },
        /**
         * 1：列表布局
         * 2：网格布局
         * 3：瀑布流布局
         */
        layoutType: {
            type: String,
            default: '1',
        },
        /**
         * 是否允许 goods 单独滑动
         */
        isScroll: {
            type: Boolean,
            default: true,
        },
    },
    data: function () {
        return {
            MIN_IMG_HEIGHT: 178,
            MAX_IMG_HEIGHT: 230,
            goodsData: [],
            // 不同展示形式下的布局
            layoutClass: 'goods-list',
            layoutItemClass: 'goods-list-item',
            sortGoodsData: [],
            // goods组件高度
            goodsViewHeight: '100%',
            // item margin
            itemMarginBottomSize: 8,
            // 图片样式集合
            imgStyles: [],
            // item 样式集合
            goodsItemStyles: [],
            scrollTopValue: 0,
        };
    },
    created: function () {
        this.initData();
    },
    activated: function () {
        /**
         * 定位页面滑动位置，需要配合keepAlive 来使用
         */
        this.$refs.goods.scrollTop = this.scrollTopValue;
    },
    methods: {
        initData: function () {
            this.$http.get('/goods').then((data) => {
                this.goodsData = data.list;
                this.setSortGoodsData();
                this.initLayout();
            });
        },
        /**
         * 商品排序
         */
        setSortGoodsData: function () {
            switch (this.sort) {
                // 默认
                case '1':
                    // 深拷贝，不改变原数组
                    this.sortGoodsData = this.goodsData.slice(0);
                    break;
                // 价格
                case '1-2':
                    this.getSortGoodsDataFromKey('price');
                    break;
                // 销量
                case '1-3':
                    this.getSortGoodsDataFromKey('volume');
                    break;
                // 有货优先
                case '2':
                    this.getSortGoodsDataFromKey('isHave');
                    break;
                // 直营优先
                case '3':
                    this.getSortGoodsDataFromKey('isDirect');
                    break;
            }
        },
        /**
         * 设置布局
         */
        initLayout: function () {
            this.goodsViewHeight = '100%';
            this.goodsItemStyles = [];
            this.imgStyles = [];
            switch (this.layoutType) {
                case '1':
                    (this.layoutClass = 'goods-list'), (this.layoutItemClass = 'goods-list-item');
                    break;
                case '2':
                    (this.layoutClass = 'goods-grid'), (this.layoutItemClass = 'goods-grid-item');
                    break;
                case '3':
                    (this.layoutClass = 'goods-waterfall'), (this.layoutItemClass = 'goods-waterfall-item');
                    this.initImgStyles();
                    this.$nextTick(() => {
                        this.initWaterfall();
                    });
                    break;
            }
        },
        /**
         * 根据传入的key进行排序，由大到小
         */
        getSortGoodsDataFromKey: function (key) {
            /**
             *  返回 负数 ， 表示 goods1 在 goods2 之前，
             *  返回正数， 表示 goods1 在 goods2 之后，
             *  返回 0， 顺序不变
             */
            return this.sortGoodsData.sort((goods1, goods2) => {
                // 根据传入的key获取对应的value
                let v1 = goods1[key],
                    v2 = goods2[key];
                // 对value进行对比
                // boolean 类型值的处理
                if (typeof v1 === 'boolean') {
                    if (v1) {
                        return -1;
                    }
                    if (v2) {
                        return 1;
                    }
                    return 0;
                }

                // float 类型值的处理
                if (parseFloat(v1) >= parseFloat(v2)) {
                    return -1;
                }
                return 1;
            });
        },
        /**
         * 返回随机的图片高度,使每个商品列表中的商品模块高度随机
         */
        imgHeight: function () {
            let result = Math.floor(Math.random() * (this.MAX_IMG_HEIGHT - this.MIN_IMG_HEIGHT) + this.MIN_IMG_HEIGHT);
            return result;
        },
        /**
         * 根据随机高度，生成图片样式数据
         */
        initImgStyles: function () {
            this.goodsData.forEach((item) => {
                this.imgStyles.push({
                    height: this.imgHeight() + 'px',
                });
            });
        },
        /**
         * 瀑布流布局
         * 1、获取到所有的item元素
         * 2、遍历item元素，得到每一个item的高度，加上一个margin的高度
         * 3、创建两个变量leftHeightTotal和rightHeightTotal，分别表示左右两侧目前距离顶部的高度，
         * 通过对于左右两侧距离顶部的高度来确定item的放置位置
         * 如果左侧小于等于右侧高度的话，item应该放置到左侧，此时item距离左侧应该为零，距离顶部应该为leftHeightTotal
         */
        initWaterfall: function () {
            // 获取所有的item元素
            let $goodsItems = this.$refs.goodsItem;
            if (!$goodsItems) return;
            // 定义变量存储距离左右两个顶部的高度
            let leftHeightTotal = 0,
                rightHeightTotal = 0;
            $goodsItems.forEach(($el, index) => {
                // 遍历 item元素得到每一个 item的高度加上一个margin的高度
                let goodsItemStyle = {};
                let elHeight = $el.clientHeight + this.itemMarginBottomSize;
                // 对比左右两侧距离顶部的距离
                if (leftHeightTotal <= rightHeightTotal) {
                    goodsItemStyle = {
                        left: '0px',
                        top: leftHeightTotal + 'px',
                    };
                    // 更新左侧距离顶部的高度
                    leftHeightTotal += elHeight;
                } else {
                    goodsItemStyle = {
                        right: '0px',
                        top: rightHeightTotal + 'px',
                    };
                    // 更新右侧距离顶部的高度
                    rightHeightTotal += elHeight;
                }

                this.goodsItemStyles.push(goodsItemStyle);
            });
            // 在不需要 goods 自滑动的时候，再去计算 goodsView 的高度
            if (!this.isScroll) {
                this.goodsViewHeight = leftHeightTotal > rightHeightTotal ? leftHeightTotal : rightHeightTotal + 'px';
            }
        },
        /**
         * 商品点击事件
         */
        onGoodsItemClick: function (item) {
            //  商品无库存不允许跳转
            if (!item.isHave) {
                alert('该商品无库存');
                return;
            }
            this.$router.push({
                name: 'goodsDetails',
                params: {
                    routerType: 'push',
                },
                // 把传递的数据附加到我们的 URL 上
                query: {
                    goodsId: item.id,
                },
            });
        },
        /**
         * 滑动变化
         */
        onScrollChange: function ($e) {
            this.scrollTopValue = $e.target.scrollTop;
        },
    },
    watch: {
        sort: function () {
            this.setSortGoodsData();
        },
        /**
         * 监听布局类型切换
         * 1：列表布局
         * 2：网格布局
         * 3：瀑布流布局
         */
        layoutType: function () {
            this.initLayout();
        },
    },
};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.goods {
    background-color: $bgColor;
    &-scroll {
        overflow: hidden;
        overflow-y: auto;
    }
    &-item {
        background-color: white;
        padding: $marginSize;
        box-sizing: border-box;

        &-desc {
            width: 100%;
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

                &-volume {
                    font-size: $infoSize;
                    color: $textHintColor;
                }
            }
        }
    }
}

.goods-list {
    &-item {
        display: flex;
        border-bottom: 1px solid $lineColor;
        .goods-item-img {
            width: px2rem(120);
            height: px2rem(120);
        }
        .goods-item-desc {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: $marginSize;
        }
    }
}

.goods-grid {
    margin: $marginSize;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &-item {
        width: 49%;
        border-radius: $radiusSize;
        margin-bottom: $marginSize;
        .goods-item-img {
            width: 100%;
        }
    }
}

.goods-waterfall {
    position: relative;
    margin: $marginSize;
    &-item {
        width: 49%;
        border-radius: $radiusSize;
        position: absolute;

        .goods-item-img {
            width: 100%;
        }
    }
}
</style>
