import React, { Component } from 'react'

export default class Map extends Component {
    componentDidMount () {
        // this.init()
        console.log(window.BMap)
    }



    render () {


        return (
            <div className="mapIndex">
               <div id="container"></div>
            </div>
        )
    }
    // init () {
    //     const { BMap } = window;
    //     console.log(window.BMap)
    //     // 1. 创建地图实例
    //     const map = new BMap.Map("container");
    //     // 2. 地图定位的经纬度设置(天安门)
    //     let point = new BMap.Point(116.404, 39.915);
    //     // 3. 设置地图的位置和缩放级别
    //     map.centerAndZoom(point, 15);
    // }

}
