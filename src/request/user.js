import axios from "../utils/axios"
export function getUserMsg(msg){
    return axios({
        url: 'user',
        headers: {
            authorization :msg
        }
    })
}
export function logout (token) {
    return axios({
        url: 'user/logout',
        method: 'post',
        headers: {
            authorization:token
        }
    })
}