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
// 获取房源的信息
export function getHouseList (cityId,filters,start,end) {
    return axios({
     url: 'houses',
      params: {
        cityId,
        ...filters,
        start:start||1,
        end: end||20
       }
   })
}
/**
 *
 * @param {*} id 获取具体房源的信息
 */
export function getHouseItem (id) {
    return axios({
          url:"houses/"+id
      })
  }