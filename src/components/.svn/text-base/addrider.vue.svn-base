<template>
	<div class="login" id="wrapper">
		<t-head></t-head>
		<div id="main">
			<form action="">
				<div class="input-group" v-if="usRiderId == ''">
					<input type="text" placeholder="姓名" v-model="usRiName" />
				</div>
				<div class="input-group">
					<input type="number" placeholder="手机号" v-model="usRiPhone" />
				</div>
				<div class="input-group">
					<div class="title">性别</div>
					<label for="sex">男</label>
					<input type="radio" name="sex" id="sex" value="1" v-model="usRiSex" />
					<label for="sex02">女</label>
					<input type="radio" name="sex" id="sex02" value="2" v-model="usRiSex" />
				</div>
				<div class="input-group">
					<input type="text" placeholder="请上传头像照片" readonly="readonly"/>
					<img src="../../static/addrating.png" id="usRiHeadImgUrl" @click="upload('usRiHeadImgUrl')" />
				</div>
				<div class="input-group">
					<input type="text" placeholder="身份证号" v-model="usRiCardId" />
				</div>
				<div class="input-group" v-if="usRiderId == ''">
					<input type="text" placeholder="身份证正面照"  readonly="readonly"/>
					<img src="../../static/addrating.png" id="usRiCardFrontImgUrl" @click="upload('usRiCardFrontImgUrl')" />
				</div>
				<div class="input-group" v-if="usRiderId == ''">
					<input type="text" placeholder="身份证背面照"  readonly="readonly"/>
					<img src="../../static/addrating.png" id="usRiCardBackImgUrl" @click="upload('usRiCardBackImgUrl')" />
				</div>
				<div class="input-group" v-if="usRiderId == ''">
					<input type="text" placeholder="手持身份证照"  readonly="readonly"/>
					<img src="../../static/addrating.png" id="usRiCardHandheldImgUrl" @click="upload('usRiCardHandheldImgUrl')" />
				</div>
				<div class="input-group">
					<input type="text" placeholder="联系地址" readonly="readonly" @click="citychange" v-model="area" />
				</div>
				<div class="input-group">
					<input type="text" placeholder="配送地址" readonly="readonly" @click="citychange01" v-model="area01" />
				</div>
				<div class="input-group">
					<input type="text" placeholder="详细地址" v-model="usRiDetailed" />
				</div>
				<input type="button" name="mysubmit" id="mysubmit" value="提交" @click="gosubmit" />
			</form>
			<transition name='fade'>
				<city-picker v-show='cityboo' @citychange="citychange" @alertchange="alertchange"></city-picker>
			</transition>
			<transition name='fade'>
				<city-picke v-show='cityboo02' @citychange="citychange01" @alertchange="alertchange"></city-picke>
			</transition>
			<transition name='alert'>
				<alert v-show='alertboo' @alertchange="alertchange" @alerttrue="alertchange"></alert>
			</transition>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'userregister',
		data() {
			return {
				cityboo02: false,
				usRiDetailed: '',
				uploadtarget: '',
				files: [],
				cityboo: false,
				alertboo: false,
				usRiName: '',
				shopname: '',
				bottomboo: false,
				bottomtext: '',
				usRiPhone: '',
				usRiCardId: '',
				usRiSex: ''
			}
		},
		mounted() {
			if(this.usRiderId == '') {
				this.$store.state.head = '添加骑手'
			} else {
				this.$store.state.head = '编辑骑手'
			}
		},
		methods: {
			bottomshow: function(id) {
				this.bottomboo = !this.bottomboo
				this.bottomtext = id
			},
			alertchange: function() {
				this.alertboo = !this.alertboo
			},
			citychange: function() {
				this.cityboo = !this.cityboo
			},
			citychange01: function() {
				this.cityboo02 = !this.cityboo02
			},
			opennew: function(target) {
				this.$router.push({
					name: target
				});
			},
			gosubmit: function() {
				var that = this
				var usRiHeadImgUrl = $('#usRiHeadImgUrl').prev().val()
				var usRiCardFrontImgUrl = $('#usRiCardFrontImgUrl').prev().val()
				var usRiCardBackImgUrl = $('#usRiCardBackImgUrl').prev().val()
				var usRiCardHandheldImgUrl = $('#usRiCardHandheldImgUrl').prev().val()
				if(this.usRiderId == '') {
					var ajaxjson = {
						usTraderId: localStorage.getItem('userid'),
						usTrName: localStorage.getItem('username'),
						usRiPhone: that.usRiPhone,
						usRiName: that.usRiName,
						usRiSex: that.usRiSex,
						usRiHeadImgUrl: usRiHeadImgUrl,
						usRiProvince: that.province,
						usRiCity: that.city,
						usRiArea: that.area,
						usRiDetailed: that.usRiDetailed,
						usRiCardId: that.usRiCardId,
						usRiCardFrontImgUrl: usRiCardFrontImgUrl,
						usRiCardBackImgUrl: usRiCardBackImgUrl,
						usRiCardHandheldImgUrl: usRiCardHandheldImgUrl,
						usRiServingProvince: that.province01,
						usRiServingCity: that.city01,
						usRiServingArea: that.area01
					}
					$.ajax({
						type: "post",
						url: that.myurl + "/insertTraderRider",
						dataType: 'json',
						data: ajaxjson,
						success: function(res) {
							console.log(JSON.stringify(res))
						}
					});
				} else {
					var ajaxjson = {
						usRiderId: that.usRiderId,
						usTraderName: localStorage.getItem('username'),
						usRiPhone: that.usRiPhone,
						usRiHeadImgUrl: usRiHeadImgUrl,
						usRiProvince: that.province,
						usRiCity: that.city,
						usRiArea: that.area,
						usRiDetailed: that.usRiDetailed,
						usRiServingProvince: that.province01,
						usRiServingCity: that.city01,
						usRiServingArea: that.area01,
						usRiServingRange: that.usRiServingRange
					}
					$.ajax({
						type: "post",
						url: that.myurl + "/updateTraderRider",
						dataType: 'json',
						data: ajaxjson,
						success: function(res) {
							console.log(JSON.stringify(res))
						}
					});
				}
				this.$store.state.alerttext = '添加成功！'
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
				var that = this
				var n = p.substr(p.lastIndexOf('/') + 1);
				that.files.push({
					name: "uploadkey",
					path: p
				});
				//开始上传
				that.start_upload();
			},
			start_upload: function() {
				var that = this
				if(that.files.length <= 0) {
					plus.nativeUI.alert("没有添加上传文件！");
					return;
				}
				//原生的转圈等待框
				var wt = plus.nativeUI.showWaiting();
				var task = plus.uploader.createUpload(that.myurl + '/imageRiderImageUsTraderStores', {
						method: "POST"
					},
					function(t, status) { //上传完成
						if(status == 200) {
							//资源
							var responseText = t.responseText;
							//转换成json
							var json = eval('(' + responseText + ')');
							//上传文件的信息
							$('#' + that.uploadtarget + '').prev().val(json.data)
							wt.close();
						} else {
							alert("上传失败：" + status);
							//关闭原生的转圈等待框
							wt.close();
						}
					});
				task.addData("uid", that.getUid());
				for(var i = 0; i < that.files.length; i++) {
					var f = that.files[i];
					task.addFile(f.path, {
						key: f.name
					});
				}
				task.start();
			},
			getUid: function() {
				return Math.floor(Math.random() * 100000000 + 10000000).toString();
			}
		},
		computed: {
			myurl() {
				return this.$store.state.myurl
			},
			usRiderId() {
				return this.$store.state.usRiderId
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
			THead: resolve => require(['./head'], resolve),
		}
	}
</script>

<style type="text/css" lang="scss">
	.login .head {
		background: white;
		height: .7rem;
	}
	
	.login .head img {
		height: .3rem;
	}
	
	.login {
		background: white!important;
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
		width: .9rem;
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
		background: #FF8190;
		display: flex;
		align-items: center;
		justify-content: center;
		display: block;
		border: 0;
		padding: 0;
		margin: .8rem auto .2rem;
		border-radius: .1rem;
	}
	
	.login .input-group span {
		flex: 1;
		text-align: right
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
	
	.login .upimg {
		width: .8rem!important;
	}
	
	.login .title {
		flex: 1;
	}
	
	.login .input-group input[type='radio'] {
		flex: none;
	}
</style>