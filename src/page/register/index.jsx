/**
 * Created with React.
 * Author: Chenlly
 * Date: 2018-05-17
 * Time: 12:24
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';

import Footer from '../public/footer';

import UesrService from "../../service/user-service";
import Utils from "../../utils/utils";

import './index.scss'
const _user = new UesrService();
const _utils = new Utils();



class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            password2:'',
            email: '',
            phone: '',
            question: '',
            answer: '',
            redirect: _utils.getUrlParam('redirect') || '/login'
        }
    }

    onInputChange(e){
        let name = e.target.name,
            value = e.target.value;
        this.setState({
            [name] : value
        });
    }

    onSubmit(){
        let userInfo = {
            username: this.state.username,
            password: this.state.password,
            password2 : this.state.password2,
            email:this.state.email,
            phone:this.state.phone,
            question:this.state.question,
            answer:this.state.answer
        }
        let registerCheck = _user.checkUserRegister(userInfo);
        if(registerCheck.status){
            //delete userInfo['password2'];
            _user.userRegister(userInfo)
                .then(
                    res => {
                        if(res.status===0){
                            this.props.history.push(this.state.redirect);
                        }else{
                            _utils.errorTips(res.msg);
                        }
                       //_utils.setStorage('userInfo',userInfo);
                    },err =>{
                        _utils.errorTips("服务器未响应")
                    }
                )
        }else{
            _utils.errorTips(registerCheck.msg)
        }
    }

    render() {
        return (
            <div className="register-panel col-md-4 col-md-offset-4">
                <div className="login-title">网站后台管理注册</div>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-sm-2 control-label register-color">用户名</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" name="username" onChange={e => this.onInputChange(e)} placeholder="请输入用户名"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label register-color">密码</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" name="password" onChange={e => this.onInputChange(e)} placeholder="请输入密码"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label register-color">确认密码</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" name="password2" onChange={e => this.onInputChange(e)} placeholder="请输入确认密码"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label register-color">邮箱</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" name="email" onChange={e => this.onInputChange(e)} placeholder="请输入邮箱"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label register-color">电话</label>
                        <div className="col-sm-10">
                            <input type="phone" className="form-control" name="phone" onChange={e => this.onInputChange(e)} placeholder="请输入电话"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label register-color">问题</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="question" onChange={e => this.onInputChange(e)} placeholder="请输入问题，用于密码找回"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label register-color">答案</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="answer" onChange={e => this.onInputChange(e)} placeholder="请输入答案，用于密码找回"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="button" className="btn btn-primary btn-lg btn-block" onClick={e => this.onSubmit(e)}>注册</button>
                            <Link to="/login" className="btn btn-primary btn-lg btn-block">我要登录</Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Register;