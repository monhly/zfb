import axios from "../utils/axios"
/**
 * 获取轮播图的数据
 */
export function  getLunbo () {

 return axios({
            url:'/home/swiper'
        })

}