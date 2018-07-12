/**
 * Created with React.
 * Author: Chenlly
 * Date: 2018-05-17
 * Time: 20:18
 *
 */

import React from 'react';

import PageTitle from '../../../components/page-title/index';
import TableList from '../../../utils/table-list/index';

import ProductService from '../../../service/product-service';
import Utils from '../../../utils/utils';

const _utils = new Utils();
const _product = new ProductService();

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            list: [],
            pageNum: 1
        }
    }

    componentDidMount(){
        this.loadProductList();
    }

    loadProductList(){
        let param = {};
        param.pageNum = this.state.pageNum;
        _product.getProductList(param)
            .then(
                res => {
                    this.setState(res);
                }, err=>{
                    this.setState({
                        list: []
                    });
                    _utils.errorTips(err);
                }
            )
    }

    render() {
        let tableHeads = [
            {name:'产品编号', width:'10%'},
            {name:'产品信息', width:'50%'},
            {name:'产品价格', width:'10%'},
            {name:'产品状态', width:'15%'},
            {name:'操作', width:'15%'}
        ];
        return (
            <div id="page-wrapper">
                <PageTitle bigtitle="产品列表"/>
                <TableList tableHeads={tableHeads}>

                </TableList>
            </div>
        )
    }
}

export default ProductList;