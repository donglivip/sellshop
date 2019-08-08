<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-aside" @click="back()"><img src="../../static/arrleft.png" /></div>
			<div class="header-text">支付宝认证</div>
			<div class="header-aside"></div>
		</div>
		<div class="main">
			<div class="main-box">
				<div class="main-one">
					<div class="one-text">支付宝姓名</div>
					<input type="text" placeholder="输入支付宝实名认证姓名" class="name" v-model="name" />
				</div>
				<div class="main-one">
					<div class="one-text">支付宝账号</div>
					<input type="text" placeholder="输入支付宝账号" class="name" v-model="phone" />
				</div>
			</div>
			<div class="bottom" @click="myajax()">提交认证</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'shimingrenzheng',
	data() {
		return {
			name:'',
			phone:''
		};
	},
	methods: {
		myajax: function() {
			var that = this;
			//			商家实名认证
			$.ajax({
				type: 'post',
				url: that.myurl03 + '/rider/insertRiderRealIsApi',
				data: {
					maCaStatus:3,
					maCaUserId: localStorage.getItem('userid'),
					maCaAliName: that.name,
					maCaAliCode : that.phone
				},
				success: function(res) {
					if (res.status == 200) {
						plus.nativeUI.toast('认证成功');
						that.back()
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
		myurl03() {
			return this.$store.state.myurl03;
		}
	}
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
	margin: 0 0.2rem;
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
	text-align: right;
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
.main-four img {
	width: 4rem;
	height: 2.8rem;
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
