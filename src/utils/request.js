import axios from 'axios'
import qs from 'qs'
import storage from '@/utils/storage'

class CIRequest {
  constructor (request, config) {
    this.request = this.initRequest(request, config)
    this.token = config.token
  }

  initRequest (request, config) {
    return request.create({
      baseURL: config.apiBase,
      timeout: config.timeout || 3000
    })
  }

  async get (url, data, config) {
    data = this.appendToken(data)
    url = `${url}?${qs.stringify(data)}`
    let res = await this.request.get(url, data, config)
    return this.handleResponse(res)
  }

  async post (url, data, config) {
    // console.log('post', url, data, config)
    data = this.appendToken(data)
    let res = await this.request.post(url, qs.stringify(data), config)
    // let res = await this.request.post(url, data, config)
    return this.handleResponse(res)
  }

  async put (url, data, config) {
    data = this.appendToken(data)
    let res = await this.request.put(url, data, config)
    return this.handleResponse(res)
  }

  appendToken (data) {
    data = data || {}
    data.token = storage.get("token");
    return data;
  }

  handleResponse (res) {
    if (res.status === 200) {
      if (res.data.code === 200) {
        return res.data.data;
      } else if (res.data.status === 200) {
        return res.data.result;
      } else {
        throw res.data;
      }
    } else {
      // throw res
      console.log('utils.request ERROR', res)
    }
  }
}
let request = new CIRequest(axios, {
  apiBase: '//localhost:3010',
  token: storage.get("token")
})

export default request
