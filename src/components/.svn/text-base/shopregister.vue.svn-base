<template>
	<div class="login myregis" id="wrapper">
		<t-head></t-head>
		<div id="main">
			<form action="">
				<div class="input-group">
					<input type="text" placeholder="法人姓名" v-model="usTrName" data-alert='法人姓名不能为空' />
				</div>
				<div class="input-group">
					<input type="number" placeholder="法人电话" v-model="usTrPhone" data-alert='法人电话不能为空' />
				</div>
				<div class="input-group">
					<div class="title01">性别</div>
					<label for="usTrSex">男</label>
					<input type="radio" name="usTrSex" id="usTrSex" v-model="usTrSex" value="1" checked="" />
					<label for="usTrSex2">女</label>
					<input type="radio" name="usTrSex" id="usTrSex2" v-model="usTrSex" value="2" />
				</div>
				<div class="input-group">
					<input type="text" placeholder="法人身份证号" v-model="usTrCardId" data-alert='法人身份证号不能为空' />
				</div>
				<div class="input-group">
					<input type="text" placeholder="公司名字" v-model="usTrCompanyName" data-alert='公司名字不能为空' />
				</div>
				<div class="input-group" @click="upload('usTrCardHandheldImgUrl')">
					<input type="text" placeholder="手持身份证" v-model="usTrCardHandheldImgUrl" readonly="" data-alert='手持身份证不能为空' />
					<img src="../../static/addrating.png" class="upimg" id="usTrCardHandheldImgUrl" />
				</div>
				<div class="input-group" @click="upload('usTrCardFrontImgUrl')">
					<input type="text" placeholder="身份证正面" v-model="usTrCardFrontImgUrl" readonly="" data-alert='身份证正面不能为空' />
					<img src="../../static/addrating.png" class="upimg" id="usTrCardFrontImgUrl" />
				</div>
				<div class="input-group" @click="upload('usTrCardBackImgUrl')">
					<input type="text" placeholder="身份证反面" v-model="usTrCardBackImgUrl" readonly="" data-alert='身份证反面不能为空' />
					<img src="../../static/addrating.png" class="upimg" id="usTrCardBackImgUrl" />
				</div>
				<div class="input-group" @click="citychange">
					<input type="text" v-model="area" placeholder="法人所在地" readonly="readonly" data-alert='法人所在地不能为空' />
				</div>
				<div class="input-group">
					<input type="text" placeholder="详细地址" v-model="usTrDetailed" data-alert='详细地址不能为空' />
				</div>
				<div class="input-group">
					<input type="text" placeholder="公司执照注册号" v-model="usTrLicenseCode" data-alert='公司执照注册号不能为空' />
				</div>
				<div class="input-group" @click="citychange01">
					<input type="text" placeholder="营业执照所在地" v-model="area01" readonly="readonly" data-alert='营业执照所在地不能为空' />
				</div>
				<div class="input-group">
					<input type="text" placeholder="营业执照详细地址" v-model="usTrLicenseDetailed" data-alert='营业执照详细地址不能为空' />
				</div>
				<div class="input-group">
					<div class="title01">营业执照状态</div>
					<label for="usTrLicenseStatus">长期有效</label>
					<input type="radio" name="usTrLicenseStatus" id="usTrLicenseStatus" v-model="usTrLicenseStatus" value="1" checked="checked" />
					<label for="usTrLicenseStatus2">短期有效</label>
					<input type="radio" name="usTrLicenseStatus" id="usTrLicenseStatus2" v-model="usTrLicenseStatus" value="2" />
				</div>
				<div class="input-group" @click="timechangee" v-show="usTrLicenseStatus==2">
					<input type="text" placeholder="营业执照有效期" v-model="usTrLicenseTime" readonly="readonly" data-alert='营业执照有效期不能为空' />
				</div>
				<div class="input-group" @click="upload('usTrLicenseImgUrl')">
					<input type="text" placeholder="营业照" v-model="usTrLicenseImgUrl" readonly="" data-alert='营业照不能为空' />
					<img src="../../static/addrating.png" class="upimg" id="usTrLicenseImgUrl" />
				</div>
				<!--<div class="input-group" @click="upload('usTrFoodImgUrl')">
					<input type="text" placeholder="食品许可证" v-model="usTrFoodImgUrl" data-alert='食品许可证不能为空' readonly=""/>
					<img src="../../static/addrating.png" class="upimg" id="usTrFoodImgUrl" />
				</div>-->
				<div class="input-group">
					<input type="number" placeholder="公司固话" v-model="usTrCompanyPhone" data-alert='公司固话不能为空' />
				</div>
				<div class="input-group">
					<input type="text" placeholder="开卡行" v-model="usTrBankDoor" data-alert='开卡行不能为空' />
				</div>
				<div class="input-group">
					<input type="text" placeholder="银行分行" v-model="usTrBankBranches" data-alert='银行分行不能为空' />
				</div>
				<div class="input-group">
					<input type="number" placeholder="银行卡号" v-model="usTrBankId" data-alert='银行卡号不能为空' />
				</div>
				<div class="input-group" @click="upload('usTrBankImgUrl')">
					<input type="text" placeholder="银行卡照片" v-model="usTrBankImgUrl" readonly="" data-alert='银行卡照片不能为空' />
					<img src="../../static/addrating.png" class="upimg" id="usTrBankImgUrl" />
				</div>
				<div class="input-group">
					<div class="title01">银行卡类型</div>
					<label for="usTrBankStyle">对公</label>
					<input type="radio" name="usTrBankStyle" id="usTrBankStyle" v-model="usTrBankStyle" value="1" checked="checked" />
					<label for="usTrBankStyle2">对私</label>
					<input type="radio" name="usTrBankStyle" id="usTrBankStyle2" v-model="usTrBankStyle" value="2" />
				</div>
				<div class="input-group">
					<input type="text" placeholder="审核备注" v-model="usTrAuditNote" data-alert='审核备注不能为空' />
				</div>
				<input type="button" name="mysubmit" id="mysubmit" value="注册" @click="gosubmit" style="color: #FFFFFF!important;"/>
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
				<alert v-show='alertboo' @alertchange="alertchange" @alerttrue="alerttrue"></alert>
			</transition>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'userregister',
		data() {
			return {
				usTrBankDoor: '',
				usTrLicenseImgUrl: '',
				usTrLicenseCode: '',
				usTrDetailed: '',
				usTrBankStyle: '',
				usTrAuditNote: '',
				usTrBankImgUrl: '',
				usTrBankId: '',
				usTrCompanyPhone: '',
				usTrFoodImgUrl: '',
				usTrCardId: '',
				uploadtarget: '',
				files: [],
				cityboo: false,
				cityboo01: false,
				alertboo: false,
				usTrPhone: '',
				usTrName: '',
				usTrSex: '',
				usTrCompanyName: '',
				usTrLicenseDetailed: '',
				usTrLicenseTime: '',
				usTrLicenseStatus: '',
				usTrCardHandheldImgUrl: '',
				usTrCardBackImgUrl: '',
				usTrCardFrontImgUrl: '',
				usTrBankBranches: ''
			}
		},
		mounted() {
			this.$store.state.head = '商家注册'
		},
		methods: {
			alerttrue:function(){
				this.opennew('login')
			},
			timechangee: function() {
				var that = this
				plus.nativeUI.pickDate(function(e) {
					var d = e.date;
					that.usTrLicenseTime = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
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
				var that = this
				for(var i = 0; i < $('input').length; i++) {
					if($('input').eq(i).val() == '') {
						if(that.usTrLicenseStatus==1){
							if($('input').eq(i).attr('data-alert')!='营业执照有效期不能为空'){
								alert($('input').eq(i).attr('data-alert'))
								return false;
							}
						}else{
							alert($('input').eq(i).attr('data-alert'))
							return false;
						}
					}
				}
				
				$.ajax({
					type: "post",
					url: that.myurl + "/login",
					dataType: 'json',
					data: {
						phone:that.usTrPhone
					},
					success: function(res) {
						for (var i=0;i<res.data.length;i++) {
							if(res.data[i].usTrAuditStatus==1&&res.data[i].usTrAuditStatus==2){
								alert('当前账号不可注册')
								return false;
							}
						}
					}
				});
				var dataJson = {
					usTrBankBranches: that.usTrBankBranches,
					usTrBankDoor: that.usTrBankDoor,
					usTrName: that.usTrName,
					usTrPhone: that.usTrPhone,
					usTrSex: that.usTrSex,
					usTrCardId: that.usTrCardId,
					usTrCardFrontImgUrl: that.usTrCardFrontImgUrl,
					usTrCardBackImgUrl: that.usTrCardBackImgUrl,
					usTrCardHandheldImgUrl: that.usTrCardHandheldImgUrl,
					usTrCompanyName: that.usTrCompanyName,
					usTrProvince: that.province,
					usTrCity: that.city,
					usTrArea: that.area,
					usTrDetailed: that.usTrDetailed,
					usTrLicenseCode: that.usTrLicenseCode,
					usTrLicenseProvince: that.province01,
					usTrLicenseCity: that.city01,
					usTrLicenseArea: that.area01,
					usTrLicenseDetailed: that.usTrLicenseDetailed,
					usTrLicenseStatus: that.usTrLicenseStatus,
					usTrLicenseTime: that.usTrLicenseTime,
					usTrLicenseImgUrl: that.usTrLicenseImgUrl,
					usTrCompanyPhone: that.usTrCompanyPhone,
					usTrBankId: that.usTrBankId,
					usTrBankImgUrl: that.usTrBankImgUrl,
					usTrBankStyle: that.usTrBankStyle,
					usTrAuditNote: that.usTrAuditNote
				}
				$.ajax({
					type: "post",
					url: that.myurl + "/insertTrader",
					dataType: 'json',
					data: dataJson,
					success: function(res) {
						console.log(JSON.stringify(res))
					}
				});
				this.$store.state.alerttext = '资料已提交审核，请耐心等待！'
				this.alertboo = !this.alertboo
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
							if(thats.uploadtarget=='usTrCardHandheldImgUrl'){
								thats.usTrCardHandheldImgUrl= res.data;
							}else if(thats.uploadtarget=='usTrCardFrontImgUrl'){
								thats.usTrCardFrontImgUrl= res.data;
							}else if(thats.uploadtarget=='usTrCardBackImgUrl'){
								thats.usTrCardBackImgUrl= res.data;
							}else if(thats.uploadtarget=='usTrLicenseImgUrl'){
								thats.usTrLicenseImgUrl= res.data;
							}else if(thats.uploadtarget=='usTrBankImgUrl'){
								thats.usTrBankImgUrl= res.data;
							}
						},
						error:function(err){
							alert(JSON.stringify(err))
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

<style type="text/css" lang="scss">
	.login {
		background: #FFFFFF!important;
	}
	
	.login .head img {
		height: .3rem;
	}
	
	.login .logo {
		width: 1.5rem;
		height: 1.5rem;
		margin: 1rem auto .7rem;
		display: block;
	}
	
	.login .input-group {
		margin: .25rem .4rem;
		border-bottom: 1px solid gainsboro;
		display: flex;
		align-items: center;
		justify-content: flex-end;
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
	}
	
	.login #mysubmit {
		width: 6.5rem;
		height: .8rem;
		color: white;
		background: #00c6c8;
		display: flex;
		align-items: center;
		justify-content: center;
		display: block;
		border: 0;
		padding: 0;
		margin: .8rem auto .2rem;
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
	
	.myregis input {
		background: none;
		color:  #333333!important;
	}
	
	.myregis input::-webkit-input-placeholder {
		color:#333333!important;
	}
	
	.login .upimg {
		width: .8rem!important;
	}
	
	.myregis label {
		font-size: .2rem;
		color: #333333;
	}
	
	.myregis .title01 {
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
	}
	
	input[type=radio]:checked:after {
		content: "⚪";
		display: block;
		margin: 0 auto;
		border-color: #00c6c8;
		background-color: #00c6c8;
		width: .4rem;
		height: .4rem;
		color: #FFFFFF!important;
	}
</style>