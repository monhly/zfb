/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
// 首页的组件
// 导入路由的组件
import { TabBar } from 'antd-mobile';
import { Route } from "react-router-dom"
import HomeIndex from '../homeIndex'
import House from "../House"
import User from "../Users"

export default class Home extends Component {
    state = {
        selectedTab: '/home',
        hidden: false,
        fullScreen: false,
    }

  render () {
      console.log(this.props);

        return (
            <div>
                <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 } }>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                    >
                    <TabBar.Item
                        title="首页"
                        key="Life"
                        icon={
                            <i className="iconfont icon-ind" />
                          }
                          selectedIcon={<i className="iconfont icon-ind" />
                          }
                        selected={this.state.selectedTab === '/home'}
                        badge={1}
                  onPress={() => {
                          //路由跳转
                    this.props.history.push('/home')
                        this.setState({
                            selectedTab: '/home',
                        });
                        }}
                        data-seed="logId"
                    >

                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                        <div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
                        />
                        }
                        selectedIcon={
                        <div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
                        />
                        }
                        title="Koubei"
                        key="Koubei"
                        badge={'new'}
                        selected={this.state.selectedTab === '/home/house'}
                  onPress={() => {
                        //路由跳转
                    this.props.history.push('/home/house')
                        this.setState({
                            selectedTab: '/home/house',
                        });
                        }}
                        data-seed="logId1"
                    >

                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                        <div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
                        />
                        }
                        selectedIcon={
                        <div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
                        />
                        }
                        title="Friend"
                        key="Friend"
                        dot
                        selected={this.state.selectedTab === '/home/user'}
                  onPress={() => {
                          //路由跳转
                    this.props.history.push('/home/user')
                        this.setState({
                            selectedTab: '/home/user',
                        });
                        }}
                    >

                    </TabBar.Item>

                </TabBar>
                </div>

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
