import React from 'react'

import { Flex } from 'antd-mobile'

import styles from './index.module.css'

// 条件筛选栏标题数组：
const titleList = [
  { title: '区域', type: 'area' },
  { title: '方式', type: 'mode' },
  { title: '租金', type: 'price' },
  { title: '筛选', type: 'more' }
]
const renderTitle = function() {
  return (
    titleList.map(i => {
      return (
        <Flex.Item key={i.type}>
        {/* 选中类名： selected */}
          <span className={[styles.dropdown, styles.selected].join(' ')}>
            <span>{i.title}</span>
          <i className="iconfont icon-arrow" />
          </span>
       </Flex.Item>
      )
    })
  )
}
export default function FilterTitle () {

  return (
    <Flex align="center" className={styles.root}>
      {/* 调用函数 */}
      {renderTitle()}
    </Flex>
  )
}
