import React from 'react';
import {Link} from 'react-router-dom';

import PageTitle from '../../../components/page-title/index';
import Pagination from '../../../utils/pagination/index';
import TableList from '../../../utils/table-list/index';
import ArticleService from '../../../service/article-service';
import Utils from '../../../utils/utils';

const _utils = new Utils();
const _article = new ArticleService();

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            activePage:1,
            pageSize:1,
            totalItemsCount:0
        }
    }

    componentDidMount() {
        this.loadList();
    }

    loadList(){
        let listParmam = {};
        //console.log(this.state.activePage,"aaa")
        listParmam.pageNum=this.state.activePage;
        listParmam.pageSize=this.state.pageSize;
        _article.getArticleList(listParmam)
            .then(
                res => {
                    if (res.status === 0) {
                        this.setState({
                            list:res.data,
                            totalItemsCount:res.totalCount
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
        //return;
        if(window.confirm("确定要删除吗？")){
            _article.deleteCategory(id._id)
                .then(
                    res =>{
                        if(res.status===0){
                            if(res.data.ok>0){
                                _utils.successTips("删除成功")
                                this.loadList();
                            }
                        }else{
                            _utils.errorTips(res.msg)
                        }
                    },err =>{
                        _utils.errorTips("服务器未响应"+err)
                    }
                )
        }
    }

    onPageNumChange(activePage){
        //console.log(activePage)
        this.setState({
            activePage
        },()=>{
            this.loadList();
        })
    }


    render() {
        let tableHeads = [
            {name: '文章编号', width: '10%'},
            {name: '文章信息', width: '50%'},
            {name: '点击', width: '10%'},
            {name: '添加时间', width: '15%'},
            {name: '操作', width: '15%'}
        ];
        let {list}=this.state;
        //console.log(this.state.activePage,this.state.totalItemsCount);
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle bigtitle="文章栏目">
                        <div className="pull-right">
                            <Link to="/article/edit" className="btn btn-primary">
                                <i className="fa fa-plus"></i>
                                <span>添加文章</span>
                            </Link>
                        </div>
                    </PageTitle>
                    <TableList tableHeads={tableHeads}>
                        {
                            list ?
                            list.map(item => {
                                return (
                                    <tbody key={item._id}>
                                    <tr>
                                        <td>{item._id}</td>
                                        <td>
                                            {item.title}<br />
                                            {item.htitle}
                                        </td>
                                        <td>{item.hit}</td>
                                        <td>{item.createtime}</td>
                                        <td>
                                            <Link to={`/article/edit/${item._id}`}>编辑</Link>/
                                            <a href="javascript:;" onClick={()=>{this.onDelete(item)}}>删除</a>
                                        </td>
                                    </tr>
                                    </tbody>
                                )
                            })
                                : <tbody></tbody>
                        }
                    </TableList>
                    <Pagination
                        activePage={this.state.activePage}      //当前页
                        itemsCountPerPage={this.state.pageSize}                   //每页显示条数
                        totalItemsCount={this.state.totalItemsCount}                    //总条数
                        pageRangeDisplayed={5}                  //显示几个分页
                        onChange={activePage=>this.onPageNumChange(activePage)}
                    />
                </div>
            </div>
        )
    }
}

export default Article;