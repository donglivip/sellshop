<template>
	<div id="wrapper" class="withdrawals">
		<t-head></t-head>
		<div id="main">
			<input type="tel" v-model="phone" placeholder="请输入充值金额" @input="inputblur"/>
			<div class="mysubmit">
				<span @click="apay()">支付宝</span>
				<span @click="wpay()">微信</span>
			</div>
		</div>
		<transition name='bottom-enter-active'>
			<bottom-nav v-show='bottomboo' @bottomshow="btnshow"></bottom-nav>
		</transition>

	</div>
</template>

<script>
	export default {
		name: 'withdrawals',
		data() {
			return {
				bottomboo: false,
				mtype: '',
				phone: '',
				channel: ''
			}
		},
		mounted() {
			this.$store.state.head = '充值'
			var that = this

			function plusReady() {
				// 获取支付通道
				plus.payment.getChannels(function(channels) {
					that.channel = channels;
				}, function(e) {
					alert("获取支付通道失败：" + e.message);
				});
			}
			if(window.plus) {
				plusReady();
			} else {
				document.addEventListener('plusready', plusReady, false);
			}
		},
		methods: {
			inputblur:function(){
				this.phone=this.phone.replace(/[^\d\.]/g,'')
			},
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			},
			btnshow: function() {
				this.bottomboo = !this.bottomboo
			},
			apay: function() {
				var that = this
				$.ajax({
					type: "post",
					url: that.myurl + "/usTraderAlipayRecharge",
					dataType: 'json',
					data: {
						usTispPrice: that.phone,
						usTraderId: localStorage.getItem('userid'),
						usTsCreateName: localStorage.getItem('username'),
						usTispPayStatus:1
					},
					success: function(res) {
						plus.payment.request(that.channel[0], res.data[0], function(result) {
							plus.nativeUI.alert("支付成功！", function() {});
						}, function(error) {
							alert('支付失败：'+JSON.stringify(error))
						});
					}
				});
			},
			wpay: function() {
				var that = this
				$.ajax({
					type: "post",
					url: that.myurl + "/usTraderAlipayRecharge",
					dataType: 'json',
					data: {
						usTispPrice: that.phone,
						usTraderId: localStorage.getItem('userid'),
						usTsCreateName: localStorage.getItem('username'),
						usTispPayStatus:2
					},
					success: function(res) {
						plus.payment.request(that.channel[1], res, function(result) {
							plus.nativeUI.alert("支付成功！", function() {});
						}, function(error) {
							alert('支付失败：'+JSON.stringify(error))
						});
					}
				});
			}
		},
		computed: {
			myurl() {
				return this.$store.state.myurl
			}
		},
		components: {
			THead: resolve => require(['./head'], resolve),
			BottomNav: resolve => require(['./bottomnav'], resolve)
		}
	}
</script>

<style type="text/css" lang="scss" scoped="scoped">
	.withdrawals {
		span{
			flex: 1;
			height: .5rem;
			text-align: center;
			line-height: .5rem;
		}
		span:first-of-type{
			border-right: 1px solid #FFFFFF;
		}
		.top {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: .2rem;
			font-size: .3rem;
			.condition {
				color: rgb(280, 80, 60);
				font-size: .2rem;
			}
		}
		input {
			width: calc(100% - .4rem);
			margin: .1rem .2rem;
			background: white;
			border-radius: .08rem;
			text-indent: .15rem;
			border: 0;
			height: .8rem;
		}
		.bottom {
			font-size: .2rem;
			margin-top: .1rem;
			text-indent: .1rem;
		}
		.mysubmit {
			display: flex;
			align-items: center;
			width: calc(100% - .4rem);
			border-radius: .1rem;
			background: #FF8190;
			color: white;
			border-radius: .1rem;
			justify-content: center;
			height: .8rem;
			position: absolute;
			bottom: .2rem;
			left: .2rem;
		}
	}
</style>