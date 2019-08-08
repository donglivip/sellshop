<template>
	<div class="login" id="wrapper">
		<t-head></t-head>
		<div id="main" class="addshop">
			<form action="">
				<div class="input-group">
					<input type="text" placeholder="法人姓名" v-model="usTsName" data-alert='商户名字不能为空' />
				</div>
				<div class="input-group">
					<input type="number" placeholder="法人手机号" v-model="usTsPhone" data-alert='商户电话不能为空' />
				</div>
				<div class="input-group">
					<div class="title01">法人性别</div>
					<label for="usTsSex">男</label>
					<input type="radio" name="usTsSex" id="usTsSex" v-model="usTsSex" value="1" checked="" />
					<label for="usTsSex2">女</label>
					<input type="radio" name="usTsSex" id="usTsSex2" v-model="usTsSex" value="2" />
				</div>
				<div class="input-group">
					<input type="text" placeholder="法人身份证号" v-model="usTsCardId" data-alert='法人身份证号不能为空' />
				</div>
				<div class="input-group" style="margin-top: .2rem;">
					<input type="text" placeholder="店铺名称" v-model="usTsCompanyName" data-alert='公司名字不能为空' />
				</div>
				<div class="input-group">
					<div style="flex: 1;color: #333333;font-size: .2rem;">请选择店长</div>
					<select name="" v-model="usTraderEmployeeId">
						<option :value="val.usTraderEmployeeId" v-for="(val,index) in mydata" v-if="val.usTeCardId==0">{{val.usTeName}}</option>
					</select>
				</div>
				<div class="input-group">
					<div style="flex: 1;color: #333333;font-size: .2rem;">请选择店铺经营范围</div>
					<select name="" v-model="maMerchantsStyleId">
						<option :value="val.maMerchantsStyleId" v-for="(val,index) in mynav">{{val.maMsName}}</option>
					</select>
				</div>
				<div class="input-group" @click="citychange" style="margin-top: .2rem;">
					<input type="text" v-model="area" placeholder="法人所在地" readonly="readonly" data-alert='法人所在地不能为空' />
				</div>
				<div class="input-group">
					<input type="text" placeholder="详细地址" v-model="usTsDetailed" data-alert='详细地址不能为空' />
				</div>
				<div class="input-group">
					<input type="text" placeholder="店铺执照注册号" v-model="usTsLicenseCode" data-alert='公司执照注册号不能为空' />
				</div>
				<div class="input-group" @click="citychange01">
					<input type="text" placeholder="营业执照所在地" v-model="area01" readonly="readonly" data-alert='营业执照所在地不能为空' />
				</div>
				<div class="input-group">
					<input type="text" placeholder="营业执照详细地址" v-model="usTsLicenseDetailed" data-alert='营业执照详细地址不能为空' />
				</div>
				<div class="input-group">
					<div class="title01">营业执照状态</div>
					<label for="usTsLicenseStatus">长期有效</label>
					<input type="radio" name="usTsLicenseStatus" id="usTsLicenseStatus" v-model="usTsLicenseStatus" value="1" checked="checked" />
					<label for="usTsLicenseStatus2">短期有效</label>
					<input type="radio" name="usTsLicenseStatus" id="usTsLicenseStatus2" v-model="usTsLicenseStatus" value="2" />
				</div>
				<div class="input-group" @click="timechangee" v-show="usTsLicenseStatus==2">
					<input type="text" placeholder="营业执照有效期" v-model="usTsLicenseTime" readonly="readonly" data-alert='营业执照有效期不能为空' />
				</div>
				<div class="input-group" style="margin-top: .2rem;justify-content: flex-start;">
					上传身份证
				</div>
				<div class="input-group">
					<input type="hidden" placeholder="身份证正面" data-alert='身份证正面不能为空' readonly="" />
					<img src="../../static/zhengmian.png" class="upimg" id="usTsCardBackImgUrl"  @click="upload('usTsCardBackImgUrl')"/>
					<input type="hidden" placeholder="身份证反面" readonly="" data-alert='身份证正面不能为空' />
					<img src="../../static/fanmian.png" class="upimg" id="usTsCardFrontImgUrl"  @click="upload('usTsCardFrontImgUrl')"/>
				</div>
				<div class="input-group" style="margin-top: .2rem;justify-content: flex-start;">
					上传营业照
				</div>
				<div class="input-group">
					<input type="hidden" placeholder="营业照" readonly="" data-alert='营业照不能为空' />
					<img src="../../static/yinye.png" class="upimg" id="usTsLicenseImgUrl"  @click="upload('usTsLicenseImgUrl')"/>
				</div>
        <div class="input-group" style="margin-top: .2rem;justify-content: flex-start;">
        	首页广告展示图
        </div>
				<div class="input-group" @click="upload('usTsBannerImg')" style="flex-direction: column;align-items: flex-start;">
					<input type="hidden" placeholder="首页轮播展示图" readonly="" data-alert='首页轮播展示图不能为空' />
					<img src="../../static/addrating.png" class="upimg" id="usTsBannerImg" />
				</div>
         <div class="input-group" style="margin-top: .2rem;justify-content: flex-start;">
        	店铺显示图片
        </div>
				<div class="input-group" @click="upload('usTsFacadeImg')" style="flex-direction: column;align-items: flex-start;">
					<input type="hidden" placeholder="店铺显示图片" readonly="" data-alert='店铺显示图片不能为空' />
					<img src="../../static/addrating.png" class="upimg" id="usTsFacadeImg" />
				</div>
         <div class="input-group" style="margin-top: .2rem;justify-content: flex-start;">
        	卫生许可证
        </div>
				<div class="input-group" @click="upload('usTsFoodImgUrl')" style="flex-direction: column;align-items: flex-start;">
					<input type="hidden" placeholder="卫生许可证" readonly="" data-alert='卫生许可证不能为空' />
					<img src="../../static/addrating.png" class="upimg" id="usTsFoodImgUrl" />
				</div>
				<div class="input-group">
					<input type="number" placeholder="起送价格" v-model="usTsActionPrice" data-alert='起送价格不能为空' />
				</div>
				<div class="input-group">
					<input type="number" placeholder="配送范围" v-model="usTsScrope" data-alert='开卡行不能为空' />
				</div>
				<input type="button" name="mysubmit" id="mysubmit" value="注册" @click="gosubmit" />
				<div class="input-group" style="border: 0;">
					<span></span>
					<span @click="opennew('login')">
						已有账号，去登陆
					</span>
				</div>
			</form>
			<transition name='fade'>
				<city-picker v-show='cityboo' @citychange="citychange" @alertchange="alertchange"></city-picker>
			</transition>
			<transition name='fade'>
				<city-picke v-show='cityboo01' @citychange="citychange01" @alertchange="alertchange"></city-picke>
			</transition>
			<transition name='alert'>
				<alert v-show='alertboo' @alertboo="alertchange" @alerttrue="alertchange"></alert>
			</transition>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'userregister',
		data() {
			return {
				usTsScrope: '',
				usTsLicenseImgUrl: '',
				usTsLicenseCode: '',
				usTsDetailed: '',
				usTrBankId: '',
				usTsActionPrice: '',
				usTsCardId: '',
				uploadtarget: '',
				files: [],
				cityboo: false,
				cityboo01: false,
				alertboo: false,
				usTsPhone: '',
				usTsName: '',
				usTsSex: '',
				usTsCompanyName: '',
				usTsLicenseDetailed: '',
				usTsLicenseTime: '',
				usTsLicenseStatus: 1,
				usTsLicenseTime: '',
				usTsCardBackImgUrl: '',
				usTsCardFrontImgUrl: '',
				usTsBannerImg: '',
				usTsFacadeImg: '',
				mynav: '',
				maMerchantsStyleId: '',
				mytab: '',
				selectMaPublicLabel: '',
				mydata: '',
				usTraderEmployeeId: '',
        usTsFoodImgUrl:''
			}
		},
		mounted() {
			this.$store.state.head = '添加店铺'
			this.myajax()
		},
		methods: {
			myajax: function() {
				function plusReady() {
					// 弹出系统等待对话框
					plus.nativeUI.showWaiting()
				}
				if(window.plus) {
					plusReady();
				} else {
					document.addEventListener("plusready", plusReady, false);
				}
				var that = this
				$.ajax({
					type: "post",
					url: that.myurl + "/selectMaMerchantsStyle",
					dataType: 'json',
					success: function(res) {
						that.mynav = res.data
					}
				});
				$.ajax({
					type: "post",
					url: that.myurl + "/selectMaPublicLabel",
					dataType: 'json',
					success: function(res) {
						that.mytab = res.data
					}
				});
				$.ajax({
					type: "post",
					url: that.myurl + "/selectUsTraderEmployeeAll",
					dataType: 'json',
					data: {
						usTraderId: localStorage.getItem('userid')
					},
					success: function(res) {
						that.mydata = res.data
					}
				});

				function plusReady() {
					// 弹出系统等待对话框
					plus.nativeUI.closeWaiting()
				}
				if(window.plus) {
					plusReady();
				} else {
					document.addEventListener("plusready", plusReady, false);
				}
			},
			timechangee: function() {
				var that = this
				plus.nativeUI.pickDate(function(e) {
					var d = e.date;
					that.usTsLicenseTime = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
				}, function(e) {
					console.log("未选择日期：" + e.message);
				});
			},
			alertchange: function() {
				this.alertboo = !this.alertboo
			},
			citychange: function() {
				this.cityboo = !this.cityboo
			},
			citychange01: function() {
				this.cityboo01 = !this.cityboo01
			},
			opennew: function(target) {
				this.$router.push({
					name: target
				});
			},
			gosubmit: function() {
				function plusReady() {
					// 弹出系统等待对话框
					plus.nativeUI.showWaiting('添加中')
				}
				if(window.plus) {
					plusReady();
				} else {
					document.addEventListener("plusready", plusReady, false);
				}
				var that = this
				for(var i = 0; i < $('input').length; i++) {
					if($('input').eq(i).val() == '') {
						if(that.usTsLicenseStatus==1){
							if($('input').eq(i).attr('data-alert')!='营业执照有效期不能为空'){
								alert($('input').eq(i).attr('data-alert'))
								function plusReady() {
									// 弹出系统等待对话框
									plus.nativeUI.closeWaiting()
								}
								if(window.plus) {
									plusReady();
								} else {
									document.addEventListener("plusready", plusReady, false);
								}
								return false;
							}
						}else{
							alert($('input').eq(i).attr('data-alert'))
							function plusReady() {
								// 弹出系统等待对话框
								plus.nativeUI.closeWaiting()
							}
							if(window.plus) {
								plusReady();
							} else {
								document.addEventListener("plusready", plusReady, false);
							}
							return false;
						}
					}
				}
				var myusTsCardBackImgUrl = $('#usTsCardBackImgUrl').prev().val()
				var myusTsCardFrontImgUrl = $('#usTsCardFrontImgUrl').prev().val()
				var myusTsLicenseImgUrl = $('#usTsLicenseImgUrl').prev().val()
				var myusTsBannerImg = $('#usTsBannerImg').prev().val()
				var myusTsFacadeImg = $('#usTsFacadeImg').prev().val()
        var usTsFoodImgUrl=$('#usTsFoodImgUrl').prev().val()
				var dataJson = {
					usTsCardFrontImgUrl: myusTsCardFrontImgUrl,
					usTsBannerImg: myusTsBannerImg,
					usTraderId: localStorage.getItem('userid'),
					usTsCreateName: localStorage.getItem('username'),
					usTsScrope: that.usTsScrope,
					usTsName: that.usTsName,
					usTsPhone: that.usTsPhone,
					usTsSex: that.usTsSex,
					usTsCardId: that.usTsCardId,
					usTrCardFrontImgUrl: that.usTrCardFrontImgUrl,
					usTsCardBackImgUrl: myusTsCardBackImgUrl,
					usTsCompanyName: that.usTsCompanyName,
					usTsProvince: that.province,
					usTsCity: that.city,
					usTsArea: that.area,
					usTsDetailed: that.usTsDetailed,
					usTsLicenseCode: that.usTsLicenseCode,
					usTsLicenseProvince: that.province01,
					usTsLicenseCity: that.city01,
					usTsLicenseArea: that.area01,
					usTsLicenseDetailed: that.usTsLicenseDetailed,
					usTsLicenseStatus: that.usTsLicenseStatus,
					usTsLicenseTime: that.usTsLicenseTime,
					usTsLicenseImgUrl: myusTsLicenseImgUrl,
					usTsActionPrice: that.usTsActionPrice,
					usTrBankId: that.usTrBankId,
					usTsFacadeImg: myusTsFacadeImg,
					maMerchantsStyleId: that.maMerchantsStyleId,
					usTraderEmployeeId: that.usTraderEmployeeId,
          usTsFoodImgUrl:usTsFoodImgUrl
				}
				$.ajax({
					type: "post",
					url: that.myurl + "/insertUsTraderStores",
					dataType: 'json',
					data: dataJson,
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
							plus.nativeUI.toast('添加完成')
							that.$router.back()
						} else {
							plus.nativeUI.toast('添加失败')
						}
					}
				});
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
				var thats=this
				var img = new Image();
        plus.nativeUI.showWaiting()
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
							$('#' + thats.uploadtarget + '').prev().val(res.data)
              plus.nativeUI.closeWaiting()
						},
						error:function(err){
							console.log(JSON.stringify(err))
						}
					});
				}
			}
		},
		computed: {
			myurl() {
				return this.$store.state.myurl
			},
			province() {
				return this.$store.state.province
			},
			city() {
				return this.$store.state.city
			},
			area() {
				return this.$store.state.area
			},
			province01() {
				return this.$store.state.province01
			},
			city01() {
				return this.$store.state.city01
			},
			area01() {
				return this.$store.state.area01
			}
		},
		components: {
			cityPicker: resolve => require(['./citypicker'], resolve),
			cityPicke: resolve => require(['./citypicker01'], resolve),
			alert: resolve => require(['./alert'], resolve),
			THead: resolve => require(['./head'], resolve)
		}
	}
</script>

<style type="text/css" lang="scss" scoped="scoped">
	.login .head img {
		height: .3rem;
	}

	.login select {
		border: 0;
		width: 2rem;
		height: .5rem;
	}

	.login .logo {
		width: 1.5rem;
		height: 1.5rem;
		margin: 1rem auto .7rem;
		display: block;
	}

	.login .input-group {
		border-bottom: 1px solid gainsboro;
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding:.2rem .25rem;
		background: #FFFFFF;
	}

	.login .input-group input {
		margin: 0;
		padding: 0;
		border: 0;
		flex: 1;
		height: .6rem;
		font-size: .2rem;
	}



	.login .input-group span {
		flex: 1;
		text-align: right;
		color: #FFFFFF;
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
		color: white;
	}

	.login input::-webkit-input-placeholder {
		color: #333333;
	}

	.login .upimg {
		width: 2rem!important;
		margin: .2rem auto;
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
	.addshop input{
		color: #333333!important;
	}
	.addshop input::-webkit-input-placeholder{
		color: #333333!important;
	}
	.login #mysubmit {
		width: 6rem;
		height: 1rem;
		color: #FFFFFF!important;
		background: #FF8190;
		display: flex;
		align-items: center;
		justify-content: center;
		display: block;
		border: 0;
		padding: 0;
		margin: .6rem auto .2rem;
		border-radius: .1rem;
	}
</style>
