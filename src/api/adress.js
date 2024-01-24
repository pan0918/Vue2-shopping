import request from '@/utils/request'

// 获取默认地址
export const getAddressList = () => {
  return request.get('/address/list')
}
