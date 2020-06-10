import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile';
import {getCurrCity}from"../../utils/getCity"
export default class Map extends Component {
    componentDidMount () {
        this.init()

    }
    // 初始化地图
    init =async()=> {
        const { BMap } = window;
        // 1. 创建地图实例
        const map = new BMap.Map("container");
        const {  lable } = await getCurrCity();
       // 创建地址解析器实例
        var myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野
        myGeo.getPoint(null, function(point){
            if (point) {
                map.centerAndZoom(point, 11);
                // 添加遮罩层
                map.addOverlay(new BMap.Marker(point));
                // 添加控件
                // 添加平移的控件
                map.addControl(new BMap.NavigationControl());
                map.addControl(new BMap.ScaleControl());
                // 缩略地图
                map.addControl(new BMap.OverviewMapControl());
                            }
        },
        lable);
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
