<template>
	<div id="wrapper" class="shop02">
		<t-head></t-head>
		<div id="main">
			<div class="group" v-for="(val,index) in mydata" @click="openshoping(val.usTraderStoresId)">
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
						经营范围:
					</div>
					<div class="text">
						{{val.maMsName}}
					</div>
				</div>
				<div class="inform">
					<div class="title">
						店铺地址:
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

					</div>
				</div>
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
				sid:'',
				sidnex:''
			}
		},
		mounted() {
			this.$store.state.head = '选择店铺'
			this.myajax()
		},
		methods: {
			openshoping:function(usTraderStoresId){
				localStorage.setItem('usTraderStoresId',usTraderStoresId)
				this.opennew('shoplist')
			},
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			},
			godelete: function(usTraderStoresId,index) {
				this.sid=usTraderStoresId
				this.sidnex=index
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
						that.mydata.splice(that.sidnex,1)
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

<style type="text/css" lang="scss">
	.shop02{
		.add {
			position: absolute;
			bottom: .3rem;
			right: .3rem;
			width: .7rem;
			height: .7rem;
			border-radius: 50%;
			background: #FFC408;
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
			margin: .1rem .16rem;
			overflow: hidden;
			.shop-name {
				display: flex;
				align-items: center;
				padding:.2rem 0;
				img {
					width: .62rem;
					height: .62rem;
					margin: 0 .2rem;
					border-radius: .08rem;
				}
				.name {
					flex: 1;
				}
				.state {
					color: #FFC408;
					margin-right: .2rem;
				}
			}
			.inform {
				display: flex;
				align-items: center;
				height: .6rem;
				.title {
					width: 1.5rem;
					margin-left: .3rem;
				}
				.text {
					color: #272727;
					flex: 1;
					font-size: .28rem;
					font-weight: 600;
				}
			}
			.shop-setting {
				height: .8rem;
				background: white;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.time {
					margin-left: .3rem;
				}
				.delete-box {
					display: flex;
					align-items: center;
				}
				.delete {
					margin-right: .2rem;
					background: #FFC408;
					color: white;
					padding: .1rem .2rem;
					border-radius: .1rem;
				}
			}
		}
	}
</style>
