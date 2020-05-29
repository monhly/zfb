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