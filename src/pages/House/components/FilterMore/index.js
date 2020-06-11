import React, { Component } from 'react'

import FilterFooter from '../../../../components/FilterFooter/index'

import styles from './index.module.css'

export default class FilterMore extends Component {
  // 渲染标签
  //  定义一个数据保存选中的数据
  state = {
    selected:[]
  }
   renderFilters(data) {
    // 高亮类名： styles.tagActive
     const {selected}=this.state
     return (
      //根据选中的数据进行判断是否有当前选中的值,有的话添加高亮
      data.map((item) => <span onClick={()=>{this.handlerSel(item.value)}} key={item.value} className={[styles.tag,selected.includes(item.value) ? styles.tagActive : '' ].join(' ')}>{item.label}</span>)
    )
  }
   // 获取选中数据
   handlerSel = (val) => {
    const { selected } = this.state;
    const newSelected = [...selected]
    // 没有该值，新增（高亮显示）
    let index = newSelected.indexOf(val);
    if (index < 0) {
      newSelected.push(val)
    } else {
      //有，删除（取消高亮）
      newSelected.splice(index, 1)
    }
    console.log('选中：', newSelected);
    this.setState({
      selected: newSelected
    })
  }
  render () {
    const {  data: { roomType, oriented, floor, characteristic },onModify,onOk } = this.props

    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div onClick={onModify} className={styles.mask} />
        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilters(roomType)}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilters(oriented)}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilters(floor)}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderFilters(characteristic)}</dd>
          </dl>
          {/* 底部按钮 */}
        <FilterFooter onOK={()=>{onOk(this.state.selected)}} onCancle={onModify}  className={styles.footer} />
        </div>

      </div>
    )
  }
}
