/**
 * Created with React.
 * Author: Chenlly
 * Date: 2018-05-17
 * Time: 9:58
 * 
 */

import React from 'react';
import {Link} from 'react-router-dom';

import PageTitle from '../../components/page-title/index';
import HomeService from '../../service/home-service';

const _homeService = new HomeService();

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productCount: 0,
            orderCount: 0,
            userCount: 0
        }
    }

    componentDidMount() {
        this.loadCount();
    }

    loadCount() {
        _homeService.getHomeCount()
            .then(
                res => {
                    this.setState(res.data.data)
                },
                err => {
                    console.log(err)
                }
            )
    }

    render() {
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle bigtitle="信息统计"/>

                    <div className="row statistics">
                        <Link to="/">
                            <div className="col-md-3 col-sm-12 col-xs-12">
                                <div className="panel panel-primary text-center no-boder bg-color-green">
                                    <div className="panel-body">
                                        <i className="fa fa-newspaper-o fa-5x"></i>
                                        <h3>0</h3>
                                    </div>
                                    <div className="panel-footer back-footer-green">
                                        文章数量
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/product/index">
                            <div className="col-md-3 col-sm-12 col-xs-12">
                                <div className="panel panel-primary text-center no-boder bg-color-blue">
                                    <div className="panel-body">
                                        <i className="fa fa-desktop fa-5x"></i>
                                        <h3>{this.state.productCount}</h3>
                                    </div>
                                    <div className="panel-footer back-footer-blue">
                                        产品数量
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/order/index">
                            <div className="col-md-3 col-sm-12 col-xs-12">
                                <div className="panel panel-primary text-center no-boder bg-color-red">
                                    <div className="panel-body">
                                        <i className="fa fa-pencil-square-o fa-5x"></i>
                                        <h3>{this.state.orderCount}</h3>
                                    </div>
                                    <div className="panel-footer back-footer-red">
                                        订单数量
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/order/index">
                            <div className="col-md-3 col-sm-12 col-xs-12">
                                <div className="panel panel-primary text-center no-boder bg-color-brown">
                                    <div className="panel-body">
                                        <i className="fa fa-id-card-o fa-5x"></i>
                                        <h3>{this.state.userCount}</h3>
                                    </div>
                                    <div className="panel-footer back-footer-brown">
                                        用户数量
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>


                    <div className="row">


                        <div className="col-md-9 col-sm-12 col-xs-12">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    Bar Chart Example
                                </div>
                                <div className="panel-body">
                                    <div id="morris-bar-chart"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-12 col-xs-12">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    Donut Chart Example
                                </div>
                                <div className="panel-body">
                                    <div id="morris-donut-chart"></div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-4 col-sm-12 col-xs-12">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    Tasks Panel
                                </div>
                                <div className="panel-body">
                                    <div className="list-group">

                                        <a href="#" className="list-group-item">
                                            <span className="badge">7 minutes ago</span>
                                            <i className="fa fa-fw fa-comment"></i> Commented on a post
                                        </a>
                                        <a href="#" className="list-group-item">
                                            <span className="badge">16 minutes ago</span>
                                            <i className="fa fa-fw fa-truck"></i> Order 392 shipped
                                        </a>
                                        <a href="#" className="list-group-item">
                                            <span className="badge">36 minutes ago</span>
                                            <i className="fa fa-fw fa-globe"></i> Invoice 653 has paid
                                        </a>
                                        <a href="#" className="list-group-item">
                                            <span className="badge">1 hour ago</span>
                                            <i className="fa fa-fw fa-user"></i> A new user has been added
                                        </a>
                                        <a href="#" className="list-group-item">
                                            <span className="badge">1.23 hour ago</span>
                                            <i className="fa fa-fw fa-user"></i> A new user has added
                                        </a>
                                        <a href="#" className="list-group-item">
                                            <span className="badge">yesterday</span>
                                            <i className="fa fa-fw fa-globe"></i> Saved the world
                                        </a>
                                    </div>
                                    <div className="text-right">
                                        <a href="#">More Tasks <i className="fa fa-arrow-circle-right"></i></a>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-8 col-sm-12 col-xs-12">

                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    Responsive Table Example
                                </div>
                                <div className="panel-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped table-bordered table-hover">
                                            <thead>
                                            <tr>
                                                <th>S No.</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>User Name</th>
                                                <th>Email ID.</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>John</td>
                                                <td>Doe</td>
                                                <td>John15482</td>
                                                <td>name@site.com</td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Kimsila</td>
                                                <td>Marriye</td>
                                                <td>Kim1425</td>
                                                <td>name@site.com</td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>Rossye</td>
                                                <td>Nermal</td>
                                                <td>Rossy1245</td>
                                                <td>name@site.com</td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>Richard</td>
                                                <td>Orieal</td>
                                                <td>Rich5685</td>
                                                <td>name@site.com</td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>Jacob</td>
                                                <td>Hielsar</td>
                                                <td>Jac4587</td>
                                                <td>name@site.com</td>
                                            </tr>
                                            <tr>
                                                <td>6</td>
                                                <td>Wrapel</td>
                                                <td>Dere</td>
                                                <td>Wrap4585</td>
                                                <td>name@site.com</td>
                                            </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Home;