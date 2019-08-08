<template>
	<div class="wrapper renzhenglist">
		<t-head></t-head>
		<div class="main">
			<div class="ren-tab" @click="opennew('shimingrenzheng')">
				<div class="title">法人信息认证</div>
				<div class="text" v-if="tabdata.usTrCardId==null">未认证</div>
				<div class="text" v-if="tabdata.usTrCardId!=null">已认证</div>
			</div>
<!-- 			<div class="ren-tab" @click="opennew('dianpurenzheng')">
				<div class="title">店铺认证</div>
				<div class="text" v-if="tabdata.usTrLicenseImgUrl==null">未认证</div>
				<div class="text" v-if="tabdata.usTrLicenseImgUrl!=null">已认证</div>
			</div> -->
<!-- 			<div class="ren-tab">
				<div class="title">银行卡认证</div>
				<div class="text" v-if="tabdata.usTrBankId==null">未认证</div>
				<div class="text" v-if="tabdata.usTrBankId!=null">已认证</div>
			</div> -->
			<div class="ren-tab" @click="opennew('yinhangrenzheng')">
				<div class="title">支付宝认证</div>
				<div class="text" v-if="tabdata02.maCaAliName==null">未认证</div>
				<div class="text" v-if="tabdata02.maCaAliName!=null">已认证</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'chongzhi',
	data() {
		return {
			tabdata: [],
			tabdata02:{}
		};
	},
	methods: {
		myajax: function() {
			var that = this;
			//				获取认证信息
			$.ajax({
				type: 'post',
				url: that.myurl + '/getUsTraderById',
				data: {
					usTraderId: localStorage.getItem('userid')
				},
				success: function(res) {
					if (res.status == 200) {
						that.tabdata = res.data;
					} else {
						alert(res.msg);
					}
				},
				error: function(res) {
					alert('网络连接失败，请检查网络后再试！');
				}
			});
			//				获取支付宝认证信息
			$.ajax({
				type: 'post',
				url: that.myurl03 + '/rider/getIsBindMaCashAccount',
				data: {
					maCaUserId : localStorage.getItem('userid'),
					maCaStatus :3
				},
				success: function(res) {
					if (res.status == 200) {
						that.tabdata02 = res.data[0]
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
	mounted() {
		this.$store.state.head = '商家认证';
		this.myajax()
	},
	computed: {
		myurl() {
			return this.$store.state.myurl;
		},
		myurl03() {
			return this.$store.state.myurl03;
		}
	},
	components: {
		THead: resolve => require(['./head'], resolve)
	}
};
</script>

<style scoped>
	.main{overflow: hidden;margin-top: .95rem;}
	.ren-tab{
		background: #FFFFFF;display: flex;align-items: center;height: 1rem;padding: 0 .2rem;margin:.1rem .2rem;
	}
	.title{
		font-size: .28rem;flex: 1;
	}
	.text{
		color: #FF8190;font-size: .22rem;
	}
</style>
