// 约定键名
const infoKey = 'vue2-shopping'
const historyKey = 'vue2-history'

// 获取个人信息
export const getInfo = () => {
  const defaultObj = { token: '', userId: '' }
  const result = localStorage.getItem(infoKey)
  return result ? JSON.parse(result) : defaultObj
}

// 设置个人信息
export const setInfo = (obj) => {
  localStorage.setItem(infoKey, JSON.stringify(obj))
}

// 移除个人信息
export const removeInfo = () => {
  localStorage.removeItem(infoKey)
}

// 获取搜索历史
export const getHistoryList = () => {
  const result = localStorage.getItem(historyKey)
  return result ? JSON.parse(result) : []
}

// 设置搜索历史
export const setHistoryList = (arr) => {
  localStorage.setItem(historyKey, JSON.stringify(arr))
}
