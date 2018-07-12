import React from 'react';
import {Link,withRouter} from 'react-router-dom';

import ArticleService from '../../../service/article-service';
import Utils from '../../../utils/utils';

const _article = new ArticleService();
const _utils = new Utils();

class ArticlesCategoryItem extends React.Component {


    render() {
        return (
            <tr>
                <td>{this.props.item._id}</td>
                <td>{this.props.item.parentid!=="0"?"├":""}{this.props.item.title}
                    {this.props.item.parentid==="0"?<Link
                    to={`/article/category/edit_add/${this.props.item._id}`}>[添加二级分类]</Link>:""}</td>
                <td>{this.props.item.classtype}</td>
                <td>{this.props.item.orderid}</td>
                <td>
                    <Link to={`/article/category/edit/${this.props.item._id}`}>编辑</Link>/
                    <a href="javascript:;" onClick={()=>{this.props.delete()}}>删除</a>
                </td>
            </tr>)

    }
}

export default withRouter(ArticlesCategoryItem);