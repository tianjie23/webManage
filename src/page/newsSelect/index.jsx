import React from 'react';

import ArticleService from '../../service/article-service';
import Utils from '../../utils/utils';
import './selectcss.scss';

const _article = new ArticleService();
const _utils = new Utils();

class NewsSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstId: 0,
            firstlist: [],
            secondId: 0,
            secondlist: []
        }
    }

    componentWillReceiveProps(nextProps){
        let classid        = this.props.classid !== nextProps.classid;
        // 数据没有发生变化的时候，直接不做处理
        if(!classid){
            return;
        }
        console.log(nextProps.classid)
        _article.getCategory(nextProps.classid)
            .then(
                res => {
                    if (res.status === 0) {
                        //debugger
                        console.log(res.data)
                        // this.setState({
                        //     firstlist: res.data
                        // })
                    } else {
                        _utils.errorTips(res.msg);
                    }
                }, err => {
                    this.setState({
                        firstlist: []
                    });
                    _utils.errorTips("服务器未响应");
                }
            )
        // // 假如只有一级品类
        // if(nextProps.classid === 0){
        //     this.setState({
        //         firstCategoryId     : nextProps.classid,
        //         secondCategoryId    : 0
        //     });
        // }
        // // 有两级品类
        // else{
        //     this.setState({
        //         firstCategoryId     : nextProps.parentCategoryId,
        //         secondCategoryId    : nextProps.categoryId
        //     }, () => {
        //         parentCategoryIdChange && this.loadSecondCategory();
        //     });
        // }
    }

    componentDidMount() {
        this.loadList();
    }

    loadList() {
        _article.getCategory(0)
            .then(
                res => {
                    if (res.status === 0) {
                        this.setState({
                            firstlist: res.data
                        })
                    } else {
                        _utils.errorTips(res.msg);
                    }
                }, err => {
                    this.setState({
                        firstlist: []
                    });
                    _utils.errorTips("服务器未响应");
                }
            )
    }

    //加载二级分类
    loadSecondList(id) {
        let List = [];
        this.state.firstlist.filter((item) => (item.parentid === id)).map(item2 => {
            let aa = {};
            aa.title = item2.title;
            aa.id = item2._id;
            List.push(aa)
        });
        //console.log(List);
        this.setState({
            secondlist: List
        });
    }

    firstChange(e) {
        let newValue = e.target.value;
        this.setState({
            firstId:newValue
        },()=>{
            this.loadSecondList(newValue);
            this.onPropsCategoryChange(newValue)
        });
        //console.log(newValue)
    }
    secondChange(e){
        let newValue= e.target.value;
        this.setState({
            secondId:newValue
        },()=>{
            this.onPropsCategoryChange(newValue)
        });
    }

    onPropsCategoryChange(classid){
        this.props.onCategoryChange(classid)
    }

    render() {
        let {firstlist} = this.state;
        let {secondlist} = this.state;
        //console.log(this.props.classid,"aaa")
        return (
            <div>
                <select value={this.props.classid} className="form-control cate-select"
                    value={this.state.firstId}
                    onChange={e => this.firstChange(e)}
                >
                    <option value="0">选择版块</option>
                    {
                        firstlist.filter((item) => (item.parentid === "0")).map(item => {
                            return <option value={item._id} key={item._id}>{item.title}</option>
                        })
                    }
                </select>
                {
                    secondlist.length
                    ? <select value={this.props.classid} className="form-control cate-select"
                        value={this.state.secondId}
                        onChange={e => this.secondChange(e)}
                        >
                        <option value="0">选择版块</option>
                            {
                                secondlist.map(item => {
                                    return <option value={item.id} key={item.id}>{item.title}</option>
                                })
                            }
                        </select>
                    : null
                }
            </div>
        )
    }
}

export default NewsSelect;