import React from 'react';
import { Link } from 'react-router-dom';

class NavTop extends React.Component {
    render() {
        return (
            <div className="navbar navbar-default top-navbar">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse"
                            data-target=".sidebar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <i className="icon-bar"></i>
                        <i className="icon-bar"></i>
                        <i className="icon-bar"></i>
                    </button>

                    <Link className="navbar-brand" to="/">网站后台管理</Link>
                </div>

                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false">
                            <i className="fa fa-envelope fa-fw"></i> <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-messages">
                            <li>
                                <a href="#">
                                    <div>
                                        <strong>John Doe</strong>
                                        <span className="pull-right text-muted">
                                        <em>Today</em>
                                    </span>
                                    </div>
                                    <div>Lorem Ipsum has been the industry's standard dummy text ever since the
                                        1500s...
                                    </div>
                                </a>
                            </li>
                            <li className="divider"></li>
                            <li>
                                <a href="#">
                                    <div>
                                        <strong>John Smith</strong>
                                        <span className="pull-right text-muted">
                                        <em>Yesterday</em>
                                    </span>
                                    </div>
                                    <div>Lorem Ipsum has been the industry's standard dummy text ever since an
                                        kwilnw...
                                    </div>
                                </a>
                            </li>
                            <li className="divider"></li>
                            <li>
                                <a href="#">
                                    <div>
                                        <strong>John Smith</strong>
                                        <span className="pull-right text-muted">
                                        <em>Yesterday</em>
                                    </span>
                                    </div>
                                    <div>Lorem Ipsum has been the industry's standard dummy text ever since the...
                                    </div>
                                </a>
                            </li>
                            <li className="divider"></li>
                            <li>
                                <a className="text-center" href="#">
                                    <strong>Read All Messages</strong>
                                    <i className="fa fa-angle-right"></i>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false">
                            <i className="fa fa-user fa-fw"></i> <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li><Link to="/"><i className="fa fa-user fa-fw"></i> 个人信息</Link>
                            </li>
                            <li><Link to="/"><i className="fa fa-gear fa-fw"></i> 修改密码</Link>
                            </li>
                            <li className="divider"></li>
                            <li>
                                <Link to="/"><i className="fa fa-sign-out fa-fw"></i> 退出登录</Link>
                            </li>
                        </ul>
                    </li>

                </ul>
            </div>
        )
    }
}

export default NavTop;