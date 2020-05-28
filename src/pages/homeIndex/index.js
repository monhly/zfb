import React, { Component } from 'react'
// 导入轮播图的组件
import { Carousel ,Flex} from 'antd-mobile';
//导入axios组件
import { getLunbo } from "../../request/home"
import { baseurl } from "../../utils/axios"
// 导入样式
import "./index.css"
// 导入数据
import navArr from"../../utils/navList"
export default class HomeIndex extends Component {
    state = {
        data: [],
        imgHeight: 176,
        // 轮播图的状态
        statusLunBo:false
    }
    // 获取轮播请求
   async getLB () {
       const { description, status, body } = await getLunbo()
       //判断此时获取的数据状态
       if (status === 200) {
        console.log(description, status, body);
        // 修改数据
           this.setState({
               data:[...body]
           }, () => {
                //    修改自动播放的状态:

                   this.setState({
                       statusLunBo:true
                   })
           })
     }

    }
    // 组件渲染完成以后
    componentDidMount() {
        // simulate img loading
        // 获取请求
        this.getLB()
        console.log(baseurl);
    }
    // 轮播图的数据
    lunBo () {
        return (
            <div>
            <Carousel
            autoplay={this.state.statusLunBo}
            infinite
            >
            {this.state.data.map(val => (
                <a
                key={val.id}
                href="http://www.alipay.com"
                style={{ display: 'block', width: '100%', height: this.state.imgHeight }}
                >
                <img
                    src={baseurl+val.imgSrc}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                    }}
                />
                </a>
            ))}
            </Carousel>
        </div>

        )
    }
    Nav () {
        return (
            <div>
                <Flex className="nav">
                    {

                            //    <Flex.Item  key={i.id}>
                            //     <img src={i.img} alt=""/>
                            //     <p>{i.title}</p>
                            //     </Flex.Item>

                        navArr.map(i => {
                            return (
                            <Flex.Item  key={i.id}>
                                 <img src={i.img} alt=""/>
                                 <p>{i.title}</p>
                            </Flex.Item>
                            )
                        })
                    }
            </Flex>
            </div>
        )
    }
    render() {
        return (
            <div>
                <div className="header">
                    {/* 轮播图的数据 */}
                    {this.lunBo()}
                    {/* 导航栏的数据 */}
                    {this.Nav()}
                </div>
         </div>
        )
    }
}
