<template>
    <div class="register-page">
        <navgation-bar :pageName="'注册'" @onLeftClick="onBackClick"> </navgation-bar>
        <!-- 内容区 -->
        <div class="register-page-content">
            <!-- 用户名 -->
            <div class="input-container">
                <input v-model="username" type="text" placeholder="用户名" />
            </div>
            <!-- 密码 -->
            <div class="input-container">
                <input v-model="password" type="password" placeholder="密码" />
            </div>
            <!-- 确认密码 -->
            <div class="input-container">
                <input v-model="comfirmPassword" type="password" placeholder="确认密码" />
            </div>

            <div class="register-page-content-login page-commit" @click="onRegisterClick">注册</div>
        </div>
    </div>
</template>

<script>
import md5 from '@js/md5.min.js';
import NavgationBar from '@c/currency/NavigationBar';
export default {
    components: {
        NavgationBar,
    },
    data: function () {
        return {
            username: '',
            password: '',
            comfirmPassword: '',
            md5Password: '',
        };
    },
    methods: {
        /**
         * 后退事件
         */
        onBackClick: function () {
            this.$router.go(-1);
        },
        /**
         * 注册按钮点击事件
         */
        onRegisterClick: function () {
            if (this.username.length === 0) {
                alert('请完善用户名');
                return;
            }
            if (this.password.length === 0 || this.password != this.comfirmPassword) {
                alert('请完善密码');
                return;
            }
            this.md5Password = md5(this.password);

            if (window.androidJSBridge) {
                this.onRegisterToAndroid();
            } else if (window.webkit) {
                this.onRegisterToIos();
            }
        },
        /**
         * 调用 android 注册方法
         */
        onRegisterToAndroid: function () {
            let userJson = JSON.stringify({
                username: this.username,
                password: this.md5Password,
            });
            let result = window.androidJSBridge.register(userJson);
            this.onRegisterCallback(result);
        },
        /**
         * 调用 IOS 注册方法
         */
        onRegisterToIos: function () {
            let userJson = {
                username: this.username,
                password: this.md5Password,
            };
            window.registerCallback = this.onRegisterCallback;
            window.webkit.messageHandlers.register.postMessage(userJson);
        },
        /**
         * 注册方法回调
         */
        onRegisterCallback: function (result) {
            if (result) {
                alert('注册成功');
                this.onBackClick();
            } else {
                alert('注册失败，请重试');
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.register-page {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: white;
    overflow: hidden;
    &-content {
        width: 100%;
        height: 100%;

        &-username {
        }

        &-password {
        }

        &-login {
            margin-top: 40%;
        }

        &-register {
            font-size: $infoSize;
            color: $textHintColor;
            margin-top: $marginSize;
            display: inline-block;
            padding: $marginSize;
            float: right;
        }
    }
}
</style>
