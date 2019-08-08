<template>
	<div class="login" id="wrapper">
		<t-head></t-head>
		<div id="main">
			<form action="">
				<h2>手机快捷登录 </h2>
				<h3>未注册的手机号将自动创建账号 </h3>
				<div class="input-group" v-show="!code">
					<input type="number" placeholder="请输入手机号" v-model="phone" />
					<img src="../../static/login_10.png" id="clear" @click="cleaar" style="width: .35rem;" />
				</div>
				<transition name='fade'>
					<div class="input-group" v-show="code">
						<input type="password" placeholder="请输入验证码" v-model="pwd" />
						<div @click="addcode">
							{{codenum}}
						</div>
					</div>
				</transition>
				<input type="button" name="mysubmit" id="mysubmit" v-model="submittext" @click="gosubmit" />
				<div class="input-group" style="border: 0;">
<!-- 					<span style="text-align: left;" @click="opennew('login')">
						连锁店登陆
					</span> -->
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'login',
		data() {
			return {
				phone: '',
				pwd: '',
				code: false,
				submittext: '下一步',
				codenum: '获取验证码',
				ycode: '1'
			}
		},
		mounted() {
			this.$store.state.head = '自营店/店长登陆 '
		},
		methods: {
			opennew: function(target) {
				this.$router.push({
					name: target
				});
			},
			gosubmit: function() {
				var that = this
				if(this.submittext == '登录') {
					// this.$Axios.post(
					//   that.myurl + "/login",
					//   that.$qs.stringify({
					//     phone: that.phone,
					//     type:1
					//   })
					// )
					// .then(function(res){
					//   console.log(res.data.data)
					// })
					//商户登录--店长
					$.ajax({
						type: "post",
						url: that.myurl + "/login",
						data: {
							phone: that.phone,
							type: 1
						},
						dataType: 'json',
						success: function(res) {
							if(res.status == 200) {
								localStorage.setItem('usertype',1)
								localStorage.setItem('userid', res.data.UsTrader[0].usTraderId) //商户id
								localStorage.setItem('username', res.data.UsTrader[0].usTrName) //商户名字
								localStorage.setItem('userphone', res.data.UsTrader[0].usTrPhone) //商户电话
								localStorage.setItem('sex', res.data.UsTrader[0].usTrSex) //商户性别  1男 2 女
								localStorage.setItem('shenfenhao', res.data.UsTrader[0].usTrCardId) //法人身份证号
								localStorage.setItem('shenfenzheng', res.data.UsTrader[0].usTrCardFrontImgUrl) //身份证正面
								localStorage.setItem('shenfenfan', res.data.UsTrader[0].usTrCardBackImgUrl) //身份证背面
								localStorage.setItem('shouchi', res.data.UsTrader[0].usTrCardHandheldImgUrl) //手持身份证
								localStorage.setItem('gongsiname', res.data.UsTrader[0].usTrCompanyName) //公司名字
								localStorage.setItem('sheng', res.data.UsTrader[0].usTrProvince) //省
								localStorage.setItem('shi', res.data.UsTrader[0].usTrCity) //市
								localStorage.setItem('qu', res.data.UsTrader[0].usTrArea) //区
								localStorage.setItem('xiangxi', res.data.UsTrader[0].usTrDetailed) //详细地址
								localStorage.setItem('zhuce', res.data.UsTrader[0].usTrLicenseCode) //公司执照注册号
								localStorage.setItem('zhizhaosheng', res.data.UsTrader[0].usTrLicenseProvince) //营业执照省
								localStorage.setItem('zhizhaoshi', res.data.UsTrader[0].usTrLicenseCity) //营业执照市
								localStorage.setItem('zhizhaoqu', res.data.UsTrader[0].usTrLicenseArea) //营业执照区
								localStorage.setItem('zhizhaoxiangxi', res.data.UsTrader[0].usTrLicenseDetailed) //营业执照详细地址
								localStorage.setItem('usTraderStoresId', res.data.UsTraderEmployee[0].usTraderEmployeeId) //店长id
								localStorage.setItem('dianid', res.data.UsTraderEmployee[0].usTraderEmployeeId) //店长id
								that.$router.replace({
									name: 'index'
								})
							} else {
								alert(res.msg)
							}
						}
					});
				} else {

					that.addcode()
				}
				this.code = true
				this.submittext = '登录'
			},
			cleaar: function() {
				this.phone = ''
			},
			addcode: function() {
				var that = this
//				if(this.codenum == '获取验证码' && that.phone != '') {
//					this.codenum = 60
//					$.ajax({
//						type: "post",
//						url: that.myurl03 + '/shortMessage/getShortCode',
//						data: {
//							phone: that.phone
//						},
//						dataType: 'json',
//						success: function(res) {
//							that.ycode = res.data
//							var set = setInterval(function() {
//								if(that.codenum > 1) {
//									that.codenum = that.codenum - 1
//								} else {
//									clearInterval(set)
//									that.codenum = '获取验证码'
//								}
//							}, 1000)
//						}
//					});
//				}
			}
		},
		computed: {
			myurl() {
				return this.$store.state.myurl
			},
			statusTraderStore() {
				return this.$store.state.statusTraderStore
			},
			myurl03() {
				return this.$store.state.myurl03
			}
		},
		components: {
			THead: resolve => require(['./head'], resolve)
		}
	}
</script>

<style type="text/css" lang="scss" scoped="scoped">
	.login .head {
		background: white;
		height: .7rem;
	}

	.login .head img {
		height: .3rem;
	}

	#main {
		background: #FFFFFF
	}

	.login .logo {
		width: 1.5rem;
		height: 1.5rem;
		margin: 1rem auto .7rem;
		display: block;
	}

	.login .input-group {
		margin: .4rem;
		border-bottom: 1px solid gainsboro;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.login .input-group span {
		color: #666666;
	}

	.login .input-group img {
		width: .35rem;
		margin: 0 .1rem;
	}

	h2,
	h3 {
		margin: .2rem .3rem
	}

	h2 {
		margin-top: .5rem
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
		height: 1rem;
		color: #FFFFFF;
		background: #FF8190;
		display: flex;
		align-items: center;
		justify-content: center;
		display: block;
		border: 0;
		padding: 0;
		margin: .8rem auto .2rem;
		border-radius: .5rem
	}

	.login .input-group span {
		flex: 1;
	}

	.login .main {
		overflow: hidden;
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

	.login .backimg {
		position: fixed;
		height: 100%;
		top: 0;
		left: 0;
		width: 100%;
	}

	.login form {
		position: relative;
		z-index: 3;
	}

	.login input {
		background: none;
	}

	.login input::-webkit-input-placeholder {}
</style>
