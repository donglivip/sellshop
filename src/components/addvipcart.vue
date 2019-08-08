<template>
	<div id="wrapper" class="addstart">
		<t-head></t-head>
		<div id="main">
			<!--<div class="input-box">
				<div class="title">是否分配商铺</div>
				<label for="yes">不分配</label>
				<input type="radio" name="usTmcIsStores" v-model="usTmcIsStores" id="yes" value="0" />
				<label for="yes">分配</label>
				<input type="radio" name="usTmcIsStores" v-model="usTmcIsStores" id="no" value="1" />
			</div>-->
			<div class="input-box" style="margin-top: .2rem;">
				<div class="title">选择使用店铺</div>
				<select name="" v-model="usTraderStoresId" @change="myajax02">
					<option :value="val.usTraderStoresId" v-for="val in navdata">{{val.usTsCompanyName}}</option>
				</select>
			</div>
			<block v-if="usTraderStoresId!=''">
				<input type="text" placeholder="会员卡名称" v-model="myusTmcLevel" data-alert='会员卡名称不能为空'/>
				<div class="input-box">
					<div class="title">会员卡等级</div>
					<select name="" v-model="myusTmcLevelNumber" >
						<option :value="val.id" v-for="val in navdata01" v-if="val.boo">{{val.id}}</option>
					</select>
				</div>
				<input type="number" placeholder="会员卡有效期（日）" v-model="usTmcLimit"  data-alert='会员卡期限不能为空'/>
				<input type="number" placeholder="会员卡金额" v-model="myusTmcPrice"  data-alert='会员卡金额不能为空'/>
				<input type="number" placeholder="会员卡折扣（百分比）" v-model="myusTmcDiscount"  data-alert='会员卡折扣不能为空'/>
			</block>
			<div class="submit" @click="submit">
				确定
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'addstart',
		data() {
			return {
				usTmcLimit: '',
				myusTmcPrice: '',
				myusTmcDiscount: '',
				usTmcIsStores: 1,
				navdata: '',
				usTraderStoresId: '',
				uploadtarget: '',
				files: '',
				myusTmcLevelNumber: '',
				myusTmcLevel: '',
				navdata01:[
					{id:0,boo:true},
					{id:1,boo:true},
					{id:2,boo:true},
					{id:3,boo:true},
					{id:4,boo:true},
					{id:5,boo:true},
					{id:6,boo:true},
					{id:7,boo:true},
					{id:8,boo:true},
					{id:9,boo:true},
				]
			}
		},
		mounted() {
			if(this.usTraderMemberCardId == '') {
				this.$store.state.head = '添加会员卡'
			} else {
				this.$store.state.head = '编辑会员卡'
				this.myusTmcLevel=this.usTmcLevel
				this.myusTmcPrice=this.usTmcPrice
				this.myusTmcDiscount=this.usTmcDiscount
				this.myusTmcLevelNumber=this.usTmcLevelNumber
				this.usTmcLimit=this.$store.state.mytime
			}
			this.myajax()
		},
		methods: {
			myajax: function() {
				var that = this
//				获取所有店铺
				$.ajax({
					type: "post",
					url: that.myurl + "/selectUsTraderStores",
					dataType: 'json',
					data: {
						usTraderId: localStorage.getItem('userid')
					},
					success: function(res) {
						that.navdata = res.data
					}
				});
			},
			myajax02:function(){
				var that = this
				//				获取所有等级
				$.ajax({
					type: "post",
					url: that.myurl03 + "/user/selectTraderCardLevel",
					dataType: 'json',
					data: {
						usTraderStoresId: that.usTraderStoresId
					},
					success: function(res) {
						
						for (var i = 0; i <res.data.length; i++) {
							console.log(res.data[i].usTmcLevelNumber)
							that.navdata01[res.data[i].usTmcLevelNumber].boo=false
						}
					}
				});
			},
			bottomchange: function(id) {
				this.bottomshow = !this.bottomshow
			},
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			},
			tab: function(index) {
				this.index = index
			},
			submit: function() {
				var that = this
				for(var i=0;i<$('input').length;i++){
					if($('input').eq(i).val()==''){
						alert($('input').eq(i).attr('data-alert'))
						return false;
					}
				}
				if(this.usTraderMemberCardId==''){
					var ajaxJson = {
						usTraderId: localStorage.getItem('userid'),
						usTmcIsStores: that.usTmcIsStores,
						usTraderStoresId: that.usTraderStoresId,
						usTmcLevel: that.myusTmcLevel,
						usTmcLevelNumber: that.myusTmcLevelNumber,
						usTmcLimit: that.usTmcLimit,
						usTmcPrice: that.myusTmcPrice,
						usTmcDiscount: that.myusTmcDiscount,
						usTmcImgUrl: that.usTmcImgUrl
					}
					$.ajax({
						type: "post",
						url: that.myurl02 + "/insertUsTraderMemberCard",
						dataType: 'json',
						data: ajaxJson,
						success: function(res) {
							console.log(res)
							if(res.status==200){
								plus.nativeUI.toast('添加完成')
								that.$router.back()
							}else{
								plus.nativeUI.toast('添加失败')
							}
						}
					});
				}else{
					var ajaxJson = {
						usTraderMemberCardId: that.usTraderMemberCardId,
						usTmcUpdateName: localStorage.getItem('username'),
						usTmcLevel: that.myusTmcLevel,
						usTmcLevelNumber: that.myusTmcLevelNumber,
						usTmcLimit: that.usTmcLimit,
						usTmcPrice: that.myusTmcPrice,
						usTmcDiscount: that.myusTmcDiscount,
						usTmcImgUrl: that.usTmcImgUrl
					}
					$.ajax({
						type: "post",
						url: that.myurl02 + "/updateUsTraderMemberCard",
						dataType: 'json',
						data: ajaxJson,
						success: function(res) {
							if(res.data==1){
								plus.nativeUI.toast('修改完成')
								that.$router.back()
							}else{
								plus.nativeUI.toast('修改失败')
							}
						}
					});
				}
				
			},
			change: function(id) {
				this.two = id
			},
			handelChange: function(date, formatDate) {
				this.time = formatDate
			},
			timeshow: function() {
				this.calendarShow = !this.calendarShow
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
							that.usTmcImgUrl = json.data
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
			myurl02() {
				return this.$store.state.myurl02
			},
			myurl03() {
				return this.$store.state.myurl03
			},
			usTraderMemberCardId() {
				return this.$store.state.usTraderMemberCardId
			},
			usTmcLevel() {
				return this.$store.state.usTmcLevel
			},
			usTmcPrice() {
				return this.$store.state.usTmcPrice
			},
			usTmcDiscount() {
				return this.$store.state.usTmcDiscount
			},
			usTmcLevelNumber() {
				return this.$store.state.usTmcLevelNumber
			}
		},
		components: {
			THead: resolve => require(['./head'], resolve)
		}
	}
</script>
<style type="text/css" lang="scss">
	.addstart {
		.title {
			flex: 1;
		}
		select {
			flex: 1;
			height: 100%;
			border: 0;
			background: none;
		}
		input {
			width: calc(100% - .4rem);
			margin: 0 auto;
			border: 0;
			background: white;
			display: block;
			height: 1rem;
			text-indent: .15rem;
			border-bottom: 1px solid ghostwhite;
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
			color: #d8d8d8;
			line-height: .4rem;
			margin: 0 .1rem!important;
			text-indent: 0;
		}
		input[type=file] {
			opacity: 0;
		}
		input[type=radio]:after {
			content: "✓";
			display: block;
			width: .4rem;
			height: .4rem;
			border-radius: 50%;
			text-align: center;
			line-height: .4rem;
			color: #fff;
			border: 1px solid #ddd;
			background-color: #fff;
			box-sizing: border-box;
		}
		input[type=radio]:checked:after {
			border-color: #FF8190;
			background-color: #FF8190;
		}
		.input-box {
			@extend input;
			display: flex;
			align-items: center;
			justify-content: space-around;
			.group {
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.circle {
				width: .3rem;
				height: .3rem;
				border-radius: 50%;
				border: 1px solid gainsboro;
			}
			.active {
				border: .1rem solid #FF8190;
				box-sizing: border-box;
			}
		}
		.box {
			width: calc(100% - .4rem);
			border: 0;
			background: white;
			height: calc(100% - 6rem);
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
			background:#FF8190;
			color: white;
			border-radius: .1rem;
			height: .8rem;
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			bottom: .2rem;
			left: .2rem;
		}
	}
</style>