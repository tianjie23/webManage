/**
 * Created with React.
 * Author: Chenlly
 * Date: 2018-05-17
 * Time: 10:10
 *
 */

import Utils from '../utils/utils';

const _utils = new Utils();

class UserService {
    // 用户登录
    userLogin(userInfo) {
        return _utils.request({
            type: 'post',
            url: '/api/login',
            data: userInfo
        });
    }
    //用户注册
    userRegister(userInfo){
        return _utils.request({
            type: 'post',
            url: '/api/register',
            data: userInfo
        });
    }

    //注册验证
    checkUserRegister(userInfo){
        let username = userInfo.username.trim(),
            password =userInfo.password.trim(),
            password2 =userInfo.password2.trim(),
            email = userInfo.email.trim(),
            phone = userInfo.phone.trim(),
            question = userInfo.question.trim(),
            answer = userInfo.answer.trim();
        if (typeof username !== 'string' || username.length === 0) {
            return {
                status: false,
                msg: '请输入用户名！'
            }
        }
        if (typeof password !== 'string' || password.length === 0) {
            return {
                status: false,
                msg: '请输入密码！'
            }
        }
        if (typeof password2 !== 'string' || password2.length === 0 || password2 !== password) {
            return {
                status: false,
                msg: '密码和确认密码不一致！'
            }
        }
        if (typeof email !== 'string' || email.length === 0) {
            return {
                status: false,
                msg: '请输入邮箱！'
            }
        }
        if (typeof phone !== 'string' || phone.length === 0) {
            return {
                status: false,
                msg: '请输入手机号！'
            }
        }
        if (typeof question !== 'string' || question.length === 0) {
            return {
                status: false,
                msg: '请输入问题！'
            }
        }
        if (typeof answer !== 'string' || answer.length === 0) {
            return {
                status: false,
                msg: '请输入答案！'
            }
        }
        return {
            status: true,
            msg: '验证通过'
        }
    }

    // 验证登录
    checkUserLogin(userInfo) {
        let username = userInfo.username.trim(),
            password = userInfo.password.trim();

        if (typeof username !== 'string' || username.length === 0) {
            return {
                status: false,
                msg: '用户名不能为空！'
            }
        }
        if (typeof password !== 'string' || password.length === 0) {
            return {
                status: false,
                msg: '密码不能为空！'
            }
        }
        return {
            status: true,
            msg: '验证通过！'
        }
    }

    //用户登录

}

export default UserService;