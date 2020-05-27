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
        selectedTab: 'redTab',
        hidden: false,
        fullScreen: false,
    }
    renderContent(pageText) {
        return (
          <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
            <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
            <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
              onClick={(e) => {
                e.preventDefault();
                this.setState({
                  hidden: !this.state.hidden,
                });
              }}
            >
              Click to show/hide tab-bar
            </a>
            <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
              onClick={(e) => {
                e.preventDefault();
                this.setState({
                  fullScreen: !this.state.fullScreen,
                });
              }}
            >
              Click to switch fullscreen
            </a>
          </div>
        );
      }
    render() {
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
                        selected={this.state.selectedTab === 'blueTab'}
                        badge={1}
                        onPress={() => {
                        this.setState({
                            selectedTab: 'blueTab',
                        });
                        }}
                        data-seed="logId"
                    >
                        {this.renderContent('Life')}
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
                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => {
                        this.setState({
                            selectedTab: 'redTab',
                        });
                        }}
                        data-seed="logId1"
                    >
                        {this.renderContent('Koubei')}
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
                        selected={this.state.selectedTab === 'greenTab'}
                        onPress={() => {
                        this.setState({
                            selectedTab: 'greenTab',
                        });
                        }}
                    >
                        {this.renderContent('Friend')}
                    </TabBar.Item>

                </TabBar>
                </div>

                {/* 我是首页 */}
                {/* 设置二级路由 */}
                {/* 重定向 */}

                <Route path="/home" component={HomeIndex}></Route>
                <Route path="/home/house" component={House}></Route>
                <Route path="/home/user" component={User}></Route>
            </div>
        )
    }

}
