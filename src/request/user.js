import axios from "../utils/axios"
export function getUserMsg(msg){
    return axios({
        url: 'user',
        headers: {
            authorization :msg
        }
    })
}