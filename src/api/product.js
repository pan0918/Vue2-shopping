import request from '@/utils/request'

// 获取商品列表
export const getProList = (Obj) => {
  const { categoryId, goodsName, page } = Obj
  return request.get('/goods/list', {
    params: {
      categoryId,
      goodsName,
      page
    }
  })
}
