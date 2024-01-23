import { getCartList } from '@/api/cart'

export default {
  namespaced: true,
  state () {
    return {
      cartLists: []
    }
  },
  mutations: {
    setCartList (state, newList) {
      state.cartLists = newList
    }
  },
  actions: {
    async getCartAction (context) {
      const { data } = await getCartList()
      // 给每一项添加一个isChecked状态
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    }
  },
  getters: {
    // 求所有商品总数
    cartTotal (state) {
      return state.cartLists.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品项
    selCartList (state) {
      return state.cartLists.filter(item => item.isChecked)
    },
    // 选中的商品总数
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品总价格
    selPrice (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num * item.goods.goods_price_min, 0)
    }

  }
}
