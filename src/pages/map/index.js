import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile';
import { getCurrCity } from "../../utils/getCity"
// 导入样式
import styles from"./index.module.css"
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
        const myGeo = new BMap.Geocoder();
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

                // 添加遮罩层
                const opts = {
                    position : point,    // 指定文本标注所在的地理位置
                    offset   : new BMap.Size(0,0)    //设置文本偏移量
                }
                // 实例文本对象的标注
                const label = new BMap.Label(null, opts);  // 创建文本标注对象
                label.setContent(
                    `<div class="${styles.bubble}">
                    <p class="${styles.bubbleName}">浦东新区</p>
                    <p>388套</p>
                  </div>`
                )
                label.setStyle({
                    backgroundColor: 'transparent',
                    border:'none'
                });
                // 设置遮罩层的点击事件
                label.addEventListener('click', function (e) {



                })
                  map.addOverlay(label);
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
