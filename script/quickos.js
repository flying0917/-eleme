(function (window) {
    _API_SITE_ = '104.129.182.213';
    //_API_SITE_ = 'http://120.25.149.49:6888/appapi.php';
    //_API_SITE_='http://192.168.40.200/appapi.php';
    var http_api = {};
    var app = {};
    var quickos = {};
    var retdebug = 0;
    var errdebug = 0;
    http_api.ajax = function (params, callback, allowGuest) {
        allowGuest = allowGuest || false;
        params.returnAll = true;
        params.headers = {};
        params.cache = false;
        var that = this;
        params.data.values = $.extend({},params.data.values,{fromApp:true});
        api.ajax(params, function (ret, err) {
            console.log(params.url);

            console.log(JSON.stringify(err))
            
            console.log(JSON.stringify(ret.body));

            
            if(ret)
            {
                if(ret.body)
                {
                    if(ret.body)
                    {

                        if(ret.body.isGuest)
                        {
                            //设置未登录状态
                            console.log("-----------------"+params.url)
                            console.log("login change false");
                            $api.setStorage("isLogin",0);
                            $api.rmStorage("member");
                        }
                        else
                        {
                            //设置登录状态
                            console.log("-----------------"+params.url)
                            console.log("login change true");
                            $api.setStorage("isLogin",1);

                        }
                    }
                }
            }

            if ('' != err && undefined != err) {
                if ( errdebug ) {
                    alert("-----【AJAX ERR】-----" +
                        "\nURL: " + params.url + 
                        "\nDATA" + JSON.stringify(params.data) +
                        "\nERR: " + JSON.stringify(err));
                }
                else {
                  /* /!* alert(JSON.stringify(err))*!/
                    api.toast({
                        msg: '网络错误，请稍后重试',
                        duration: 10000,
                        location: 'bottom'
                    });*/
                }
                return false;
            }
            if ( retdebug ) {
                alert('----【Request】----: ' +
                    "\nUrl：" + params.url + 
                    "\nParams：" + JSON.stringify(params.data) +
                    "\n" + '----RES----' +
                    "\nData：" + JSON.stringify(ret.body.data) +
                    "\nMsg：" + JSON.stringify(ret.body.msg) +
                    "\nStatus：" + JSON.stringify(ret.body.status)+
                    "\nisSuccess：" + JSON.stringify(ret.body.isSuccess)
                );
            }
            if ('' != ret) {
                if (ret.body.error_code) {
                    switch (ret.body.error_code) {
                        case 403:
                            if (!allowGuest) {
                                setTimeout(function () {
                                    api.removePrefs({
                                        key: 'cookie'
                                    });
                                    $api.rmStorage("userinfo");
                                    $api.send_removePushListener();
//$api.setStorage('auto','0');
                                    api.removePrefs({
                                        key: 'logininfo'
                                    });
                                    api.openWin({
                                        name: 'login',
                                        url: api.wgtRootDir + '/html/login.html',
                                        slidBackEnabled: false,
                                        pageParam: {}
                                    });
                                }, 1000);
                            } else {
                                api.toast({
                                    msg: '登录超时',
                                    duration: 10000,
                                    location: 'bottom'
                                });
                            }
                            break;
                        default:
                            api.toast({
                                msg: '未知错误',
                                duration: 10000,
                                location: 'bottom'
                            });
                    }

                    return false;
                }
            }

// save cookies
//$api.setStorage('cookie', ret.headers['Set-Cookie']);
            if (params) {
                var url = that.url("mobile/default/login");
                if (params.url && params.url == url) {
                    api.setPrefs({
                        key: 'cookie',
                        value: ret.headers['Set-Cookie']
                    });
//alert(ret.headers['Set-Cookie']);
                }
            }

            callback(ret.body, err);
        });
    };

    /**
     * GET Ajax
     * @param url
     * @param callback
     * @param allowGuest 允许登录超时时不跳转
     */
    http_api.get = function (url, callback, allowGuest) {
        allowGuest = allowGuest || false;
        var params = {
            url: url,
            method: 'get',
            dataType: 'json',
            data : {}
        };

        this.ajax(params, callback, allowGuest);
    };

    /**
     * POST Ajax
     * @param url
     * @param datas
     * @param callback
     * @param allowGuest 允许登录超时时不跳转
     */
    http_api.post = function (url, datas, callback, allowGuest) {
        allowGuest = allowGuest || false;
        var params = {
            url: url,
            method: 'post',
            dataType: 'json',
            data: {
                values: datas
            }
        };

        this.ajax(params, callback, allowGuest);
    };

    /**
     * 生成API URL
     * @param route
     * @param param
     * @returns {string}
     */
    http_api.url = function (route, param) {
        route += "";
        if ((route).split("/").length !== 3) {
// $.error("app.url: 参数route错误");
        } else {
            param = param ? '&' + $.param(param) : '';
            return _API_SITE_ + "?r=" + route + param;
        }
    };

    app.logout = function () {
        Quickos.api.get(Quickos.api.url('mobile/default/logout'), function (ret, err) {
            api.removePrefs({
                key: 'cookie'
            });
            $api.rmStorage("userinfo");
            api.removePrefs({
                key: 'logininfo'
            });
            $api.send_removePushListener();
            api.openWin({
                name: 'login',
                url: api.wgtRootDir + '/html/login.html',
                slidBackEnabled: false,
                pageParam: {}
            });

        });
    };

    http_api.attachMulUpload = function (url,param,file_path_obj,cb) {
        var reqUrl = url;
        var callback=cb;
        this.ajax({
            data: {
                files: file_path_obj,
                values:param
            },
            reqType:"upload",
            dataType: 'json',
            method: 'post',
            url: reqUrl,
            report:false,
            timeout:3000
        }, function (ret, err) {
            callback(ret,err);
        });
    }


    http_api.attachUpload = function (file_path, module) {
        url = this.url('main/attach/upload');//user/info/uploadavatar
        this.ajax({
            data: {
                files: {
                    Filedata: file_path
                },
                values: {
                    module: module
                }
            },
            dataType: 'json',
            method: 'post',
            url: url
        }, function (ret, err) {
            if (ret) {
                //ret : icon,url,name,aid
                return ret;

            } else {
                return err;
            }


        });
    }
    quickos.app = app;
    quickos.api = http_api;

    window.Quickos = quickos;
})(window);
