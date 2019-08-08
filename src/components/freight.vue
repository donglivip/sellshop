<template>
	<div id="wrapper" class="freight">
		<transition name='alert'>
			<div id="alert" v-show="layuiboo">
				<div id="alert-main">
					<h1>
	  				提示
	  			</h1>
					<p>
						确定删除此条运费吗
					</p>
					<div id="alert-setting">
						<span @click="layuitrue">
	  					确定
	  				</span>
						<span @click="layuishow">
	  					取消
	  				</span>
					</div>
				</div>
			</div>
		</transition>
		<t-head></t-head>
		<div id="main">
<!-- 			<div class="nav">
				<div class="nav-tab" :class="swiperidnex==0?'active':''" @click="swiperto(0)">
					配送规则
				</div>
				<div class="nav-tab" :class="swiperidnex==1?'active':''" @click="swiperto(1)">
					包装费用
				</div>
			</div> -->
			<swiper :options="swiperOption" ref="mySwiper" class='swiper-no-swiping'>
				<swiper-slide>
					<div class="freight-group" v-for="(val,index) in mydata" @click="addstart(val.maDistributionId,val.maDiPrice,val.usTrName)">
						<div class="freight-top">
							<div class="price">
								<span>{{val.maDiPrice}}</span>元
							</div>
							<div class="target">
								全部门店
							</div>
						</div>
						<div class="freight-bottom">
							<div class="time">
								{{val.maDiCreateTimeString}}
							</div>
							<div class="setting" @click.stop="layuishow(val.maDistributionId,index,0)">
								删除
							</div>
						</div>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div class="freight-group" v-for="(val,index) in mydata01" @click="addpacking(val.usPackingFeeId,val.usPfPrice,val.usTraderName)">
						<div class="freight-top">
							<div class="price">
								<span>{{val.usPfPrice}}</span>元
							</div>
							<div class="target">
								全部门店
							</div>
						</div>
						<div class="freight-bottom">
							<div class="time">
								{{val.usPfCreateTimeString}}
							</div>
							<div class="setting" @click.stop="layuishow(val.usPackingFeeId,index,1)">
								删除
							</div>
						</div>
					</div>
				</swiper-slide>
			</swiper>
			<transition name='packing'>
				<!-- <div class="add packing" v-show="addshow" @click="addpacking('','','')" v-if="mydata01.length==0">
					<img src="../../static/packing.png" />
				</div> -->
			</transition>
			<transition name='peisong'>
				<div class="add peisong" v-show="addshow" @click="addstart('','','')" v-if="mydata.length==0">
					<img src="../../static/peisong-no.png" />
				</div>
			</transition>
			<div class="add" @click.stop="addstart('','','')" v-if="mydata01.length==0||mydata.length==0">
				<img src="../../static/add.png" />
			</div>
		</div>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		name: 'freight',
		data() {
			return {
				swiperOption: {},
				swiperidnex: 0,
				addshow: false,
				layuiboo: false,
				mydata: '',
				id: '',
				index: '',
				type:'',
				mydata01:''
			}
		},
		mounted() {
			this.$store.state.head = '运费管理'
			this.myajax()
		},
		methods: {
			addpacking:function(usPackingFeeId,usPfPrice,usTraderName){
				this.$store.state.usPackingFeeId=usPackingFeeId
				this.$store.state.usPfPrice=usPfPrice
				this.$store.state.usTraderName=usTraderName
				this.opennew('addpacking')
			},
			addstart:function(maDistributionId,maDiPrice,usTrName){
				this.$store.state.maDistributionId=maDistributionId
				this.$store.state.maDiPrice=maDiPrice
				this.$store.state.usTrName=usTrName
				this.opennew('addstart')
			},
			myajax: function() {
				var that = this
				$.ajax({
					type: "post",
					url: that.myurl + "/selectFreight",
					dataType: 'json',
					data: {
						usTraderId: localStorage.getItem('userid')
					},
					success: function(res) {
						that.mydata = res.data
					}
				});
				// $.ajax({
				// 	type: "post",
				// 	url: that.myurl + "/selectPack",
				// 	dataType: 'json',
				// 	data: {
				// 		usTraderId: localStorage.getItem('userid')
				// 	},
				// 	success: function(res) {
				// 		that.mydata01 = res.data
				// 	}
				// });
			},
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			},
			swiperto: function(index) {
				this.swiperidnex = index
				this.swiper.slideTo(index, 1000, false)
			},
			add: function() {
				this.addshow = !this.addshow
			},
			layuishow: function(id,index,type) {
				this.id = id
				this.index = index
				this.type=type
				this.layuiboo = !this.layuiboo
			},
			layuitrue: function() {
				var that = this
				if(this.type==0){
					$.ajax({
						type: "post",
						url: that.myurl + "/deleteFreight",
						dataType: 'json',
						data: {
							maDistributionId: that.id
						},
						success: function(res) {
							if(res.data == 1) {
								that.mydata.splice(that.index, 1)
								that.layuiboo = !that.layuiboo
							} else {
								that.layuiboo = !that.layuiboo
								alert('删除失败')
							}
						}
					});
				}else{
					$.ajax({
						type: "post",
						url: that.myurl + "/deletePack",
						dataType: 'json',
						data: {
							usPackingFeeId: that.id
						},
						success: function(res) {
							if(res.data == 1) {
								that.mydata01.splice(that.index, 1)
								that.layuiboo = !that.layuiboo
							} else {
								that.layuiboo = !that.layuiboo
								alert('删除失败')
							}
						}
					});
				}
			}
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper;
			},
			myurl() {
				return this.$store.state.myurl
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
	.freight {
		.packing-enter-active,
		.packing-leave-active {
			transition: all .3s;
			transform: translateY(0);
		}
		.packing-enter,
		.packing-leave-to {
			transform: translateY(-.5rem);
		}
		.peisong-enter-active,
		.peisong-leave-active {
			transition: all .3s;
			transform: translateX(0);
		}
		.peisong-enter,
		.peisong-leave-to {
			transform: translateX(-.5rem);
		}
		.packing {
			bottom: 1.3rem!important;
			right: .2rem!important;
		}
		.peisong {
			right: 1.3rem!important;
			bottom: .5rem!important;
		}
		.add {
			width: .7rem;
			height: .7rem;
			position: absolute;
			background: #FF8190;
			display: flex;
			align-items: center;
			justify-content: center;
			right: .3rem;
			bottom: .3rem;
			z-index: 999;
			border-radius: 50%;
			img {
				width: .35rem;
				height: .35rem;
			}
		}
		#main{
			overflow: hidden
		}
		.swiper-container {
			height: 100%;
			margin-top: .1rem;
		}
		.freight-group {
			height: 2rem;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			border-bottom: 1px solid #EFEFF0;
			background: #FFFFFF;
			margin: .2rem;
			border-radius: .1rem;
			.freight-top {
				display: flex;
				justify-content: space-between;
				margin: .2rem;
				align-items: center;
				.price {
					color: rgb(280, 80, 60);
					span {
						font-size: .4rem;
						font-weight: bold;
					}
				}
			}
			.freight-bottom {
				display: flex;
				justify-content: space-between;
				margin: .2rem;
				align-items: flex-end;
				.setting {
					background: #FF8190;
					color: white;
					width: 1.2rem;
					height: .5rem;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: .1rem;
				}
			}
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
					border-bottom: 2px solid #FF8190;
				}
			}
		}
	}
</style>