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
        // 挂载到实例上
     this.BMap = window.BMap;
    // 创建地图实例
    this.map = new  this.BMap.Map("container");
        const { value, lable } = await getCurrCity();
       // 创建地址解析器实例
        const myGeo = new  this.BMap.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野
        myGeo.getPoint(null,async (point)=>{
            if (point) {
                this.map.centerAndZoom(point, 11);
                // 添加遮罩层
                // 添加控件
                // 添加平移的控件
                this.map.addControl(new  this.BMap.NavigationControl());
                this.map.addControl(new  this.BMap.ScaleControl());
                this.renderOverLays(value)

                }
            },
            lable);
    }

    // 封装渲染遮罩层的方法
    renderOverLays = async (id) => {

         // 发送请求获取数据
         const {status,body} = await getInitHouse(id)
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
                const ipoint = new  this.BMap.Point(longitude, latitude);
                // 绘制覆盖物
                const opts = {
                position: ipoint,    // 指定文本标注所在的地理位置
                offset: new  this.BMap.Size(0, 0)    //设置文本偏移量
                }
             const label = new  this.BMap.Label(null, opts);  // 创建文本标注对象
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
                label.addEventListener('click',  (e)=> {
                    console.log('你好');
                    this.renderOverLays(value)
                        // 点击是销毁遮罩层
                    let id=setTimeout(() => {
                        //   清除定时器
                        clearTimeout(id)
                        // 清除遮罩层
                        this.map.clearOverlays();
                    })
                    this.map.centerAndZoom(ipoint, 13);
                    // 调用下一层

                })
                    // 添加遮罩层
                this.map.addOverlay(label);
            })
        }
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
