import React from 'react';

import Editor from '../../../Editor/index';
import PageTitle from '../../../components/page-title/index';
import NewsSelect from '../../newsSelect/index';
import ArticleService from '../../../service/article-service';
import Utils from '../../../utils/utils';
import FileUploader from '../../../utils/file-uploader/index';
import FileService from '../../../service/file-service';


import '../../../Editor/editor.scss';
import './save.scss';

const _article = new ArticleService();
const _file = new FileService();
const _utils = new Utils();

class ArticlesCategorySave extends React.Component{
    constructor(props){
        super(props);
        this.state={
            _id:this.props.match.params.cid || 0,
            title:"",
            htitle:"",
            classid:0,
            url:"",
            tags:"",
            source:"",
            author:"",
            pic:[],
            reading:"",
            content:"",
            hit:"",
            orderid:0,
            createtime:""
        }
    }

    componentDidMount(){
        this.isLoadList();
    }

    isLoadList(){
        if(this.state._id){
            _article.getArticleInfo(this.state._id)
                .then(
                    res => {
                        //console.log(res.data.classid);
                        let pic = res.data.pic.split(",");
                        //console.log(pic)
                        res.data.pic=pic;
                        this.setState(res.data);
                    },err => {
                        _utils.errorTips("服务器未响应")
                    }
                )
        }
    }

    // 品类选择器变化
    onCategoryChange(classid){
        this.setState({
            classid
        });
    }

    onInputChange(e){
        let name=e.target.name,
            value=e.target.value;
        this.setState({
            [name]:value
        })
    }

    onChanageEditor(content){
        this.setState({
           content
        });
    }


    // 删除图片
    onImageDelete(e){
        let index       = parseInt(e.target.getAttribute('index')),
            pic   = this.state.pic;
        let picurl =pic[index];
        //console.log(pic[index]);
        //return ;

        pic.splice(index, 1);
        this.setState({
            pic
        },()=>{
            _file.deleteFile(picurl)
                .then(
                    res => {
                        //this.setState(res.data);
                    },err => {
                        _utils.errorTips("服务器未响应")
                    }
                )
        });
    }
    // 上传图片成功
    onUploadSuccess(res){
        let pic = this.state.pic;
        //console.log(`/uploads/${res.filename}`);
        //return;
        pic.push(`/uploads/${res.filename}`);
        this.setState({
            pic
        });
    }
    // 上传图片失败
    onUploadError(errMsg){
        _utils.errorTips(errMsg);
    }

    onSubmit(e){
        let articleInfo = {
            _id:this.state._id,
            title:this.state.title,
            htitle:this.state.htitle,
            classid:this.state.classid || "0",
            url:this.state.url,
            tags:this.state.tags,
            source:this.state.source,
            author:this.state.author,
            pic:this.state.pic,
            reading:this.state.reading,
            content:this.state.content,
            hit:this.state.hit,
            orderid:this.state.orderid || 0,
            createtime:this.state.createtime
        }
        _article.editArticle(articleInfo)
            .then(
                res =>{
                    if(res.status===0){
                        this.props.history.replace("/article/list");
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
                    <PageTitle bigtitle="文章编辑"/>
                    <div className="col-md-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-sm-2 control-label">文章标题</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="title" value={this.state.title} onChange={e => this.onInputChange(e)} placeholder="请输入文章标题"/>
                                    <div className="subtitle"></div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">文章副标题</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="htitle" value={this.state.htitle} onChange={e => this.onInputChange(e)} placeholder="请输入文章副标题"/>
                                    <div className="subtitle"></div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">所属栏目</label>
                                <div className="col-sm-10">
                                    <NewsSelect classid={this.state.classid} onCategoryChange={classid=>this.onCategoryChange(classid)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">标签</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control titletext" name="tags" value={this.state.tags} onChange={e => this.onInputChange(e)} placeholder="请输入标签"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">跳转链接</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control titletext" name="url" value={this.state.url} onChange={e => this.onInputChange(e)} placeholder="请输入跳转链接"/>
                                    <div className="subtitle">文章会跳转到相应的链接</div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">来源</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control titletext" name="source" value={this.state.source} onChange={e => this.onInputChange(e)} placeholder="请输入跳转链接"/>
                                    <div className="subtitle"></div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">作者</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control titletext" name="author" value={this.state.author} onChange={e => this.onInputChange(e)} placeholder="请输入作者"/>
                                    <div className="subtitle"></div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">图片上传</label>
                                <div className="col-sm-10">
                                    {
                                        this.state.pic.length ? this.state.pic.map(
                                            (image, index) => (
                                                <div className="img-con" key={index}>
                                                    <img className="img" src={image} />
                                                    <i className="fa fa-close" index={index} onClick={(e) => this.onImageDelete(e)}></i>
                                                </div>)
                                        ) : (<div>请上传图片</div>)
                                    }
                                </div>

                                <div className="col-md-offset-2 col-md-10">
                                    <FileUploader onSuccess={(res) => this.onUploadSuccess(res)}
                                                  onError={(errMsg) => this.onUploadError(errMsg)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">内容</label>
                                <div className="col-sm-10">
                                    <Editor content={this.state.content} onChangeEditor={this.onChanageEditor.bind(this)}/>
                                    <div className="subtitle"></div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">点击率</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control titletext" name="hit" value={this.state.hit} onChange={e => this.onInputChange(e)} placeholder="请输入点击率"/>
                                    <div className="subtitle"></div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">排序</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control titletext" name="orderid" value={this.state.orderid} onChange={e => this.onInputChange(e)} placeholder="请输入排序"/>
                                    <div className="subtitle">数字越小越靠前</div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">发布时间</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control titletext" name="createtime" value={this.state.createtime} onChange={e => this.onInputChange(e)} placeholder="请输入点击率"/>
                                    <div className="subtitle"></div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                    <button type="button" className="btn btn-primary btn-lg " onClick={e => this.onSubmit(e)}>保存</button>
                                    &nbsp;
                                    <button type="button" className="btn btn-primary btn-lg " onClick={() => this.props.history.replace("/article/list")}>取消</button>
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