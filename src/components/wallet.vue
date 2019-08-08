<template>
	<div class="wapper packet" id="wrapper">
		<div id="head">
			<span @click="back">
    		<img src="../../static/backwhite.png"/></span>
			<div>
				我的钱包
			</div>
			<span></span>
		</div>
<!-- 		<div class="setting" @click="opennew('walletsetting')">
			<img src="../../static/setting.png" />
		</div> -->
		<div class="main" id="main">
			<div class="yue">
				<div class="yue1">
					<span class="money">{{mydata.usTwPrice}}</span>
					<span>总余额</span>
				</div>
				<div class="yue2">
					<div class="yuea">
						<span class="dazi">{{mydata.todayPrice}}</span>
						<span class="xiaozi">本日收入</span>
					</div>
					<div class="yuea	">
						<span class="dazi">{{mydata.thisMonthPrice}}</span>
						<span class="xiaozi">本月收入</span>
					</div>
					<div class="yueb">
						<span class="dazi">{{mydata.lastMonthPrice}}</span>
						<span class="xiaozi">上月收入</span>
					</div>
				</div>
			</div>
			<div class="shouzhi" @click="opennew('walletrecord')">
				<div class="record">
					<span>收支记录</span>
					<img src="../../static/jian_03.png">
				</div>
			</div>
			<div class="chart-box">
				<div id="myChart"></div>
			</div>
			<div class="submit-box">
				<div class="rechange" @click="opennew('withdrawals02')">充值</div>
				<div class="rechange" @click="opennew('withdrawals')">提现</div>
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
				});
				$.ajax({
					type: "post",
					url: that.myurl + "/selectMyWalletStatisticsColumnarGraph",
					dataType: 'json',
					data: {
						usTraderId: localStorage.getItem('userid')
					},
					success: function(res) {
						console.log(res)
						let myChart = echarts.init(document.getElementById('myChart'))
						myChart.setOption({
							tooltip: {
								trigger: 'axis',
								axisPointer: { // 坐标轴指示器，坐标轴触发有效
									type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
								}
							},
							legend: {
								data: ['本月金额', '上月金额', '本日金额']
							},
							xAxis: [{
								type: 'category',
								data: res.data.listStoresName
							}],
							yAxis: [{
								type: 'value'
							}],
							dataZoom: [{
									show: true,
									start: 80,
									end: 100
								},
								{
									type: 'inside',
									start: 80,
									end: 100
								}
							],
							series: [{
									name: '本月金额',
									type: 'bar',
									data: res.data.listThisMonthPrice,
									itemStyle: {
										normal: {
											color: '#FF8190'
										}
									}
								},
								{
									name: '上月金额',
									type: 'bar',
									data: res.data.listlastMonthPrice,
									itemStyle: {
										normal: {
											color: 'yellow'
										}
									}
								},{
									name: '本日金额',
									type: 'bar',
									data: res.data.listTodayPrice,
									itemStyle: {
										normal: {
											color: 'yellow'
										}
									}
								}
							]
						})
					}
				});
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
	.packet {
		#head {
			background: #FF8190;
			color: #FFFFFF;
			border: 0;
		}
	}
	
	.packet .setting {
		position: absolute;
		top: .22rem;
		right: .2rem;
		z-index: 66;
		img {
			width: .35rem;
		}
	}
	
	#myChart {
		width: calc(100% - .4rem);
		height: 6rem;
		background: white;
		margin: 0 .2rem;
	}
	
	.chart-box {
		width: calc(100% - .4rem);
		height: 6rem;
		background: white;
		margin: .2rem;
		overflow-y: scroll;
	}
	
	html,
	body,
	.wapper,
	.main {
		padding: 0px;
		margin: 0px;
		font-size: .2rem;
		height: 100%;
	}
	
	.packet {
		background: rgb(239, 239, 240);
	}
	
	.packet .bg {
		width: 100%;
		height: 3.5rem;
	}
	
	.packet .yue {
		background: #FFFFFF;
		margin-bottom: .2rem;
	}
	
	.packet .xiaozi {
		color: rgb(161, 161, 161);
	}
	
	.packet .dazi {
		font-size: .3rem;
		margin-bottom: .1rem;
	}
	
	.packet .yue1 {
		height: 2.6rem;
		background: #FF8190;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: #FFFFFF;
	}
	.money{
		font-size: .8rem;
		margin-bottom: .2rem;
	}
	.packet .yue2 {
		display: flex;
		justify-content: space-between;
		height: 1.5rem;
	}
	
	.packet .yuea,
	.yueb {
		display: flex;
		align-items: center;
		flex: 1;
		justify-content: center;
		flex-direction: column;
	}
	
	.packet .yuea {
		border-right: 1px solid rgb(248, 248, 248);
	}
	
	.packet .shouzhi {
		background: #FFFFFF;
		overflow: hidden;
	}
	
	.packet .record {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: .9rem;
		margin: 0 .25rem;
	}
	
	.packet .record img {
		height: .25rem;
	}
	
	.packet .rechange {
		background: #FF8190;
		flex: 1;
		height: .7rem;
		justify-content: center;
		display: flex;
		align-items: center;
		color: #FFFFFF;
	}
	
	.packet .rechange:first-of-type {
		border-right: 1px solid #FFFFFF;
	}
	
	.packet .submit-box {
		position: absolute;
		bottom: .2rem;
		width: calc(100% - .4rem);
		left: .2rem;
		border-radius: .1rem;
		overflow: hidden;
		display: flex;
	}
</style>