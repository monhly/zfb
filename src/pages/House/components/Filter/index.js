import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'
// 获取axios的请求
import {getHouse} from"../../../../request/house"
import styles from './index.module.css'

// 定义选中菜单的类型
const selectedMenusd = {
  area:false ,
  mode:false ,
  price:false,
  more:false ,
}

export default class Filter extends Component {
  state = {
    // 定义当前选中区域的对象
    selectedMenu: { ...selectedMenusd },
    // 定义一个变量保存当前的数据
    currentProps: ''
  }
  // 定义一个变量自定义初始时候的筛选条件
  selectedIndex = {
    area:["area", "null"] ,
    mode:['null'] ,
    price:['null'],
    more:[] ,
  }
  // 获取筛选条件的请求
  async getHouses () {
    // 获取本地的value值
    const { value } = JSON.parse(localStorage.getItem('city'))
    // 根据接口获取筛选条件
    const { status, body } = await getHouse(value)
    if (status === 200) {
      // 将status保存到this数据中
    this.filter=body
    }


  }
  componentDidMount () {
    this.getHouses()

  }

  // 定义一个函数实现传父
  modifyTitle= (type)=>{
    // 修改数据的布尔值,根据传入的属性进行修改
    this.setState({
      selectedMenu: { ...selectedMenusd, [type]: true },
      currentProps:type
    })
  }
  // 定义一个方法,判断当前点击的是哪些属性
  // 判断是否为前三个菜单
  isShow = () => {
    const { currentProps } = this.state;
    return currentProps === 'area' || currentProps === 'mode'
    || currentProps === 'price'
  }
  // 渲染内容区域
  renderContent () {
    if (this.isShow()) {
      const { currentProps } = this.state
      // 定义一个渲染的内容传值给子组件
      let data = null
      // 传入对应的列数
      let col = null
      // 定义一个变量传给输入的value值
      let val= this.selectedIndex[currentProps]
      const { area,subway ,rentType,price} = this.filter
      // 根据所选的type值传入对应的数据
      switch (currentProps) {
        case 'area':
          data = [area, subway]
          col = 3

          break
        case 'mode':
          data = rentType
          break
        case 'price':
          data = price
          break
        default:
          break
      }
      return  <FilterPicker key={currentProps} val={val} col={col} data={data} onCancle={this.onModify} onOk={this.onOk}/>
    }
    return null
  }
  // 处理筛选器有无条件进行高亮显示的情况
  handelSel () {
    // 创建一个新的标题选中状态的对象
    const newTitleSele = {}
    // 遍历现在的对象
    Object.keys(this.selectedIndex).forEach(key => {
      // 获取当前过滤器中选中的值
      let cur = this.selectedIndex[key]
      // 将当前的值进行判断
      if ( (key === 'area') && (cur[1] !==
        "null" || cur[0] === 'subway') ) {
        newTitleSele[key]=true
      }else if (key === 'mode' && cur[0] !== "null") {
        newTitleSele[key] = true
      }
      else if (key === 'price' && cur[0] !== 'null') {
        newTitleSele[key]=true
      }// 后续处理
      else if (key === 'more' && cur.length !== 0) {
        // 更多选择项 FilterMore 组件情况
        newTitleSele[key] = true
      } else {
        newTitleSele[key] = false
      }
    })
    return newTitleSele
  }
  // 根据当前选中的筛选条件进行处理
  handelFilters (selectedValues) {
    // 对获取的筛选数据进行结构
    const { area, mode, price, more } = selectedValues;
    // 重新定义一个变量对数据进行接收
    const filters = {}
    // 对地区的数据进行结构
    let areaKey = area[0], aval;
    // 如果获取的地区数据的长度是2
    if (area.length === 2) {
      // 此时就将获取的第二个值赋值给变量
      aval = area[1]
    } else {
      // 如果此时数组的长度大于2
      // 判断第三个变量
      if (area[2] !== 'null') {
        // 如果不是第三个值不是null则说明有值
        aval=area[2]
      } else {
        // 如果第三个是是null
        // 则将第二个值赋值给变量
        aval=area[1]
      }
    }
    // 此时将地区的数据传递给对象
    filters[areaKey] = aval
    // 对价钱的数据进行处理
    filters.rentType = mode[0]
    // price
    filters.price = price[0]
    // more
    filters.more = more.join(',')
    console.log('filters:', filters);
    return filters

  }


  // 点击关闭下拉选项
  onModify = () => {
    // 对状态进行处理
    const newVal=this.handelSel()
    this.setState({
      currentProps: '',
      selectedMenu:newVal
    })
  }
  // 点击确定关闭蒙层
  onOk = (val) => {
    console.log(val);
     // 顶级确定修改筛选条件的值
     this.selectedIndex[this.state.currentProps]=val
    // 点击确定进行高亮的修改
    const newVal=this.handelSel()
    this.setState({
      currentProps: '',
      //修改保存状态的值
      selectedMenu:newVal
    }, () => {
        this.handelFilters(this.selectedIndex)
      // 传递的数据
      this.props.onFilter( this.handelFilters(this.selectedIndex))
    })


  }
  // 点击筛选更多
  renderMore()
  {
    const { currentProps } = this.state
    // 判断当前选中的属性
    if (currentProps === 'more') {
      const { roomType, oriented, floor, characteristic } = this.filter;
      const data = { roomType, oriented, floor, characteristic }
      return (
        <FilterMore
          data={data}
          value={this.selectedIndex[currentProps]}
          onOk={this.onOk}
          onModify={this.onModify}
        />
      )
    }
    return null
  }
  render () {

    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {
          this.isShow() ? <div onClick={this.onModify} className={styles.mask} /> : null
        }

        <div className={styles.content}>
          {/* 标题栏 */}
          {/* 父子之间进行传值 */}
          <FilterTitle   modifyTitle={this.modifyTitle} selectedMenu={this.state.selectedMenu}/>

          {/* 前三个菜单对应的内容： */}
          {this.renderContent()}
          {/* 最后一个菜单对应的内容： */}
          {/* 点击筛选显示更多的筛选条件 */}
          {this.renderMore()}
        </div>
      </div>
    )
  }
}
