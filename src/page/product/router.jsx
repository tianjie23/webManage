/**
 * Created with React.
 * Author: Chenlly
 * Date: 2018-05-17
 * Time: 20:22
 *
 */

import React            from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';

import ProductList from './index/index';

class ProductRouter extends React.Component{
    render(){
        return (
            <Switch>
                <Route path="/product/index" component={ProductList} />
            </Switch>
        )
    }
}

export default ProductRouter;