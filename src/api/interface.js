import base from './base'
import axios from 'axios'
import router from "../router";
import {ElMessage} from "element-plus";
function fetchPost(url, data) {
    let t = url.split('/')
    if (t.slice(-1)[0]!=='login' && t.slice(-1)[0]!=='register' && t.slice(-1)[0]!=='check'){
        data.token = localStorage.getItem('token')
        data.username = localStorage.getItem('username')
    }
    return new Promise(resolve=>{
        axios.post(url, data).then(response => {
            let data = response.data
            if ('token' in data){
                localStorage.setItem('token', data.token)
            }
            resolve(response)
        })

    })
}
axios.interceptors.response.use(response=>{
    const li=[400,500,401,501,502]
    let data = response.data
    if (li.indexOf(data.error_num)!==-1){
        ElMessage.error({
            message: '会话过期，请重新登录'
        })
        router.push({path: "/"})
    }
    return response
})
const ParamInterface={
    login(params){
        return fetchPost(base.based.bd + "/login", params)
    },
    loadCity(params) {
        return fetchPost(base.based.bd + "/cities", params)
    },
    register(params){
        return fetchPost(base.based.bd + "/register", params)
    },
    loadTrainNum(params){
        return fetchPost(base.based.bd + "/trains", params)
    },
    test(params){
        return fetchPost(base.based.bd + "/test", params)
    },
    checkUsername(params){
        return fetchPost(base.based.bd + "/check", params)
    },
    updateUserDetail(params){
        return fetchPost(base.based.bd+ "/userdetail", params)
    },
    fineUser(params){
        return fetchPost(base.based.bd + "/finduser", params)
    },
    createOrder(params){
        return fetchPost(base.based.bd + "/createOrder", params)
    },
    getTimetable(params){
        return fetchPost(base.based.bd + "/timetable", params)
    },
    getPopular(params){
        return fetchPost(base.based.bd + '/popular', params)
    },
    getTime(params){
        return fetchPost(base.based.bd + '/time', params)
    },
    getOrder(params){
        return fetchPost(base.based.bd + '/order', params)
    }

}


export default {ParamInterface}