import React from 'react';
import { Link, NavLink }    from 'react-router-dom';

class NavSide extends React.Component{
    render(){
        return (
            <div className="navbar-default navbar-side" role="navigation">
                <div className="sidebar-collapse">
                    <ul className="nav" id="main-menu">
                        <li>
                            <NavLink activeClassName="active-menu" to="/" exact>
                                <i className="fa fa-dashboard"></i>
                                常规管理
                                <i className="fa arrow"></i>
                            </NavLink>
                            <ul className="nav nav-second-level">
                                <li>
                                    <Link to="/">信息统计</Link>
                                </li>
                                <li>
                                    <Link to="/site/website">网站设置</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <NavLink activeClassName="active-menu" to="/news/index">
                                <i className="fa fa-newspaper-o"></i>
                                文章管理
                                <i className="fa arrow"></i>
                            </NavLink>
                            <ul className="nav nav-second-level">
                                <li>
                                    <Link to="/article/edit">添加文章</Link>
                                </li>
                                <li>
                                    <Link to="/article/list">文章列表</Link>
                                </li>
                                <li>
                                    <Link to="/article/category/list">文章栏目</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <NavLink activeClassName="active-menu" to="/product/index">
                                <i className="fa fa-desktop"></i>
                                产品管理
                                <i className="fa arrow"></i>
                            </NavLink>
                            <ul className="nav nav-second-level">
                                <li>
                                    <Link to="/product/add">添加产品</Link>
                                </li>
                                <li>
                                    <Link to="/product/index">产品管理</Link>
                                </li>
                                <li>
                                    <Link to="/product/category">产品栏目</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <NavLink to="/order/index" activeClassName="active-menu">
                                <i className="fa fa-pencil-square-o"></i>
                                订单管理
                                <i className="fa arrow"></i></NavLink>
                            <ul className="nav nav-second-level">
                                <li>
                                    <Link to="/product/add">未支付</Link>
                                </li>
                                <li>
                                    <Link to="/product/index">已支付</Link>
                                </li>
                                <li>
                                    <Link to="/product/category">未发货</Link>
                                </li>
                                <li>
                                    <Link to="/product/category">待收货</Link>
                                </li>
                                <li>
                                    <Link to="/product/category">已发货</Link>
                                </li>
                                <li>
                                    <Link to="/product/category">已关闭</Link>
                                </li>
                                <li>
                                    <Link to="/product/category">导出Excel</Link>
                                </li>
                                <li>
                                    <Link to="/product/category">导出word</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <NavLink to="/user/index" activeClassName="active-menu">
                                <i className="fa fa-id-card-o"></i>
                                用户管理
                                <i className="fa arrow"></i>
                            </NavLink>
                            <ul className="nav nav-second-level">
                                <li>
                                    <Link to="/user/index">用户管理</Link>
                                </li>
                            </ul>
                        </li>

                    </ul>

                </div>

            </div>
        )
    }
}

export default NavSide;