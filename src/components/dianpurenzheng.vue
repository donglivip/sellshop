<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-aside" @click="back()"><img src="../../static/arrleft.png" /></div>
			<div class="header-text">店铺认证</div>
			<div class="header-aside"></div>
		</div>
		<div class="main">
			<div class="main-box">
				<div class="main-three">上传店招</div>
				<div class="main-four">
					<img src="../../static/d03.png" @click="upload('img01')" />
					<div class="four-text">上传店铺门头招牌</div>
				</div>
			</div>
			<div class="main-box">
				<div class="main-three">上传营业执照</div>
				<div class="main-four">
					<img src="../../static/d01.png" @click="upload('img02')" />
					<div class="four-text">上传营业执照</div>
				</div>
			</div>
			<div class="main-box">
				<div class="main-three">食品经营许可证</div>
				<div class="main-four">
					<img src="../../static/d01.png" @click="upload('img03')" />
					<div class="four-text">上传食品经营许可证</div>
				</div>
			</div>
			<div class="main-box">
				<div class="main-three">上传广告宣传图/投放广告直接调用</div>
				<div class="main-four">
					<img src="../../static/d04.png" @click="upload('img04')" />
					<div class="four-text">上传广告宣传图</div>
				</div>
			</div>
			<div class="main-box">
				<div class="main-three">选择地址</div>
				<div class="main-four"><input type="text" v-model="dizhi" readonly="" @click="dchange" placeholder="请选择店铺所在地" /></div>
			</div>
			<div class="main-box">
				<div class="main-three">请输入详细地址</div>
				<div class="main-four"><input type="text" v-model="xiangxidizhi" placeholder="请输入店铺详细地址" /></div>
			</div>
			<div class="bottom" @click="myajax()">提交认证</div>
			<v-distpicker type="mobile" @selected="onSelected" v-if="dboo"></v-distpicker>
		</div>
	</div>
</template>

<script>
import VDistpicker from 'v-distpicker';
export default {
	name: 'shimingrenzheng',
	data() {
		return {
			tabdata: [],
			uploadtarget: '',
			img01: '',
			img02: '',
			img03: '',
			img04: '',
			dboo: false,
			dizhi: '',
			xiangxidizhi: ''
		};
	},
	methods: {
		dchange: function() {
			this.dboo = !this.dboo;
		},
		onSelected: function(data) {
			this.dizhi = data.province.value + data.city.value + data.area.value;
			this.dchange();
		},
		//实名认证调取相册
		upload: function(target) {
			var that = this;
			that.uploadtarget = target;
			var btnArray = [
				{
					title: '照相机'
				},
				{
					title: '相册'
				}
			]; //选择按钮  1 2 3
			plus.nativeUI.actionSheet(
				{
					title: '请选择',
					cancel: '取消',
					buttons: btnArray
				},
				function(e) {
					var index = e.index;
					switch (index) {
						case 1:
							that.camera();
							break;
						case 2:
							that.album();
							break;
					}
				}
			);
		},
		camera: function() {
			var that = this;
			var cmr = plus.camera.getCamera();
			cmr.captureImage(
				function(p) {
					//成功
					plus.io.resolveLocalFileSystemURL(
						p,
						function(entry) {
							var img_name = entry.name;
							var img_path = entry.toLocalURL();
							that.upload_img(img_path);
						},
						function(e) {
							alert('读取拍照文件错误：' + e.message);
						}
					);
				},
				function(e) {
					alert('失败：' + e.message);
				},
				{
					filename: '_doc/camera/',
					index: 1
				}
			);
		},
		album: function() {
			var that = this;
			plus.gallery.pick(
				function(path) {
					that.upload_img(path);
				},
				function(e) {
					alert('取消选择图片');
				},
				{
					filter: 'image'
				}
			);
		},
		upload_img: function(p) {
			var thats = this;
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
					type: 'post',
					url: thats.myurl + '/imageRiderImageUsTraderStores',
					dataType: 'json',
					data: {
						imgStr: canvas.toDataURL('image/jpeg', 1 || 0.8)
					},
					success: function(res) {
						if (thats.uploadtarget == 'img01') {
							that.img01 = res.data;
						} else if (thats.uploadtarget == 'img02') {
							that.img02 = res.data;
						} else if (thats.uploadtarget == 'img03') {
							that.img03 = res.data;
						} else if (thats.uploadtarget == 'img04') {
							that.img04 = res.data;
						}
					}
				});
			};
		},
		//判断性别
		xuanze: function(id) {
			this.index = id;
		},
		myajax: function() {
			var that = this;
			//			商家实名认证
			var ajaxjson = {
				usTraderId: localStorage.getItem('userid'),
				usTrLicenseImgUrl: that.img02,
				usTrFoodImgUrl: that.img03,
				usTrProvince: that.dizhi,
				usTrDetailed: that.xiangxidizhi,
				usTsFacadeImg:that.img01,
				usTsBannerImg:that.img04
			};
			$.ajax({
				type: 'post',
				url: that.myurl + '/updateTrader',
				data: ajaxjson,
				success: function(res) {
					if (res.status == 200) {
						plus.nativeUI.toast('认证成功');
						that.back();
					} else {
						alert(res.msg);
					}
				},
				error: function(res) {
					alert('网络连接失败，请检查网络后再试！');
				}
			});
		},
		back: function() {
			this.$router.back();
		},
		opennew: function(target, id) {
			this.$store.state.msdNewsId = id;
			this.$router.push({
				name: target
			});
		}
	},
	mounted() {},
	computed: {
		myurl() {
			return this.$store.state.myurl;
		}
	},
	components: { VDistpicker }
};
</script>

<style scoped>
.wrapper {
	background: #f7f7f9;
}
.header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: #ffffff;
	padding: 0 0.3rem;
	height: 1rem;
	margin-bottom: 0.2rem;
}
.header-aside {
	width: 0.3rem;
}
.header-aside img {
	height: 0.4rem;
}
.header-text {
	font-size: 0.32rem;
	color: #000000;
}
.main {
	height: calc(100% - 1rem);
	overflow-x: hidden;
	overflow-y: scroll;
}
.main-box {
	margin: 0.2rem;
	background: #ffffff;
	border-radius: 0.12rem;
	padding: 0 0.3rem;
}
.main-one {
	height: 0.8rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #d8d8d8;
}
.one-text {
	font-size: 0.28rem;
	color: #000000;
}
.name {
	height: 0.8rem;
	font-size: 0.28rem;
	color: #929292;
	border: 0;
	width: 4rem;
}
input::-webkit-input-placeholder {
	color: #b8b8b8;
	font-size: 0.28rem;
	text-align: left;
}
.main-two {
	height: 0.8rem;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	border-bottom: 1px solid #d8d8d8;
}
.two-left {
	font-size: 0.28rem;
	color: #000000;
	flex: 1;
}
.two-right {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 0.8rem;
	margin-left: 0.3rem;
}
.two-right img {
	height: 0.4rem;
}
.two-text {
	font-size: 0.28rem;
	color: #131313;
}
.two-news {
	color: #ff8190;
}
.main-three {
	height: 0.8rem;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	font-size: 0.28rem;
	color: #272727;
}
.main-four {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.main-four input {
	border: 1px solid gainsboro;
	width: 100%;
	height: 0.8rem;
	margin-bottom: 0.2rem;
	border-radius: 0.1rem;
	text-indent: 0.2rem;
}
.main-four img {
	height: 2.2rem;
}
.four-text {
	font-size: 0.28rem;
	color: #c9c9c9;
	margin: 0.3rem 0;
}
.bottom {
	background: #ff8190;
	height: 0.8rem;
	font-size: 0.32rem;
	color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 0.12rem;
	width: 6rem;
	margin: 0.6rem;
}
</style>
