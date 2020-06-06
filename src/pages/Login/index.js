import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace, NavBar, Toast } from 'antd-mobile'

import { Link } from 'react-router-dom'

import styles from './index.module.css'
import { getLogin } from "../../request/login"
import { withFormik } from 'formik';
import * as Yup from 'yup';
// 验证规则：
const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

class Login extends Component {
  state = {
    username:'',
    password:''
  }

  // 获取axios请求验证表单
  render() {
    const {
      values,
      errors,
      handleChange,
      handleSubmit,
    } = this.props;

    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavBar mode="light">
          账号登录
        </NavBar>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <form onSubmit={handleSubmit}>
            <div className={styles.formItem}>
              <input
                value={values.username}
                onChange={handleChange}
                className={styles.input}
                name="username"
                placeholder="请输入账号"
              />
            </div>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            {errors.username && <div className={styles.error}>{errors.username}</div>}
            <div className={styles.formItem}>
              <input
                value={values.password}
                className={styles.input}
                name="password"
                type="password"
                onChange={handleChange}
                placeholder="请输入密码"
              />
            </div>
            {/* 长度为5到12位，只能出现数字、字母、下划线 */}
            {errors.password && <div className={styles.error}>{errors.password}</div>}
            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit">
                登 录
              </button>
            </div>
          </form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <Link to="/registe">还没有账号，去注册~</Link>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>

    )
  }
}

export default  withFormik({
  mapPropsToValues: () => ({ username: '',password:'' }),
  validationSchema: Yup.object().shape({
    username: Yup.string().required('账号为必填项！').matches(REG_UNAME, '账号长度为5到8位，只能出现数字、字母、下划线'),
    password: Yup.string().required('密码为必填项！').matches(REG_PWD, '密码长度为5到12位，只能出现数字、字母、下划线'),
  }),
  // Custom sync validation
  // validate: values => {
  //   const errors = {};

  //   if (!values.username) {
  //     errors.username = 'Required';
  //   }

  //   return errors;
  // },

  handleSubmit: async(value,formikBag) => {
  //
    // 获取表单的值
    // 进行数据的请求
    console.log(formikBag);

    const { status,description, body } = await getLogin(value)
    // 对请求的数据进行判断
    if (status === 200) {
      window.localStorage.setItem('token', body.token)
      Toast.success(description, 2)
      // 获取formikBag里面的props属性进行页面的跳转
      formikBag.props.history.push('/home/user')
    } else {
      Toast.fail(description)
    }

  },
})(Login);

