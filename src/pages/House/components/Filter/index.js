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
// 定义一个变量自定义初始时候的筛选条件
let selectedIndex = {
  area:["area", "null"] ,
  mode:['null'] ,
  price:['null'],
  more:[] ,
}
export default class Filter extends Component {
  state = {
    // 定义当前选中区域的对象
    selectedMenu: { ...selectedMenusd },
    // 定义一个变量保存当前的数据
    currentProps:''
  }
  // 获取筛选条件的请求
  async getHouses () {
    // 获取本地的value值
    const { value } =JSON.parse( localStorage.getItem('city'))
    console.log(value);

    const { status, body } = await getHouse(value)
    // 将status保存到this数据中
    this.filter=body
   console.log(body,status);


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
      let val= selectedIndex[currentProps]
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
      return  <FilterPicker val={val} col={col} data={data} onCancle={this.onModify} onOk={this.onOk}/>
    }
    return null
  }
  // 点击关闭下拉选项
  onModify=()=> {
    this.setState({
      currentProps:''
    })
  }
  // 点击确定关闭蒙层
  onOk = (val) => {
    this.setState({
      currentProps:''
    })
    console.log(val);
    // 修改传入的值
    selectedIndex[this.state.currentProps]=val
  }



  render () {
    const {currentProps}=this.state
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {
          this.isShow() ? <div onClick={this.onModify} className={styles.mask} /> : null
        }

        <div className={styles.content}>
          {/* 标题栏 */}
          {/* 父子之间进行传值 */}
          <FilterTitle  modifyTitle={this.modifyTitle} selectedMenu={this.state.selectedMenu}/>

          {/* 前三个菜单对应的内容： */}
          {this.renderContent()}
          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
