<template>
	<div id="wrapper" class="shop">
		<t-head></t-head>
		<div id="main">
			<div class="group" v-for="(val,index) in shopdata">
				<div class="inform" style="width: 100%;">
					<div class="title" style="flex: 1;">
						{{val.usTssResult}}<br /><span>{{val.count}}个商品</span>
					</div>
					<div class="btn" @click="openshoping(val.usTraderShoppingSortId,val.usTssResult)">
						编辑
					</div>
					<div class="btn" @click="opennew('shopdetail')">
						新建商品
					</div>
					<!--<img src="../../static/delet.png" style="width: .4rem;margin-right: .2rem;" @click.stop="godelete(val.usTraderShoppingSortId,index)"/>-->
				</div>
			</div>
			<transition name='alert'>
				<alert v-show='alertshow' @alertboo='alertboo' @alerttrue='alerttrue'></alert>
			</transition>
			<div class="add" @click="openshoping('','')">
				<img src="../../static/add.png" />
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'shop',
		data() {
			return {
				alertshow: false,
				shopdata: [],
				sid: '',
				sidnex: ''
			}
		},
		mounted() {
			this.$store.state.head = '分类列表'
			this.myajax()
		},
		methods: {
			openshoping: function(usTraderStoresId,usTssResult) {
				localStorage.setItem('usTraderShoppingSortId',usTraderStoresId)
				localStorage.setItem('usTssResult',usTssResult)
				this.opennew('addnav')
			},
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			},
			godelete: function(usTraderStoresId,index) {
				this.sid = usTraderStoresId
				this.sidnex = index
				this.$store.state.alerttext = '是否删除店铺分类'
				this.alertboo()
			},
			alertboo: function() {
				this.alertshow = !this.alertshow
			},
			alerttrue: function() {
				var that = this
				$.ajax({
					type: "post",
					url: that.myurl03 + "/deleteUsTraderShoppingSort",
					data: {
						usTraderShoppingSortId: that.sid
					},
					dataType: 'json',
					success: function(res) {
						console.log(res)
						that.shopdata.splice(that.sidnex, 1)
					}
				});
				this.alertboo()
			},
			myajax: function() {
				var that = this
				$.ajax({
					type: "post",
					url: that.myurl03 + "/selectUsTraderShoppingSort",
					dataType: 'json',
					data: {
						usTraderStoresId: that.usTraderStoresId
					},
					success: function(res) {
						that.shopdata = res.data
					}
				});
			}
		},
		computed: {
			myurl03() {
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
		.btn{
			border: 1px solid #FF8190;color: #FF8190;padding: .1rem .2rem;border-radius: .05rem;margin-right: .2rem;
		}
		.group {
			background: white;
			overflow: hidden;
			height: 1.2rem;
			border-bottom: 1px dashed #CCCCCC;
			align-items: center;
			display: flex;
			.inform {
				display: flex;
				align-items: center;
				height: .6rem;
				.title {
					width: 1.3rem;
					font-weight: 600;
					margin-left: .3rem;
					span{
						font-size: .2rem;color: #D8D8D8;
					}
				}
				.text {
					color: #666666;
					flex: 1;
				}
			}

		}
	}
</style>
