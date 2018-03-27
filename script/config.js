_BASE_URL="http://104.129.182.213";
var config=
    {
        user:
            {
                signup:_BASE_URL+"/dinner/index.php?r=site/doregister",//注册
                login:_BASE_URL+"/dinner/index.php?r=site/dologin",//登录
                getUserInfo:_BASE_URL+"/dinner/index.php?r=site/GetUserInfo",//获取用户数据
            },
        shop:
            {
                getShopList:_BASE_URL+"/dinner/index.php?r=site/GetShop",//获取饭店数据
                getShopMenus:_BASE_URL+"/dinner/index.php?r=site/GetMenu",//获取饭店的菜单
                getShopInfo:_BASE_URL+"/dinner/index.php?r=site/GetShopInfo",//获取饭店信息
                confirmOrder:_BASE_URL+"/dinner/index.php?r=site/ConfirmOrderAjax",//确认订单
            }
    };