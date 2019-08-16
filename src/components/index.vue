<template>
  <div id="wrapper" class="index index">
    <div id="head">
      <span></span>
      <div></div>
      <span @click="opennew('news')"><img src="../../static/ling.png" /></span>
    </div>
    <!--店长-->
    <div id="main">
      <div class="nav">
        <div class="nav-tab" :class="swiperidnex == 0 ? 'active' : ''" @click="swiperto(0)">
          <img src="../../static/index01-active.png" class="indexactive" />
          <img src="../../static/index01.png" class="indexno" />
          <span>新订单</span>
          <div class="num">{{ mydatayuan.length }}</div>
        </div>
        <div class="nav-tab" :class="swiperidnex == 1 ? 'active' : ''" @click="swiperto(1)">
          <img src="../../static/index02-active.png" class="indexactive" />
          <img src="../../static/index02.png" class="indexno" />
          <span>待配送</span>
          <div class="num">{{ mydatayuan02.length }}</div>
        </div>
        <div class="nav-tab" :class="swiperidnex == 2 ? 'active' : ''" @click="swiperto(2)">
          <img src="../../static/index03-active.png" class="indexactive" />
          <img src="../../static/index03.png" class="indexno" />
          <span>催单</span>
          <div class="num">{{ mydatayuan03.length }}</div>
        </div>
        <div class="nav-tab" :class="swiperidnex == 3 ? 'active' : ''" @click="swiperto(3)">
          <img src="../../static/index04-active.png" class="indexactive" />
          <img src="../../static/index04.png" class="indexno" />
          <span>预订单</span>
          <div class="num">{{ mydatayuan04.length }}</div>
        </div>
      </div>
      <swiper :options="swiperOption" ref="mySwiper" class="swiper-no-swiping">
        <!-- 这部分放你要渲染的那些内容 -->
        <swiper-slide>
          <div class="detail-group content" @click="opennew('orderdetail', val.usOrderId)" v-for="(val, index) in mydatayuan" v-if="mydatayuan.length != 0">
            <div class="shop-top">
              <span class="num">{{ val.usOrNum }}</span>
              <span>{{ val.usAdsName }}</span>
              <span>{{ val.usOrIsReserve == 1 ? '预约单' + val.usOrReserveTimeString : '普通单 - ' + val.changeTime }}</span>
              <a :href="'tel:' + val.usAdsPhone"><img src="../../static/dadianhua.png" alt="" /></a>
            </div>
            <div class="shop-weizhi">
              <img src="../../static/dicon.png" class="weizhi" />
              <div class="detail">
                <span>{{ val.usAdsProvince }}</span>
                <span>{{ val.usAdsDetailed }}</span>
              </div>
            </div>
            <div class="shop-top" style="height: .7rem;text-indent: .2rem;font-size: .24rem;font-weight: 600;" @click.stop="changex(0, index)">
              <div>商品 ({{ val.usOrderDetaileUsTraderShoppingPojos.length }})</div>
              <div style="flex: 1;text-align: right;">展开</div>
              <img src="../../static/shang.png" v-if="!val.down" />
              <img src="../../static/xia.png" v-if="val.down" />
            </div>
            <div class="shop-group" v-for="item in val.usOrderDetaileUsTraderShoppingPojos" v-show="val.down">
              <div class="shop-main">
                <div class="shop-name " style="margin: 0;">
                  <span>{{ item.usTsName }} x {{ item.usOdNum }}</span>
                  <span>¥{{ item.usDetailsPrice }}</span>
                </div>
              </div>
            </div>
            <div class="shop-main" style="border-top:1px solid #D8D8D8;" v-show="val.down">
              <div class="shop-name" style="margin: 0;">
                <span>包装费</span>
                <span>¥{{ val.usOrPackingFee }}</span>
              </div>
            </div>
            <div class="shop-main">
              <div class="shop-name" style="margin: 0;" v-show="val.down">
                <span>配送费</span>
                <span>¥{{ val.usOrDeliveryPrice }}</span>
              </div>
            </div>
            <div class="shop-main" v-for="item in JSON.parse(val.usOrPackage)" v-show="val.down" v-if="item.price != 0">
              <div class="shop-name shop-you" style="margin: 0;">
                <span>{{ item.name }}</span>
                <span>-¥{{ item.price }}</span>
              </div>
            </div>
            <div class="shop-back">
              <div class="back-inner">
                <div class="back-group" style="justify-content: center;" @click.stop="print(val.usOrderId)">打印订单</div>
                <div class="back-group" style="justify-content: center;" @click.stop="haveorder(val.usOrderId, index)">确认接单</div>
              </div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="detail-group content" @click="opennew('orderdetail', val.usOrderId)" v-for="(val, index) in mydatayuan02" v-if="mydatayuan02.length != 0">
            <div class="shop-top">
              <span class="num">{{ val.usOrNum }}</span>
              <span>{{ val.usAdsName }}</span>
              <span>{{ val.usOrIsReserve == 1 ? '预约单 - ' + val.usOrReserveTimeString : '普通单 - ' + val.changeTime }}</span>
              <a :href="'tel:' + val.usAdsPhone"><img src="../../static/dadianhua.png" alt="" /></a>
            </div>
            <div class="shop-weizhi">
              <img src="../../static/dicon.png" class="weizhi" />
              <div class="detail">
                <span>{{ val.usAdsProvince }}</span>
                <span>{{ val.usAdsDetailed }}</span>
              </div>
            </div>
            <div class="shop-top" style="height: .7rem;text-indent: .2rem;font-size: .24rem;font-weight: 600;" @click.stop="changex(1, index)">
              <div>商品 ({{ val.usOrderDetaileUsTraderShoppingPojos.length }})</div>
              <div style="flex: 1;text-align: right;">展开</div>
              <img src="../../static/shang.png" v-if="!val.down" />
              <img src="../../static/xia.png" v-if="val.down" />
            </div>
            <div class="shop-group" v-for="item in val.usOrderDetaileUsTraderShoppingPojos" v-show="val.down">
              <div class="shop-main">
                <div class="shop-name " style="margin: 0;">
                  <span>{{ item.usTsName }} x {{ item.usOdNum }}</span>
                  <span>¥{{ item.usDetailsPrice }}</span>
                </div>
              </div>
            </div>
            <div class="shop-main" style="border-top:1px solid #D8D8D8;" v-show="val.down">
              <div class="shop-name" style="margin: 0;">
                <span>包装费</span>
                <span>¥{{ val.usOrPackingFee }}</span>
              </div>
            </div>
            <div class="shop-main">
              <div class="shop-name" style="margin: 0;" v-show="val.down">
                <span>配送费</span>
                <span>¥{{ val.usOrDeliveryPrice }}</span>
              </div>
            </div>
            <div class="shop-main" v-for="item in JSON.parse(val.usOrPackage)" v-show="val.down" v-if="item.price != 0">
              <div class="shop-name shop-you" style="margin: 0;">
                <span>{{ item.name }}</span>
                <span>-¥{{ item.price }}</span>
              </div>
            </div>
            <div class="shop-back">
              <div class="back-inner">
                <div class="back-group" style="justify-content: center;" @click.stop="print(val.usOrderId)">打印订单</div>
                <div class="back-group" style="justify-content: center;" @click.stop="orderok(val.usOrderId)" v-if="val.usOrIsDelivery == 1">确认送达</div>
              </div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div
            class="detail-group content"
            @click="opennew('orderdetail', val.usOrderId)"
            v-for="(val, index) in mydatayuan03"
            v-if="mydatayuan03.length != 0"
            :class="val.usOrIsUrgent == 1 ? 'active' : ''"
          >
            <div class="shop-top">
              <span class="num">{{ val.usOrNum }}</span>
              <span>{{ val.usAdsName }}</span>
              <span>{{ val.usOrIsReserve == 1 ? '预约单' + val.usOrReserveTimeString : '普通单 - ' + val.changeTime }}</span>
              <a :href="'tel:' + val.usAdsPhone"><img src="../../static/dadianhua.png" alt="" /></a>
            </div>
            <div class="shop-weizhi">
              <img src="../../static/dicon.png" class="weizhi" />
              <div class="detail">
                <span>{{ val.usAdsProvince }}</span>
                <span>{{ val.usAdsDetailed }}</span>
              </div>
            </div>
            <div class="shop-top" style="height: .7rem;text-indent: .2rem;font-size: .24rem;font-weight: 600;" @click.stop="changex(2, index)">
              <div>商品 ({{ val.usTraderShoppingList.length }})</div>
              <div style="flex: 1;text-align: right;">展开</div>
              <img src="../../static/shang.png" v-if="!val.down" />
              <img src="../../static/xia.png" v-if="val.down" />
            </div>
            <div class="shop-group" v-for="item in val.usTraderShoppingList" v-show="val.down">
              <div class="shop-main">
                <div class="shop-name " style="margin: 0;">
                  <span>{{ item.usTsName }} x {{ item.usOdNum }}</span>
                  <span>¥{{ item.usDetailsPrice }}</span>
                </div>
              </div>
            </div>
            <div class="shop-main" style="border-top:1px solid #D8D8D8;" v-show="val.down">
              <div class="shop-name" style="margin: 0;">
                <span>包装费</span>
                <span>¥{{ val.usOrPackingFee }}</span>
              </div>
            </div>
            <div class="shop-main">
              <div class="shop-name" style="margin: 0;" v-show="val.down">
                <span>配送费</span>
                <span>¥{{ val.usOrDeliveryPrice }}</span>
              </div>
            </div>
            <div class="shop-main" v-for="item in JSON.parse(val.usOrPackage)" v-show="val.down" v-if="item.price != 0">
              <div class="shop-name shop-you" style="margin: 0;">
                <span>{{ item.name }}</span>
                <span>-¥{{ item.price }}</span>
              </div>
            </div>
            <div class="shop-back">
              <div class="back-inner"><div class="back-group" style="justify-content: center;" @click.stop="print(val.usOrderId)">打印订单</div></div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="detail-group content" @click="opennew('orderdetail', val.usOrderId)" v-for="(val, index) in mydatayuan04" v-if="mydatayuan04.length != 0">
            <div class="shop-top">
              <span class="num">{{ val.usOrNum }}</span>
              <span>{{ val.usAddress.usAdsName }}</span>
              <span>{{ val.usOrReserveTimString }}</span>
              <a :href="'tel:' + val.usAddress.usAdsPhone"><img src="../../static/dadianhua.png" alt="" /></a>
            </div>
            <div class="shop-weizhi">
              <img src="../../static/dicon.png" class="weizhi" />
              <div class="detail">
                <span>{{ val.usAddress.usAdsProvince }}</span>
                <span>{{ val.usAddress.usAdsDetailed }}</span>
              </div>
            </div>
            <div class="shop-top" style="height: .7rem;text-indent: .2rem;font-size: .24rem;font-weight: 600;" @click.stop="changex(3, index)">
              <div>商品 ({{ val.usTraderShoppingList.length }})</div>
              <div style="flex: 1;text-align: right;">展开</div>
              <img src="../../static/shang.png" v-if="!val.down" />
              <img src="../../static/xia.png" v-if="val.down" />
            </div>
            <div class="shop-group" v-for="item in val.usTraderShoppingList" v-show="val.down">
              <div class="shop-main">
                <div class="shop-name " style="margin: 0;">
                  <span>{{ item.usTsName }} x {{ item.usOdNum }}</span>
                  <span>¥{{ item.usDetailsPrice }}</span>
                </div>
              </div>
            </div>
            <div class="shop-main" style="border-top:1px solid #D8D8D8;" v-show="val.down">
              <div class="shop-name" style="margin: 0;">
                <span>包装费</span>
                <span>¥{{ val.usOrPackingFee }}</span>
              </div>
            </div>
            <div class="shop-main">
              <div class="shop-name" style="margin: 0;" v-show="val.down">
                <span>配送费</span>
                <span>¥{{ val.usOrDeliveryPrice }}</span>
              </div>
            </div>
            <div class="shop-main" v-for="item in JSON.parse(val.usOrPackage)" v-show="val.down" v-if="item.price != 0">
              <div class="shop-name shop-you" style="margin: 0;">
                <span>{{ item.name }}</span>
                <span>-¥{{ item.price }}</span>
              </div>
            </div>
            <div class="shop-back">
              <div class="back-inner"><div class="back-group" style="justify-content: center;" @click.stop="print(val.usOrderId)">打印订单</div></div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <div id="bottom">
        <div class="bottom-tab active">
          <img src="../../static/index-active.png" />
          <span>首页</span>
        </div>
        <div class="bottom-tab" @click="opennew('orderlist')">
          <img src="../../static/order.png" />
          <span>订单</span>
        </div>
        <div class="bottom-tab" @click="opennew('usercenter')">
          <img src="../../static/user.png" />
          <span>我的</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
  name: 'index',
  data() {
    return {
      openstate: false,
      swiperOption: {},
      swiperidnex: 0,
      usertype: localStorage.getItem('usertype'),
      mydata: '',
      username: localStorage.getItem('username'),
      slide: '',
      mydatayuan: [],
      mydatayuan02: [],
      mydatayuan03: [],
      mydatayuan04: [],
      shopinform: '',
      isok: true,
      usOrIsDelivery: localStorage.getItem('usOrIsDelivery'),
      music: ''
    };
  },
  mounted() {
    var that = this;
    this.$store.state.head = '首页';
    clearTimeout(that.myset);
    this.setmyajax();
    if (localStorage.getItem('username') == null) {
      this.opennew('userregister');
    }
    if (localStorage.getItem('usOrIsDelivery') == null || localStorage.getItem('usOrIsDelivery') == undefined) {
      localStorage.setItem('usOrIsDelivery', 2);
    }
    localStorage.setItem('myimg', this.myurl03);
  },
  methods: {
    orderok: function(id) {
      var that = this;
      $.ajax({
        type: 'post',
        url: that.myurl + '/fulfillmentOrder',
        dataType: 'json',
        data: {
          usOrderId: id,
          usTraderStoresId: localStorage.getItem('usTraderStoresId')
        },
        success: function(res) {
          //						if(res.msg=='ok'){
          plus.nativeUI.toast('订单已完成');
          that.myajax();
          //						}else{
          //							plus.nativeUI.toast('接单失败')
          //						}
        }
      });
    },
    changex: function(type, index) {
      // 展开详情
      if (type == 0) {
        this.mydatayuan[index].down = !this.mydatayuan[index].down;
      } else if (type == 1) {
        this.mydatayuan02[index].down = !this.mydatayuan02[index].down;
      } else if (type == 2) {
        this.mydatayuan03[index].down = !this.mydatayuan03[index].down;
      } else if (type == 3) {
        this.mydatayuan04[index].down = !this.mydatayuan04[index].down;
      }
    },
    print: function(id) {
      // 打印订单
      var that = this;
      plus.nativeUI.showWaiting('打印中');
      $.ajax({
        type: 'post',
        url: that.myurl + '/PrintOrderId',
        dataType: 'json',
        data: {
          usOrderId: id
        },
        success: function(res) {
          if (localStorage.getItem('bid') == null || localStorage.getItem('bid') == undefined) {
            plus.nativeUI.closeWaiting();
            plus.nativeUI.toast('打印失败，请连接打印机！');
            return false;
          }
          var main = plus.android.runtimeMainActivity();
          var BluetoothAdapter = plus.android.importClass('android.bluetooth.BluetoothAdapter');
          var UUID = plus.android.importClass('java.util.UUID');
          var uuid = UUID.fromString('00001101-0000-1000-8000-00805F9B34FB');
          var BAdapter = BluetoothAdapter.getDefaultAdapter();
          BAdapter.cancelDiscovery(); //停止扫描
          var device = BAdapter.getRemoteDevice(localStorage.getItem('bid')); //这里是蓝牙打印机的蓝牙地址
          plus.android.importClass(device);
          var bluetoothSocket = device.createInsecureRfcommSocketToServiceRecord(uuid);
          plus.android.importClass(bluetoothSocket);
          if (!bluetoothSocket.isConnected()) {
            plus.nativeUI.toast('蓝牙断开连接！');
            bluetoothSocket.connect();
          }

          if (bluetoothSocket.isConnected()) {
            plus.nativeUI.toast('蓝牙连接成功');
            var outputStream = bluetoothSocket.getOutputStream();
            plus.android.importClass(outputStream);
            var s = plus.android.importClass('java.lang.String');
            var string = new s(res.data);
            var bytes = string.getBytes('gbk');
            outputStream.write(bytes);
            outputStream.flush();
          } else {
            plus.nativeUI.toast('蓝牙断开连接！');
          }
          plus.nativeUI.closeWaiting();
        }
      });
    },
    haveorder: function(id, index) {
      var that = this;

      // function plusReady() {
      // 	//					 弹出系统等待对话框
      // 	plus.nativeUI.showWaiting()
      $.ajax({
        type: 'post',
        url: that.myurl + '/updateUsOrderEmployeeReceipt',
        dataType: 'json',
        data: {
          usOrderId: id
        },
        success: function(res) {
          function plusReady() {
            // 弹出系统等待对话框
            plus.nativeUI.closeWaiting();
          }
          if (window.plus) {
            plusReady();
          } else {
            document.addEventListener('plusready', plusReady, false);
          }
          if (res.status == 400) {
            plus.nativeUI.toast('订单已被用户取消');
            that.myajax();
          } else {
            if (res.data == 1) {
              plus.nativeUI.toast('接单成功');
              that.myajax();
              that.print(id);
            } else {
              plus.nativeUI.toast('接单失败');
            }
          }
        }
      });
      // 				}
      // 				if(window.plus) {
      // 					plusReady();
      // 				} else {
      // 					document.addEventListener("plusready", plusReady, false);
      //
      // 				}
    },
    goopen: function(id) {
      if (id == '我的订单') {
        this.opennew('orderlist');
      } else if (id == '我的钱包') {
        this.opennew('wallet');
      } else if (id == '我的店铺') {
        this.opennew('shop');
      } else if (id == '员工管理') {
        this.opennew('staff');
      }
    },
    openshop: function(usTraderStoresId, usToIsOpen, index) {
      var that = this;
      var myusToIsOpen;
      if (usToIsOpen == 0) {
        myusToIsOpen = 1;
      } else {
        myusToIsOpen = 0;
      }
      $.ajax({
        type: 'post',
        url: that.myurl + '/updateUsTraderOperate',
        data: {
          usTraderStoresId: usTraderStoresId,
          usStoresEmployeeName: localStorage.getItem('username'),
          usToIsOpen: myusToIsOpen
        },
        dataType: 'json',
        success: function(res) {
          if (res.data == 1) {
            that.mydata[index].usToIsOpen = myusToIsOpen;
          } else {
            alert('修改失败');
          }
        }
      });
    },
    opennew: function(target, id) {
      var that = this;
      if (that.music != '') {
        that.music.pause();
      }
      clearTimeout(that.myset);
      if (id != undefined) {
        this.$store.state.orderid = id;
      }
      this.$router.push({
        name: target
      });
    },
    schange: function() {
      var that = this;
      if (localStorage.getItem('usOrIsDelivery') == 1) {
        localStorage.setItem('usOrIsDelivery', 2);
        that.usOrIsDelivery = 2;
      } else {
        localStorage.setItem('usOrIsDelivery', 1);
        that.usOrIsDelivery = 1;
      }
    },
    ochange: function() {
      var that = this;
      var usToIsOrders;
      if (that.shopinform.usToIsOrders == 0) {
        usToIsOrders = 1;
      } else {
        usToIsOrders = 0;
      }
      var ajaxjson = {
        usTraderStoresId: localStorage.getItem('usTraderStoresId'),
        usToIsOrders: usToIsOrders,
        usStoresEmployeeName: localStorage.getItem('username')
      };
      $.ajax({
        type: 'post',
        url: that.myurl + '/updateUsToIsOrders',
        dataType: 'json',
        data: ajaxjson,
        success: function(res) {
          if (res.data == 1) {
            that.shopinform.usToIsOrders = usToIsOrders;
          } else {
            alert('修改失败');
          }
        }
      });
    },
    dchange: function() {
      var that = this;
      var usToIsPrint;
      if (that.shopinform.usToIsPrint == 0) {
        usToIsPrint = 1;
      } else {
        usToIsPrint = 0;
      }
      $.ajax({
        type: 'post',
        url: that.myurl + '/updateUsTraderOperatePrint',
        dataType: 'json',
        data: {
          usTraderStoresId: localStorage.getItem('usTraderStoresId'),
          usToIsPrint: usToIsPrint,
          usStoresEmployeeName: localStorage.getItem('username')
        },
        success: function(res) {
          if (res.data == 1) {
            that.shopinform.usToIsPrint = usToIsPrint;
          } else {
            alert('修改失败');
          }
        }
      });
    },
    openchange: function() {
      function plusReady() {
        // 弹出系统等待对话框
        plus.nativeUI.showWaiting();
      }
      if (window.plus) {
        plusReady();
      } else {
        document.addEventListener('plusready', plusReady, false);
      }
      var that = this;
      var usToIsOpen;
      if (that.shopinform.usToIsOpen == 0) {
        usToIsOpen = 1;
      } else {
        usToIsOpen = 0;
      }
      $.ajax({
        type: 'post',
        url: that.myurl + '/updateUsTraderOperate',
        dataType: 'json',
        data: {
          usTraderStoresId: localStorage.getItem('usTraderStoresId'),
          usToIsOpen: usToIsOpen,
          usStoresEmployeeName: localStorage.getItem('username')
        },
        success: function(res) {
          function plusReady() {
            // 弹出系统等待对话框
            plus.nativeUI.closeWaiting();
          }
          if (window.plus) {
            plusReady();
          } else {
            document.addEventListener('plusready', plusReady, false);
          }
          if (res.data == 1) {
            that.shopinform.usToIsOpen = usToIsOpen;
          } else {
            alert('修改失败');
          }
        }
      });
    },
    swiperto: function(index) {
      this.swiperidnex = index;
      console.log(index);
      this.swiper.slideTo(index, 1000, false);
    },
    setmyajax: function() {
      var that = this;
      that.myajax();
      that.$store.state.myset = setTimeout(function() {
        that.setmyajax();
      }, 10000);
    },
    myajax: function() {
      var that = this;

      function plusReady() {
        // 弹出系统等待对话框
        plus.nativeUI.showWaiting('加载中...');
        plus.navigator.setStatusBarBackground('#FF8190');
      }
      if (window.plus) {
        plusReady();
      } else {
        document.addEventListener('plusready', plusReady, false);
      }
      if (this.usertype == 0) {
        //					商户
        $.ajax({
          type: 'post',
          url: that.myurl + '/selectUsTraderStores',
          data: {
            usTraderId: localStorage.getItem('userid')
          },
          dataType: 'json',
          success: function(res) {
            that.mydata = res.data;
          }
        });
      } else {
        //					员工权限
        // $.ajax({
        // 	type: "post",
        // 	url: that.myurl + "/usTraderEmployeePag",
        // 	data: {
        // 		usTraderEmployeeId: localStorage.getItem('userid')
        // 	},
        // 	dataType: 'json',
        // 	success: function(res) {
        // 		that.slide = res.data
        // 	}
        // });

        //					获取员工详细信息
        $.ajax({
          type: 'post',
          url: that.myurl + '/selectUsTraderEmployeeUsTraderStores',
          dataType: 'json',
          data: {
            usTraderEmployeeId: localStorage.getItem('dianid')
          },
          success: function(res) {
            localStorage.setItem('usTraderStoresId', res.data[0].usTraderStoresId);
            //							获取店铺营业状态和打印状态
            $.ajax({
              type: 'post',
              url: that.myurl + '/selectUsTraderOperateUsTraderStoresId',
              data: {
                usTraderStoresId: res.data[0].usTraderStoresId
              },
              dataType: 'json',
              success: function(rsp) {
                that.shopinform = rsp.data;
              }
            });
            //							取消订单提醒
            $.ajax({
              type: 'post',
              url: that.myurl03 + '/message/getRetreatMessage',
              data: {
                userId: res.data[0].usTraderStoresId
              },
              dataType: 'json',
              success: function(rsp) {
                if (rsp.data != null) {
                  //										var music = new Audio();
                  //										music.src = "./static/quXiao.m4a";
                  //										music.play()
                  for (var i = 0; i < rsp.data.length; i++) {
                    $.ajax({
                      type: 'post',
                      url: that.myurl03 + '/message/updateMessage',
                      data: {
                        id: rsp.data[i].cuserCmessageId
                      },
                      dataType: 'json',
                      success: function(res) {}
                    });
                  }
                }
              }
            });
            //							获取店铺未接订单
            $.ajax({
              type: 'post',
              url: that.myurl + '/selectShoppingDetaileEmployee',
              data: {
                usTraderStoresId: res.data[0].usTraderStoresId
              },
              dataType: 'json',
              success: function(rsp) {
                for (var i in rsp.data) {
                  rsp.data[i].down = false;
                }
                that.mydatayuan = rsp.data;
                if (rsp.data.length != 0) {
                  that.music = new Audio();
                  that.music.src = './static/music.m4a';
                  that.music.play();
                }
                if (that.shopinform.usToIsOrders == 1) {
                  for (var i = 0; i < rsp.data.length; i++) {
                    that.haveorder(rsp.data[i].usOrderId, i);
                  }
                }
              }
            });
            //							获取已接订单
            $.ajax({
              type: 'post',
              url: that.myurl + '/selectUsTraderStoresUsOrIsCancel',
              data: {
                usTraderStoresId: res.data[0].usTraderStoresId
              },
              dataType: 'json',
              success: function(rsp) {
                for (var i in rsp.data) {
                  rsp.data[i].down = false;
                }
                that.mydatayuan02 = rsp.data;
              }
            });
            //							获取催单
            $.ajax({
              type: 'post',
              url: that.myurl + '/selectUsOrderByUrgent',
              data: {
                usTraderStoresId: res.data[0].usTraderStoresId
              },
              dataType: 'json',
              success: function(rsp) {
                for (var i in rsp.data) {
                  rsp.data[i].down = false;
                }
                that.mydatayuan03 = rsp.data;
              }
            });
            //							获取预约单
            $.ajax({
              type: 'post',
              url: that.myurl + '/reserveList',
              data: {
                usTraderStoresId: res.data[0].usTraderStoresId
              },
              dataType: 'json',
              success: function(rsp) {
                if (rsp.data.length != 0) {
                  for (var i in rsp.data) {
                    rsp.data[i].down = false;
                  }
                  that.mydatayuan04 = rsp.data;
                }
              }
            });
          }
        });
      }

      function plusReady() {
        // 弹出系统等待对话框
        plus.nativeUI.closeWaiting();
      }
      if (window.plus) {
        plusReady();
      } else {
        document.addEventListener('plusready', plusReady, false);
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    myurl() {
      return this.$store.state.myurl;
    },
    myurl03() {
      return this.$store.state.myurl03;
    },
    myset() {
      return this.$store.state.myset;
    }
  },
  filters: {
    myimg: function(value) {
      return value.substring(0, value.indexOf('D:')) + value.substr(value.indexOf('D:') + 2);
    }
  }
};
</script>

<style type="text/css" lang="scss">
.index {
  background: #ffffff !important;
  .shop-you {
    color: #929292;
    font-size: 0.22rem;
    span:last-of-type {
      color: #ff8190;
    }
  }
  .shop-weizhi {
    display: flex;
    align-items: center;
    img {
      height: 0.4rem;
      margin: 0.2rem;
    }
    padding: 0.3rem 0;
    border-bottom: 1px solid #d8d8d8;
    background: #ffffff;
    .detail {
      flex: 1;
      display: flex;
      flex-direction: column;
      span:first-of-type {
        font-weight: 600;
        margin-bottom: 0.2rem;
      }
      span:last-of-type {
        font-size: 0.22rem;
      }
    }
  }
  #head {
    background: #ff8190;
  }
  .swiper-slide {
    overflow-y: scroll;
  }
  .shop-top {
    display: flex;
    height: 1rem;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #d8d8d8;
    background: #ffffff;
    span {
      margin: 0 0.2rem;
      font-size: 0.25rem;
      text-align: left;
      flex: 1;
      font-weight: 600;
    }
    span:first-of-type {
      font-size: 0.24rem;
      flex: none;
      color: #ffffff;
      background: #ff8190;
      border-radius: 50%;
      width: 0.35rem;
      height: 0.35rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    span:nth-of-type(2) {
      width: 1rem;
      margin: 0;
      flex: none;
    }
    img {
      height: 0.35rem;
      height: 0.35rem;
      border-radius: 50%;
      margin-right: 0.2rem;
      margin-left: 0.15rem;
    }
  }
  .usergroup {
    width: calc(100% - 0.4rem);
    border-radius: 0.1rem;
    background: white;
    margin: 0.1rem 0.2rem;
    box-shadow: 0 0 10px 0.1rem gainsboro;
    overflow: hidden;
    .shop-name {
      display: flex;
      align-items: center;
      img {
        width: 0.4rem;
        height: 0.4rem;
        margin: 0 0.2rem;
      }
      .name {
        flex: 1;
      }
      .state {
        color: #ff8190;
        margin-right: 0.2rem;
      }
    }
    .inform {
      display: flex;
      align-items: center;
      height: 0.6rem;
      .title {
        width: 1.3rem;
        font-weight: 600;
        margin-left: 0.3rem;
      }
      .text {
        color: #666666;
        flex: 1;
        margin-right: 0.2rem;
      }
    }
    .shop-setting {
      height: 0.8rem;
      background: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .time {
        margin-left: 0.2rem;
      }
      .delete-box {
        display: flex;
        align-items: center;
      }
      .delete {
        margin-right: 0.2rem;
        background: #ff8190;
        color: white;
        padding: 0.1rem 0.2rem;
        border-radius: 0.1rem;
      }
    }
  }
  #main {
    overflow: hidden;
  }
  .swiper-container {
    height: calc(100% - 3rem);
    background: #f7f7f9;
    overflow-y: scroll;
  }
  .nav {
    height: 2rem;
    display: flex;
    color: #ffffff;
    background: url(../../static/bavk.png) no-repeat;
    background-size: 100% 100%;
    .nav-tab {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 0.2rem;
      box-sizing: border-box;
      position: relative;
      img {
        height: 0.46rem;
        margin-bottom: 0.24rem;
      }
      .indexactive {
        display: none;
      }
      &.active {
        color: black;
        font-weight: 600;
        .indexactive {
          display: block;
        }
        .indexno {
          display: none;
        }
      }
      .num {
        position: absolute;
        top: 0.45rem;
        right: 0.5rem;
        background: #ffffff;
        color: #ff8190;
        width: 0.25rem;
        height: 0.25rem;
        border-radius: 50%;
        text-align: center;
        line-height: 0.25rem;
      }
    }
  }
  .menu {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 667;
    .meun-group {
      background: #33343a;
      margin-bottom: 0.2rem;
      padding: 0.1rem 0;
      .list {
        height: 0.8rem;
        margin: 0 0.2rem;
        display: flex;
        align-items: center;
        .meun-img {
          width: 0.3rem;
          height: 0.3rem;
        }
        .list-text {
          flex: 1;
          margin-left: 0.15rem;
        }
      }
    }
    .meun-main {
      background: #333333;
      width: 5.9rem;
      height: 100%;
      color: white;
      overflow-y: scroll;
    }
    .user-inform {
      display: flex;
      align-items: center;
      width: 100%;
      height: 1.7rem;
      background-size: auto 100%;
      background: url(../../static/driver_icon.jpg);
      .avatar {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        margin-left: 0.2rem;
      }
      .user-text {
        flex: 1;
        text-indent: 0.15rem;
        font-size: 0.25rem;
        font-weight: 600;
      }
      .arr {
        width: 0.25rem;
        margin-right: 0.2rem;
      }
    }
  }
}

.index .detail-group {
  background: #ffffff;
  width: calc(100% - 0.4rem);
  margin: 0.1rem 0.2rem;
  box-shadow: 0 0 10px 0.01rem gainsboro;
}

.index .swiper-slide .active {
  background: url(../../static/cui.png) no-repeat;
  background-size: 1rem auto;
  overflow: auto;
}

.index .top {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  height: 2.7rem;
}

.index .setting {
  display: flex;
  align-items: center;
  justify-content: center;
}

.index .state-h {
  font-size: 0.3rem;
  font-weight: 600;
}

.index .state-p {
  color: rgb(80, 80, 80);
}

.index .setting-btn {
  border: 0.01rem solid gainsboro;
  border-radius: 0.1rem;
  padding: 4px 0.2rem;
  margin: 0.1rem;
}

.index .shop-name {
  display: flex;
  padding: 0.1rem 0;
  align-items: center;
}

.index .avatar {
  width: 0.4rem;
  height: 0.4rem;
  margin-right: 0.1rem;
  border-radius: 2px;
}

.index .arr {
  height: 0.3rem;
}

.index .shop-group {
  background: #ffffff;
  padding: 0.1rem 0;
}

.index .detail-top {
  display: flex;
  height: 1.3rem;
  align-items: center;
}

.index .detail-top .top-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.index .top-tab img {
  width: 0.3rem;
  height: 0.3rem;
}

.index .next {
  width: 0.4rem;
  height: 0.4rem;
}

.index .setting h2 {
  height: 0.7rem;
  line-height: 0.7rem;
  text-align: center;
}

.index .setting .shalou {
  margin: 0 0.3rem;
  display: flex;
  align-items: center;
  margin-bottom: 0.1rem;
}

.index .shalou span {
  flex: 1;
  border-bottom: 0.01rem solid #666666;
}

.index .shalou img {
  width: 0.3rem;
  height: 0.3rem;
  margin: 0.1rem;
}

.index .setting p {
  text-align: center;
  height: 0.6rem;
  line-height: 0.6rem;
}

.index .setting-bottom {
  display: flex;
  align-items: center;
  height: 1.5rem;
  justify-content: center;
}

.index .setting-bottom div {
  border: 0.01rem solid #ff8190;
  color: #ff8190;
  border-radius: 0.1rem;
  text-align: center;
  width: 1.7rem;
  height: 0.7rem;
  line-height: 0.7rem;
}

.index .detail-inner {
  margin: 0 0.2rem;
}

.index .group-top {
  border-bottom: 0.01rem solid #dcdcdc;
  line-height: 0.7rem;
  font-weight: bold;
}

.index .group {
  display: flex;
  height: 0.7rem;
  align-items: center;
  margin: 0 0.1rem;
}

.index .group .group-name {
  margin-right: 0.1rem;
  font-weight: bold;
  padding: 0 0.1rem;
}

.index .shop-group {
  display: flex;
  align-items: center;
  justify-content: center;
}

.index .shop-group img {
  width: 0.8rem;
  height: 0.8rem;
  margin: 0 0.2rem;
}

.index .shop-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 0.2rem;
  overflow: hidden;
  background: #ffffff;
}

.index .shop-name {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0.1rem;
}

.index .shop-type {
  color: rgb(156, 156, 156);
  font-size: 0.2rem;
}

.index .back-inner {
  margin: 0 0.2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-bottom: 0.01rem dashed gainsboro;
}

.index .shop-back {
  background-size: 100% 1.2rem;
  display: flex;
  flex-direction: column;
  height: 1rem;
  font-size: 0.2rem;
  padding-top: 0.3rem;
  background: #ffffff;
}

.index .shop-back:last-of-type .back-inner {
  flex-direction: row;
  justify-content: space-between;
}

.index .back-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 0.5rem;
  width: 2rem;
  border-radius: 0.1rem;
  border: 1px solid #d8d8d8;
}
.index .back-group:last-of-type {
  border: 0;
  background: #ff8190;
  color: #ffffff;
}
.index .red {
  background: rgb(254, 99, 91);
  color: white;
  width: 0.3rem;
  height: 0.3rem;
  display: inline-block;
  margin-right: 0.1rem;
  line-height: 0.3rem;
  text-align: center;
}

.index .grey {
  color: rgb(164, 164, 164);
}

.index strong {
  font-size: 0.25rem;
  margin-left: 0.1rem;
}

.index .moneyred {
  color: rgb(254, 99, 91);
}

.index .phone {
  width: 0.3rem;
  height: 0.3rem;
  margin-right: 0.1rem;
}

.index .inform-group {
  display: flex;
  padding: 0.2rem 0;
}

.index .inform-name {
  color: rgb(164, 164, 164);
  margin: 0 0.2rem;
}

.index .img-box {
  background: yellowgreen;
  border-radius: 50%;
  width: 0.6rem;
  height: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.index #container {
  width: 100%;
  height: 4rem;
  transition: height 0.5s;
}

.index #orderinform {
  position: relative;
  top: -2rem;
  z-index: 998;
  transition: top 0.5s;
}

.index .mapshow {
  width: 0.4rem;
}
</style>
