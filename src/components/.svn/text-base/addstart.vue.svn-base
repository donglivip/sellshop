<template>
	<div id="wrapper" class="addstart">
		<t-head></t-head>
		<div id="main">
			<input type="number" placeholder="请输入配送费" v-model="mymaDiPrice"/>
			<p>骑手最低配送费为5元，如果运费不足5元，差价将由商家补贴！运费最高为5元！</p>
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
				mymaDiPrice:'',
				myusTrName:localStorage.getItem('username')
			}
		},
		mounted() {
			if(this.maDistributionId==''){
				this.$store.state.head = '添加起送规则'
			}else{
				this.$store.state.head = '添加起送规则'
				this.mymaDiPrice=this.maDiPrice
				this.myusTrName=this.usTrName
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
				if(that.mymaDiPrice==''||that.mymaDiPrice>5){
					alert('运费区间为0~5元之间')
					return
				}
				if(this.maDistributionId==''){
					$.ajax({
						type:"post",
						url:that.myurl+"/insertFreight",
						dataType:'json',
						data:{
							usTraderId:localStorage.getItem('userid'),
							maDiPrice:that.mymaDiPrice,
							myusTrName:that.myusTrName,
							maDiAppoint:2
						},
						success:function(res){
							if(res.data == 1) {
								plus.nativeUI.toast('添加成功')
								that.$router.back()
							} else {
								plus.nativeUI.toast('添加失败')
							}
						}
					});
				}else{
					$.ajax({
						type:"post",
						url:that.myurl+"/updateFreight",
						dataType:'json',
						data:{
							maDistributionId:that.maDistributionId,
							usTraderId:localStorage.getItem('userid'),
							maDiPrice:that.mymaDiPrice,
							myusTrName:that.myusTrName
						},
						success:function(res){
							if(res.data == 1) {
								plus.nativeUI.toast('编辑成功')
								that.$router.back()
							} else {
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
			maDistributionId() {
				return this.$store.state.maDistributionId
			},
			maDiPrice() {
				return this.$store.state.maDiPrice
			},
			usTrName() {
				return this.$store.state.usTrName
			}
		},
		components: {
			THead: resolve => require(['./head'], resolve)
		}
	}
</script>
<style type="text/css" lang="scss">
	.addstart {
		p{
			margin: 0 .2rem;font-weight: 600;font-size: .22rem;line-height: .4rem;
		}
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