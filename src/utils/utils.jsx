import axios from 'axios';

import {toastIt} from './toast';

class Utils {
    request(param) {
        return (new Promise((resolve, reject ) =>{
                axios({
                    method: param.type || 'get',
                    url: param.url || '',
                    responseType: param.dataType || 'json',
                    data: param.data || null,
                }).then(
                    res => {
                        //console.log(res,"aaa");
                        if(res.data.status===0){
                            typeof resolve === 'function' && resolve(res.data, res.msg);
                        }else if(res.data.status===10){
                            this.doLogin();
                            //typeof resolve === 'function' && resolve(res.data, res.msg);
                        }else{
                            typeof resolve === 'function' && resolve(res.msg || res.data);
                        }
                    },err=>{
                        typeof reject === 'function' && reject(err.statusText);
                    }
                )
            })
        )

    }

    //未登录，跳转
    doLogin(){
        window.location.href=`/login?redirect=${encodeURIComponent(window.location.pathname)}`;
    }


    // 获取URL参数
    getUrlParam(name) {
        // param=123&param1=456
        let queryString = window.location.search.split('?')[1] || '',
            reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }

    successTips(msg) {
        toastIt(msg, 3000)
    }

    errorTips(errMsg) {
        toastIt(errMsg, 3000)
    }

    //设置本地存储
    setStorage(name, data) {
        let dataType = typeof data;
        // json对象
        if (dataType === 'object') {
            window.localStorage.setItem(name, JSON.stringify(data));
        }
        //基本类型
        else if(['number','string','boolean'].indexOf(dataType) >= 0){
            window.localStorage.setItem(name, data);
        }else{
            this.errorTips('暂不支持此类型的本地存储！')
        }
    }

    //取出本地存储
    getStorage(name){
        let data = window.localStorage.getItem(name);
        if(data){
            return JSON.stringify(data);
        }else{
            return '';
        }
    }

    //删除本地存储
    removeStorage(name){
        window.localStorage.removeItem(name);
    }
}

export default Utils;