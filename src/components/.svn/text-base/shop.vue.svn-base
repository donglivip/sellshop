<template>
	<div id="wrapper" class="shop">
		<t-head></t-head>
		<div id="main">
			<div class="group" v-for="(val,index) in mydata" @click="edshop(val.usTraderStoresId)">
				<div class="shop-name">
					<img src="../../static/sho.png" class="avatar" />
					<div class="name">
						{{val.usTsCompanyName}}
					</div>
					<div class="state">
						<!--{{val.usTsAuditStatus | mystate}}-->
					</div>
				</div>
				<div class="inform">
					<div class="title">
						经营范围
					</div>
					<div class="text">
						{{val.maMsName}}
					</div>
				</div>
				<div class="inform">
					<div class="title">
						店铺地址
					</div>
					<div class="text">
						{{val.storesAddress}}
					</div>
				</div>
				<div class="shop-setting">
					<div class="time">
						{{val.changeUsTsCreateTime}}
					</div>
					<div class="delete-box">
						<div class="delete" @click.stop="openshop(val.usTraderStoresId,val.usToIsOpen,index)">
							{{val.usToIsOpen==0?'休息中':'营业中'}}
						</div>
						<div class="delete" @click.stop="godelete(val.usTraderStoresId,index)">
							删除
						</div>
					</div>
				</div>
			</div>
			<div class="add" @click="opennew('addshop')" v-if="mydata.length==0">
				<img src="../../static/add.png" />
			</div>
			<transition name='alert'>
				<alert v-show='alertshow' @alertboo='alertboo' @alerttrue='alerttrue'></alert>
			</transition>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'shop',
		data() {
			return {
				alertshow: false,
				mydata: '',
				sid: '',
				sidnex: ''
			}
		},
		mounted() {
			this.$store.state.head = '店铺管理'
			this.myajax()
		},
		methods: {
			edshop:function(usTraderStoresId){
				this.$store.state.usTraderStoresId = usTraderStoresId
				this.opennew('addshop02')
			},
			openshop: function(usTraderStoresId, usToIsOpen, index) {
				function plusReady() {
					// 弹出系统等待对话框
					plus.nativeUI.showWaiting('更改中')
				}
				if(window.plus) {
					plusReady();
				} else {
					document.addEventListener("plusready", plusReady, false);
				}
				var that = this
				var myusToIsOpen;
				if(usToIsOpen == 0) {
					myusToIsOpen = 1
				} else {
					myusToIsOpen = 0
				}
				$.ajax({
					type: "post",
					url: that.myurl + "/updateUsTraderOperate",
					dataType: 'json',
					data: {
						usTraderStoresId: usTraderStoresId,
						usToIsOpen: myusToIsOpen,
						usStoresEmployeeName: localStorage.getItem('username')
					},
					success: function(res) {
						that.mydata[index].usToIsOpen=myusToIsOpen
						function plusReady() {
							// 弹出系统等待对话框
							plus.nativeUI.closeWaiting()
						}
						if(window.plus) {
							plusReady();
						} else {
							document.addEventListener("plusready", plusReady, false);
						}
					}
				});
			},
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			},
			godelete: function(usTraderStoresId, index) {
				this.sid = usTraderStoresId
				this.sidnex = index
				this.$store.state.alerttext = '是否删除店铺'
				this.alertboo()
			},
			alertboo: function() {
				this.alertshow = !this.alertshow
			},
			alerttrue: function() {
				var that = this
				$.ajax({
					type: "post",
					url: that.myurl + "/deleteUsTraderStores",
					data: {
						usTraderStoresId: that.sid
					},
					dataType: 'json',
					success: function(res) {
						console.log(res)
						that.mydata.splice(that.sidnex, 1)
					}
				});
				this.alertboo()
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
						that.mydata = res.data
					}
				});
			}
		},
		computed: {
			myurl() {
				return this.$store.state.myurl
			},
			usTraderStoresId() {
				return this.$store.state.usTraderStoresId
			}
		},
		components: {
			THead: resolve => require(['./head'], resolve),
			alert: resolve => require(['./alert'], resolve)
		},
		filters: {
			mystate: function(value) {
				if(value == 1) {
					return '审核成功'
				} else if(value == 2) {
					return '审核中'
				} else {
					return '审核失败'
				}
			}
		}
	}
</script>

<style type="text/css" lang="scss" scoped="scoped">
	.shop {
		.add {
			position: absolute;
			bottom: .3rem;
			right: .3rem;
			width: .7rem;
			height: .7rem;
			border-radius: 50%;
			background: #FF8190;
			display: flex;
			align-items: center;
			justify-content: center;
			img {
				width: .4rem;
				height: .4rem;
			}
		}
		.group {
			width: calc(100% - .4rem);
			border-radius: .1rem;
			background: white;
			margin: .1rem .2rem;
			overflow: hidden;
			.shop-name {
				display: flex;
				align-items: center;
				height: .7rem;
				img {
					width: .4rem;
					height: .4rem;
					margin: 0 .2rem;
				}
				.name {
					flex: 1;
				}
				.state {
					color: #FF8190;
					margin-right: .2rem;
				}
			}
			.inform {
				display: flex;
				align-items: center;
				height: .6rem;
				.title {
					width: 1.5rem;
					font-weight: 600;
					margin-left: .3rem;
				}
				.text {
					color: #666666;
					flex: 1;
				}
			}
			.shop-setting {
				height: .8rem;
				background: white;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.time {
					margin-left: .2rem;
				}
				.delete-box {
					display: flex;
					align-items: center;
				}
				.delete {
					margin-right: .2rem;
					background: #FF8190;
					color: white;
					padding: .1rem .2rem;
					border-radius: .05rem;
				}
			}
		}
	}
</style>
