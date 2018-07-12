/**
 * Date: 2018-05-29
 * Time: 10:41
 */

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/webmanage");

const conn = mongoose.connection;

conn.on("connected", function () {
    console.log("数据库链接成功！");
});


//用户信息model
const userSchema = mongoose.Schema({
    "username":{type:String, required:true},
    "password":{type:String, required:true},
    "email":{type:String, required:true},
    "phone":{type:String, required:true},
    "question":{type:String, required:true},
    "answer":{type:String, required:true},
});

mongoose.model("user",userSchema);



//网站信息配置model
const webSiteSchema = mongoose.Schema({
    "webname":{type:String,required:true},
    "webtitle":{type:String,required:true},
    "weburl":{type:String,required:true},
    "webkeywords":{type:String,required:true},
    "webdesc":{type:String,required:true},
    "filesize":{type:String,required:true},
    "imgformat":{type:String,required:true},
    "fileformat":{type:String,required:true},
    "strfilter":{type:String,required:true}
});

mongoose.model("website",webSiteSchema);

//文章栏目model
const articlesCategorySchema = mongoose.Schema({
    "title":{type:String,required:true},
    "orderid":{type:Number,required:true},
    "parentid":{type:String,required:true},
    "classtype":{type:String,required:true},
    "url":{type:String},
    "content":{type:String}
});
mongoose.model("articlescategory",articlesCategorySchema);
//文章model
const articlesSchema = mongoose.Schema({
    "title":{type:String,required:true},
    "htitle":{type:String},
    "classid":{type:String,required:true},
    "url":{type:String},
    "tags":{type:String},
    "source":{type:String},
    "author":{type:String},
    "pichost":{type:String},
    "pic":{type:String},
    "reading":{type:String},
    "content":{type:String,required:true},
    "hit":{type:Number,required:true},
    "orderid":{type:Number,required:true},
    "createtime":{type:String,required:true}
});
mongoose.model("articles",articlesSchema);


module.exports = {
    getModel(model){
        return mongoose.model(model);
    }
};