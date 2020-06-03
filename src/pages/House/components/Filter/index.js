import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import styles from './index.module.css'

// 定义选中菜单的类型
const selectedMenus = {
  area:false ,
  mode:false ,
  price:false,
  more:false ,
}
export default class Filter extends Component {
  state = {
    // 定义当前选中区域的对象
    selectedMenu: { ...selectedMenus },
    // 定义一个变量保存当前的数据
    currentProps:''
  }
  // 定义一个函数实现传父
  modifyTitle= (type)=>{
    // 修改数据的布尔值,根据传入的属性进行修改
    this.setState({
      selectedMenu: { ...selectedMenus, [type]: true },
      currentProps:type
    })
  }
  // 定义一个方法,判断当前点击的是哪些属性
  centifyMsg () {
    const { currentProps } = this.state
    if (currentProps !== "more"&&currentProps!=='') {
      return true
    }
    // 如果是第四个就是false
    return false
  }
  render() {
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
      {this.centifyMsg()?<div className={styles.mask} />:null}

        <div className={styles.content}>
          {/* 标题栏 */}
          {/* 父子之间进行传值 */}
          <FilterTitle modifyTitle={this.modifyTitle}  selectedMenu={this.state.selectedMenu}/>

          {/* 前三个菜单对应的内容： */}
         {this.centifyMsg()? <FilterPicker />:null}
          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
