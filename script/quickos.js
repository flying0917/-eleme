(function (window) {
    //_API_SITE_ = 'http://113.106.2.244:89/appapi.php';
    _API_SITE_ = 'http://120.25.149.49:6888/appapi.php';
    //_API_SITE_='http://192.168.40.200/appapi.php';
    var http_api = {};
    var app = {};
    var quickos = {};
    var retdebug = 1;
    var errdebug = 1;
    http_api.ajax = function (params, callback, allowGuest) {
        allowGuest = allowGuest || false;
        params.returnAll = true;
        params.headers = {};
        params.cache = false;
        params.timeout = 3000;
        var that = this;
        params.data.values = $.extend({},params.data.values,{fromApp:true});
        console.log(params.url)
        api.ajax(params, function (ret, err) {
            console.log(JSON.stringify(err))
            var accessToken=$api.getStorage("isLogin");
            var htmlName=$api.getHtmlName();
            if(accessToken)
            {
                if(ret.body.code==400)
                {
                    //控制可不登录的页面不跳转登录页面
                    if(commonUrl.tokenPage[htmlName])
                    {
                        setTimeout(function()
                        {
                            //$api.setStorage("isLogin",false);
                            api.openWin({
                                name: 'login',
                                url: api.wgtRootDir + '/html/login.html',
                                slidBackEnabled: false,
                                pageParam: {}
                            });
                        },500)
                    }
                }

            }
            else
            {
                if(commonUrl.tokenPage[htmlName])
                {
                    setTimeout(function()
                    {
                        api.openWin({
                            name: 'login',
                            url: api.wgtRootDir + '/html/login.html',
                            slidBackEnabled: false,
                            pageParam: {}
                        });
                    },500)
                }
            }
            /*if ('' != err && undefined != err) {
                if ( errdebug ) {
                    alert("-----【AJAX ERR】-----" +
                        "\nURL: " + params.url + 
                        "\nDATA" + JSON.stringify(params.data) +
                        "\nERR: " + JSON.stringify(err));
                }
                else {
                    alert(JSON.stringify(err))
                    api.toast({
                        msg: '网络错误，请稍后重试',
                        duration: 10000,
                        location: 'bottom'
                });
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
            }*/

            if(params.reqType)
            {
                if(params.reqType==="upload")
                {
                    callback(ret,err)
                }
            }
            else
            {
                var retData;
                if(typeof ret.body=="string")
                {
                    retData=JSON.parse(ret.body);
                }
                else
                {
                   retData=ret.body;
                }
                callback(retData, err);
            }
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

    http_api.attachUpload = function (url,file_path,cb) {
        var reqUrl = url;
        var callback=cb;
        this.ajax({
            data: {
                files: {
                    file: file_path
                }
            },
            reqType:"upload",
            dataType: 'json',
            method: 'post',
            url: reqUrl,
            report:true,
            timeout:3000
        }, function (ret, err) {
            callback(ret,err);
        });
    }
    quickos.app = app;
    quickos.api = http_api;

    window.Quickos = quickos;
})(window);
