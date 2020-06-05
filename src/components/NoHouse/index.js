import React from 'react'

import PropTypes from 'prop-types'

import styles from './index.module.css'
import {baseurl}from"../../utils/axios"
const NoHouse = ({ children }) => (
  <div className={styles.root}>
    <img
      className={styles.img}
      src={baseurl+'/img/not-found.png'}
      alt="暂无数据"
    />
    <p className={styles.msg}>{children}</p>
  </div>
)

NoHouse.propTypes = {
  children: PropTypes.node.isRequired
}

export default NoHouse
