import React, { Component } from 'react'
// 导入轮播图的组件
import { Carousel ,Flex,Grid,WingBlank} from 'antd-mobile';
//导入axios组件
import { getLunbo, getZuFang,getHotMsg } from "../../request/home"
// 图片根路径
import { baseurl } from "../../utils/axios"
// 导入样式
import "./index.scss"
// 导入数据
import navArr from"../../utils/navList"
export default class HomeIndex extends Component {
    state = {
        //轮播图的数据
        data: [],
        imgHeight: 176,
        // 轮播图的状态
        statusLunBo: false,
        // 地点的信息
        place: '',
        // 租房小组的数据
        ZuFArr: [],
        //最新资讯的区域
        hotArr:[]
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
    // 导航栏
    Nav () {
        return (
            <div>
                <Flex className="nav">
                    {
                        navArr.map(i => {
                            return (
                            <Flex.Item  key={i.id}>
                                 <img src={i.img} onClick={()=>{this.props.history.push(i.path)}} alt=""/>
                                 <p>{i.title}</p>
                            </Flex.Item>
                            )
                        })
                    }
            </Flex>
            </div>
        )
    }
    // 更多的组件
    More () {
      return(
        <div className="group">
            <Flex className="group-title" justify="between">
            <h3>租房小组</h3>
            <span>更多</span>
            </Flex>
              {/* 租房内容 */}
              <Grid
                    data={this.state.ZuFArr}
                    columnNum={2}
                    hasLine={false}
                    square={false}
                    renderItem={item => (
                    <div style={{  }}>
                            {/* 使用flex */}
                            <Flex className="grid-item" justify="between">
                            <div className="desc">
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                            </div>
                            <img src={baseurl+item.imgSrc} alt="" />
                            </Flex>
                    </div>
                    )}
                    />
        </div>
      )
    }

    // 热门资讯的区域
    HotNews () {
        return (
            <div className="news">
            <h3 className="group-title">最新资讯</h3>
                <WingBlank size="md">
                    {
                              this.state.hotArr.map(item => (
                                <div className="news-item" key={item.id}>
                                  <div className="imgwrap">
                                    <img
                                      className="img"
                                      src={baseurl+item.imgSrc}
                                      alt=""
                                    />
                                  </div>
                                  <Flex className="content" direction="column" justify="between">
                                    <h3 className="title">{item.title}</h3>
                                    <Flex className="info" justify="between">
                                      <span>{item.from}</span>
                                      <span>{item.date}</span>
                                    </Flex>
                                  </Flex>
                                </div>
                              ))
                    }
                </WingBlank>
            </div>
        )
    }

     // 组件渲染完成以后
    async componentDidMount() {
    //    使用promise.all进行数据请求的重构
         const data=await Promise.all([ // simulate img loading
            // 获取轮播图请求
             getLunbo(),
               //获取租房小组的数据
             getZuFang('AREA|88cff55c-aaa4-e2e08787878'),
            //获取热门新闻的数据
            getHotMsg('AREA|88cff55c-aaa4-e2e0'),

         ])
        //对数据进行判断,若此时出现错误,则返回的数据就不是200
        if (data[0].status === 200) {
            // 进行赋值
            this.setState({
                data: data[0].body,
                ZuFArr: data[1].body,
                hotArr:data[2].body
            })
        }

    }
    render() {
        return (
            <div>
                <div className="header">
                    {/* 轮播图的数据 */}
                    {this.lunBo()}
                    {/* 导航栏的数据 */}
                    {this.Nav()}
                    {/* 租房小组的组件 */}
                    {this.More()}
                    {/* 最新资讯 */}
                    {this.HotNews()}
                </div>
         </div>
        )
    }
}
