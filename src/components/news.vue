<template>
	<div class="wapper usercenter" id="wrapper">
		<t-head></t-head>
		<div class="main" id="main" style="overflow: hidden;">
			<div class="yue" style="height: calc(100% - 1rem);">
				<div class="yue2" >
					<div class="yuec">
						<img src="../../static/new.png"/>
						<div class="yue-text">
							<div class="yue-top">
								<span>您的评价有新回复！</span>
								<span>11-22 12:23</span>
							</div>
							<div class="yueottom">
								您在勒夫的井冈山杀虫剂是的订单评价有新回您在勒夫的井冈山杀虫剂是的订单评价有新回您在勒夫的井冈山杀虫剂是的订单评价有新回
							</div>
						</div>
					</div>
				</div>
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
				mydata: []
			}
		},
		mounted() {
			this.$store.state.head='通知消息'
			this.myajax()
		},
		methods: {
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
				// 查询消息
				$.ajax({
					type: "post",
					url: that.myurl + "/selectMerchantInformation",
					dataType: 'json',
					data: {
						cuserId: localStorage.getItem('usTraderStoresId')
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
		},
		  components:{
		  	THead:resolve => require(['./head'],resolve),
		  }
	}
</script>

<style type="text/css" lang="scss" scoped="scoped">
	.usercenter{
		.yueottom{
			color: #999999;line-height: .3rem;
			height: .6rem;margin-top: .14rem;overflow: hidden;
		}
		.yue-top{
			margin-top: .28rem;display:flex;justify-content: space-between;padding-right:.2rem;
			span:first-of-type{
				font-size: .3rem;font-weight: 600;
			}
		}
		.yuec{display: flex;font-size: .25rem;width: 100%;
		img{
			margin: .28rem .25rem 0 .22rem;height: .34rem;
		}
		.yue-text{
			flex: 1;
		}}
		.yue2{
			display: flex;
			margin-top: .22rem;
			background: #FFFFFF;
			align-items: center;
			flex-wrap: wrap;
			padding-bottom: .25rem;
		}
	}
</style>