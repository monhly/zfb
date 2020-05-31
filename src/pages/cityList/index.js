import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile'
import { getCity, getHotCity } from "../../request/city"

export default class CityList extends Component {
    //头部导航的组件
    Nav () {
        return (
            <>
                 <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() =>   this.props.history.go(-1)}
                >城市选择</NavBar>
            </>
        )
    }
    // 获取城市列表的数据
    async getCityMsg () {
        const data = await getCity(1)
        // 定义对象保存数据
        const {cityObj ,indexItem}= await this.modifyData(data)
        console.log(cityObj ,indexItem);
    }
    // 手动修改返回的数据
   async modifyData (data) {
        // 保存城市的变量
        let cityObj = {}
        let indexItem = []
        //保存城市的键值
        if (data.status === 200) {
            // 此时对请求的数据进行判断
            data.body.forEach(item => {
                // 对数据进行遍历
                // 截取abc
                const suoyin = item.short.slice(0, 1)
                // 对截取的数据进行判断
                //如果对象中没有abc的键
                if (!cityObj[suoyin]) {
                    // 则需要将当前的数据添加到对象中去
                    cityObj[suoyin]=[item]
                } else {
                    // 如果有值,直接push即可
                    cityObj[suoyin].push(item)
                }
            });
            indexItem=Object.keys(cityObj).sort()
            //获取热门城市
            const {status,body} = await getHotCity()
            if (status === 200) {
                // 将hot数据添加到对象里面
                cityObj['hot'] = body
                // 添加hot索引
                indexItem.unshift('hot')

            }
            return { cityObj, indexItem }
        }

    }
    componentDidMount () {
        // 获取城市的数据
        this.getCityMsg()

    }
    render () {

        return (
            <div>
                {/* 头部的导航区域 */}
               { this.Nav()}
            </div>
        )
    }
}
