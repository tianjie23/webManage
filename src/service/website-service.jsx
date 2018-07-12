import Utils from '../utils/utils';

const _utils = new Utils();

class WebSiteService{
    // 获取网站配置
    getWebSite(){
        return _utils.request({
            url:'/api/get_website'
        })
    }

    //设置网站配置
    setWebSite(websiteinfo){
        return _utils.request({
            url:'/api/set_website',
            type:"POST",
            data:websiteinfo
        })
    }
}

export default WebSiteService;