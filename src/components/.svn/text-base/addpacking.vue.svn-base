<template>
	<div id="wrapper" class="addstart">
		<t-head></t-head>
		<div id="main">
			<input type="number" placeholder="请输入打包费" v-model="myusPfPrice"/>
			<div class="submit" @click="submit">
				提交
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'addstart',
		data() {
			return {
				index: 0,
				myusPfPrice:'',
				myusTraderName:localStorage.getItem('username')
			}
		},
		mounted() {
			if(this.usPackingFeeId==''){
				this.$store.state.head = '添加包装费用规则'
			}else{
				this.$store.state.head = '编辑包装费用规则'
				this.myusPfPrice=this.usPfPrice
				this.myusTraderName=this.usTraderName
			}
		},
		methods: {
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			},
			tab: function(index) {
				this.index = index
			},
			submit:function(){
				var that=this
				if(this.usPackingFeeId==''){
					$.ajax({
						type:"post",
						url:that.myurl+"/insertPack",
						dataType:'json',
						data:{
							usPfPrice:that.myusPfPrice,
							usTrName:that.myusTraderName,
							usTraderId:localStorage.getItem('userid')
						},
						success:function(res){
							if(res.data==1){
								plus.nativeUI.toast('添加完成')
								that.$router.back()
							}else{
								plus.nativeUI.toast('添加失败')
							}
						}
					});
				}else{
					$.ajax({
						type:"post",
						url:that.myurl+"/upadtePack",
						dataType:'json',
						data:{
							usPfPrice:that.myusPfPrice,
							usTrName:that.myusTraderName,
							usPackingFeeId:that.usPackingFeeId
						},
						success:function(res){
							if(res.data==1){
								plus.nativeUI.toast('编辑完成')
								that.$router.back()
							}else{
								plus.nativeUI.toast('编辑失败')
							}
						}
					});
				}
			}
		},
		computed: {
			myurl() {
				return this.$store.state.myurl
			},
			usPackingFeeId() {
				return this.$store.state.usPackingFeeId
			},
			usPfPrice() {
				return this.$store.state.usPfPrice
			},
			usTraderName() {
				return this.$store.state.usTraderName
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
		.box {
			width: calc(100% - .4rem);
			border: 0;
			background: white;
			height: calc(100% - 2.5rem);
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
			margin: .2rem auto .4rem;
		}
	}
</style>