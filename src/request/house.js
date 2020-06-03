import axios from "../utils/axios"
// 获取房源的筛选信息
export function getHouse (value){
    return axios({
        url: 'houses/condition',
        params: {
            id:value
        }
    })
}