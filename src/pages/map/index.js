import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile';
export default class Map extends Component {
    componentDidMount () {
        this.init()

    }
    // 初始化地图
    init () {
        const { BMap } = window;
        // 1. 创建地图实例
        const map = new BMap.Map("container");
        // 2. 地图定位的经纬度设置(天安门)
        let point = new BMap.Point(116.404, 39.915);
        // 3. 设置地图的位置和缩放级别
        map.centerAndZoom(point, 15);
    }


    render () {


        return (
            <div className="mapIndex">
                {/* 头部导航栏 */}
                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.props.history.go(-1)}
                >地图找房</NavBar>
                {/* 下方地图的渲染 */}
               <div id="container"></div>
            </div>
        )
    }


}
