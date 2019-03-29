import axios from 'axios';
import config from '@/config';
import storage from '@/utils/storage';

class CIAuth {
  constructor (key) {
    this.key = key || 'user';
    this.storage = storage;
  }

  checkSignin (success, error) {
    let token = this.getToken()
    axios.get(config.api_base + 'v1/user/index/valitoken?token=' + token).then(res => {
      if (!(res.data.code === 10021)) { // 状态码10021表示登录过期
        let data = {}
        if (res && res.data && res.data.data) {
          data = res.data.data
        }
        let avatar = data.avatar_img || '//xmyj.oss-cn-shanghai.aliyuncs.com/Uploads/xmsj/front/img/b-icon.png'
        if (typeof avatar === 'object') {
          avatar = avatar.host + avatar.name
        }
        let param = {
          uid: data.uid,
          nickname: data.nickname,
          avatar: avatar
        }
        this.setUser(param)
        success()
      } else {
        this.setToken('')
        this.delCookie('token_key')
        this.setUser('')
        this.storage.set("title","0")
        error()
      }
    })
  }
  setUser (val) {
    if (val) {
      val = JSON.stringify(val)
    } else {
      val = ''
    }
    this.storage.set(this.key, val)
  }
  setVip (val) {
    if (val) {
      val = JSON.stringify(val)
    } else {
      val = ''
    }
    this.storage.set('vip', val)
  }
  getUser () {
    let val = this.storage.get(this.key)
    try {
      return JSON.parse(val)
    } catch (err) {
      return null
    }
  }
  setToken (val) {
    this.storage.set(this.key + '_token', val);
  }
  getToken () {
    return this.storage.get(this.key + '_token');
  }
  getCookie (name) {
    let arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if (arr = document.cookie.match(reg)) {
      return (arr[2])
    } else {
      return null
    }
  }
  setCookie (c_name, value, expiredays) {
    let exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString() + ';path=/;')
  }
  delCookie (name) {
    let exp = new Date()
    exp.setTime(exp.getTime() - 1)
    let cval = this.getCookie(name)
    if (cval != null) {
      document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
    }
  }

  signout () {
    this.setToken('')
    this.delCookie('token_key')
    this.setUser('')
    this.storage.set('title', '0')
    let url = this.storage.set('last_url') || '/'
    this.storage.set('last_url', url)
    window.location = '#/signin'
  }
}
export default new CIAuth('user')
