<template>
    <div class="my">
        <navgation-bar :pageName="'个人中心'" :isShowBack="false"> </navgation-bar>
        <!-- 个人区域 -->
        <div class="my-content">
            <div class="my-content-desc" @click="toLogin">
                <img class="my-content-desc-avater" src="@img/avater.png" alt="" srcset="" />
                <p class="my-content-desc-login">{{ $store.state.username ? $store.state.username : '登录/注册' }}</p>
            </div>
            <!-- 工具栏区域 -->
            <div class="my-content-tools">
                <div class="my-content-tools-item" v-for="(item, index) in toolsDatas" :key="index">
                    <p class="my-content-tools-item-name">{{ item }}</p>
                    <img class="my-content-tools-item-arrow" src="@img/right-arrow.svg" alt="" srcset="" />
                </div>
            </div>
            <!-- 存在登录用户，展示退出登录按钮 -->
            <div class="my-content-logout page-commit" v-if="$store.state.username" @click="onLogoutClick">退出登录</div>
        </div>
    </div>
</template>

<script>
import NavgationBar from '@c/currency/NavigationBar';
export default {
    components: {
        NavgationBar,
    },
    data: function () {
        return {
            toolsDatas: ['全部订单', '我的预约', '应用推荐', '用户福利'],
        };
    },
    methods: {
        /**
         * 登录按钮点击事件
         */
        toLogin: function () {
            if (this.$store.state.username) return;

            this.$router.push({
                name: 'login',
                params: {
                    routerType: 'push',
                },
            });
        },
        /**
         * 退出登录按钮点击事件
         */
        onLogoutClick: function () {
            if (window.androidJSBridge) {
                this.onLogoutToAndroid();
            } else if (window.webkit) {
                this.onLogoutToIos();
            }
        },
        /**
         * 调用 android 退出登录的方法
         */
        onLogoutToAndroid: function () {
            let result = window.androidJSBridge.logout();
            this.onLogoutCallback(result);
        },
        /**
         * 调用 ios 退出登录的方法
         */
        onLogoutToIos: function () {
            /**
             * 因为原生调用 JS 的方法只能是绑定到 JS window 对象中的方法，
             * 所以我们可以通过把组件中的 方法 赋值给 window 对象，
             * 从而让 vue 组件中的方法可以被原生调用到
             */
            window.logoutCallback = this.onLogoutCallback;
            window.webkit.messageHandlers.logout.postMessage({});
        },
        /**
         * 退出登录的回调方法
         */
        onLogoutCallback: function (result) {
            if (result) {
                this.$store.commit('clearUsername');
                alert('退出成功');
            } else {
                alert('操作失败，请重试');
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.my {
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column;

    &-content {
        height: 100%;
        width: 100%;

        &-desc {
            margin-top: $marginSize;
            background-color: white;
            height: px2rem(68);
            display: flex;
            align-items: center;
            border-top: 1px solid $lineColor;
            border-bottom: 1px solid $lineColor;
            padding: $marginSize;

            &-avater {
                width: px2rem(52);
                height: px2rem(52);
            }

            &-login {
                margin-left: $marginSize;
                font-size: $titleSize;
            }
        }

        &-tools {
            &-item {
                display: flex;
                height: px2rem(46);
                box-sizing: border-box;
                align-items: center;
                padding: $marginSize;
                background-color: white;
                border-bottom: 1px solid $lineColor;

                &-name {
                    font-size: $infoSize;
                    flex-grow: 1;
                }

                &-arrow {
                    width: px2rem(16);
                }
            }
        }

        &-logout {
            margin-top: 20%;
        }
    }
}
</style>
