import React from 'react';
import { Link } from 'react-router-dom';

import PageTitle from '../../../components/page-title/index';
import ArticleService from '../../../service/article-service';
import Utils from '../../../utils/utils';

const _article = new ArticleService();
const _utils = new Utils();

class ArticlesCategorySave extends React.Component{
    constructor(props){
        super(props);
        this.state={
            _id:this.props.match.params.cid || 0,
            parentid:this.props.match.params.pid || 0,
            parenttitle:'无',
            title:'',
            orderid:'' || 0,
            classtype:'',
            url:'',
            content:''
        }
    }

    componentDidMount(){
        if(this.state._id && this.state._id!==0){
            _article.get_ID_Category(this.state._id)
                .then(
                    res => {
                        this.setState(res.data);
                        if(res.data.parentid && res.data.parentid!=="0"){
                            _article.get_ID_Category(this.state.parentid)
                                .then(
                                    res => {
                                        this.setState({
                                            parenttitle:res.data.title || '无'
                                        });
                                    },err => {
                                        _utils.errorTips("服务器未响应")
                                    }
                                )
                        }
                    },err => {
                        _utils.errorTips("服务器未响应")
                    }
                )
        }
        if(this.state.parentid){
            _article.get_ID_Category(this.state.parentid)
                .then(
                    res => {
                        this.setState({
                            parenttitle:res.data.title || '无'
                        });
                    },err => {
                        _utils.errorTips("服务器未响应")
                    }
                )
        }
    }

    onInputChange(e){
        let name=e.target.name,
            value=e.target.value;
        this.setState({
            [name]:value
        })
    }

    onSubmit(e){
        console.log(this.state.parentid)
        let categoryinfo = {
            _id:this.state._id,
            parentid:this.state.parentid,
            title:this.state.title,
            orderid:this.state.orderid,
            classtype:this.state.classtype,
            url:this.state.url,
            content:this.state.content
        }
        _article.editCategory(categoryinfo)
            .then(
                res =>{
                    if(res.status===0){
                        this.props.history.replace("/article/category/list");
                    }else{
                        _utils.errorTips(res.msg);
                    }
                },err=>{
                    _utils.errorTips("服务器未响应");
                }
            )
    }

    render() {
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle bigtitle="文章栏目编辑"/>
                    <div className="col-md-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-sm-2 control-label">所属栏目</label>
                                <div className="col-sm-10">
                                    {this.state.parenttitle}
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">栏目标题</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control titletext" name="title" value={this.state.title} onChange={e => this.onInputChange(e)} placeholder="请输入栏目标题"/>
                                    <div className="subtitle"></div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">栏目序号</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control titletext" name="orderid" value={this.state.orderid} onChange={e => this.onInputChange(e)} placeholder="请输入栏目序号"/>
                                    <div className="subtitle">数字越小越靠前</div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">栏目类型</label>
                                <div className="col-sm-10">
                                    <select className="form-control" name="classtype" value={this.state.classtype} onChange={e => this.onInputChange(e)}>
                                        <option value="">请选择</option>
                                        <option value="文章列表">文章列表</option>
                                        <option value="图片列表">图片列表</option>
                                        <option value="跳转连接">跳转连接</option>
                                        <option value="单页面">单页面</option>
                                    </select>
                                    <div className="subtitle"></div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">跳转链接</label>
                                <div className="col-sm-10">
                                    <input className="form-control" name="url" value={this.state.url} onChange={e => this.onInputChange(e)} placeholder="请输入跳转链接" />
                                    <div className="subtitle"></div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">单页面内容</label>
                                <div className="col-sm-10">
                                    <textarea className="form-control" rows="3" name="content" value={this.state.content} onChange={e => this.onInputChange(e)} placeholder="单页面内容"></textarea>
                                    <div className="subtitle"></div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                    <button type="button" className="btn btn-primary btn-lg " onClick={e => this.onSubmit(e)}>提交</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ArticlesCategorySave;