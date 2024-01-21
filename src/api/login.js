// 此处存放所有与登陆相关的接口
import request from '@/utils/request'

// 1.获取图形验证码
export const getPicCode = () => {
  return request.get('/captcha/image')
}

// 2.发送验证码请求
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

// 登陆接口
export const codeLogin = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      partyData: {},
      mobile,
      smsCode
    }
  })
}
