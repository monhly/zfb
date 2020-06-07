// 判断是否是登录的状态
// 设置token
export function setToken (name,token) {
    localStorage.setItem(name,JSON.stringify(token))
}
// 去除token
export function getToken (name) {
return JSON.parse(localStorage.getItem(name))
}
// 移除token
export function removeToken (name) {
    localStorage.removeItem(name)
}
// 是否登录判断：boolean
export function isAuth (name) {
    return  !!getToken(name)
}