var shopTemplate=
    {
        //饭店模板
        shopItemTpl:function()
        {
            var tpl= (function tpl() {/*
                 {{for(var x in it.shops){ }}
                  <div class="item style2" tapmode="itemhover" onclick="openShopDetail(this)" data-id="{{=it.shops[x].id}}" data-name="{{=it.shops[x].name}}" data-isontime="{{=it.isOnTime}}">
                      <div class="itemlogo userlogo">{{?it.shops[x].logo}} {{=it[x].logo}} {{??}}<img src="../image/shopcover/jiujiuya.jpeg" alt="">{{?}}</div>
                      <div class="itemshelf">
                          <div class="shelfinfo01">{{=it.shops[x].name}}<span class="fu">付</span><span class="pei">配</span></div>
                          <div class="shelfinfo02 staring"><img src="../image/star_45.png" alt="">（2）</div>
                          <div class="shelfinfo03">{{=it.shops[x].address}}</div>
                          <div class="shelfinfo03">电话：{{=it.shops[x].tel}}</div>
                      </div>
                      {{?it.isOnTime}}

                      {{??}}
                            <div class="rest right-bottom"></div>
                      {{?}}
                  </div>
                  {{ } }}
             */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },
        //菜单模板
        menuItemTpl:function()
        {
            var tpl= (function tpl() {/*
                 {{for(var x in it){ }}
                  <div class="item style2" data-id="{{=it[x].id}}" data-price="{{=it[x].price}}" data-name="{{=it[x].name}}" data-count="0">
                      <div class="itemshelf">
                          <div class="shelfinfo01">{{=it[x].name}}</div>
                          <div class="shelfinfo03">{{=it[x].brief}}</div>
                          <div class="shelfinfo02 staring"><img src="../image/star_45.png" alt="">&nbsp;月售2份</div>
                      </div>
                      <div class="buybtn"><p tapmode="" onclick="buyfood(this,{{=x}})" data-price="{{=it[x].price}}">￥{{=it[x].price}}</p>
                          <span class="minusorder">
                              <img src="../image/foodlist_bg_foodnum.png" alt="" class="numbg"><span class="thisordernum">0</span>
                              <span class="minus" tapmode="" data-price="{{=it[x].price}}" onclick="minuscash(this,{{=x}})">－</span>
                          </span>
                      </div>
                  </div>
                  {{ } }}
             */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },
        //确认订单模板
        confirmTpl:function()
        {
            var tpl= (function tpl() {/*

                  <div class="item style2" tapmode="itemhover">

                      <div class="itemshelf">
                          <div class="shelfinfo01">{{=it.shop_name}}</div>

                          <div class="shelfinfo03">总额：{{=it.Total}}元</div>

                      </div>
                  </div>
                 {{for(var x in it.Items){ }}
                  <div class="item style2">
                      <div class="itemshelf">
                          <div class="shelfinfo01">{{=it.Items[x].Name}}</div>

                          <div class="shelfinfo02 staring"><img src="../image/star_45.png" alt="">&nbsp;份数：{{=it.Items[x].Count}}份</div>
                      </div>

                      <div class="buybtn"><p tapmode=""  >￥{{=it.Items[x].Price}}</p>

                      </div>
                  </div>
                  {{ } }}
                   <div class="item" style="padding-left:15px;">
                       <label>收货地址</label>
                       <br>
                       <input style="height:30px;" type="text" placeholder="请输入您的地址" id="address">
                   </div>

             */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },
        //购物车模板
        cartTpl:function()
        {
            var tpl= (function tpl() {/*
            {{for(var y in it){}}
                <div class="item style2" tapmode="itemhover">

                      <div class="itemshelf">
                          <div class="shelfinfo01">{{=it[y].shop_name}}</div>

                          <div class="shelfinfo03">总额：{{=it[y].Total}}元</div>

                      </div>
                  </div>
                 {{for(var x in it[y].Items){ }}
                  <div class="item style2" data-id="{{=it[x].id}}" data-price="{{=it[y].Items[x].price}}" data-name="{{=it[y].Items[x].name}}" data-count="0">
                      <div class="itemshelf">
                          <div class="shelfinfo01">{{=it[x].name}}</div>
                          <div class="shelfinfo03">{{=it[x].brief}}</div>
                          <div class="shelfinfo02 staring"><img src="../image/star_45.png" alt="">&nbsp;月售2份</div>
                      </div>
                      <div class="buybtn"><p tapmode="" onclick="buyfood(this,{{=x}})" data-price="{{=it[y].Items[x].price}}">￥{{=it[y].Items[x].price}}</p>
                          <span class="minusorder">
                              <img src="../image/foodlist_bg_foodnum.png" alt="" class="numbg"><span class="thisordernum">0</span>
                              <span class="minus" tapmode="" data-price="{{=it[y].Items[x].price}}" onclick="minuscash(this,{{=x}})">－</span>
                          </span>
                      </div>
                  </div>
                  {{ } }}
                  {{ } }}
             */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },
    }