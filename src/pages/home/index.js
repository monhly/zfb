import React, { Component } from 'react'
// 首页的组件
// 导入路由的组件
import { Route, Link } from "react-router-dom"
import HomeIndex from '../homeIndex'
import House from "../House"
import User from"../Users"
export default class Home extends Component {
    render() {
        return (
            <div>
                <Link to="/home/index">首页</Link>
                <Link to="/home/house">fangyuan</Link>
                <Link to="/home/user">个人</Link>
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
