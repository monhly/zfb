/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
// 首页的组件
// 导入样式
import "./index.css"

// 导入路由的组件
import { TabBar } from 'antd-mobile';
import { Route } from "react-router-dom"
import HomeIndex from '../homeIndex'
import House from "../House"
import User from "../Users"
//导入tabbar的数据
import list from "../../utils/tabBarArr"


export default class Home extends Component {
  state = {
    selectedTab: this.props.location.pathname,
    // 定义变量保存数据

  }
  componentDidMount () {
   this.listen()

  }
  listen=()=> {
    this.unshift = this.props.history.listen((location) => {
      if (location.pathname !== this.state.selectedTab) {
         this.setState({
           selectedTab: location.pathname,
         });
       }

     })
  }
   // 组件销毁
 componentWillUnmount() {
    // 销毁路由监听事件
    this.listen =null
  }
  target (item) {
     //路由跳转
     this.props.history.push(item.path)
     this.setState({
         selectedTab: item.path,
     });

  }
  // 底部tabbar的数据
  TabMsg () {
    return (
      <div className='buttons'>
      <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
    >{
      list.map((item) => {
          return (
            <TabBar.Item
            title={item.title}
            key={item.id}
            icon={
             <i className={`iconfont ${item.icon}`  }/>
              }
            selectedIcon={<i className={`iconfont ${item.icon}`  } />
              }
            selected={this.state.selectedTab === item.path}
            onPress={() => {
             this.target(item)
            }}
            data-seed="logId"
        >

        </TabBar.Item>
          )
        })
          }


      </TabBar>
      </div>

    )
  }
  render () {

      return (
            <div className={'homeIndex'}>
                {this.TabMsg()}
                {/* 我是首页 */}
                {/* 设置二级路由 */}
                {/* 重定向 */}

                <Route exact path="/home" component={HomeIndex}></Route>
                <Route path="/home/house" component={House}></Route>
                 <Route path="/home/user" component={User}></Route>


            </div>
        )
    }

}
