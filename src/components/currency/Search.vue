<template>
    <div class="search" :style="searchStyle">
        <img class="search-icon" :src="icon" alt="" srcset="" />
        <span class="search-hint" :style="hintStyle">ONE OK ROCK</span>
    </div>
</template>

<script>
export default {
    props: {
        bgColor: {
            default: '#ffffff',
            type: String,
        },
        hintColor: {
            default: '#999999',
            type: String,
        },
        icon: {
            default: require('@img/search.svg'),
            type: String,
        },
    },
    computed: {
        searchStyle: function () {
            return {
                backgroundColor: this.bgColor,
            };
        },
        hintStyle: function () {
            return {
                color: this.hintColor,
            };
        },
    },
    methods: {},
};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.search {
    background-color: white;
    width: 100%;
    margin: px2rem(6);
    border-radius: px2rem(22);
    display: flex;
    align-items: center;
    .search-icon {
        margin-left: $marginSize;
        width: px2rem(16);
    }
    .search-hint {
        margin-left: $marginSize;
        font-size: $minInfoSize;
        color: $textHintColor;
    }
}
</style>
