import axios from "../utils/axios"
/**
 * 地图找房,初始化数据的房源信息
 */
export function getInitHouse (id) {
    return axios({
        url: 'area/map',
        params: {
            id:id
        }
    })
}