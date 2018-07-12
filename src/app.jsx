import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import Login from './page/Login/index';
import Register from './page/register/index';

import Layout from './components/layout/index'
import Home from './page/home/index';
import WebSite from './page/site/website';
import Error from './page/error/index';
import ProductRouter from './page/product/router';
import ArticleRouter from './page/articles/router';

class App extends React.Component {
    render() {
        let layout = (
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/site/website" component={WebSite}/>
                    <Route path="/product/index" component={ProductRouter}/>
                    <Route path="/article" component={ArticleRouter}/>
                    <Redirect exact from="/site/s" to="/" />
                    <Redirect exact from="/product" to="/product/index" />
                    <Route component={Error}/>
                </Switch>
            </Layout>
        );
        return (
            <div>
                <Router>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/" render={props => layout}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);