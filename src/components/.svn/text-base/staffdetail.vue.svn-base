<template>
	<div class="staffdetail" id="wrapper">
		<t-head></t-head>
		<div id="main">
			<form action="">
				<div class="input-group" v-if="usTraderEmployeeId==''">
					<input type="text" placeholder="姓名" v-model="usTeName" />
				</div>
				<div class="input-group" v-if="usTraderEmployeeId==''">
					<input type="text" placeholder="职位名称" v-model="usTpName" />
				</div>
				<div class="input-group" v-if="usTraderEmployeeId==''">
					<input type="number" placeholder="手机号" v-model="phone" />
				</div>
				<div class="input-group" v-if="usTraderEmployeeId==''" style="margin-bottom: .2rem;">
					<div class="title">
						性别
					</div>
					<label for="man">男</label>
					<input type="radio" v-model="usTeSex" name="usTeSex" id="man" value="1" />
					<label for="man">女</label>
					<input type="radio" v-model="usTeSex" name="usTeSex" id="wman" value="2" />
				</div>
				<div class="input-group">
					<input type="number" placeholder="身份证号" v-model="myusTeCardId" />
				</div>
				<!--<div class="input-group" @click="bottomshow" v-if="usTraderEmployeeId==''">
					<input type="text" placeholder="选择权限" v-model="power02" readonly="" />
				</div>-->
				<div class="input-group" @click="citychange">
					<input type="text" placeholder="请选择员工地址" v-model='area' readonly="readonly" />
				</div>
				<div class="input-group">
					<input type="text" placeholder="详细地址" v-model="myusTeDetailed" />
				</div>
				<input type="button" name="mysubmit" id="mysubmit" value="提交" @click="gosubmit" />
			</form>
			<transition name='fade'>
				<city-picker v-show='cityboo' @citychange="citychange" @alertchange="alertchange"></city-picker>
			</transition>
			<transition name='alert'>
				<alert v-show='alertboo' @alertchange="alertchange" @alerttrue="alertchange"></alert>
			</transition>
			<transition name='bottom'>
				<div id="bottomnav" v-show='bottomboo'>
					<div class="nav-box">
						<div class="nav" v-for="(val,index) in bottomdata" @click="navclick(index)" :class="val.choice==true?'active':''">
							{{val.usTpsName}}
						</div>
					</div>
					<div class="submit" @click="submit">
						确定
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'userregister',
		data() {
			return {
				phone: '',
				uploadtarget: '',
				files: [],
				cityboo: false,
				alertboo: false,
				usTeName: '',
				shopname: '',
				bottomboo: false,
				bottomtext: '',
				zname: '',
				bottomdata: [],
				power: [],
				myusTeDetailed: '',
				usTrName: '',
				myusTeCardId: '',
				usTeSex: 1,
				usTpName: '',
				power02: []
			}
		},
		mounted() {
			if(this.usTraderEmployeeId == '') {
				this.$store.state.head = '添加员工'
			} else {
				this.$store.state.head = '编辑员工'
				this.myusTeCardId = this.usTeCardId
				this.myusTeDetailed = this.usTeDetailed
			}

			this.myajax()
		},
		methods: {
			myajax: function() {
				var that = this
				$.ajax({
					type: "post",
					url: that.myurl + "/selectUsTraderPages",
					dataType: 'json',
					success: function(res) {
						//						for(var i = 0; i < res.data.length; i++) {
						//							res.data[i].choice = false
						//						}
						that.power.push(res.data[8].usTraderPagesId)
						//						that.bottomdata = res.data
					}
				});
			},
			navclick: function(index) {
				this.bottomdata[index].choice = !this.bottomdata[index].choice
			},
			submit: function() {
				this.power = []
				for(var i = 0; i < this.bottomdata.length; i++) {
					if(this.bottomdata[i].choice == true) {
						this.power.push(this.bottomdata[i].usTraderPagesId)
						this.power02.push(this.bottomdata[i].usTpsName)
					}
				}
				this.bottomshow()
			},
			bottomshow: function(id) {
				this.bottomboo = !this.bottomboo
			},
			alertchange: function() {
				this.alertboo = !this.alertboo
			},
			citychange: function() {
				this.cityboo = !this.cityboo
			},
			opennew: function(target) {
				this.$router.push({
					name: target
				});
			},
			gosubmit: function() {
				var that = this
				if(this.usTraderEmployeeId == '') {
					$.ajax({
						type: "post",
						url: that.myurl + "/usTraderEmployeeLogin",
						data: {
							phone: that.phone
						},
						dataType: 'json',
						success: function(res) {
							if(res.data == 0) {
								var ajaxjson = {
									usTraderId: localStorage.getItem('userid'),
									usTeName: that.usTeName,
									usTeSex: that.usTeSex,
									usTeCardId: that.myusTeCardId,
									usTeProvince: that.province,
									usTeCity: that.city,
									usTeArea: that.area,
									usTeDetailed: that.myusTeDetailed,
									usTrName: that.usTrName,
									param: that.power,
									usTePhone: that.phone,
									usTpName: that.usTpName
								}
								$.ajax({
									type: "post",
									url: that.myurl + "/insertTraderEmployee",
									dataType: 'json',
									data: ajaxjson,
									success: function(res) {
										if(res.data == 1) {
											plus.nativeUI.toast('添加成功')
											that.$router.back()
										} else {
											plus.nativeUI.toast('添加失败')
										}
									}
								});
							} else {
								alert('手机号已存在！')
							}
						}
					});

				} else {
					var ajaxjson = {
						usTraderId: localStorage.getItem('userid'),
						usTeName: that.usTeName,
						usTeSex: that.usTeSex,
						usTeCardId: that.myusTeCardId,
						usTeProvince: that.province,
						usTeCity: that.city,
						usTeArea: that.area,
						usTeDetailed: that.myusTeDetailed,
						usTrName: that.usTrName,
						param: "['1']"
					}
					console.log(ajaxjson)
					$.ajax({
						type: "post",
						url: that.myurl + "/insertTraderEmployee",
						dataType: 'json',
						data: ajaxjson,
						success: function(res) {
							console.log(res)
							if(res.data == 1) {
								alert('编辑成功')
							} else {
								alert('编辑失败')
							}
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
			usTraderEmployeeId() {
				return this.$store.state.usTraderEmployeeId
			},
			usTeCardId() {
				return this.$store.state.usTeCardId
			},
			usTeDetailed() {
				return this.$store.state.usTeDetailed
			}
		},
		components: {
			cityPicker: resolve => require(['./citypicker'], resolve),
			alert: resolve => require(['./alert'], resolve),
			THead: resolve => require(['./head'], resolve)
		}
	}
</script>

<style type="text/css" lang="scss" scoped="scoped">
	.staffdetail .head {
		background: white;
		height: .7rem;
	}
	
	.staffdetail .title {
		width: 4rem;
	}
	
	.staffdetail input {
		color: #333333!important;
	}
	
	.staffdetail input::-webkit-input-placeholder {
		color: #333333!important;
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
		margin: 0 .3rem!important;
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
	
	.staffdetail .head img {
		height: .3rem;
	}
	
	.staffdetail .logo {
		width: 1.5rem;
		height: 1.5rem;
		margin: 1rem auto .7rem;
		display: block;
	}
	
	.staffdetail .input-group {
		padding: .2rem .4rem;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		background: #FFFFFF;
	}
	
	.staffdetail .input-group img {
		width: .35rem;
		margin: 0 .1rem;
	}
	
	.staffdetail .input-group input {
		margin: 0;
		padding: 0;
		border: 0;
		flex: 1;
		height: .6rem;
		font-size: .2rem;
		border-bottom: 1px solid #D8D8D8;
	}
	.staffdetail .input-group input[type='radio']{border: 0;}
	.staffdetail .input-group span {
		flex: 1;
		text-align: right
	}
	
	.staffdetail .main {
		overflow: hidden;
		color: white;
	}
	
	.staffdetail h1 {
		margin: .2rem;
		font-size: .23rem;
		display: block;
		font-weight: 400;
	}
	
	.staffdetail .group02 {
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
	
	.staffdetail {
		position: relative;
		color: white;
	}
	
	.staffdetail video {
		position: fixed;
		height: 100%;
		top: 0;
		left: 0;
	}
	
	.staffdetail form {
		position: relative;
		z-index: 3;
	}
	
	.staffdetail input {
		background: none;
		color: #666666;
	}
	
	.staffdetail input:-webkit-input-placeholder {
		color: #666666;
	}
	
	.staffdetail .upimg {
		width: .8rem!important;
	}
	#mysubmit {
			width: 6rem;
			height: .92rem;
			color: #FFFFFF!important;
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
		.active {
			background: #FF8190;
			color: white;
			border-color: white!important;
		}
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
			color: #FFFFFF;
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