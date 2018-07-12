import React from 'react';
import {Switch, Route} from 'react-router-dom';
import ArticlesCategoryEdit from './articles_category/save';
import ArticlesCategoryList from './articles_category/list';
import ArticleList from "./index/list";
import ArticleEidt from "./index/save";

class ArticlesRouter extends React.Component{
    render(){
        return (
            <div>
                <Switch>
                    <Route path="/article/category/list" component={ArticlesCategoryList}/>
                    <Route path="/article/category/edit/:cid?" component={ArticlesCategoryEdit}/>
                    <Route path="/article/category/edit_add/:pid?" component={ArticlesCategoryEdit}/>
                    <Route path="/article/list" component={ArticleList}/>
                    <Route path="/article/edit/:cid?" component={ArticleEidt}/>
                </Switch>
            </div>
        )
    }

}

export default ArticlesRouter;