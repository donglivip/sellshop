<template>
	<div id="wrapper" class="addstart">
		<t-head></t-head>
		<div id="main">
			<input type="number" placeholder="请输入满足金额(元)" v-model="usTsFullPrice" />
			<input type="number" placeholder="请输入减去金额(元)" v-model="usTsSubtractPrice" />
			<input type="text" placeholder="请输入满减到期时间" readonly="readonly" v-model="time" @click="timeshow" />
			<div class="box">
				<div class="group" :class="index==myindex?'active':''" @click="tab(myindex,val.usTraderStoresId)" v-for="(val,myindex) in navdata">
					{{val.usTsCompanyName}}
				</div>
			</div>
			<div class="submit" @click="submit">
				提交
			</div>
		</div>
		<calendar @change="handelChange" v-model='calendarShow' ref='Calendar'></calendar>
	</div>
</template>
<script>
	export default {
		name: 'addstart',
		data() {
			return {
				calendarShow: false,
				index:0,
				two: false,
				navdata: '',
				mytype: '',
				usTpIsStores: '',
				usTsFullPrice: '',
				usTsSubtractPrice: '',
				myusTraderStoresId: '',
				time:''
			}
		},
		mounted() {
			if(this.money01 == '') {
				this.$store.state.head = '添加满减活动'
				this.mytype = 0
			} else {
				this.$store.state.head = '编辑满减活动'
				this.mytype = 1
				this.usTsFullPrice = this.money01
				this.usTsSubtractPrice = this.money02
				this.$refs.Calendar.ChoseMonth(this.$store.state.mytime)
				this.time = this.$store.state.mytime
			}

			this.myajax()
		},
		methods: {
			timeshow: function() {
				this.calendarShow = !this.calendarShow
			},
			handelChange: function(date, formatDate) {
				this.time = formatDate
			},
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			},
			tab: function(index, id) {
				this.myusTraderStoresId = id
				this.index = index
			},
			submit: function() {
				function plusReady() {
					// 弹出系统等待对话框
					plus.nativeUI.showWaiting()
				}
				if(window.plus) {
					plusReady();
				} else {
					document.addEventListener("plusready", plusReady, false);
				}
				var that = this
				if(this.usTsFullPrice == '' || this.usTsSubtractPrice == '' || this.usTsFullPrice == 0 || this.usTsSubtractPrice == 0) {
					alert('请输入正确的金额')
					return false;
				}
				if(this.mytype == 0) {
					if(this.usTraderStoresId == 0) {
						this.usTpIsStores = 0
					} else {
						this.usTpIsStores = 1
					}
					$.ajax({
						type: "post",
						url: that.myurl + "/insertUsTraderSubtract",
						data: {
							usTraderId: localStorage.getItem('userid'),
							usTsFullPrice: that.usTsFullPrice,
							usTsSubtractPrice: that.usTsSubtractPrice,
							usTpIsStores: that.usTpIsStores,
							usTraderStoresId: that.myusTraderStoresId,
							time:that.time
						},
						dataType: 'json',
						success: function(res) {
							function plusReady() {
								// 弹出系统等待对话框
								plus.nativeUI.closeWaiting()
							}
							if(window.plus) {
								plusReady();
							} else {
								document.addEventListener("plusready", plusReady, false);
							}
							if(res.data == 1) {
								plus.nativeUI.toast('添加完成')
								that.$router.back()
							} else {
								plus.nativeUI.toast('添加失败')
							}
						}
					});
				} else {
					if(this.usTraderStoresId == 0) {
						this.usTpIsStores = 0
					} else {
						this.usTpIsStores = 1
					}
					$.ajax({
						type: "post",
						url: that.myurl + "/updateUsTraderSubtract",
						data: {
							usTsFullPrice: that.usTsFullPrice,
							usTsSubtractPrice: that.usTsSubtractPrice,
							usTraderSubtractId: that.usTraderSubtractId,
							usTraderId: localStorage.getItem('userid'),
							usTraderStoresId: that.myusTraderStoresId,
							time:that.time
						},
						dataType: 'json',
						success: function(res) {
							if(res.data == 1) {
								plus.nativeUI.toast('编辑完成')
								that.$router.back()
							} else {
								plus.nativeUI.toast('编辑失败')
							}
						}
					});
				}
			},
			change: function(id) {
				this.two = id
			},
			myajax: function() {
				var that = this
				$.ajax({
					type: "post",
					url: that.myurl + "/selectUsTraderStores",
					data: {
						usTraderId: localStorage.getItem('userid')
					},
					dataType: 'json',
					success: function(res) {
						that.navdata = res.data
						that.tab(0,res.data[0].usTraderStoresId)
					}
				});
			}
		},
		computed: {
			myurl() {
				return this.$store.state.myurl
			},
			money01() {
				return this.$store.state.money01
			},
			money02() {
				return this.$store.state.money02
			},
			usTraderSubtractId() {
				return this.$store.state.usTraderSubtractId
			},
			usTraderStoresId() {
				return this.$store.state.usTraderStoresId
			}
		},
		components: {
			THead: resolve => require(['./head'], resolve)
		}
	}
</script>
<style type="text/css" lang="scss">
	.addstart {
		input {
			width: calc(100% - .4rem);
			margin: .2rem auto;
			border: 0;
			background: white;
			border-radius: .1rem;
			display: block;
			height: .7rem;
			text-indent: .15rem;
		}
		.input-box {
			@extend input;
			display: flex;
			align-items: center;
			justify-content: space-around;
			.group {
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.circle {
				width: .3rem;
				height: .3rem;
				border-radius: 50%;
				border: 1px solid gainsboro;
			}
			.active {
				border: .1rem solid #FF8190;
				box-sizing: border-box;
			}
		}
		.box {
			width: calc(100% - .4rem);
			border: 0;
			background: white;
			height: calc(100% - 4rem);
			margin: 0 auto;
			border-radius: .1rem;
			overflow-y: scroll;
			overflow-x: hidden;
			.group {
				width: 100%;
				height: .8rem;
				border-bottom: 1px solid #EFEFF0;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.active {
				background: #FF8190;
				color: white;
			}
		}
		.submit {
			width: calc(100% - .4rem);
			border: 0;
			background: #FF8190;
			color: white;
			border-radius: .1rem;
			height: .8rem;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: .2rem auto 0;
		}
	}
</style>