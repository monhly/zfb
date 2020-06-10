import axios from "../utils/axios"
/**
 * 获取轮播图的数据
 */
export function  getLunbo () {
 return axios({
            url:'/home/swiper'
        })
}
/**
 * 获取租房小组
 */
export function getZuFang (place) {
    return axios({
        url:'home/groups?area='+place
    })
}
// 获取热门推荐的信息
export function getHotMsg (id) {
    return axios({
        url:'home/news?area='+id
    })
}
/**
 * 获取城市的信息
 */
export function getCityInfo (place) {
    return axios({
        url: 'area/info',
        params: {
            name:place
        }
    })
}