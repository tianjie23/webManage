/**
 * Created with React.
 * Author: Chenlly
 * Date: 2018-05-17
 * Time: 19:21
 *
 */
import React from 'react';
import { Link } from 'react-router-dom';

import PageTitle from '../../components/page-title/index';
import WebSiteService from '../../service/website-service';
import Utils from '../../utils/utils';

const _website = new WebSiteService();
const _utils = new Utils();

import './index.scss';

class WebSite extends React.Component{
    constructor(props){
        super(props);
        this.state={
            webname:'',
            webtitle:'',
            weburl:'',
            webkeywords:'',
            webdesc:'',
            filesize:'',
            imgformat:'',
            fileformat:'',
            strfilter:'',
            redirect: _utils.getUrlParam('redirect') || '/site/website'
        };
    }

    componentDidMount(){
        _website.getWebSite()
            .then(
                res =>{
                    if(res.status===0){
                        this.setState({
                            webname:res.data.webname,
                            webtitle:res.data.webtitle,
                            weburl:res.data.weburl,
                            webkeywords:res.data.webkeywords,
                            webdesc:res.data.webdesc,
                            filesize:res.data.filesize,
                            imgformat:res.data.imgformat,
                            fileformat:res.data.fileformat,
                            strfilter:res.data.strfilter,
                        });
                    }else{
                        _utils.errorTips(res.msg);
                    }
                },err =>{
                    _utils.errorTips("服务器未响应");
                }
            )
        console.log("this.state.webname",this.state.webname)
    }

    onInputChange(e){
        let name=e.target.name,
            value=e.target.value;
        this.setState({
            [name]:value
        });
    }

    onSubmit(e){
        let websiteinfo = {
            webname:this.state.webname,
            webtitle:this.state.webtitle,
            weburl:this.state.weburl,
            webkeywords:this.state.webkeywords,
            webdesc:this.state.webdesc,
            filesize:this.state.filesize,
            imgformat:this.state.imgformat,
            fileformat:this.state.fileformat,
            strfilter:this.state.strfilter
        }
        _website.setWebSite(websiteinfo)
            .then(
                res =>{
                    if(res.status===0){
                        _utils.successTips("编辑成功");
                        //this.props.history.push(this.state.redirect);
                    }
                },err =>{
                    _utils.errorTips("服务器未响应")
                }
            )

    }

    render(){
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle bigtitle="网站设置"/>
                    <div className="col-md-12">
                        <div>在这里，您可以根据您的网站要求，修改设置网站的基本参数！</div>
                        <div className="destitle">包括网站名称，网址，网站备案号，网站运行状态，关键词过滤等设置。</div>
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-sm-2 control-label">网站标题</label>
                                <div className="col-sm-10">
                                    <input type="email" className="form-control titletext" name="webname" value={this.state.webname} onChange={e => this.onInputChange(e)} placeholder="请输入用户名"/>
                                    <div className="subtitle">网站名称</div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">网站TITLE关键字</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control titletext" name="webtitle" value={this.state.webtitle} onChange={e => this.onInputChange(e)} placeholder="请输入网站TITLE关键字"/>
                                    <div className="subtitle">网站名称前面显示的关键字</div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">网站访问地址</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control titletext" name="weburl" value={this.state.weburl} onChange={e => this.onInputChange(e)} placeholder="请输入网站访问地址"/>
                                    <div className="subtitle">(请使用http://标识),后面不要带"/"符号</div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">网站关键字</label>
                                <div className="col-sm-10">
                                    <textarea className="form-control" name="webkeywords" rows="3" value={this.state.webkeywords} onChange={e => this.onInputChange(e)} placeholder="请输入网站关键字"></textarea>
                                    <div className="subtitle">{'<META content="关键字" name=keywords>'}</div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">网站描述</label>
                                <div className="col-sm-10">
                                    <textarea className="form-control" rows="3" name="webdesc" value={this.state.webdesc} onChange={e => this.onInputChange(e)} placeholder="请输入网站描述"></textarea>
                                    <div className="subtitle">{'<META content="网站描述" name=description>'}</div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">可上传图片和文件大小</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control numbertext" name="filesize" value={this.state.filesize} onChange={e => this.onInputChange(e)} placeholder="请输入数字"/>MB
                                    <div className="subtitle">设置可上传图片和文件大小，单位为：MB</div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">可上传图片格式</label>
                                <div className="col-sm-10">
                                    <textarea className="form-control" rows="3" name="imgformat" value={this.state.imgformat} onChange={e => this.onInputChange(e)} placeholder="可上传图片格式"></textarea>
                                    <div className="subtitle">设置可上传图片格式，多个请用“|”隔开，比如：jpg|gif</div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">可上传文件格式</label>
                                <div className="col-sm-10">
                                    <textarea className="form-control" rows="3" name="fileformat" value={this.state.fileformat} onChange={e => this.onInputChange(e)} placeholder="可上传文件格式"></textarea>
                                    <div className="subtitle">设置可上传文件格式，多个请用“|”隔开，比如：doc|docx</div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">过滤非法字符</label>
                                <div className="col-sm-10">
                                    <textarea className="form-control" rows="3" name="strfilter" value={this.state.strfilter} onChange={e => this.onInputChange(e)} placeholder="可上传文件格式"></textarea>
                                    <div className="subtitle">作用范围所有模型的内容、标题、评论、留言等字符过滤；用"/"隔开</div>
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

export default WebSite;