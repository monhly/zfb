/**
 * 获取城市列表的数据
 */
import axios from "../utils/axios"

export function  getCity (place) {
 return axios({
            url:'area/city?level='+place
        })
}