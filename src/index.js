import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//导入scss

import App from './App';
import * as serviceWorker from './serviceWorker';
// 导入字体图标的样式
import "./assets/fonts/iconfont.css"
// 导入路由

ReactDOM.render(

    <App />
  ,
  document.getElementById('root')
);
serviceWorker.unregister();
