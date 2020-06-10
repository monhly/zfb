import React, { Component } from 'react'
// 导入轮播图的组件
import { Carousel ,Flex,Grid,WingBlank,SearchBar} from 'antd-mobile';
//导入axios组件
import { getLunbo, getZuFang,getHotMsg,getCityInfo } from "../../request/home"
// 图片根路径
import { baseurl } from "../../utils/axios"
// 导入样式
import "./index.scss"
// 导入数据
import navArr from"../../utils/navList"
export default class HomeIndex extends Component {
    state = {
        // 搜索框的值
        keyword:'',
        //轮播图的数据
        data: [],
        imgHeight: 176,
        // 轮播图的状态
        statusLunBo: false,
        // 地点的信息
        place: {},
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
    // 顶部搜索的区域
    Search =()=> {
        return (
            <div className="search">
           <Flex justify="around" className="topNav">
                    <div className="searchBox">
                    <div className="city" onClick={()=>{this.props.history.push('/city')}}>
                            {this.state.place.label}<i className="iconfont icon-arrow" />
                    </div>
                    <SearchBar
                        value={this.state.keyword}

                        onChange={(v) => this.setState({ keyword: v })}
                        placeholder="请输入小区或地址"
                    />
                    </div>
                    <div className="map">
                    <i key="0" className="iconfont icon-map" />
                    </div>
                </Flex>
            </div>
        )
    }
    //使用百度地图获取当前城市
    // 获取当前城市信息
    getCityId = () => {
        var myCity = new window.BMap.LocalCity();
         const myFun= async(result)=> {
            //此时的result就是获取的当前的城市信息
            // 根据获取到的信息发送axios请求,获取城市详细信息
           const {status,body} = await getCityInfo(result.name)

           if (status === 200) {
            this.setState({
                place: body
              })
          }

        }
        myCity.get(myFun);

  }
     // 组件渲染完成以后
    async componentDidMount () {
       this.getCityId()
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
                // 轮播图的数据
                data: data[0].body,
                // 租房小组的信息
                ZuFArr: data[1].body,
                // 最新咨询的信息
                hotArr: data[2].body,
                statusLunBo:true
            })
        }

    }
    render() {
        return (
            <div>
                <div className="header">
                    {/* 搜索区域 */}
                    {this.Search()}
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
