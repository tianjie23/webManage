import React from 'react';
import {Link} from 'react-router-dom';

import PageTitle from '../../../components/page-title/index';
import TableList from '../../../utils/table-list/index';
import ArticleService from '../../../service/article-service';
import Utils from '../../../utils/utils';
import ArticlesCategoryItem from './item';

const _utils = new Utils();
const _article = new ArticleService();

class ArticlesCategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        this.loadList();
    }

    loadList(){
        _article.getCategory(0)
            .then(
                res => {
                    if (res.status === 0) {
                        this.setState({
                            list: res.data
                        })
                    } else {
                        _utils.errorTips(res.msg);
                    }
                }, err => {
                    this.setState({
                        list: []
                    });
                    _utils.errorTips("服务器未响应");
                }
            )
    }

    onDelete(id){
        if(window.confirm("确定要删除吗？")){
            _article.deleteCategory(id)
                .then(
                    res =>{
                        if(res.status===0){
                            if(res.data.ok>0){
                                _utils.successTips("删除成功")
                            }
                            this.loadList();
                        }else{
                            _utils.errorTips(res.msg)
                        }
                    },err =>{
                        _utils.errorTips("服务器未响应"+err)
                    }
                )
        }
    }


    render() {
        let tableHeads = [
            {name: '栏目编号', width: '10%'},
            {name: '栏目名称', width: '50%'},
            {name: '栏目类型', width: '10%'},
            {name: '栏目顺序', width: '15%'},
            {name: '操作', width: '15%'}
        ];
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle bigtitle="文章栏目">
                        <div className="pull-right">
                            <Link to="/article/category/edit" className="btn btn-primary">
                                <i className="fa fa-plus"></i>
                                <span>添加栏目</span>
                            </Link>
                        </div>
                    </PageTitle>
                    <TableList tableHeads={tableHeads}>
                        {
                            this.state.list.filter(item => (item.parentid === "0")).map(item => {
                                return (
                                    <tbody key={item._id}>
                                    <ArticlesCategoryItem item={item} delete={()=>{this.onDelete(item._id)}}/>
                                    {
                                        this.state.list.filter(item2 => (item2.parentid === item._id)).map(item2 => {

                                            return (
                                                <ArticlesCategoryItem key={item2._id} item={item2} delete={()=>{this.onDelete(item2._id)}}/>
                                            )
                                        })
                                    }
                                    </tbody>)


                            })
                        }
                    </TableList>
                </div>
            </div>
        )
    }
}

export default ArticlesCategoryList;