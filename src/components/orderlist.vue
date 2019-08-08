<template>
  <div id="wrapper" class="orderlist">
    <div id="head">
      <span></span>
      <div>我的订单</div>
      <span>
        <!--<strong @click="openchange" v-if='usertype==1'>{{shopinform.usToIsOpen==1?'营业中':'休息中'}}</strong>--></span>
    </div>
    <div id="main">
      <div class="nav nav01">
        <div class="nav-tab" :class="prdertype==1?'active': ''" @click="ptype(1)">自配送订单</div>
        <div class="nav-tab" :class="prdertype==2?'active':''" @click="ptype(2)">平台配送订单</div>
      </div>
      <div class="nav nav02">
        <div class="nav-tab" :class="swiperidnex==1?'active': ''" @click="tab(1)">已完成</div>
        <div class="nav-tab" :class="swiperidnex==2?'active':''" @click="tab(2)">待接单</div>
        <div class="nav-tab" :class="swiperidnex==3?'active':''" @click="tab(3)">待配送</div>
        <div class="nav-tab" :class="swiperidnex==4?'active': ''" @click="tab(4)">进行中</div>
        <div class="nav-tab" :class="swiperidnex==5?'active': ''" @click="tab(5)">退款</div>
      </div>
      <div class="swiper-container">
        <img src="../../static/orderhistory_03.png" class="noorder" v-if="mydata.length == 0" />
        <div class="order-group" @click="opennew('orderdetail', val.usOrderId)" v-for="val in mydata" v-if="mydata.length != 0">
          <div class="order-main">
            <div class="order-text">
              <img :src="myurl03 + val.usTsFacadeImg" />
              <span class="order-name">{{ val.usTsCompanyName }}</span>
              <span class="order-state">{{swiperidnex | ordertype}}</span>
            </div>
            <div class="order-adress">
              <div class="order-left">
                <div class="top">
                  <span class="order-name">{{ val.usAdsName }}</span>
                  <span class="order-state">{{val.usAdsPhone}}</span>
                </div>
                <span class="order-name">{{ val.usAdsProvince }}{{ val.usAdsDetailed }}</span>
              </div>
              <a class="order-right" :href="'tel'+val.usAdsPhone">
                  <img src="../../static/dadianhua.png" alt="">
              </a>
            </div>
            <div class="order-bottom">
              <div class="bottom-left">
                <div class="order-money">订单金额： ¥ {{ val.usOrPrice }}</div>
                <div class="order-money">下单时间： {{ val.usOrCreateTimeString==undefined?val.changeTime:val.usOrCreateTimeString }}</div>
              </div>
              <div class="bottom-right" @click.stop='print(val.usOrderId)'>
                打印订单
              </div>
            </div>

          </div>
        </div>
      </div>
      <div id="bottom">
        <div class="bottom-tab" @click="opennew('index')">
          <img src="../../static/index.png" />
          <span>首页</span>
        </div>
        <div class="bottom-tab active">
          <img src="../../static/order-active.png" />
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
  export default {
	name: 'orderlist',
	data() {
		return {
			swiperidnex: 1,
			mydata: [],
      prdertype:1
		};
	},
	mounted() {
		this.$store.state.head = '我的订单';
		this.myajax();
	},
	methods: {
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
    ptype:function(index){
      this.prdertype=index
      this.myajax()
    },
		opennew: function(target, id) {
			this.$store.state.orderid = id;
			this.$router.push({
				name: target
			});
		},
		tab: function(index) {
			this.swiperidnex = index;
      this.myajax()
		},
		myajax: function() {
			var that = this;
			// 查询我的订单
			$.ajax({
				type: 'post',
				url: that.myurl + '/selectViewAllOrders',
				data: {
					usTraderStoresId: localStorage.getItem('usTraderStoresId'),
					statusTraderStore: 2,
          type:that.swiperidnex,
          usOrIsDelivery:that.prdertype,
          usTraderId:localStorage.getItem('userid')
				},
				dataType: 'json',
				success: function(res) {
					that.mydata = res.data;
				}
			});

		}
	},
	computed: {
		myurl() {
			return this.$store.state.myurl;
		},
		orderid() {
			return this.$store.state.orderid;
		},
		statusTraderStore() {
			return this.$store.state.statusTraderStore;
		},
    myurl03() {
    	return this.$store.state.myurl03;
    }
	},
  filters:{
    ordertype:function(value){
      switch (value){
        case 1:
        return '已完成'
          break;
           case 2:
          return '待接单'
            break;
             case 3:
            return '待配送'
              break;
               case 4:
              return '进行中'
                break;
                 case 5:
                return '退款'
                  break;
      }
    }
  }
};
</script>

<style type="text/css" lang="scss">
  .swiper-slide {
    overflow-y: scroll;
  }
  .order-bottom{
    display: flex;
    align-items: center;
    padding-top: .2rem;
    .bottom-left{
      flex: 1;
      font-size: .24rem;
      text-indent: .1rem;
    }
    .bottom-right{
      background:#D8D8D8;
      border-radius: .1rem;
      padding: .1rem .2rem;
      font-size: .22rem
    }
  }
.order-adress{
  display: flex;
  align-items: center;
  padding: .1rem;
  border-bottom: 1px solid #E8E8E8;
  .order-left{
    flex: 1;
  }
  .order-right{
    margin-left:.1rem;
  }
  img{
    width:.4rem!important;
    height:.4rem!important;
    border-radius: 50%!important;
    margin:0!important;
  }
  .top{
    margin-bottom: .1rem;
  }
}
  .orderlist .nav {
    width: 100%;
    height: 0.8rem;
    display: flex;
    align-items: center;
    background: white;
    margin-bottom: 0.1rem;
    justify-content: space-around
  }

  .orderlist .nav-tab {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 0.8rem;
    transition: all 0.3s;
    box-sizing: border-box;
  }

  .nav01 .nav-tab {
    padding: 0 .2rem
  }

  .nav02 .nav-tab {
    width: .8rem;
    white-space: nowrap
  }

  .orderlist .active {
    border-bottom: 2px solid #FF8190;
  }

  .orderlist .noorder {
    width: 50%;
    margin: 2rem 25%;
    height: auto !important;
  }

  .orderlist .swiper-container {
    height: calc(100% - 2.85rem);
  }

  .orderlist .order-group {
    background: #ffffff;
    padding: .2rem;
  }

  .orderlist .order-group {
    display: flex;
    margin: .2rem;
  }

  .orderlist .order-group img {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 2px;
    margin-right: 0.2rem;
  }

  .orderlist .order-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: .1rem
  }

  .orderlist .order-text {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding-bottom: .28rem
  }
.orderlist .order-text:first-of-type{
  border-bottom: 1px solid #E8E8E8;
}
  .orderlist .order-name {
    font-size: 0.25rem;
    flex: 1
  }

  .orderlist .order-state {
    color: #FF8190;
    font-size: .22rem;
  }

  .orderlist .order-time {
    color: rgb(138, 138, 138);
  }

  .orderlist .order-money {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: .1rem 0
  }

  .orderlist .oder-price {
    color: rgb(138, 138, 138);
  }

  .orderlist .order-setting {
    color: rgb(255, 152, 0);
    border: 0.01rem solid rgb(255, 152, 0);
    padding: 0.1rem 0.2rem;
    border-radius: 0.1rem;
  }

  #bottom .active {
    border: 0
  }
</style>
