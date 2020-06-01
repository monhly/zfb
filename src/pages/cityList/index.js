import React, { Component } from 'react'
import { NavBar, Icon, Toast } from 'antd-mobile'
import { getCity, getHotCity } from "../../request/city"
// 导入自适应的列表
import { AutoSizer, List } from 'react-virtualized'
//导入样式
import"./index.scss"
// const list = Array.from(new Array(100)).map((item,index) => index);
export default class CityList extends Component {
    state = {
        cityObj: {},
        indexItem:[]
    }
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
        // 修改数据
        this.setState({
            cityObj,
            indexItem
        })
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
   rowRenderer=({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        style // Style object to be applied to row (to position it)
   }) => {
       const { cityObj,indexItem } = this.state
        // 获取归类的首字母
       const title = indexItem[index]
        // 获取首字母的数据
         const msgList=cityObj[title]
        return (
          <div key={key} style={style} className="city-item">
                <div className="title">{this.trunTitle(title)}</div>
                {/* 遍历首字母的数据 */}
                {msgList.map(i=> <div className="name" onClick={()=>{this.sendMsg(i)}} key={i.value}>{i.label}</div>)}

          </div>
        )
    }
    //点击城市进行切换
    sendMsg (i) {
        console.log(i);
        // 定义有数据的城市
        const hasCity = ['北京', '上海', '广州', '深圳']
        // 如果此时是有房源信息的城市i
        if (hasCity.includes(i.label)) {
            // 保存数据
            JSON.stringify(window.localStorage.setItem('city',i))
            // 进行页面的跳转
            this.props.history.goBack()
        } else {
            // 如此时不是房源的城市
            Toast.fail('暂无房源的信息 !!!', 1);
        }
    }
    // 对title的数据进行改变
    trunTitle (data,status) {
        if (data === 'hot') {
            return status?'热':'热门城市'
        } else {
            return data.toUpperCase()
        }
    }
    // 渲染右侧的数据
    renderCityIndex () {
        const {indexItem}=this.state
        return indexItem.map((item, index) => {
            return (
              <li
                key={item}
                className="city-index-item"
              >
                <span className={0 === index ? 'index-active' : ''}>
                  {this.trunTitle(item,true)}
                </span>
              </li>
            )
          })
    }
    // 组件渲染完成后的钩子函数
    componentDidMount () {
        // 获取城市的数据
        this.getCityMsg()

    }
    render () {

        return (
            <div className="listCitys">
                {/* 头部的导航区域 */}
                {this.Nav()}
                {/* 城市列表的区域 */}
                <AutoSizer>
                {({ height, width }) => (
                  <List
                  height={height}
                  rowCount={this.state.indexItem.length}
                            rowHeight={(obj) => {
                                // 返回的是每个值的索引
                                // 获取每个索引的长度,根据长度自定义高度
                                const { cityObj, indexItem } = this.state
                                // 获取首字母数组的数量
                                const lengths = cityObj[indexItem[obj.index]]
                                // 根据数组长度计算高度
                               const heightLine=lengths.length*50+36
                                return heightLine

                  }}
                  rowRenderer={this.rowRenderer}
                   width={width}
                    className="city-item"
                  />
                  )}
                </AutoSizer>
                {/* 右侧导航的区域 */}
                 {/* 右侧索引列表 */}
                <ul className="city-index">
                {this.renderCityIndex()}
                </ul>

            </div>
        )
    }
}
