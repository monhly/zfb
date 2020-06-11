import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../components/FilterFooter'

export default class FilterPicker extends Component {
  state = {
    vals:this.props.val
  }
  render () {
     // 结构传入的props
    const { onOk, onCancle, data ,col} = this.props
    const {vals}=this.state
    return (
      <>
        {/* 选择器组件： */}
        <PickerView data={data} value={vals} cols={col || 1} onChange={(val) => {
          this.setState({
            vals:val
          })
        }}/>

        {/* 底部按钮 */}
        <FilterFooter onOK={()=>{onOk(vals)}} onCancle={onCancle} />
      </>
    )
  }
}
