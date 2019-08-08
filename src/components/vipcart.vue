<template>
	<div id="wrapper" class="vipvart">
		<t-head></t-head>
		<alert v-show='alertboo' @alertboo='alertshow' @alerttrue='alerttrue'></alert>
		<div id="main">
			<div class="group" v-for="(val,index) in mydata" @click="addvipcart(val.usTraderMemberCardId,val.usTmcLevel,val.usTmcPrice,val.usTmcDiscount,val.usTmcLevelNumber,val.usTmcLimit)" style="position: relative;">
				<img src="../../static/2.png" style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;">
				<div class="top">
					<span style="flex: 1;">{{val.usTmcLevel}}({{val.usTraderStoresId==null?'全部门店':val.usTraderStoresId}})</span>
					<img src="../../static/delete.png" @click.stop="vipdelete(val.usTraderMemberCardId,index)"/>
				</div>
				<div class="img-box">
					
				</div>
				<div class="inform">
					<div class="count" @click.stop="upTmcStatus(val.usTraderMemberCardId,val.usTmcStatus,index)">
						{{val.usTmcStatus==1?'下架':'上架'}}
					</div>
				</div>
			</div>
			<div class="add" @click.stop="addvipcart('','','','')">
    			<img src="../../static/add.png"/>
    		</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'vipcart',
		data() {
			return {
				alertboo:false,
				mydata:''
			}
		},
		mounted() {
			this.$store.state.head = '会员卡管理'
			this.$store.state.alerttext = '确定删除会员卡吗？'
			this.myajax()
		},
		methods: {
			addvipcart:function(usTraderMemberCardId,usTmcLevel,usTmcPrice,usTmcDiscount,usTmcLevelNumber,mytime){
				this.$store.state.usTraderMemberCardId=usTraderMemberCardId
				this.$store.state.usTmcLevel=usTmcLevel
				this.$store.state.usTmcPrice=usTmcPrice
				this.$store.state.usTmcDiscount=usTmcDiscount
				this.$store.state.usTmcLevelNumber=usTmcLevelNumber
				this.$store.state.mytime=mytime
				this.opennew('addvipcart')
			},
			upTmcStatus:function(usTraderMemberCardId,id,index){
				var that=this
				var usTmcStatus
				if(id==0){
					usTmcStatus=1
				}else{
					usTmcStatus=0
				}
				$.ajax({
					type:"post",
					url:that.myurl02+"/updateUsTraderMemberCard",
					dataType:'json',
					data:{
						usTraderMemberCardId:usTraderMemberCardId,
						usTmcStatus:usTmcStatus,
						usTmcUpdateName:localStorage.getItem('username')
					},
					success:function(res){
						console.log(res)
						if(res.data==1){
							if(id==0){
								that.mydata[index].usTmcStatus=1
							}else{
								that.mydata[index].usTmcStatus=0
							}
							
						}
					}
				});
			},
			myajax:function(){
				var that=this
				$.ajax({
					type:"post",
					url:that.myurl02+"/selectUsTraderMemberCardAll",
					dataType:'json',
					data:{
						usTraderId:localStorage.getItem('userid')
					},
					success:function(res){
						console.log(res)
						that.mydata=res.data
					}
				});
			},
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			},
			vipdelete:function(id,index){
				var that=this
				$.ajax({
					type:"post",
					url:that.myurl02+"/deleteUsTraderMemberCard",
					dataType:'json',
					data:{
						usTraderMemberCardId:id,
						usTmcUpdateName:localStorage.getItem('username')
					},
					success:function(res){
						if(res.data==1){
							that.mydata.splice(index,1)
						}else{
							alert('删除失败，请稍后再试！')
						}
					}
				});
			},
			alertshow:function(){
				this.alertboo=!this.alertboo
			},
			alerttrue:function(){
				this.alertshow()
			}
		},
		computed: {
			myurl02() {
				return this.$store.state.myurl02
			}
		},
		components: {
			THead: resolve => require(['./head'], resolve),
			Alert: resolve => require(['./alert'], resolve)
		}
	}
</script>

<style type="text/css" lang="scss" scoped="scoped">
	.vipvart{
		.add{
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
			img{
				width: .4rem;
				height: .4rem;
			}
		}
		.group{
			border-radius: .1rem;
			width: calc(100% - .4rem);
			margin: .15rem .2rem;
			box-shadow: 0 0 .1rem 1px gainsboro;
			.img-box{
				height: 1.5rem;
				margin: .2rem;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				position: relative;
				z-index: 999;
				.count{
					color: #F5B669;
					font-size: .8rem;
					font-weight: 600;
					background: #FFFFFF;
					border-radius: .1rem;
				}
			}
			img{
				height: 100%;
			}
			.top{
				height: .7rem;
				text-indent: .2rem;
				font-size: .3rem;
				line-height: .5rem;
				font-weight: 600;
				display: flex;
				align-items: center;
				justify-content: space-between;
				position: relative;
				z-index: 999;
				color: #FFFFFF;
				img{
					height: .3rem;
					margin-right: .2rem;
				}
			}
			.inform{
				display: flex;
				align-items: center;
				justify-content: flex-end;
				height: .5rem;
				margin: 0 .15rem;
				position: relative;
				z-index: 999;
				color: #FFFFFF;
				.count{
					color: #F5B669;
					font-size: .2rem;
					font-weight: 600;
					background: #FFFFFF;
					border-radius: .05rem;
					padding: 5px .2rem;
					margin-bottom: .2rem;
				}
			}
		}
	}
</style>