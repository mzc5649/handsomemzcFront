import Axios from "axios";
import {MessageBox, Message} from 'element-ui'
import store from "@/store";

const service = Axios.create({
    timeout: 5000
})

service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code != 0) {
            store.dispatch("snackbar/openSnackbar", {
                msg: res.msg || '服务器繁忙',
                color: 'error'
            })
            return Promise.reject(new Error(res.msg || 'Error'))
        }
        return res
    },
    error => {
        console.log('err' + error) // for debug
        store.dispatch("snackbar/openSnackbar", {
            msg: '服务器繁忙',
            color: 'error'
        })
        return Promise.reject(error)
    }
)
export default service