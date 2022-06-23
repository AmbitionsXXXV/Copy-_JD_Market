import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: undefined,
    // 购物车数据
    shoppingDatas: [],
    // 进入商品详情的数据
    selectGoods: {}
  },
  mutations: {
    setUsername: function(state, username) {
      state.username = username;
    },
    clearUsername: function(state) {
      state.username = undefined;
    },
    /**
     * 添加购物车商品
     */
    addShoppiongData: function(state, goods) {
      // 判断购物车中是否已经包含该商品
      /**
       * some() 方法用于检测数组中的元素是否满足指定条件（函数提供）。
          some() 方法会依次执行数组的每个元素：
          如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
          如果没有满足条件的元素，则返回false。
       */
      const isExist = state.shoppingDatas.some(item => {
        if (item.id === goods.id) {
          // 如果商品已经存在的话，那么让商品的数量加一
          item.number += 1;
          return true;
        }
      });

      // 只有在商品不存在购物车的时候，在让商品去添加到购物车
      if (!isExist) {
        // goods.isCheck = false;
        // goods.number = 1;
        Vue.set(goods, 'isCheck', false);
        Vue.set(goods, 'number', 1);
        state.shoppingDatas.push(goods);
      }
    },
    /**
     * 更改购物车商品数量
     */
    changeShoppingDataNumber: function(state, data) {
      state.shoppingDatas[data.index].number = data.number;
    },
    setSelectGoods: function(state, goods) {
      state.selectGoods = goods;
    }
  },
  actions: {}
});
