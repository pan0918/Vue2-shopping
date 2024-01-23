import { changeCount, getCartList, delSelect } from '@/api/cart'
import { Toast } from 'vant'

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
    },
    toggleCheck (state, goodsId) {
      // 使对应的项取反
      const goods = state.cartLists.find(item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },
    toggleAllCheck (state, flag) {
      state.cartLists.forEach(item => {
        item.isChecked = flag
      })
    },
    changeCount (state, { goodsId, goodsNum }) {
      const goods = state.cartLists.find(item => item.goods_id === goodsId)
      goods.goods_num = goodsNum
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
    },
    async changeCountAction (context, obj) {
      const { goodsNum, goodsId, goodsSkuId } = obj
      // 先本地同步
      context.commit('changeCount', { goodsId, goodsNum })
      // 再同步到后台
      await changeCount(goodsId, goodsNum, goodsSkuId)
    },
    async delSelect (context) {
      const selCartList = context.getters.selCartList
      const cartIds = selCartList.map(item => item.id)
      await delSelect(cartIds)
      Toast('删除成功！')

      // 重新拉取数据
      context.dispatch('getCartAction')
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
    },
    // 判断复选框是否全选
    isAllChecked (state) {
      return state.cartLists.every(item => item.isChecked)
    }
  }
}
