import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile';
import { getCurrCity } from "../../utils/getCity"
//导入axios请求
import{getInitHouse} from"../../request/map"
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
        const { value, lable } = await getCurrCity();
       // 创建地址解析器实例
        const myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野
        myGeo.getPoint(null,async (point)=>{
            if (point) {
                map.centerAndZoom(point, 11);
                // 添加遮罩层
                // 添加控件
                // 添加平移的控件
                map.addControl(new BMap.NavigationControl());
                map.addControl(new BMap.ScaleControl());
                // 发送请求获取数据
                const {status,body} = await getInitHouse(value)
                // 遍历遮罩层
                if (status === 200) {
                    body.forEach(item => {
                        const {
                            coord: { longitude, latitude },
                            label: areaName,
                            count,
                            value
                        } = item
                            // 转换地理位置坐标
                        const ipoint = new BMap.Point(longitude, latitude);
                        // 绘制覆盖物
                    const opts = {
                        position: ipoint,    // 指定文本标注所在的地理位置
                        offset: new BMap.Size(0, 0)    //设置文本偏移量
                        }
                     const label = new BMap.Label(null, opts);  // 创建文本标注对象
                        label.setContent(
                            `  <div class="${styles.bubble}">
                            <p class="${styles.bubbleName}">${areaName}</p>
                            <p>${count}</p>
                            </div>`
                        )
                        label.setStyle({
                            backgroundColor: 'transparent',
                            border:'none'
                        });
                        // 设置遮罩层的点击事件
                        label.addEventListener('click', function (e) {
                        console.log('你好');

                        })
                            // 添加遮罩层
                        map.addOverlay(label);
                    })
                }





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
