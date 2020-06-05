import React from 'react';

// 导入路由的组件
import { BrowserRouter as Router, Route, Switch ,Redirect} from "react-router-dom"
//首页组件
import Home from "./pages/home"
// 导入地图找房组件
import Map from './pages/map'
//导入城市的页面
import CityList from "./pages/cityList"
// 导入404组件
import NotFind from "./pages/404";

import HouseDetail from "./pages/HouseDetail"
import Login from"./pages/Login"
function App() {
  return (

    <Router>
      {/* 使用router包裹路由 */}
      <Switch>
        {/* 重定向组件 */}
        <Redirect exact from="/" to="/home" />
        <Route path="/home" component={Home}></Route>
        <Route path="/city" component={CityList}></Route>
        <Route path="/map" component={Map}></Route>
        <Route path="/detail/:id" component={HouseDetail} />
        {/* 登录组件 */}
        <Route path="/login" component={Login} />
        <Route component={NotFind}></Route>
     </Switch>
    </Router>
  );
}

export default App;
