<template>
	<div class="login" id="wrapper">
		<t-head></t-head>
		<div id="main" class="addshop">
			<form action="">
				<p>可添加1张商品照片</p>
				<div class="input-group" @click="upload('usTsImgUrl')" style="margin-bottom: .2rem;border: 0;">
					<img src="../../static/addrating.png" class="upimg" id="usTsImgUrl" />
					<input type="hidden" placeholder="商品图片" data-alert='商品图片不能为空' id="hidd"/>
				</div>
				<div class="input-group" style="margin-bottom: .2rem;border: 0;flex-direction: column;align-items: flex-start;">
					<div>商品详情</div>
					<textarea v-model="usTsDetails" placeholder="新鲜土豆，重约1kg，特价优惠"></textarea>
				</div>
				<div class="input-group" v-if="usTraderShoppingId==''">
					<input type="text" placeholder="商品名称" v-model="usTsName" data-alert='商品名称不能为空' />
				</div>
				<div class="input-group">
					<input type="number" placeholder="商品价格" v-model="usTsPrice" data-alert='商品价格不能为空' />
				</div>
				<div class="input-group" v-if="usTraderShoppingId==''">
					<input type="text" placeholder="商品规格 例:大份,小份" v-model="usTsNorm" data-alert='商品规格不能为空' />
				</div>
				<div class="input-group">
					<input type="number" placeholder="商品库存" v-model="usTsStock" data-alert='商品库存不能为空' />
				</div>
				<div class="input-group">
					<div style="flex: 1;color: #333333;font-size: .2rem;">请选择一级分类</div>
					<select name="" v-model="usTraderShoppingSort">
						<option :value="val.usTraderShoppingSortId" v-for="(val,index) in mynav">{{val.usTssResult}}</option>
					</select>
				</div>
				<div class="input-group" v-if="usTraderShoppingId==''">
					<div style="flex: 1;color: #333333;font-size: .2rem;">请选择商品库存单位</div>
					<select name="" v-model="maStockUnitId">
						<option :value="val.maStockUnitId" v-for="(val,index) in mynav01">{{val.maSuName}}</option>
					</select>
				</div>
				<div class="input-group">
					<input type="text" placeholder="包装费" v-model="usTsPackingFee" data-alert='包装费不能为空,没有请输入0' />
				</div>
				<input type="button" name="mysubmit" id="mysubmit" value="提交" @click="gosubmit" style="color: #FFFFFF;" />
			</form>
			<transition name='alert'>
				<alert v-show='alertboo' @alertboo="alertchange" @alerttrue="alertchange"></alert>
			</transition>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'shopdetail',
		data() {
			return {
				usTsName: '',
				usTsPrice: '',
				usTsNorm: '',
				usTsStock: '',
				usTraderShoppingSort: '',
				maStockUnitId: '',
				usTsImgUrl: '',
				usTsDetails: '',
				mynav: '',
				mynav01: '',
				mynav02: '',
				alertboo: false,
				myusTraderShoppingSort: '',
				usTsPackingFee: ''
			}
		},
		mounted() {
			var that = this
			if(that.usTraderShoppingId == '') {
				this.$store.state.head = '添加商品'
			} else {
				this.$store.state.head = '编辑商品'
				this.usTsPrice = this.usTmcPrice
				this.usTsStock = this.usTmcLevel
				this.usTsDetails = this.usRiDetailed
			}

			this.myajax()
		},
		methods: {
			myajax: function() {
				var that = this
				$.ajax({
					type: "post",
					url: that.myurl + "/selectUsTraderShoppingSort",
					dataType: 'json',
					data: {
						usTraderStoresId: localStorage.getItem('usTraderStoresId')
					},
					success: function(res) {
						that.mynav = res.data
					}
				});
				$.ajax({
					type: "post",
					url: that.myurl + "/selectMaStockUnit",
					dataType: 'json',
					success: function(res) {
						that.mynav01 = res.data
					}
				});
			},
			alertchange: function() {
				this.alertboo = !this.alertboo
			},
			opennew: function(target) {
				this.$router.push({
					name: target
				});
			},
			gosubmit: function() {
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
				var myusTsFacadeImg = $('#hidd').val()
				console.log(myusTsFacadeImg)
				if(that.usTraderShoppingId == '') {
					for(var i = 0; i < $('input').length; i++) {
						if($('input').eq(i).val() == '') {
							function plusReady() {
								// 弹出系统等待对话框
								plus.nativeUI.closeWaiting()
							}
							if(window.plus) {
								plusReady();
							} else {
								document.addEventListener("plusready", plusReady, false);
							}
							if(that.usTrLicenseStatus == 1) {
								if($('input').eq(i).attr('data-alert') != '营业执照有效期不能为空') {
									alert($('input').eq(i).attr('data-alert'))
									return false;
								}
							} else {
								alert($('input').eq(i).attr('data-alert'))
								return false;
							}
						}
					}
					var ajaxjson = {
						usTraderStoresId: localStorage.getItem('usTraderStoresId'),
						usTraderShoppingSort: that.usTraderShoppingSort,
						usTsName: that.usTsName,
						usTsPrice: that.usTsPrice,
						usTsNorm: that.usTsNorm,
						usTsStock: that.usTsStock,
						maStockUnitId: that.maStockUnitId,
						usTsImgUrl: myusTsFacadeImg,
						usTsDetails: that.usTsDetails,
						usTsCreateName: localStorage.getItem('userid'),
						usTsStatus: 1,
						usTsPackingFee: that.usTsPackingFee
					}
					$.ajax({
						type: "post",
						url: that.myurl + "/insertUsTraderShopping",
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
							if(res.data == 1) {
								that.$router.back()
							} else {
								alert('添加失败')
							}
						}
					});
				} else {
					var ajaxjson = {
						usTraderShoppingId: that.usTraderShoppingId,
						usTsPrice: that.usTsPrice,
						usStoresEmployeeName: localStorage.getItem('userid'),
						usTsStock: that.usTsStock,
						usTsDetails: that.usTsDetails,
						usTsPackingFee: that.usTsPackingFee,
						usTsImgUrl: myusTsFacadeImg,
						usTraderShoppingSort: that.usTraderShoppingSort
					}
					if(that.usTsPrice==''){
						delete ajaxjson.usTsPrice
					}
					if(that.usTsStock==''){
						delete ajaxjson.usTsStock
					}
					if(that.usTsDetails==''){
						delete ajaxjson.usTsDetails
					}
					if(that.usTsPackingFee==''){
						delete ajaxjson.usTsPackingFee
					}
					if(myusTsFacadeImg==''){
						delete ajaxjson.usTsImgUrl
					}
					if(that.usTraderShoppingSort==''){
						delete ajaxjson.usTraderShoppingSort
					}
					console.log(JSON.stringify(ajaxjson))
					$.ajax({
						type: "post",
						url: that.myurl + "/updateUsTraderShopping",
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
							if(res.data == 1) {
								that.$router.back()
							} else {
								alert('失败')
							}
						}
					});
				}

			},
			upload: function(target) {
				var that = this
				that.files = []
				that.uploadtarget = target
				var btnArray = [{
					title: "照相机"
				}, {
					title: "相册"
				}]; //选择按钮  1 2 3
				plus.nativeUI.actionSheet({
					title: "请选择",
					cancel: "取消",
					buttons: btnArray
				}, function(e) {
					var index = e.index;
					switch(index) {
						case 1:
							that.camera();
							break;
						case 2:
							that.album();
							break;
					}
				});
			},
			camera: function() {
				var that = this
				var cmr = plus.camera.getCamera();
				cmr.captureImage(function(p) {
					//成功
					plus.io.resolveLocalFileSystemURL(p, function(entry) {
						var img_name = entry.name;
						var img_path = entry.toLocalURL();
						document.getElementById(that.uploadtarget).setAttribute('src', img_path)
						that.upload_img(img_path);
					}, function(e) {
						alert("读取拍照文件错误：" + e.message);
					});

				}, function(e) {
					alert("失败：" + e.message);
				}, {
					filename: '_doc/camera/',
					index: 1
				});
			},
			album: function() {
				var that = this
				plus.gallery.pick(function(path) {
					document.getElementById(that.uploadtarget).setAttribute('src', path)
					that.upload_img(path);
				}, function(e) {
					alert("取消选择图片");
				}, {
					filter: "image"
				});
			},
			upload_img: function(p) {
				var thats = this
				var img = new Image();
				img.src = p; // 传过来的图片路径在这里用。
				img.onload = function() {
					var that = this;
					//生成比例 
					var w = that.width,
						h = that.height,
						scale = w / h;
					w = 280 || w; //480  你想压缩到多大，改这里
					h = w / scale;
					//生成canvas
					var canvas = document.createElement('canvas');
					var ctx = canvas.getContext('2d');
					$(canvas).attr({
						width: w,
						height: h
					});
					ctx.drawImage(that, 0, 0, w, h);
					$.ajax({
						type: "post",
						url: thats.myurl + '/imageRiderImageUsTraderStores',
						dataType: 'json',
						data: {
							imgStr: canvas.toDataURL('image/jpeg', 1 || 0.8)
						},
						success: function(res) {
							$('#hidd').val(res.data)
							console.log("res: " + JSON.stringify(res));
						}
					});
				}
			}
		},
		computed: {
			myurl() {
				return this.$store.state.myurl
			},
			usTraderStoresId() {
				return this.$store.state.usTraderStoresId
			},
			usTraderShoppingId() {
				return this.$store.state.usTraderShoppingId
			},
			usTmcPrice() {
				return this.$store.state.usTmcPrice
			},
			usTmcLevel() {
				return this.$store.state.usTmcLevel
			},
			usRiDetailed() {
				return this.$store.state.usRiDetailed
			}
		},
		components: {
			alert: resolve => require(['./alert'], resolve),
			THead: resolve => require(['./head'], resolve)
		}
	}
</script>

<style type="text/css" lang="scss" scoped="scoped">
	.login .head img {
		height: .3rem;
	}
	p{color: #FF8190;padding: .2rem;}
	.login select {
		border: 0;
		width: 2rem;
		height: .5rem;
	}
	textarea{
		background: #F7F7F9;border: 1px solid #DEDEDE;border-radius: .1rem;width: 6.8rem;height: 1rem;box-sizing: border-box;padding: .2rem;
	}
	.login .logo {
		width: 1.5rem;
		height: 1.5rem;
		margin: 1rem auto .7rem;
		display: block;
	}
	
	.login .input-group {
		border-bottom: 1px solid ghostwhite;
		display: flex;
		align-items: center;
		padding: .2rem;
		background: #FFFFFF;
	}
	
	.login .input-group img {
		width: .35rem;
		margin: 0 .1rem;
	}
	
	.login .input-group input {
		margin: 0;
		padding: 0;
		border: 0;
		flex: 1;
		height: .6rem;
		font-size: .2rem;
		color: #666666;
	}
	
	.login #mysubmit {
		width: 6rem;
		height: .92rem;
		color: #FFFFFF!important;
		background: #FF8190;
		display: flex;
		align-items: center;
		justify-content: center;
		display: block;
		border: 0;
		padding: 0;
		margin: .3rem auto;
		border-radius: .1rem;
	}
	
	.login .input-group span {
		flex: 1;
		text-align: right;
		/*color: #FFFFFF;*/
	}
	
	.login .main {
		overflow: hidden;
		color: white;
	}
	
	.login h1 {
		margin: .2rem;
		font-size: .23rem;
		display: block;
		font-weight: 400;
	}
	
	.login .group02 {
		background: white;
		margin: 0;
		padding: .1rem 0;
	}
	
	.register .input-group {
		background: white;
		padding: .1rem;
		border: 0;
	}
	
	.register .registergp div {
		width: .3rem;
		height: .3rem;
		border-radius: 50%;
		border: 1px solid gray;
		margin: 0 .1rem;
	}
	
	.register .registergp img {
		width: .3rem;
		height: .3rem;
	}
	
	.login {
		position: relative;
		color: white;
	}
	
	.login video {
		position: fixed;
		height: 100%;
		top: 0;
		left: 0;
	}
	
	.login form {
		position: relative;
		z-index: 3;
	}
	
	.login input {
		background: none;
	}
	
	.login input::-webkit-input-placeholder {
		color: gainsboro;
	}
	.login input::input-placeholder {
		color: gainsboro;
	}
	.login .upimg {
		width: 1.4rem!important;
	}
	
	.login label {
		font-size: .2rem;
	}
	
	.title01 {
		flex: 1;
		color: #333333;
		font-size: .2rem;
	}
	
	input[type='radio'] {
		flex: none!important;
		margin: 0 .2rem!important;
	}
	
	input[type=radio] {
		display: inline-block;
		vertical-align: middle;
		width: .4rem;
		height: .4rem!important;
		-webkit-appearance: none;
		background-color: transparent;
		border: 0;
		outline: 0 !important;
		line-height: 20px;
		color: #d8d8d8;
		align-items: center;
		justify-content: center;
	}
	
	input[type=file] {
		opacity: 0;
	}
	
	input[type=radio]:after {
		content: '';
		display: block;
		width: .4rem;
		height: .4rem;
		border-radius: 50%;
		text-align: center;
		color: #fff;
		border: 1px solid #ddd;
		background-color: #fff;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	input[type=radio]:checked:after {
		content: "⚪";
		display: block;
		margin: 0 auto;
		border-color: #FF8190;
		background-color: #FF8190;
		width: .4rem;
		height: .4rem;
	}
	
	.addshop input {
		color: #333333!important;
	}
	
	.addshop input::-webkit-input-placeholder {
		color: #333333!important;
	}
</style>