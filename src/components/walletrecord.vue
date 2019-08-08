<template>
	<div id="wrapper" class="walletrecord">
		<t-head></t-head>
		<div id="main">
			<div class="nav">
				<div class="nav-tab" :class="swiperidnex==0?'active':''" @click="swiperto(0)">
					<span>支出</span>
				</div>
				<div class="nav-tab" :class="swiperidnex==1?'active':''" @click="swiperto(1)">
					<span>收入</span>
				</div>
			</div>
			<swiper :options="swiperOption" ref="mySwiper" class='swiper-no-swiping'>
				<swiper-slide>
					<div class="group" v-for="val in mydata" v-if="val.usTsStatus==2">
						<div class="price">
							-{{val.usTsPrice}}
						</div>
						<div class="name">
							<!--{{val.usTsDetails}}-->
						</div>
						<div class="time">
							{{val.usTsCreateTimeString}}
						</div>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div class="group" v-for="val in mydata" v-if="val.usTsStatus==1">
						<div class="name">
							<span>{{val.usTsDetails}}</span>
							<span>{{val.usTsCreateTimeString}}</span>
						</div>
						<div class="price">
							+{{val.usTsPrice}}
						</div>
					</div>
				</swiper-slide>
			</swiper>
		</div>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		name: 'walletrecord',
		data() {
			return {
				swiperOption: {},
				swiperidnex: 0,
				mydata:[]
			}
		},
		mounted() {
			this.$store.state.head = '提现/支出记录'
			this.myajax()
		},
		methods: {
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			},
			swiperto: function(index) {
				this.swiperidnex = index
				this.swiper.slideTo(index, 1000, false)
			},
			myajax:function(){
				var that=this
				$.ajax({
					type:"post",
					url:that.myurl+"/selectUsTraderIncomeSpending",
					dataType:'json',
					data:{
						usTraderId:localStorage.getItem('userid')
					},
					success:function(res){
						console.log(res)
						that.mydata=res.data
					}
				});
			}
		},
		computed: {
			myurl() {
				return this.$store.state.myurl
			},
			swiper() {
				return this.$refs.mySwiper.swiper;
			}
		},
		components: {
			swiper,
			swiperSlide,
			THead: resolve => require(['./head'], resolve)
		}
	}
</script>

<style type="text/css" lang="scss">
	.walletrecord {
		.swiper-container {
			height: calc(100% - .8rem);
			margin-top: .1rem;
		}
		.nav {
			background: white;
			height: .7rem;
			display: flex;
			.nav-tab {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: .25rem;
				box-sizing: border-box;
				&.active {
					span{
						width: .72rem;
						border-bottom: 2px solid #FF8190;
						height: .7rem;
						line-height: .7rem;text-align: center;
					}
					
				}
			}
		}
		.group{
			display: flex;
			height: 1.2rem;
			padding: 0 .2rem;
			align-items: center;
			border-bottom: 1px solid #EFEFF0;
			background:#FFFFFF;
			border-radius: .1rem;margin-bottom: .22rem;
			.name{
				margin-right: .5rem;display: flex;flex-direction: column;width: 5.5rem;font-size: .32rem;font-weight: 600;
				span{white-space: nowrap;overflow: hidden;margin: .04rem;&:last-of-type{font-size: .24rem;color: #929292;font-weight: 200;}}
			}
			.price{
				font-size: .36rem;
				font-weight: 600;
			}
		}
	}
</style>