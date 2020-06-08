import axios from "../utils/axios"
/**
 * 发送数据获取小区的信息
 */
export function getCommunity (name,id) {
    return axios({
        url: 'area/community',
        params: {
            name,
            id
        }
    })
}