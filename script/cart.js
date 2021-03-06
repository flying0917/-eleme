/**
 * 购物车操作类
 */

//购物车
var Cart = function () {
	this.shop_id = 0;
	this.shop_name = '';
    this.Count = 0;
    this.Total = 0;
    this.Items = new Array();
};

//购物车集合对象
var CartItem = function () {
    this.Id = 0;
    this.Name = "";
    this.Count = 0;
    this.Price = 0;
};
 
//购物车操作
var CartHelper = function () {
    this.id=0;
    this.cookieName = "cart";
    this.Clear = function () {
        var cart = new Cart();
        this.Save(cart);
        return cart;
    };
    //向购物车添加
    this.Add = function (id, name, count, price) {
        var cart = this.Read();
        var index = this.Find(id);
        //如果ID已存在，覆盖数量
        if (index > -1) {
            cart.Total -= (((cart.Items[index].Count * 100) * (cart.Items[index].Price * 100)) / 10000);
            cart.Items[index].Count = count;
            cart.Total += (((cart.Items[index].Count * 100) * (cart.Items[index].Price * 100)) / 10000);
        } else {
            var item = new CartItem();
            item.Id = id;
            item.Name = name;
            item.Count = count;
            item.Price = price;
            cart.Items.push(item);
            cart.Count++;
            cart.Total += (((price * 100) * (count * 100)) / 10000);
        }
        this.Save(cart);
        return cart;
    };
    //改变数量
    this.Change = function (id, count) {
        var cart = this.Read();
        var index = this.Find(id);
        cart.Total -= (((cart.Items[index].Count * 100) * (cart.Items[index].Price * 100)) / 10000);
        cart.Items[index].Count = count;
        cart.Total += (((cart.Items[index].Count * 100) * (cart.Items[index].Price * 100)) / 10000);
        this.Save(cart);
        return cart;
    };
    //移出购物车
    this.Del = function (id) {
        var cart = this.Read();
        var index = this.Find(id);
        if (index > -1) {
            var item = cart.Items[index];
            cart.Count--;
            cart.Total = cart.Total - (((item.Count * 100) * (item.Price * 100)) / 10000);
            cart.Items.splice(index, 1);
            this.Save(cart);
        }
        return cart;
    };
    //根据ID查找
    this.Find = function (id) {
        var cart = this.Read();
        var index = -1;
        for (var i = 0; i < cart.Items.length; i++) {
            if (cart.Items[i].Id == id) {
                index = i;
            }
        }
        return index;
    };
    //COOKIE操作
    this.Save = function (cart) {
    	$api.setStorage(this.cookieName+"['"+this.id+"']", cart);
        this.addHasCartShop(this.id);
    };
    this.Read = function () {
        //读取COOKIE中的集合
    	var cart = new Cart();
    	if($api.getStorage(this.cookieName+"['"+this.id+"']"))
    	{
    		cart = $api.getStorage(this.cookieName+"['"+this.id+"']");
    	}
        return cart;
    };
    this.Init = function(shop_id,shop_name)
    {
    	var cart = this.Read();
    	this.id=shop_id;
    	cart.shop_id = shop_id;
    	cart.shop_name = shop_name;

    	this.Save(cart);
    };
    this.addHasCartShop=function(shop_id)
    {
        $api.getStorage("cart")?$api.getStorage("cart"):$api.setStorage("cart",[]);
        var cartArr=$api.getStorage("cart");
        for(var x in cartArr)
        {
            if(cartArr[x]===shop_id)
            {
                return false;
            }
        }
        cartArr.push(shop_id);
        $api.setStorage("cart",cartArr);
    };

    this.rmHasCartShop=function(shop_id)
    {
        $api.getStorage("cart")?$api.getStorage("cart"):$api.setStorage("cart",[]);
        var cartArr=$api.getStorage("cart");
        for(var x in cartArr)
        {
            if(cartArr[x]===shop_id)
            {
               cartArr.splice(x,1);
            }
        }
        $api.setStorage("cart",cartArr);
    };
    this.clear=function(shop_id)
    {
        $api.rmStorage(this.cookieName+"['"+shop_id+"']");
        this.rmHasCartShop(shop_id);
    }
    this.rm=function(shop_id,remove_id)
    {
        var temCart=$api.getStorage(this.cookieName+"['"+shop_id+"']");
        var temItems=temCart.Items;
        for(var x in temItems)
        {
            if(temItems[x].Id===remove_id)
            {
                temCart.Count=parseInt(temCart.Count)-parseInt(temItems[x].Count);
                temCart.Total=parseFloat(temCart.Total)-parseFloat(temItems[x].Price)*parseInt(temItems[x].Count);
                temItems.splice(x,1);
            }
        }

        if(temItems.length)
        {
            temCart.Items=temItems;
            console.log(JSON.stringify(temCart));
            $api.setStorage(this.cookieName+"['"+shop_id+"']",temCart);
        }
        else
        {
            this.clear(shop_id);
        }
    }
}; 