<template>
	<div class="wapper usercenter" id="wrapper">
		<div id="head">
			<span></span>
			<div>
				我的
			</div>
			<span></span>
		</div>
		<div class="main" id="main" style="overflow: hidden;">
			<div class="yue" style="height: calc(100% - 1rem);">
				<div class="yue2" @click="opennew('wallet')">
					<div class="yuea">
						<span class="dazi">今日营业额(￥)</span>
						<span class="xiaozi">{{mydata.todayPrice}}</span>
					</div>
					<div class="yuea">
						<span class="dazi">总余额(￥)</span>
						<span class="xiaozi">{{mydata.usTwPrice}}</span>
					</div>
				</div>
				<div class="yue2">
					<div class="yuea w25" @click="opennew('vipcart')">
						<img src="../../static/nav01.png" class="navimg"/>
						<span class="navtext">会员卡管理</span>
					</div>
					<div class="yuea w25" @click="opennew('adver')">
						<img src="../../static/nav02.png" class="navimg"/>
						<span class="navtext">广告管理</span>
					</div>
					<div class="yuea w25" @click="opennew('shop')">
						<img src="../../static/nav03.png" class="navimg"/>
						<span class="navtext">店铺管理</span>
					</div>
					<div class="yuea w25" @click="opennew('activity')">
						<img src="../../static/nav04.png" class="navimg"/>
						<span class="navtext">活动管理</span>
					</div>
					<div class="yuea w25" @click="opennew('shoping')">
						<img src="../../static/nav05.png" class="navimg"/>
						<span class="navtext">商品管理</span>
					</div>
					<div class="yuea w25" @click="opennew('staff')" v-if="usertype==1">
						<img src="../../static/nav06.png" class="navimg"/>
						<span class="navtext">店长管理</span>
					</div>
					<div class="yuea w25" @click="opennew('vipcenter')">
						<img src="../../static/nav07.png" class="navimg"/>
						<span class="navtext">会员管理</span>
					</div>
					<div class="yuea w25" @click="opennew('freight')">
						<img src="../../static/nav08.png" class="navimg"/>
						<span class="navtext">运费设置</span>
					</div>
					<div class="yuea w25" @click="opennew('nav')">
						<img src="../../static/nav09.png" class="navimg"/>
						<span class="navtext">分类管理</span>
					</div>
					<div class="yuea w25" @click="opennew('renzhenglist')" v-if="usertype==1">
						<img src="../../static/renzhenga.png" class="navimg"/>
						<span class="navtext">商家认证</span>
					</div>
					<div class="yuea w25" @click="opennew('Bluetooth')">
						<img src="../../static/lanya.png" class="navimg"/>
						<span class="navtext">蓝牙设备</span>
					</div>
				</div>
				<div class="yue2" style="padding: 0;">
					<div class="yuec" @click="opennew('aboutus')">
						<img src="../../static/user01.png"/>
						<div class="yue-text">关于我们</div>
						<img src="../../static/arr02.png"/>
					</div>
					<a class="yuec" href="tel:15252163775">
						<img src="../../static/user02.png"/>
						<div class="yue-text">客服中心</div>
						<img src="../../static/arr02.png"/>
					</a>
          <div class="yuec" @click="kshou">
          	<img src="../../static/user02.png"/>
          	<div class="yue-text">开店流程</div>
          	<img src="../../static/arr02.png"/>
          </div>
					<div class="yuec" @click="opennew('userregister')">
						<img src="../../static/user03.png"/>
						<div class="yue-text">退出登录</div>
						<img src="../../static/arr02.png"/>
					</div>
				</div>
			</div>
			<div id="bottom" v-if="usertype==1">
				<div class="bottom-tab" @click="opennew('index')">
					<img src="../../static/index.png"/>
					<span>首页</span>
				</div>
				<div class="bottom-tab " @click="opennew('orderlist')">
					<img src="../../static/order.png"/>
					<span>订单</span>
				</div>
				<div class="bottom-tab active">
					<img src="../../static/user-active.png"/>
					<span>我的</span>
				</div>
			</div>
      <div class="yindao" v-if="tishi!=1">
        <h6>温馨提醒</h6>
        <ul>
          <li>1.您需要商家认证中认证信息,等待后台审核。</li>
          <li>2.您需要店铺管理中添加店铺</li>
          <li>3.您需要分类管理中添加店铺分类</li>
          <li>4.您需要商品管理中添加店铺商品</li>
          <li>5.您需要运费设置中添加店铺运费</li>
        </ul>
        <div class="btn" @click="know">我知道啦</div>
      </div>
		</div>
	</div>
</template>

<script>
	import echarts from 'echarts'
	export default {
		name: 'wallet',
		data() {
			return {
				mydata: [],
				usertype:localStorage.getItem('usertype'),
        tishi:localStorage.getItem('tishi')
			}
		},
		mounted() {
			this.myajax()
		},
		methods: {
      kshou:function(){
        this.tishi=null
      },
      know:function(){
        localStorage.setItem('tishi',1)
        this.tishi=1
      },
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			},
			back: function() {
				this.$router.back()
			},
			myajax: function() {
				var that = this
				$.ajax({
					type: "post",
					url: that.myurl + "/selectMyWalletStatistics",
					dataType: 'json',
					data: {
						usTraderId: localStorage.getItem('userid')
					},
					success: function(res) {
						that.mydata = res.data
					}
				})
			}
		},
		computed: {
			myurl() {
				return this.$store.state.myurl
			}
		}
	}
</script>

<style type="text/css" lang="scss" scoped="scoped">
  .yindao{
    background: rgba(0,0,0,.8);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    flex-direction: column;
    color: #FFFFFF;
    font-weight: 600;
    li{
      padding: .2rem .4rem;
      font-size: .28rem;
      line-height: .32rem;
    }
    h6{
      font-size: .4rem;
      margin-bottom: .5rem
    }
    .btn{
      border: 2px solid #FFFFFF;
      border-radius: .1rem;
      padding: .1rem .2rem;
      margin-top: .8rem
    }
  }
	.usercenter{
		.yue{overflow: hidden!important;}
		.yuec{display: flex;align-items: center;height: .84rem;width: 100%;font-size: .25rem;font-weight: 600;border-bottom: 1px solid ghostwhite;

    img{
			width: .32rem;margin: 0 .25rem 0 .22rem;
		}
		.yue-text{
			flex: 1;
		}}
		.yue2{
			display: flex;
			margin: .2rem;
			border-radius: .1rem;
			background: #FFFFFF;
			align-items: center;
			flex-wrap: wrap;
			padding: .25rem 0;
			.yuea{
				width: 50%;
				display: flex;flex-direction: column;align-items: center;justify-content: center;
				&:first-of-type{border-right: 1px solid gainsboro;box-sizing: border-box;}

			}
			.xiaozi{font-weight: 600;font-size: .35rem;margin-top: .2rem;}
			.dazi{font-size: .2rem;color: #999999;}
		}
		.navimg{height: .62rem;margin: .4rem 0 .2rem 0;}
		.w25{width: 25%!important;border: 0!important;font-size: .24rem;font-weight: 600;margin-bottom: .2rem;}
	}
</style>
