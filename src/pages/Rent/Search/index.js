import React, { Component } from 'react'

import { SearchBar } from 'antd-mobile'

import { getToken } from '../../../utils/token'

import styles from './index.module.css'

// 获取小区信息axios的请求
import {getCommunity} from'../../../request/rent'
export default class Search extends Component {

  state = {
    // 搜索框的值
    searchTxt: '',
    tipsList: []
  }

   componentDidMount() {
    // // 获取城市ID
    const { value } =  getToken('city')
    this.cityId = value;
  }
  targetForm= (item)=> {

    this.props.history.replace(`/rent/add`, {
      id: item.community,
      name: item.communityName
    })
  }
  // 渲染搜索结果列表
  renderTips = () => {
    const { tipsList } = this.state

    return tipsList.map(item => (
      <li onClick={() => {

      this.targetForm(item)

      }} key={item.community} className={styles.tip}>
        {item.communityName}
      </li>
    ))
  }
  // 输入框的值发生变化的时候
  changeText =(valu)=> {
    // 数据发生变化,修改state的数据
    //去空格
    let value=valu.trim()

    if (value === '') {
      this.setState({
        searchTxt:'',
        tipsList:[]
      })
    } else {
      this.setState({
        searchTxt:value
      },async () => {
          // 发送请求
          const {status,body} = await getCommunity(value, this.cityId)
          if (status === 200) {
            this.setState({
              tipsList:body
            })
          }

      })
    }

  }
  render() {
    const { history } = this.props
    const { searchTxt } = this.state

    return (
      <div className={styles.root}>
        {/* 搜索框 */}
        <SearchBar
          placeholder="请输入小区或地址"
          value={searchTxt}
          showCancelButton={true}
          onChange={this.changeText}
          onCancel={() => history.replace('/rent/add')}
        />

        {/* 搜索提示列表 */}
        <ul className={styles.tips}>{this.renderTips()}</ul>
      </div>
    )
  }
}
