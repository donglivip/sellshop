
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
			<div class="nav">
				<div class="nav-tab" :class="swiperidnex==0?'active':''" @click="swiperto(0)">
					<span>满减活动</span>
				</div>
				<div class="nav-tab" :class="swiperidnex==1?'active':''" @click="swiperto(1)">
					<span>折扣活动</span>
				</div>
				<div class="nav-tab" :class="swiperidnex==2?'active':''" @click="swiperto(2)">
					<span>红包活动</span>
				</div>
				<div class="nav-tab" :class="swiperidnex==3?'active':''" @click="swiperto(3)">
					<span>新人活动</span>
				</div>
			</div>
			<swiper :options="swiperOption" ref="mySwiper" class='swiper-no-swiping'>
				<swiper-slide>
					<div class="freight-group" v-for="(val,index) in mydata" @click="addman(val.usTsFullPrice,val.usTsSubtractPrice,val.usTraderSubtractId,val.usTraderStoresId)">
						<div class="freight-top">
							<div class="price">
								满<span>{{val.usTsFullPrice}}</span>减<span>{{val.usTsSubtractPrice}}</span>
							</div>
							<div class="target">
								{{val.usTraderStoresId==null?'全部门店':val.usTraderStoresId}}
							</div>
						</div>
						<div class="freight-bottom">
							<div class="time">
								{{val.usTsCreateTimeString}}
							</div>
							<div class="setting" @click.stop="layuishow(val.usTraderSubtractId,index,1)">
								删除
							</div>
						</div>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div class="freight-group" v-for="(val,index) in mydata01" @click="addzhe(val.usTraderDiscountId,val.usTdDicsont,val.usTdNum,val.usTdAbortTimeString)">
						<div class="freight-top">
							<div class="price">
								<span>{{val.usTdDicsont/10}}</span>折
							</div>
							<div class="target">
								{{val.usTraderStoresId==null?'全部门店':val.usTraderStoresId}}
							</div>
						</div>
						<div class="freight-bottom">
							<div class="time">
								{{val.usTdAbortTimeString}}
							</div>
							<div class="setting" @click.stop="layuishow(val.usTraderDiscountId,index,2)">
								删除
							</div>
						</div>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div class="freight-group" v-for="(val,index) in mydata02" @click="addhong(val.usTpPrice,val.usTpLimitPrice,val.usTpLimitNum,val.usTraderPackageId)">
						<div class="freight-top">
							<div class="price">
								<span>{{val.usTpPrice}}</span>元
							</div>
							<div class="target">
								{{val.usTraderStoresId==null?'全部门店':val.usTraderStoresId}}
							</div>
						</div>
						<div class="freight-bottom">
							<div class="time">
								满{{val.usTpLimitPrice}}元可用 上限:{{val.usTpLimitNum}}/个
							</div>
							<div class="setting" @click.stop="layuishow(val.usTraderPackageId,index,3)">
								删除
							</div>
						</div>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div class="freight-group" v-for="(val,index) in mydata03" @click="addxin(val.usTraderNewActivitiesId,val.usTnaPrice,val.usTnaDemand,val.usTnaAbortTimeString)">
						<div class="freight-top">
							<div class="price">
								<span>{{val.usTnaPrice}}</span>元
							</div>
							<div class="target">
								{{val.usTraderStoresId==null?'全部门店':val.usTraderStoresId}}
							</div>
						</div>
						<div class="freight-bottom">
							<div class="time">
								{{val.usTnaAbortTimeString}}
							</div>
							<div class="setting" @click.stop="layuishow(val.usTraderNewActivitiesId,index,4)">
								删除
							</div>
						</div>
					</div>
				</swiper-slide>

			</swiper>
			<transition name='packing'>
				<div class="add packing" v-show="addshow" @click="addman('','')">
					满
				</div>
			</transition>
			<transition name='peisong'>
				<div class="add peisong" v-show="addshow" @click="addzhe('','','')">
					折
				</div>
			</transition>
			<transition name='red'>
				<div class="add red" v-show="addshow" @click="addhong('','','','')">
					红
				</div>
			</transition>
			<transition name='red'>
				<div class="add new" v-show="addshow" @click="addxin('','')">
					新
				</div>
			</transition>
			<div class="add" @click.stop="add">
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
				mydata:'',
				usTraderStoresId:'',
				index:'',
				type:'',
				mydata01:'',
				mydata02:'',
				mydata03:''
			}
		},
		mounted() {
			this.$store.state.head = '活动管理'
			this.myajax()
		},
		methods: {
			addxin:function(usTraderNewActivitiesId,usTnaPrice,usTnaDemand,mytime){
				this.$store.state.usTraderNewActivitiesId=usTraderNewActivitiesId
				this.$store.state.usTnaPrice=usTnaPrice
				this.$store.state.usTnaDemand=usTnaDemand
				this.$store.state.mytime=mytime
				this.opennew('addxin')
			},
			addhong:function(usTpPrice,usTpLimitPrice,usTpLimitNum,usTraderPackageId){
				this.$store.state.usTpPrice=usTpPrice
				this.$store.state.usTpLimitPrice=usTpLimitPrice
				this.$store.state.usTpLimitNum=usTpLimitNum
				this.$store.state.usTraderPackageId=usTraderPackageId
				this.opennew('addhong')
			},
			addzhe:function(usTraderDiscountId,usTdDicsont,usTdNum,mytime){
				this.$store.state.usTraderDiscountId=usTraderDiscountId
				this.$store.state.usTdDicsont=usTdDicsont
				this.$store.state.usTdNum=usTdNum
				this.$store.state.mytime=mytime
				this.opennew('addzhe')
			},
			addman:function(money01,money02,usTraderSubtractId,usTraderStoresId){
				this.$store.state.money01=money01
				this.$store.state.money02=money02
				this.$store.state.usTraderSubtractId=usTraderSubtractId
				this.$store.state.usTraderStoresId=usTraderStoresId
				this.opennew('addman')
			},
			myajax: function() {
				var that = this
				$.ajax({
					type: "post",
					url: that.myurl + "/selectUsTraderSubtract",
					data: {
						usTraderId: localStorage.getItem('userid')
					},
					dataType: 'json',
					success: function(res) {
						that.mydata = res.data
					}
				});
				$.ajax({
					type: "post",
					url: that.myurl + "/selectUsTraderDiscount",
					data: {
						usTraderId: localStorage.getItem('userid')
					},
					dataType: 'json',
					success: function(res) {
						that.mydata01 = res.data
					}
				});
				$.ajax({
					type: "post",
					url: that.myurl + "/selectUsTraderPackage",
					data: {
						usTraderId: localStorage.getItem('userid')
					},
					dataType: 'json',
					success: function(res) {
						that.mydata02 = res.data
					}
				});
				$.ajax({
					type: "post",
					url: that.myurl + "/selectUsTraderNewActivities",
					data: {
						usTraderId: localStorage.getItem('userid')
					},
					dataType: 'json',
					success: function(res) {
						console.log(res)
						that.mydata03 = res.data
					}
				});
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
				this.usTraderStoresId=id
				this.index=index
				this.type=type
				this.layuiboo = !this.layuiboo
			},
			layuitrue:function(){
				var that=this
				if(this.type==1){
					$.ajax({
						type: "post",
						url: that.myurl + "/deleteUsTraderSubtract",
						data: {
							usTraderSubtractId: that.usTraderStoresId
						},
						dataType: 'json',
						success: function(res) {
							if(res.data==1){
								that.mydata.splice(that.index,1)
								that.layuiboo = !that.layuiboo
							}else{
								that.layuiboo = !that.layuiboo
								alert('删除失败')
							}
							
						}
					});
				}else if(this.type==2){
					$.ajax({
						type: "post",
						url: that.myurl + "/deleteUsTraderDiscount",
						data: {
							usTraderDiscountId: that.usTraderStoresId
						},
						dataType: 'json',
						success: function(res) {
							if(res.data==1){
								that.mydata01.splice(that.index,1)
								that.layuiboo = !that.layuiboo
							}else{
								that.layuiboo = !that.layuiboo
								alert('删除失败')
							}
							
						}
					});
				}else if(this.type==3){
					$.ajax({
						type: "post",
						url: that.myurl + "/deleteUsTraderPackage",
						data: {
							usTraderPackageId: that.usTraderStoresId
						},
						dataType: 'json',
						success: function(res) {
							if(res.data==1){
								that.mydata02.splice(that.index,1)
								that.layuiboo = !that.layuiboo
							}else{
								that.layuiboo = !that.layuiboo
								alert('删除失败')
							}
							
						}
					});
				}else if(this.type==4){
					$.ajax({
						type: "post",
						url: that.myurl + "/deleteUsTraderNewActivities",
						data: {
							usTraderNewActivitiesId: that.usTraderStoresId
						},
						dataType: 'json',
						success: function(res) {
							if(res.data==1){
								that.mydata03.splice(that.index,1)
								that.layuiboo = !that.layuiboo
							}else{
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
		.red-enter-active,
		.red-leave-active {
			transition: all .3s;
			transform: translate(0, 0);
		}
		.red-enter,
		.red-leave-to {
			transform: translate(-.5rem, -.5rem);
		}
		.packing {
			bottom: 1.8rem!important;
		}
		.peisong {
			right: 1.8rem!important;
		}
		.red {
			bottom: 1.5rem!important;
			right: 1rem!important;
		}
		.new{
			bottom: 1rem!important;
			right: 1.5rem!important;
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
			color: white;
			img {
				width: .35rem;
				height: .35rem;
			}
		}
		.swiper-container {
			height: calc(100% - .8rem);
			margin-top: .1rem;
		}
		.freight-group {
			width: calc(100% - .4rem);
			margin: .1rem auto;
			height: 2rem;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			background: #FFFFFF;
			border-radius: .1rem;
			.freight-top {
				display: flex;
				justify-content: space-between;
				margin:.3rem .2rem;
				align-items: center;
				.price {
					color: #FF8190;
					span {
						font-size: .4rem;
						font-weight: 600;
						margin: 0 .05rem;
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
					border-radius: .05rem;
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
					span{
						border-bottom: 2px solid #FF8190;
						height: .7rem;line-height: .7rem;
					}
					
				}
			}
		}
	}
</style>