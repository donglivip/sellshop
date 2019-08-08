<template>
	<div id="wrapper" class="addstart">
		<t-head></t-head>
		<div id="main">
			<input type="number" placeholder="请输入红包金额" v-model="myusTpPrice" />
			<input type="number" placeholder="红包使用限制金额" v-model="myusTpLimitPrice" />
			<input type="number" placeholder="限购数量" v-model="myusTpLimitNum" />
			<input type="text" placeholder="请输入红包到期时间" readonly="readonly" v-model="time" @click="timeshow" />
			<div class="box">
				<div class="group" :class="index==myindex?'active':''" @click="tab(myindex,val.usTraderStoresId)" v-for="(val,myindex) in navdata">
					{{val.usTsCompanyName}}
				</div>
			</div>
			<div class="submit" @click="submit">
				提交
			</div>
		</div>
		<calendar @change="handelChange" v-model='calendarShow'></calendar>
	</div>
</template>
<script>
	export default {
		name: 'addstart',
		data() {
			return {
				index: 0,
				two: false,
				calendarShow: false,
				time: '',
				bottomshow: false,
				navdata: '',
				myusTraderStoresId: '',
				myusTpLimitNum: '',
				usTpIsStores: '',
				myusTpPrice: '',
				myusTpLimitPrice: ''
			}
		},
		mounted() {
			if(this.usTpLimitNum == '') {
				this.$store.state.head = '添加红包'
			} else {
				this.$store.state.head = '编辑红包'
				this.myusTpPrice = this.usTpPrice
				this.myusTpLimitNum = this.usTpLimitNum
				this.myusTpLimitPrice = this.usTpLimitPrice
			}

			this.myajax()
		},
		methods: {
			bottomchange: function(id) {
				this.bottomshow = !this.bottomshow
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
				if(that.time == '' || that.myusTpPrice == '' || that.myusTpPrice == 0) {
					alert('请输入正确的参数')
					return false;
				}
				if(this.myusTraderStoresId == 0) {
					this.usTpIsStores = 0
				} else {
					this.usTpIsStores = 1
				}
				that.time = that.time.replace(/-/g, "/");
				if(this.usTpLimitNum == '') {
					var ajaxJson = {
						usTraderId: localStorage.getItem('userid'),
						usTraderStoresId: that.myusTraderStoresId,
						usTpLimitPrice: that.myusTpLimitPrice,
						usTpPrice: that.myusTpPrice,
						usTpAbortTime: new Date(that.time),
						usTpIsStores: that.usTpIsStores,
						usTpLimitNum: that.myusTpLimitNum
					}
					$.ajax({
						type: "post",
						url: that.myurl + "/insertUsTraderPackage",
						dataType: 'json',
						data: ajaxJson,
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
					var ajaxJson = {
						usTraderId: localStorage.getItem('userid'),
						usTraderStoresId: that.myusTraderStoresId,
						usTpLimitPrice: that.myusTpLimitPrice,
						usTpPrice: that.myusTpPrice,
						usTpAbortTime: new Date(that.time),
						usTpLimitNum: that.myusTpLimitNum,
						usTpStatus: 1,
						usTraderPackageId: that.usTraderPackageId
					}
					$.ajax({
						type: "post",
						url: that.myurl + "/updateUsTraderPackage",
						dataType: 'json',
						data: ajaxJson,
						success: function(res) {
							if(res.data == 1) {
								alert('编辑完成')
							} else {
								alert('编辑失败')
							}
						}
					});
				}
			},
			change: function(id) {
				this.two = id
			},
			handelChange: function(date, formatDate) {
				this.time = formatDate
			},
			timeshow: function() {
				this.calendarShow = !this.calendarShow
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
						console.log(res)
						that.navdata = res.data
					}
				});
			}
		},
		computed: {
			myurl() {
				return this.$store.state.myurl
			},
			usTpPrice() {
				return this.$store.state.usTpPrice
			},
			usTpLimitPrice() {
				return this.$store.state.usTpLimitPrice
			},
			usTpLimitNum() {
				return this.$store.state.usTpLimitNum
			},
			usTraderPackageId() {
				return this.$store.state.usTraderPackageId
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
			height: calc(100% - 6rem);
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
			position: absolute;
			bottom: .2rem;
			left: .2rem;
		}
	}
</style>