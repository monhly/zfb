import React from 'react'

// import { Flex } from 'antd-mobile'

import Filter from './components/Filter'
// 导入样式
import styles from './index.module.css'
// 引入组件
import {List,AutoSizer,InfiniteLoader} from 'react-virtualized'
// 导入渲染组件
import HouseItem from "../../components/HouseItem"
// 导入接口数据
import { getHouseList } from "../../request/house"
// 导入基地址
import { baseurl } from "../../utils/axios"
export default class HouseList extends React.Component {
  state = {
    // 房屋列表数据
    list: [],
    // 渲染的数量
    count:0
  }
  // 获取筛选后的城市列表
  async getCityMsg (datas) {
    // 获取城市列表
    const { value } = JSON.parse(localStorage.getItem('city'))
      this.value=value
    const { status, body: { list, count } } = await getHouseList(value, datas)
    console.log(list);

    if (status === 200) {
      this.setState({
        list,
        count
     })
   }

  }
  // 父组件接收子组件的数据
  onFilter = (filters) => {
    console.log('父组件接收子组件的数据:', filters);
    // 存储筛选器条件数据
    this.filters = filters
    // 调用接口获取列表数据
    this.getCityMsg(this.filters)
  }
  componentDidMount () {
    // 调用渲染组件的方法
    this.getCityMsg()
  }
  isRowLoaded =({ index })=> {
     const {list}=this.state
    return !!list[index];
  }

  loadMoreRows =({ startIndex, stopIndex })=> {
     console.log(startIndex, stopIndex);
    return getHouseList(this.value,this.filters, startIndex, stopIndex)
      .then((res) => {
        console.log('loadmore:', res);
        // 刷新视图
        this.setState({
          list: [...this.state.list, ...res.body.list]
        }, () => console.log(this.state.list.length))
      });

  }
   // 渲染列表项方法
  renderHouseItem = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
    }) => {

     // 当前行row数据
    const { list } = this.state;

    const item = list[index];
    // 如果没有数据此时就返回null
    if (!item) {
      return null
    }
     // 处理图片传递的key
     item.src = `${baseurl}${item.houseImg}`
     // row模版
     return (
       <HouseItem {...item} key={key} style={style} />
     );
  }
  // 渲染列表页
  renderHouseList = () => {
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        // 远程数据总条数
        rowCount={this.state.count}
      >
        {({ onRowsRendered, registerChild }) => (
          <AutoSizer>
            {({ height, width }) => (
              <List
                className={styles.houseList}
                height={height}
                rowCount={this.state.count}
                rowHeight={130}
                rowRenderer={this.renderHouseItem}
                onRowsRendered={onRowsRendered}
                ref={registerChild}
                width={width}
              />
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    )
  }
  render () {
    return (
      <div className={styles.root}>
        {/* 条件筛选栏 */}
        <Filter onFilter={this.onFilter} />
        {/* 内容渲染区域 */}

        {/* 列表 */}
        {this.renderHouseList()}

      </div>
    )
  }
}
