import Utils from '../utils/utils';

const _utils = new Utils();

class HomeService{
    // 首页数据统计
    getHomeCount(){
        return _utils.request({
            url:'/manage/statistic/base_count.do'
        })
    }
}

export default HomeService;