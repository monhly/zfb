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
    // 获取轮播请求
   async getLB () {
       const {  status, body } = await getLunbo()
       //判断此时获取的数据状态
       if (status === 200) {

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
        // 获取轮播图请求
        this.getLB()
        //获取租房小组的数据
        this.getZuF()
        //获取热门新闻的数据
        this.getHotMsg()
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
    //获取租房小组的信息
   async getZuF () {
        const {status,body} = await getZuFang('AREA|88cff55c-aaa4-e2e0')
       if (status === 200) {
           this.setState({
               ZuFArr: [...body]

           })
        }

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
    //获取热门咨询的信息
    async getHotMsg () {
        const {status,body} = await getHotMsg('AREA|88cff55c-aaa4-e2e0')
        if (status === 200) {
            this.setState({
               hotArr:body
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
