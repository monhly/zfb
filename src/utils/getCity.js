// 获取当前城市的信息
import axios from"./axios"
export const getCurrCity = () => {
    // 先从本地检索是否有数据的存在
    const currCity = JSON.parse(window.localStorage.getItem('city'))
    if (!currCity) {
        // 如果没有的话,就返回一个promise对象
      return new Promise(resolve => {
        const myCity = new window.BMap.LocalCity()
        // 异步
        myCity.get(async result => {
          const res = await axios.get(`area/info`, {
            params: {
              name: result.name
            }
          })
          // return res.data.body
            const { label, value } = res.data.body
            // 本地保存数据
          localStorage.setItem('city', JSON.stringify({ label, value }))
        //   将获取到的数据以对象的形式进行返回
          resolve({ label, value })
        })
      })
    } else {
    //此时说明存在数据
      return Promise.resolve(currCity)
    }
  }