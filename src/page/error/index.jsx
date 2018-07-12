import React from 'react';
import { Link } from 'react-router-dom';

import PageTitle from '../../components/page-title/index';

import './index'

class Error extends React.Component{
    render() {
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle bigtitle="出错啦！"/>
                    <p>页面出错了，<Link to="/">返回首页</Link></p>
                </div>
            </div>
        )
    }
}

export default Error;