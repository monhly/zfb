import React from 'react';

// 导入路由的组件
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
//首页组件
import Home from "./pages/home"
// 导入地图找房组件
import Map from './pages/map'
//导入城市的页面
import CityList from"./pages/cityList"
function App() {
  return (

    <Router>
      <div>
        <Link to="/home"> nihao</Link>
        <Link to="/city"> nihao</Link>
        <Link to="/map"> nihao</Link>
      </div>
      {/* 使用router包裹路由 */}
      <Route path="/home" component={Home}></Route>
      <Route path="/city" component={CityList}></Route>
      <Route path="/map" component={Map}></Route>
    </Router>
  );
}

export default App;
