<template>
	<div id="app" class="wrapper userinfo">
		<t-head></t-head>
		<div class="main main-big">
			<form :action="action" method="post">
				<div class="info-group">
					<div class="group-name">
						头像
					</div>
					<img src="../../static/addrating.png" class="avatar" @click="imgclick('img01','in01')" id="img01" />
					<input type="hidden" id="in01" />
					<img src="../../static/arr02.png" class="aright" />
				</div>
				<div class="info-group">
					<div class="group-name">
						昵称
					</div>
					<input type="text" placeholder="请输入新的用户名" />
					<img src="../../static/arr02.png" class="aright"/>
				</div>
			</form>
			<div class="submit" @click="mysub">
				提交
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'userinform',
		data() {
			return {
				layui: false,
				layuitext: '未知错误',
				server: 'http://39.107.70.18/Transportation/uploadDriverImage',
				action: localStorage.getItem('myurl') + '/insertSelectiveBydriver',
				imgid: '',
				inputid: '',
				files: []
			}
		},
		mounted() {
			this.$store.state.head='用户信息'
		},
		methods: {
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			},
			tfoot() {
				return this.$store.state.tfoot
			},
			layuiboo: function() {
				this.layui = !this.layui
			},
			mysub: function() {
				var that = this
				plus.nativeUI.showWaiting("正在提交数据,不要关闭页面!!");
				$('form').ajaxSubmit({
					type: 'post',
					dataType: 'json',
					url: that.action,
					success: function(res) {
						plus.nativeUI.closeWaiting();
						that.layuiboo()
					}
				})
			},
			imgclick: function(imid, inid) {
				var that = this
				that.imgid = imid
				that.inputid = inid
				var btnArray = [{
					title: "照相机"
				}, {
					title: "相册"
				}]; //选择按钮  1 2 3
				plus.nativeUI.actionSheet({
						title: "请选择",
						cancel: "取消", // 0
						buttons: btnArray
					},
					function(e) {
						var index = e.index; // 
						switch(index) {
							case 1:
								//写自己的逻辑
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
						var img_name = entry.name; //获得图片名称
						var img_path = entry.toLocalURL(); //获得图片路径
						$("#" + that.imgid + "").attr('src', img_path);
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
					that.upload_img(path);
					$("#" + that.imgid + "").attr('src', path);
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
				var task = plus.uploader.createUpload(that.server, {
						method: "POST"
					},
					function(t, status) { //上传完成
						if(status == 200) {
							//资源
							var responseText = t.responseText;
							//转换成json
							var json = eval('(' + responseText + ')');
							//上传文件的信息
							var files = json.data;
							$("#" + that.inputid + "").val(files)
							alert($("#" + that.inputid + "").val())
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
			
		},
		components: {
			THead: resolve => require(['./head'], resolve)
		}
	}
</script>

<style type="text/css" lang="scss">
.userinfo .main{height: calc(100% - .8rem);overflow: hidden;margin-top: .8rem;}
	.userinfo .info-group {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: white;
		border-bottom: .01rem solid #DDD8CE;
		height: 1rem;
	}
	
	.userinfo .aright {
		width: .25rem;
		height: .25rem;
		margin: 0 .2rem;
	}
	
	.userinfo .group-name {
		flex: 1;
		text-indent: .1rem;
	}
	
	.userinfo .avatar {
		width: .7rem;
		height: .7rem;
		border-radius: 50%;
	}
	
	.userinfo input {
		width: 3rem;
		height: .7rem;
		text-align: right;
		margin: 0;
		border: 0;
		padding: 0;
	}
	
	.userinfo input::-webkit-input-placeholder {
		color: #666666;
	}
	
	.userinfo form {
		margin-top: .15rem;
	}
	
	.userinfo .submit {
		position: absolute;
		bottom: .2rem;
		border-radius: .1rem;
		width: calc(100% - .4rem);
		left: .2rem;
		height: .7rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #00c6c8;
		color: white;
	}
</style>