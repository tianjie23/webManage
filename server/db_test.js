/**
 * Date: 2018-05-29
 * Time: 11:10
 */

const mongoose = require("mongoose");
const md5 = require("blueimp-md5");

mongoose.connect("mongodb://localhost:27017/webmanage");

const conn = mongoose.connection;

conn.on("connected", function () {
    console.log("数据库链接成功！");
});

const userSchema = mongoose.Schema({
    "username": {type: String, required: true},
    "password": {type: String, required: true},
    "email": {type: String, required: true},
    "phone": {type: String, required: true},
    "question": {type: String, required: true},
    "answer": {type: String, required: true},
});

mongoose.model("user", userSchema);
const UserModel = mongoose.model("user");

    function testSave() {
    const user = {
        "username": "chenlly",
        "password": md5("123456"),
        "email": "23ts@163.com",
        "phone": "18049265600",
        "question": "我是谁",
        "answer": "谁是我"
    }
    const userModel = new UserModel(user);
    userModel.save(function (err, user) {
    });
}
testSave();