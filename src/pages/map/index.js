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
        const { status, body } = await getInitHouse(id)
        const { type, nextLevel } = this.getTypeAndZoom()
        // 遍历遮罩层
        if (status === 200) {
            body.forEach(item => {
            //   根据覆盖物渲染不同遮盖物形状
            this.createOverlays(type, nextLevel,item)
            })
        }
    }
    // 计算一个需要绘制覆盖物类型和下一个缩放级别
    getTypeAndZoom = () => {
        //获取当前的缩放级别
        const currZoom = this.map.getZoom()
        // 项目中默认缩放级别为：11
        let type, nextLevel
        // 获取小区缩放级别
        if (currZoom >= 10 && currZoom < 12) {
            // 区
            type ='circle'
            nextLevel = 13
        } else if (currZoom >= 12 && currZoom < 14) {
            // 镇
            type = 'circle'
            nextLevel = 15
          } else if (currZoom >= 14 && currZoom < 16) {
            // 小区
            type = 'rect'
          }
          return {
            type,
            nextLevel
          }

    }
    // 根据不同的层级渲染不同的覆盖物
    createOverlays = (type, nextLevel,item) => {
        if (type === 'rect') {
            // 小区
            this.createRect(item)
          } else {
            // 区和镇
            this.createCircle(nextLevel,item)
          }
    }
    // 创建圆形状
    // ========创建圆形覆盖物========
  // 处理区和镇的情况
  createCircle = (nextLevel, item) => {
    // 解构当前项数据
    const { coord: { longitude, latitude }, label: areaName, value, count } = item;
		// 处理坐标点
    let ipoint = new this.BMap.Point(longitude, latitude)
    // 绘制覆盖物
    const opts = {
      position: ipoint,    // 指定文本标注所在的地理位置
      offset: new this.BMap.Size(0, 0)    //设置文本偏移量
    }
    const label = new this.BMap.Label(null, opts);  // 创建文本标注对象
    label.setContent(
      `
    <div class="${styles.bubble}">
      <p class="${styles.bubbleName}">${areaName}</p>
      <p>${count}</p>
    </div>
     `
    )
    // 去除默认样式
    label.setStyle({
      border: 'none'
    });
    // 添加点击事件
    label.addEventListener('click', () => {
      // 设置显示下一区域的位置和缩放级别
      this.map.centerAndZoom(ipoint, nextLevel);
      this.renderOverLays(value);
      // 清除第一层覆盖物
      // map.clearOverlays();
      setTimeout(() => this.map.clearOverlays());
    })
    this.map.addOverlay(label);
    }
    // 处理小区情况
  createRect = (item) => {
    // 绘制覆盖物
      const { coord: { longitude, latitude }, label: areaName, value, count } = item;
      let ipoint = new this.BMap.Point(longitude, latitude)
    const opts = {
      position: ipoint,    // 指定文本标注所在的地理位置
      offset: new this.BMap.Size(-50, -28)    //设置文本偏移量
    }
    const label = new this.BMap.Label(null, opts);  // 创建文本标注对象
    label.setContent(`
      <div class="${styles.rect}">
        <span class="${styles.housename}">${areaName}</span>
        <span class="${styles.housenum}">${count}</span>
        <i class="${styles.arrow}"></i>
      </div>
     `
    )
    // 去除默认样式
    label.setStyle({
      border: 'none'
    });
    // 添加点击事件
    label.addEventListener('click', () => {
      console.log('点击小区', value)
    })
    this.map.addOverlay(label);
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
