var shopTemplate=
    {
        //饭店模板
        shopItemTpl:function()
        {
            var tpl= (function tpl() {/*
                 {{for(var x in it.shops){ }}
                  <div class="item style2" tapmode="itemhover" onclick="openShopDetail(this)" data-id="{{=it.shops[x].id}}" data-name="{{=it.shops[x].name}}" data-isontime="{{=it.isOnTime}}">
                      <div class="itemlogo userlogo">{{?it.shops[x].logo}} <img src="{{=it.shops[x].logo}}"> {{??}}<img src="../image/shopcover/jiujiuya.jpeg" alt="">{{?}}</div>
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
                {{if(it&&it.length){}}
                 {{for(var x in it){ }}
                  <div class="item style2" data-id="{{=it[x].id}}" data-price="{{=it[x].price}}" data-name="{{=it[x].name}}" data-count="0">
                      <div class="itemshelf">
                          <div class="shelfinfo01">{{=it[x].name}}</div>
                          <div class="shelfinfo03">{{=it[x].brief}}</div>
                          <div class="shelfinfo02 staring"><img src="../image/star_45.png" alt="">&nbsp;月售2份</div>
                      </div>
                      <div class="buybtn"><p tapmode="" onclick="buyfood(this,{{=x}})" data-price="{{=it[x].price}}" id="initClick{{=it[x].id}}">￥{{=it[x].price}}</p>
                          <span class="minusorder">
                              <img src="../image/foodlist_bg_foodnum.png" alt="" class="numbg"><span class="thisordernum">0</span>
                              <span class="minus" tapmode="" data-price="{{=it[x].price}}" onclick="minuscash(this,{{=x}})">－</span>
                          </span>
                      </div>
                  </div>
                  {{ } }}
                 {{ }else{ }}
                     <img src="../image/m_errorpages_icon_order.png" alt="" style="width:180px;margin-top:150px;" class="centerbg">
                     <div class="info" style=""color: #888;margin-top: 30px;>没有找到餐厅</div>
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
            {{if(it&&it.length){}}
            {{for(var y in it){}}
                {{if(it[y].Items.length>0){}}
                <div class="order-content">
                    <div class="item style2" tapmode="itemhover" >

                         <div class="itemshelf">
                             <div class="shelfinfo01"><img src="../image/m_cart_icon_coupon.png" style="width:18px;margin-right:10px;">
                               {{=it[y].shop_name}}
                             </div>

                             <div class="shelfinfo03" style="">
                               合计：
                               <span style="color:red;font-size:16px;">{{=it[y].Total}}</span>元
                             </div>

                         </div>
                      </div>
                     {{for(var x in it[y].Items){ }}
                      <div class="item order-item style2" data-id="{{=it[y].Items[x].Id}}" data-price="{{=it[y].Items[x].Price}}" data-name="{{=it[y].Items[x].Name}}" data-count="{{=it[y].Items[x].Count}}">
                          <div class="itemshelf">
                              <div class="shelfinfo01">{{=it[y].Items[x].Name}}</div>
                              <div class="shelfinfo03">×{{=it[y].Items[x].Count}}份</div>
                          </div>

                          <div class="buybtn"><p tapmode="" data-price="{{=it[y].Items[x].Price}}">￥{{=it[y].Items[x].Price}}/份</p>
                          </div>

                          <div class="remove-btn" data-shop-id="{{=it[y].shop_id}}" data-shop-name="{{=it[y].shop_name}}" data-removeid="{{=it[y].Items[x].Id}}">
                          </div>
                     </div>
                    {{ } }}
                </div>

                <div class="bottom" style="z-index:999999;">
                    <div style="color:white;display:inline-block;vertical-align: top; height:30px;margin-top:10px;">
                      <span id="buynum" style="color:white">{{=it[y].Count}}</span>份 ￥
                      <span id="totalcash" style="font-size:24px;color:red;">{{=it[y].Total}}</span>
                    </div>
                    <span data-shop-id="{{=it[y].shop_id}}" data-count="{{=it[y].Count}}" data-shop-name="{{=it[y].shop_name}}" data-total="{{=it[y].Total}}" tapmode="total-hover" class="pull-right btn-success" onclick="confirmOrder(this)">结算</span>
                </div>
                {{}}}
            {{ } }}
            {{ }else{ }}
             <img src="../image/m_errorpages_icon_order.png" alt="" class="centerbg">
             <div class="info">还没有饿单，快去下单吧</div>
            {{ } }}
             */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },
        //订单状态模板
        orderStatusTpl:function()
        {
            var tpl= (function tpl() {/*
            <section class="aui-content-padded">
            <div class="aui-card-list">
                <div class="aui-card-list-header aui-text-center" style="display:block;">
                    <b id="order-status-tip">{{=it.status_text}}</b><br>
                    <div class="aui-font-size-12 aui-text-left">送货地址：{{=it.address}}</div>
                    <div class="aui-font-size-12 aui-text-left">下单时间：{{=it.create_order_date}} {{=it.create_time}}</div>
                    <div class="aui-font-size-12 aui-text-left">订单编号：{{=it.order_number}}</div>
                    {{if(it.status_text=="等待商家接单"){}}
                    <div class="aui-text-right">
                        <span class="aui-btn aui-btn-danger  aui-btn-sm" onclick="cancelOrder(this)">取消订单</span>
                    </div>
                    {{}else if(it.status_text=="商家已接单，请等待配送"){ }}
                    <div class="aui-text-right">
                        <span class="aui-btn aui-btn-finish  aui-btn-sm" onclick="finishOrder(this)">确认订单</span>
                    </div>
                    {{}}}
                </div>
                <div class="aui-card-list-content-padded">
                    <ul class="aui-list aui-media-list">
                        <li class="aui-list-item aui-list-item-middle" >
                            <div class="aui-media-list-item-inner">
                                <div class="aui-list-item-media">
                                    <img src="{{=it.shop_logo}}" class="aui-img-round aui-list-img-sm">
                                </div>
                                <div class="aui-list-item-inner aui-list-item-arrow" onclick="openShop({{=it.shop_id}})">
                                    <div class="aui-list-item-text">
                                        <div class="aui-list-item-title aui-font-size-14">{{=it.shop_name}}</div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="aui-card-list-footer" style="display:block;">
                    {{for(var x in it.product_info){ }}
                    <div class="item style2">
                        <div class="itemshelf">
                            <div class="shelfinfo01">{{=it.product_info[x].Name}}</div>

                            <div class="shelfinfo02 staring"><img src="../image/star_45.png" alt="">&nbsp;份数：{{=it.product_info[x].Count}}份</div>
                        </div>

                        <div class="buybtn"><p tapmode=""  >小计￥{{=it.product_info[x].total}}</p>

                        </div>
                    </div>
                    {{ } }}
                    <div class="item style2" style="height:30px;padding-right:10px;border-bottom:none;">
                        <div class="aui-pull-right">
                            <span>合计：</span>
                            <span style="font-size:16px;color:red;">￥{{=it.total}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
             */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },

        //订单列表模板
        orderListTpl:function()
        {
            var tpl= (function tpl() {/*
             <ul class="aui-list aui-media-list">
             {{for(var x in it){}}
                 <li class="aui-list-item aui-list-item-middle" onclick="openOrderStatus({{=it[x].id}})">
                     <div class="aui-media-list-item-inner">
                         <div class="aui-list-item-media" style="width: 3rem;">
                             <img src="{{=it[x].shop_logo}}" class="aui-img-round aui-list-img-sm">
                         </div>
                         <div class="aui-list-item-inner aui-list-item-arrow">
                             <div class="aui-list-item-text">
                                 <div class="aui-list-item-title aui-font-size-16 aui-ellipsis-1" style="width:60%;font-size:16px;"><b>{{=it[x].shop_name}}</b></div>
                                 <div class="aui-list-item-right aui-ellipsis-1">{{=it[x].status_text}}</div>
                             </div>
                             <div class="aui-list-item-text aui-ellipsis-1">
                                 {{=it[x].create_order_date}} {{=it[x].create_time}}
                             </div>
                             <div class="aui-list-item-text">
                                 {{=it[x].order_text}}
                             </div>
                             <div class="aui-list-item-text">
                                 <span style="color:black;">￥{{=it[x].total}}</span>
                             </div>
                         </div>
                     </div>
                 </li>
                 {{}}}
             </ul>
             */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },
        //商家订单列表模板
        shopOrderlist:function()
        {
            var tpl= (function tpl() {/*
             <ul class="aui-list aui-media-list">
             {{for(var x in it){}}
                 <li class="aui-list-item aui-list-item-middle" onclick="openOrderStatus({{=it[x].id}})">
                     <div class="aui-media-list-item-inner">
                         <div class="aui-list-item-inner aui-list-item-arrow">
                             <div class="aui-list-item-text">
                                 <div class="aui-list-item-title aui-font-size-16 aui-ellipsis-1" style="width:60%;font-size:16px;"><b>{{=it[x].user_name}}</b></div>
                                 <div class="aui-list-item-right aui-ellipsis-1">{{=it[x].status_text}}</div>
                             </div>
                             <div class="aui-list-item-text aui-ellipsis-1">
                                {{=it[x].create_time}}
                             </div>
                             <div class="aui-list-item-text">
                                 {{=it[x].order_text}}
                             </div>
                             <div class="aui-list-item-text">
                                 <span style="color:black;">￥{{=it[x].total_price}}</span>
                             </div>
                         </div>
                     </div>
                 </li>
                 {{}}}
             </ul>
             */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },
        //我的菜单模板
        shopMenus:function()
        {
            var tpl= (function tpl() {/*
                {{if(it&&it.length){}}
                 {{for(var x in it){ }}
                  <div class="item style2" data-id="{{=it[x].id}}" data-price="{{=it[x].price}}" data-name="{{=it[x].name}}" data-count="0">
                      <div class="itemshelf">
                          <div class="shelfinfo01">{{=it[x].name}}</div>
                          <div class="shelfinfo03">{{=it[x].brief}}</div>
                          <div class="shelfinfo02 staring"><img src="../image/star_45.png" alt="">&nbsp;月售2份</div>
                      </div>
                      <div class="buybtn"><p tapmode="" onclick="buyfood(this,{{=x}})" data-price="{{=it[x].price}}" id="initClick{{=it[x].id}}">￥{{=it[x].price}}</p>
                          <span class="minusorder">
                              <img src="../image/foodlist_bg_foodnum.png" alt="" class="numbg"><span class="thisordernum">0</span>
                              <span class="minus" tapmode="" data-price="{{=it[x].price}}" onclick="minuscash(this,{{=x}})">－</span>
                          </span>
                      </div>
                  </div>
                  {{ } }}
                 {{ }else{ }}
                     <img src="../image/m_errorpages_icon_order.png" alt="" style="width:180px;margin-top:150px;" class="centerbg">
                     <div class="info" style=""color: #888;margin-top: 30px;>没有找到餐厅</div>
                 {{ } }}
             */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },
    }