/**
 * Date: 2018-05-29
 * Time: 11:28
 */

const express = require("express");
const md5 = require("blueimp-md5");
const models = require("./models");
const UserModel = models.getModel("user");
const WebSiteModel = models.getModel("website");
const ArticlesCategory = models.getModel("articlescategory");
const Articles = models.getModel("articles");
const filter = {password: 0};
const upload = require("./fileupload");
const fs = require('fs');

const router = express.Router();


function listenLogin(req,res){
    const userid = req.cookies.userid;
    if(!userid){
        res.send({status:10,msg:"未登录"});
        //return;
    }else{
        UserModel.findOne({_id:userid}, function (err, user) {
            if (err) {
                res.send({status: 1, msg: "登录有误！" + err});
                //return;
            }
            if (!user) {
                res.send({status: 10,msg:"未登录"});
            }
        });
    }
}

//用户注册路由
router.post("/register", function (req, res) {
    const {username, password, email, phone, question, answer} = req.body;
    UserModel.findOne({username}, function (err, user) {
        if (user) {
            res.send({status: 1, msg: "用户已存在"});
        } else {
            new UserModel({
                username,
                password: md5(password),
                email,
                phone,
                question,
                answer
            }).save(function (err, user) {
                console.log("添加有误！" + err);
                if (err) {
                    res.send({status: 1, msg: "注册有误！" + err});
                    return;
                }
                res.cookie("userid", user._id, {maxAge: 1000 * 60 * 60 * 24 * 7});
                res.send({status: 0, data: {_id: user._id, username, email, phone, question, answer}});
            });
        }
    })
});


//用户登录路由
router.post("/login", function (req, res) {
    const {username, password} = req.body;
    UserModel.findOne({username, password: md5(password)}, filter, function (err, user) {
        if (err) {
            res.send({status: 1, msg: "登录有误！" + err});
            return;
        }
        if (!user) {
            res.send({status: 1, msg: "用户名或密码错误！"});
        } else {
            res.cookie("userid", user._id, {maxAge: 1000 * 60 * 60 * 24 * 7});
            res.send({status: 0, data: user});
        }
    });
});


//网站信息配置路由
router.get("/get_website", function (req, res) {
    listenLogin(req,res);
    WebSiteModel.findOne(function (err, website) {
        if (err) {
            res.send({status: 1, msg: "获取信息有误！" + err});
            return;
        }
        if (website) {
            res.send({status: 0, data: website});
        }
    });
});

router.post("/set_website", function (req, res) {
    listenLogin(req,res);
    const {webname, webtitle, weburl, webkeywords, webdesc, filesize, imgformat, fileformat, strfilter} = req.body;
    WebSiteModel.findOne(function (err, website) {
        if (err) {
            res.send({status: 1, msg: "获取信息有误！" + err});
            return;
        }
        if (!website) {

            new WebSiteModel({
                webname,
                webtitle,
                weburl,
                webkeywords,
                webdesc,
                filesize,
                imgformat,
                fileformat,
                strfilter
            }).save(function (err, newwebsite) {
                if (err) {
                    res.send({status: 1, msg: "添加网站配置有误！" + err});
                    return;
                }
                //console.log("website:",err);
                res.send({status: 0, data: newwebsite});
            });
        } else {
            WebSiteModel.findByIdAndUpdate({_id: website._id}, req.body, function (err, newwebsite) {
                if (err) {
                    res.send({status: 1, msg: "更新网站配置有误！" + err});
                    return;
                }
                if (!newwebsite) {
                    res.send({status: 1, msg: "保存失败"});
                } else {
                    res.send({status: 0, data: newwebsite});
                }
            })
        }
    })
});

//文章栏目路由
router.post("/articles_category/add", function (req, res) {
    listenLogin(req,res);
    const {_id, title, orderid, parentid, classtype, url, content} = req.body;
    if (_id) {//有_id，则修改
        ArticlesCategory.findByIdAndUpdate({_id}, {
            title,
            orderid,
            parentid,
            classtype,
            url,
            content
        }, function (err, articles_category) {
            if (err) {
                res.send({status: 1, msg: "文章栏目修改有误！" + err});
                return;
            }
            if (!articles_category) {
                res.send({status: 1, msg: "文章栏目修改失败"});
            } else {
                res.send({status: 0, data: articles_category});
            }
        });
    } else {//无_id，则添加
        new ArticlesCategory({
            title,
            orderid,
            parentid,
            classtype,
            url,
            content
        }).save(function (err, articles_category) {
            if (err) {
                res.send({status: 1, msg: "文章栏目添加有误！" + err});
                return;
            }
            if (!articles_category) {
                res.send({status: 1, msg: "文章栏目添加失败"});
            } else {
                res.send({status: 0, data: articles_category});
            }
        });
    }
});

router.get("/articles_category/list/:pid?", function (req, res) {
    listenLogin(req,res);
    const parentid = req.params.pid;
    ArticlesCategory.find().sort({'orderid': 1}).exec(function (err, articles_category) {
        if (err) {
            res.send({status: 1, msg: "文章栏目获取有误！" + err});
            return;
        }
        if (articles_category.length === 0) {
            res.send({status: 1, msg: "文章栏目没有内容"});
        } else {
            res.send({status: 0, data: articles_category});
        }
    })
});

router.get("/articles_category/delete/:id", function (req, res) {
    listenLogin(req,res);
    const _id = req.params.id;
    console.log("_id", _id)
    ArticlesCategory.remove({_id}, function (err, result) {
        if (err) {
            res.send({status: 1, msg: "文章栏目删除有误！" + err});
            return;
        }
        if (result) {
            res.send({status: 0, data: result});
        }
    })
});

router.get("/articles_category/oneinfo/:id", function (req, res) {
    listenLogin(req,res);
    const _id = req.params.id;
    ArticlesCategory.findOne({_id}, function (err, articles_category) {
        if (err) {
            res.send({status: 1, msg: "文章栏目获取有误！" + err});
            return;
        }
        if (!articles_category) {
            res.send({status: 1, msg: "文章栏目获取失败"});
        } else {
            res.send({status: 0, data: articles_category});
        }
    });
});

//文章列表

router.post("/articles/edit", function (req, res) {
    listenLogin(req,res);
    const {_id, title, htitle, classid, url, tags, source, author, pic, reading, content, hit, orderid, createtime} = req.body;
    if (_id) {//有_id，则修改
        Articles.findByIdAndUpdate({_id}, {
            title,
            htitle,
            classid,
            url,
            tags,
            source,
            author,
            pic,
            reading,
            content,
            hit,
            orderid,
            createtime
        }, function (err, articles) {
            if (err) {
                res.send({status: 1, msg: "文章修改有误！" + err});
                return;
            }
            if (!articles) {
                res.send({status: 1, msg: "文章修改失败"});
            } else {
                res.send({status: 0, data: articles});
            }
        });
    } else {//无_id，则添加
        new Articles({
            title,
            htitle,
            classid,
            url,
            tags,
            source,
            author,
            pichost:"http://localhost:7000",
            pic,
            reading,
            content,
            hit,
            orderid,
            createtime
        }).save(function (err, articles) {
            if (err) {
                res.send({status: 1, msg: "文章添加有误！" + err});
                return;
            }
            if (!articles) {
                res.send({status: 1, msg: "文章添加失败"});
            } else {
                res.send({status: 0, data: articles});
            }
        });
    }
});

router.post("/articles/list", function (req, res) {
    listenLogin(req,res);
    var current_page = 1;   //默认为1
    //var pageSize=1;        //每页条数
    var page = req.body.page;
    var pageSize = req.body.pageSize;
    //console.log(page,"page")
    //console.log(pageSize,"pageSize")
    if (page) {
        current_page = page;
    }
    if (current_page < 1) {
        current_page = 1;
    }
    var query = Articles.find().sort({'orderid': 1});
    query.exec(function (err, articles) {
        if (err) {
            res.send({status: 1, msg: "文章获取有误！" + err});
            return;
        } else {
            var totalPage = Math.floor(articles.length / pageSize);
            if (articles.length % pageSize != 0) {
                totalPage += 1;
            }

            if (current_page > totalPage) {
                current_page = totalPage;
            }
            query.skip((current_page - 1) * pageSize);
            query.limit(pageSize);
            query.exec(function (err, result) {
                //let jsonArray = ;
                res.send({status: 0, totalCount: articles.length, data: result});
            });
        }
    })
})

router.post("/articles/delete/", function (req, res) {
    listenLogin(req,res);
    const _id = req.body.id;
    Articles.remove({_id}, function (err, result) {
        if (err) {
            res.send({status: 1, msg: "文章删除有误！" + err});
            return;
        }
        if (result) {
            res.send({status: 0, data: result});
        }
    })
})


router.get("/articles/info/:id", function (req, res) {
    listenLogin(req,res);
    const _id = req.params.id;
    Articles.findOne({_id}, function (err, Articles) {
        if (err) {
            res.send({status: 1, msg: "文章信息获取有误！" + err});
            return;
        }
        if (!Articles) {
            res.send({status: 1, msg: "文章信息获取失败"});
        } else {
            res.send({status: 0, data: Articles});
        }
    });
});

//文件上传
//文件上传服务
router.post('/file/upload', upload.single('upload_file'), function (req, res) {
    listenLogin(req,res);
    if (req.file) {
        // console.log(req.file);
        // console.log(req.body);
        //var file = req.file;
        res.send({status: 0, data: req.file});
    }
});


//删除文件
router.post("/file/delete",function(req, res){
    listenLogin(req,res);
    var path = req.body.fileurl;
    //console.log(fileurl);

    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolder(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
    res.send({status: 0});
});


module.exports = router;