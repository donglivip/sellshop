<template>
	<div id="wrapper" class="vipcenter">
		<t-head></t-head>
		<div id="main">
			<!--<div class="input-box">
    			<input type="number" v-model="phone" placeholder="请输入要查询的会员手机号"/>
    			<div class="img-box">
    				<img src="../../static/search.png"/>
    			</div>
    		</div>-->
			<div class="vip-group" @click="opennew('vipdetail',val.usMemberId,val.usTraderMemberCardId)" v-for="val in list">
				<img src="../../static/driver_icon.jpg" class="avatar" />
				<div class="vip-inform">
					<div class="phone">
						{{val.usPhone}}
					</div>
					<div class="time-group">
						<div class="discount">
							{{val.usTmcLevel}}
						</div>
						<div class="time">
							{{val.usMeLimitTimeString}}
						</div>
					</div>
				</div>
			</div>
			<div style="line-height: .9rem;text-align: center;" v-if="mydata.endRow/pageSize>pageNum" @click="more">点击加载更多~</div>
			<div style="line-height: .9rem;text-align: center;" v-if="mydata.endRow/pageSize<=pageNum">人家也是有底线的</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'vipcenter',
		data() {
			return {
				phone: '',
				pageNum:1,
				pageSize:10,
				mydata:'',
				list:[]
			}
		},
		mounted() {
			this.$store.state.head = '会员管理'
			this.myajax()
		},
		methods: {
			more:function(){
				this.pageNum++
				this.myajax()
			},
			opennew: function(target,usMemberId,usTraderMemberCardId) {
				this.$store.state.usMemberId=usMemberId
				this.$store.state.usTraderMemberCardId=usTraderMemberCardId
				this.$router.push({
					name: target
				})
			},
			myajax:function(res){
				var that=this
				$.ajax({
					type:"post",
					url:that.myurl+"/selectTraderMember",
					dataType:'json',
					data:{
						usTraderId:localStorage.getItem('userid'),
						pageNum:that.pageNum,
						pageSize:that.pageSize
					},
					success:function(res){
						that.mydata=res.data
						for (var i=0;i<res.data.list.length;i++) {
							that.list.push(res.data.list[i])
						}
						console.log(that.list)
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
			THead: resolve => require(['./head'], resolve)
		}
	}
</script>

<style type="text/css" lang="scss">
	.vipcenter {
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
			padding: .25rem 0;
			margin: .1rem .15rem;
			border-radius: .1rem;
			height: 1.3rem;
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
			}
			.discount {
				color: #FF8190;
				font-weight: 600;
			}
		}
	}
</style>