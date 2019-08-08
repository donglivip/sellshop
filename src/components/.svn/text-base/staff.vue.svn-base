<template>
	<div id="wrapper" class="vipcenter">
		<t-head></t-head>
		<div id="main">
			<div class="input-box">
				<input type="text" v-model="phone" placeholder="请输入要查询的员工手机号" />
				<div class="img-box" @click="myajax('search')">
					<img src="../../static/search.png" />
				</div>
			</div>
			<div class="vip-group" @click="staffdetail(val.usTraderEmployeeId,val.usTeCardId,val.usTeDetailed,val)" v-for="val in mydata">
				<img src="../../static/sho.png" class="avatar" />
				<div class="vip-inform">
					<div class="phone">
						{{val.usTeName}}
					</div>
					<div class="time-group">
						<div class="discount">
							{{val.usTpName}}
						</div>
						<div class="time">
							{{val.usTeCreateTimeString}}
						</div>
					</div>
				</div>
				<div class="delete-box" @click.stop="godelete(val.usTraderEmployeeId,val)">
					<img src="../../static/deright.png" />
				</div>
			</div>
		</div>
		<transition name='alert'>
			<alert v-show='alertshow' @alertboo='alertboo' @alerttrue='alerttrue'></alert>
		</transition>
		<div class="add" @click="staffdetail('','','','')">
			<img src="../../static/add.png" />
		</div>
	</div>
</template>

<script>
	export default {
		name: 'vipcenter',
		data() {
			return {
				phone: '',
				alertshow: false,
				mydata: '',
				usTraderEmployeeId: '',
				usTraderStoresId: ''
			}
		},
		mounted() {
			this.$store.state.head = '员工管理'
			this.myajax()
		},
		methods: {
			staffdetail: function(usTraderEmployeeId, usTeCardId, usTeDetailed,val) {
				this.$store.state.usTraderEmployeeId = usTraderEmployeeId
				this.$store.state.usTeCardId = usTeCardId
				this.$store.state.usTeDetailed = usTeDetailed
				if(val!=''){
					this.$store.state.area=val.usTeProvince+val.usTeCity+val.usTeArea
				}
				this.opennew('staffdetail')
			},
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			},
			alertboo: function() {
				this.alertshow = !this.alertshow
			},
			alerttrue: function() {
				var that = this
				$.ajax({
					type: "post",
					url: that.myurl + "/deleteTraderEmployee",
					dataType: 'json',
					data: {
						usTraderEmployeeId: that.usTraderEmployeeId
					},
					success: function(res) {
						console.log(res)
						if(res.data == 0) {
							alert('删除失败')
						} else if(res.data == 1) {
							alert('删除完成')
						} else {
							alert('您没有权限删除该用户')
						}
					}
				});
				this.alertboo()
			},
			godelete: function(usTraderEmployeeId, usTraderStoresId) {
				console.log(usTraderStoresId)
				this.usTraderEmployeeId = usTraderEmployeeId
				this.usTraderStoresId = usTraderStoresId
				this.$store.state.alerttext = '确定删除此员工吗？'
				this.alertboo()
			},
			myajax: function(type) {
				var that = this
				if(type == 'search') {
					var ajaxjson = {
						usTraderId: localStorage.getItem('userid'),
						usTePhone: that.phone
					}
				} else {
					var ajaxjson = {
						usTraderId: localStorage.getItem('userid')
					}
				}
				$.ajax({
					type: "post",
					url: that.myurl + "/selectUsTraderEmployeeAll",
					dataType: 'json',
					data: ajaxjson,
					success: function(res) {
						console.log(res)
						that.mydata = res.data
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
			alert: resolve => require(['./alert'], resolve)
		}
	}
</script>

<style type="text/css" lang="scss">
	.vipcenter {
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
		.input-box {
			background: white;
			width: 100%;
			height: .8rem;
			display: flex;
			input {
				border: 0;
				flex: 1;
				text-indent: .15rem;
			}
			.img-box {
				border-left: 1px solid #EFEFF0;
				display: flex;
				align-items: center;
				justify-content: center;
				width: .8rem;
				height: .8rem;
				img {
					height: 50%;
				}
			}
		}
		.vip-group {
			background: white;
			display: flex;
			height: 1.8rem;
			margin:.2rem;
			border-radius: .1rem;
			position: relative;
			align-items: center;
			.delete-box {
				position: absolute;
				top: -.05rem;
				right: -.05rem;
				img {
					height: .42rem;
				}
			}
			.avatar {
				width: 1rem;
				height: 1rem;
				border-radius: 50%;
				margin: 0 .25rem;
			}
			.vip-inform {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
			.time-group {
				display: flex;
				justify-content: space-between;
				margin-right: .15rem;
			}
			.phone {
				font-weight: 600;
				margin-bottom: .4rem;
			}
			.discount {
				color: #FF8190;
				font-weight: 600;
			}
		}
	}
</style>