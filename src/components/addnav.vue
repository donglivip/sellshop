<template>
	<div id="wrapper" class="shop">
		<t-head></t-head>
		<div id="main">
			<input type="text" placeholder="请输入分类名称" style="width:100%;height: .8rem;background: #FFFFFF;text-indent: .2rem;margin-top: .2rem;" v-model="usTssResult"/>
			<transition name='alert'>
				<alert v-show='alertshow' @alertboo='alertboo' @alerttrue='alerttrue'></alert>
			</transition>
		</div>
		<div class="bottom" style="height: .8rem;display: flex;align-items: center;justify-content: center;" @click="myajax">
			确认
		</div>
	</div>
</template>

<script>
	export default {
		name: 'addnav',
		data() {
			return {
				alertshow: false,
				shopdata: [],
				sid: '',
				usTssResult: ''
			}
		},
		mounted() {
			if(localStorage.getItem('usTraderShoppingSortId')==''){
				this.$store.state.head = '添加分类'
			}else{
				this.$store.state.head = '编辑分类'
				this.usTssResult = localStorage.getItem('usTssResult')
			}
		},
		methods: {
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
				function plusReady() {
					// 弹出系统等待对话框
					plus.nativeUI.showWaiting('添加中')
				}
				if(window.plus) {
					plusReady();
				} else {
					document.addEventListener("plusready", plusReady, false);
				}
				if(localStorage.getItem('usTraderShoppingSortId')==''){
					var ajaxjson={
							usTraderStoresId:that.usTraderStoresId,
							usTssResult:that.usTssResult,
							usTssCreateName:localStorage.getItem('usRiName')
						}
					$.ajax({
						type: "post",
						url: that.myurl03 + "/insertUsTraderShoppingSort",
						dataType: 'json',
						data: ajaxjson,
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
							if(res.data==1){
								plus.nativeUI.toast('添加成功！')
								that.back()
							}else{
								plus.nativeUI.toast('添加失败！')
							}
						}
					});
				}else{
					var ajaxjson={
							usTraderShoppingSortId: localStorage.getItem('usTraderShoppingSortId'),
							usTssResult:that.usTssResult,
							updateName:localStorage.getItem('usRiName')
						}
					$.ajax({
						type: "post",
						url: that.myurl03 + "/updateUsTraderShoppingSort",
						dataType: 'json',
						data: ajaxjson,
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
							if(res.data==1){
								plus.nativeUI.toast('修改成功！')
								that.back()
							}
						}
					});
				}
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
		.bottom{
			position: fixed;
			bottom: .4rem;
			left: .74rem;
			background: #FF8190;
			color: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 6rem;
			border-radius:.1rem ;
		}
	}
</style>