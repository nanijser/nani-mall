import config from '@/config'
import request from '@/utils/request'

const API_SIGNIN = config.api_base + 'v1/user/index/login'

/**
 * @param {String} username
 * @param {String} password
 */
export function signin({ username, password }, success, error) {
  request.post(API_SIGNIN, {
    username: username,
    pwd: password
  }).then(success).catch(error)
}
