import axios from "../utils/axios"
/**
 * 获取登录的验证
 */
export function getLogin (data) {
    return axios({
        url: "user/login",
        method: "post",
        data
    })
}