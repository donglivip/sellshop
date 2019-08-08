<template>
	<div id="wrapper" class="vipdetail">
		<t-head></t-head>
		<div id="main">
			<form action="">
				<div class="input-box">
					<div class="title">互推种类</div>
					<label for="usTerIsArea01">所在区域</label>
					<input type="radio" v-model="usTerIsArea" id="usTerIsArea01" value="1" style="width: auto;"/>
					<label for="usTerIsArea02">全国</label>
					<input type="radio" v-model="usTerIsArea" id="usTerIsArea02" value="2" style="width: auto;"/>
				</div>
				<div class="input-box" v-if="usTerIsArea==1">
					<div class="title">互推区域</div>
					<input type="text" readonly="readonly" @click="citychange" placeholder="请选择互推区域" v-model="area" />
				</div>
				<div class="input-box">
					<div class="title">充值金额</div>
					<input type="text" placeholder="请输入充值金额" v-model="usTerPayPrice" />
				</div>
				<div class="input-box">
					<div class="title">店铺互推类型</div>
					<select name="" v-model="maStorePushStyleId">
						<option :value="val.maStorePushStyleId" v-for="val in navdata">{{val.maSpsName}}</option>
					</select>
				</div>
				<div class="input-box">
					<div class="title">互推店铺</div>
					<select name="" v-model="usTraderStoresId">
						<option :value="val.usTraderStoresId" v-for="val in navdata02">{{val.usTsCompanyName}}</option>
					</select>
				</div>
			</form>
			<div class="submit" @click="submit">
				提交
			</div>
		</div>
		<transition name='fade'>
			<city-picker v-show='cityboo' @citychange="citychange" @alertchange="alertchange"></city-picker>
		</transition>
		<transition name='alert'>
			<alert v-show='alertboo' @alertboo="alertchange" @alerttrue="alertchange"></alert>
		</transition>
	</div>
</template>

<script>
	export default {
		name: 'vipdetail',
		data() {
			return {
				usTerIsArea: 1,
				cityboo: false,
				alertboo: false,
				navdata: '',
				usTerPayPrice: '',
				maStorePushStyleId: '',
				usTraderStoresId: '',
				navdata02: ''
			}
		},
		mounted() {
			this.$store.state.head = '添加互推信息'
			this.myajax()
		},
		methods: {
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			},
			submit: function() {
				if(this.usTerPayPrice == '' || this.maStorePushStyleId == '' || this.usTraderStoresId == '') {
					alert('参数选择不完整')
					return false;
				}
				var that = this
				$.ajax({
					type: "post",
					url: that.myurl + "/insertUsTraderElectRelease",
					dataType: 'json',
					data: {
						usTerIsArea: that.usTerIsArea,
						usTerProvince: that.province,
						usTerCity: that.city,
						usTerArea: that.area,
						maStorePushStyleId: that.maStorePushStyleId,
						usTerPayPrice: that.usTerPayPrice,
						usTraderStoresId: that.usTraderStoresId
					},
					success: function(res) {
						if(res.data==1){
							plus.nativeUI.toast('添加成功')
							that.alertchange=false
						}
					}
				});
			},
			citychange: function() {
				this.cityboo = !this.cityboo
			},
			alertchange: function() {
				this.alertboo = !this.alertboo
			},
			myajax: function() {
				var that = this
				$.ajax({
					type: "post",
					url: that.myurl + "/selectMaStorePushStyle",
					dataType: 'json',
					success: function(res) {
						console.log(res)
						that.navdata = res.data
					}
				});
				$.ajax({
					type: "post",
					url: that.myurl + "/selectUsTraderStores",
					dataType: 'json',
					data: {
						usTraderId: localStorage.getItem('userid')
					},
					success: function(res) {
						console.log(res)
						that.navdata02 = res.data
					}
				});
			}
		},
		computed: {
			bottomdata() {
				return this.$store.state.bottomdata
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
			myurl() {
				return this.$store.state.myurl
			}
		},
		components: {
			THead: resolve => require(['./head'], resolve),
			cityPicker: resolve => require(['./citypicker'], resolve),
			alert: resolve => require(['./alert'], resolve),
		}
	}
</script>

<style type="text/css" lang="scss" scoped="scoped">
	.vipdetail {
		.title {
			flex: 1;
		}
		select {
			height: .7rem;
		}
		label {
			font-size: 12px;
		}
		#main {
			display: flex;
			align-items: center;
			flex-direction: column;
			p {
				position: absolute;
				bottom: 2rem;
			}
			form {
				width: calc(100% - .4rem);
				height: calc(100% - 2rem);
				display: flex;
				align-items: center;
				flex-direction: column;
				background: white;
				box-shadow: 0 0 10px .1rem gainsboro;
				border-radius: .1rem;
				margin-top: .2rem;
			}
			.submit {
				background: #FF8190;
				color: white;
				width: calc(100% - .4rem);
				height: .8rem;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: .15rem;
				margin-top: .5rem;
			}
			input[type='text'] {
				border: 0;
				border-bottom: 1px solid #EFEFF0;
				height: .7rem;
				margin: .2rem 0;
				border-radius: .1rem;
				text-align: right;
			}
			img {
				height: .3rem;
			}
			.input-box {
				display: flex;
				width: calc(100% - .4rem);
				align-items: center;
				padding: .2rem 0;
				border-bottom: 1px solid #EFEFF0;
				input[type='text'] {
					margin: 0;
					border: 0;
				}
			}
		}
	}
	
	#bottomnav {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, .5);
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		z-index: 9999;
		color: #666666;
		.submit {
			width: calc(100% - .4rem);
			height: .7rem;
			background: #FF8190;
			color: white;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: .1rem;
			margin: .2rem 0 .4rem;
		}
		.nav-box {
			background: white;
			width: calc(100% - .4rem);
			border-radius: .1rem;
			display: flex;
			flex-direction: column;
			overflow: hidden;
			.nav {
				border-bottom: 1px solid #E3E3E3;
				height: .7rem;
				line-height: .7rem;
				text-align: center;
			}
		}
	}
</style>