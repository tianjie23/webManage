import React from 'react';
import { Link } from 'react-router-dom';

import Footer from '../public/footer';

import UesrService from '../../service/user-service';
import Utils from '../../utils/utils';

const _user = new UesrService();
const _utils = new Utils();

import './login.scss'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: _utils.getUrlParam('redirect') || '/'
        };
    }

    onInputChange(e){
        let name = e.target.name,
            value = e.target.value;
        this.setState({
            [name]: value
        })
    }

    onSubmit(){
        let userInfo = {
            username : this.state.username,
            password : this.state.password
        };
        let checkResult = _user.checkUserLogin(userInfo);
        if(checkResult.status){
            //debugger
            _user.userLogin(userInfo)
                .then(
                    res => {
                        console.log(res.status);
                        if(res.status===1){
                            _utils.errorTips(res.msg)
                        }else{
                            //_utils.setStorage(userInfo);
                            this.props.history.push(this.state.redirect);
                        }
                    }, err =>{
                        _utils.errorTips(err)
                    }
                )
        }else{
            _utils.errorTips(checkResult.msg);
        }
    }

    componentWillMount() {
        document.title = '用户登录 - 网站后台管理';
    }

    render() {
        return (
            <div className="login-panel col-md-4 col-md-offset-4">
                <div className="login-title">网站后台管理</div>
                <div className="form-inline">
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-addon">用户名：</div>
                            <input type="text" className="form-control" name="username" onChange={e => this.onInputChange(e)} placeholder="输入用户名"/>
                        </div>
                        <div className="input-group">
                            <div className="input-group-addon">密码：</div>
                            <input type="password" className="form-control" name="password" onChange={e => this.onInputChange(e)} placeholder="输入密码"/>
                        </div>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.onSubmit.bind(this)}>登录</button>
                </div>
                <Footer>
                    <Link to="/register">我要注册</Link>
                    <Link to="/register">忘记密码？</Link>
                </Footer>
            </div>
        )
    }
}

export default Login;