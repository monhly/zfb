import axios from "../utils/axios"
export function getUserMsg(){
    return axios({
        url: 'user',
    })
}
export function logout () {
    return axios({
        url: 'user/logout',
        method: 'post',
    })
}