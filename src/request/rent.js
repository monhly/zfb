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
/**
 * 获取表单的信息
 */
export function uploadImg(fm) {
    return axios.post('houses/image', fm)
}
  /**
   * 发布房源
   */
export function publishHouse (datas) {
     return axios.post('user/houses', datas)

  }