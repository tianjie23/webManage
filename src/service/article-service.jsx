import Utils from '../utils/utils';

const _utils = new Utils();

class ArticleService{
    // 获取栏目
    getCategory(parentid){
        return _utils.request({
            url:'/api/articles_category/list/'+parentid
        })
    }

    // 获取栏目
    get_ID_Category(_id){
        return _utils.request({
            url:'/api/articles_category/oneinfo/'+_id
        })
    }


    //编辑栏目
    editCategory(categoryinfo){
        return _utils.request({
            url:'/api/articles_category/add',
            type:"POST",
            data:categoryinfo
        })
    }

    //删除栏目
    deleteCategory(id){
        let data={};
        data.id=id;
        return _utils.request({
            url:"/api/articles/delete/",
            type:"POST",
            data:data
        })
    }

    //获取文章列表
    getArticleList(listParam){
        let url="",
            data={};
        data.page=listParam.pageNum;
        data.pageSize=listParam.pageSize;
        //console.log(listParam.pageSize,"bbb")
        url="/api/articles/list";
        return _utils.request({
            url:url,
            type:"POST",
            data:data
        })
    }
    //获取文章信息
    getArticleInfo(_id){
        return _utils.request({
            url:'/api/articles/info/'+_id
        })
    }
    //编辑文章
    editArticle(articleInfo){
        return _utils.request({
            url:'/api/articles/edit',
            type:"POST",
            data:articleInfo
        })
    }
}

export default ArticleService;