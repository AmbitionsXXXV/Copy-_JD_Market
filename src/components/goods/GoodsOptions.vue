<template>
    <div class="goods-options z-index-2">
        <ul class="goods-options-list">
            <li class="goods-options-item" v-for="(item, index) in optionsDatas" :key="index">
                <a class="goods-options-item-content" @click="onOptionsItemClick(item, index)">
                    <span class="goods-options-item-content-name" :class="{ 'goods-options-item-content-name-active': selectOption.id === item.id }">{{ item.name }}</span>
                    <span
                        class="goods-options-item-content-caret caret"
                        v-if="item.subs.length > 0"
                        :class="[isShowSubContent && selectOption.id === item.id ? 'goods-options-item-content-caret-open' : 'goods-options-item-content-caret-close']"
                    ></span>
                </a>
            </li>
        </ul>
        <!-- 给下拉菜单添加动画 -->
        <transition name="fold-height">
            <div class="options-sub-content z-index-2" v-show="isShowSubContent">
                <ul class="options-sub-content-list">
                    <li class="options-sub-content-list-item" v-for="(item, index) in selectOption.subs" :key="index" @click="onSubOptionsItemClick(item, index)">
                        <a class="options-sub-content-list-item-content">
                            <span class="options-sub-content-list-item-content-name" :class="{ 'options-sub-content-list-item-content-name-active': selectOption.id === item.id }">{{
                                item.name
                            }}</span>
                            <img class="options-sub-content-list-item-content-select" v-show="selectOption.id === item.id" src="@img/options-select.svg" alt="" srcset="" />
                        </a>
                    </li>
                </ul>
            </div>
        </transition>

        <div class="cover" v-show="isShowSubContent" @click="isShowSubContent = false"></div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            // 数据源
            optionsDatas: [
                {
                    id: '1',
                    name: '默认',
                    subs: [
                        {
                            id: '1',
                            name: '默认',
                        },
                        {
                            id: '1-2',
                            name: '价格由高到低',
                        },
                        {
                            id: '1-3',
                            name: '销量由高到低',
                        },
                    ],
                },
                {
                    id: '2',
                    name: '有货优先',
                    subs: [],
                },
                {
                    id: '3',
                    name: '直营优先',
                    subs: [],
                },
            ],
            // 选中的筛选项
            selectOption: {},
            // 是否展开子筛选项
            isShowSubContent: false,
        };
    },
    created: function () {
        // 设置初始选中项
        this.selectOption = this.optionsDatas[0];
    },
    methods: {
        /**
         * 1、如果子选项视图处于展开状态，则关闭掉子选项视图
         * 2、展示子选项视图
         *      1、选中项包含子选项
         *      2、当前筛选项处于选中状态
         * 3、设置选中项为用户点击的选项
         */
        onOptionsItemClick: function (item, index) {
            // 如果子选项视图处于展开状态，则关闭掉子选项视图
            if (this.isShowSubContent) {
                this.isShowSubContent = false;
                return;
            }
            // 1、选中项包含子选项
            // 2、当前筛选项处于选中状态
            // 展示子选项视图
            if (item.subs.length > 0 && this.selectOption.id === item.id) {
                this.isShowSubContent = true;
            }
            // 设置选中项为用户点击的选项
            this.selectOption = item;
        },
        /**
         * 1、设置选中项为用户点击的选项
         * 2、将选中项置顶
         * 3、关闭子选项视图
         */
        onSubOptionsItemClick: function (subItem, index) {
            // 设置选中项为用户点击的选项
            this.selectOption = subItem;

            // 遍历所有的可选项，将选中项置顶
            this.optionsDatas.forEach((options) => {
                options.subs.forEach((subOptions) => {
                    if (subOptions.id === subItem.id) {
                        options.id = subOptions.id;
                        options.name = subOptions.name;
                    }
                });
            });

            // 关闭子选项视图
            this.isShowSubContent = false;
        },
    },
    watch: {
        /**
         * 当选择项发生变化的时候，需要通知父组件
         */
        selectOption: function (newValue, oldValue) {
            this.$emit('optionsChange', newValue);
        },
    },
};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.goods-options {
    width: 100%;
    border-bottom: 1px solid $lineColor;
    &-list {
        display: flex;
        width: 100%;
        height: $goodsOptionsHeight;
        background-color: white;
        .goods-options-item {
            flex-grow: 1;

            &-content {
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;

                &-name {
                    font-size: $infoSize;
                    margin-right: $marginSize;

                    &-active {
                        color: $mainColor;
                    }
                }

                // 子选项展开时，三角形的动画
                &-caret {
                    &-open {
                        transform: rotate(-180deg);
                        transition: all 0.3s;
                    }

                    &-close {
                        transform: rotate(0deg);
                        transition: all 0.3s;
                    }
                }
            }
        }
    }

    // 子选项内容区
    .options-sub-content {
        // 脱离标准文档流
        position: absolute;
        width: 100%;
        max-height: px2rem(180);
        overflow: hidden;
        overflow-y: auto;
        background-color: white;
        &-list {
            &-item {
                &-content {
                    display: flex;
                    align-items: center;
                    border-top: 1px solid $lineColor;
                    padding: $marginSize;
                    height: px2rem(44);
                    box-sizing: border-box;
                    &-name {
                        font-size: $infoSize;
                        display: inline-block;
                        flex-grow: 1;

                        &-active {
                            color: $mainColor;
                        }
                    }

                    &-select {
                        width: px2rem(18);
                        height: px2rem(18);
                    }
                }
            }
        }
    }

    /**
            子选项内容区展开动画，当 v-if=“true” 的时候调用
            当子选项部分展开时，初始状态max-height为0，结束状态max-height为180
        */
    .fold-height-enter-active {
        animation-duration: 0.3s;
        animation-name: fold-height-open;
    }

    @keyframes fold-height-open {
        0% {
            max-height: 0;
        }
        100% {
            max-height: px2rem(180);
        }
    }

    /**
            子选项内容区关闭动画，当 v-if=false 的时候调用
            当子选项部分关闭时，初始状态max-height为180，结束状态max-height为0
        */
    .fold-height-leave-active {
        animation-duration: 0.3s;
        animation-name: fold-height-close;
    }

    @keyframes fold-height-close {
        0% {
            max-height: px2rem(180);
        }
        100% {
            max-height: 0;
        }
    }
}
</style>
