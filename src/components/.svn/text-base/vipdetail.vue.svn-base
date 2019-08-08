<template>
	<div id="wrapper" class="vipdetail">
		<t-head></t-head>
		<div id="main">
			<form action="">
				<div class="input-box" @click="timeshow">
					<input type="text" placeholder="请输入会员到期时间" readonly="readonly" v-model="time" />
					<img src="../../static/down.png" />
				</div>
				<!--<div class="input-box" @click="bottomshow">
	    			<input type="text" placeholder="请选择会员等级" readonly="readonly" v-model="viptext"/>
	    			<img src="../../static/down.png"/>
	    		</div>-->
			</form>
			<div class="submit" @click="submit">
				提交修改
			</div>
		</div>
		<transition name='bottom'>
			<bottom-nav @bottomshow='bottomshow' v-show='bshow'></bottom-nav>
		</transition>
		<calendar @change="handelChange" v-model='calendarShow'></calendar>
	</div>
</template>

<script>
	export default {
		name: 'vipdetail',
		data() {
			return {
				bshow: false,
				calendarShow: false,
				time: '',
				viptext: '',
				usTrName: ''
			}
		},
		mounted() {
			this.$store.state.head = '会员信息修改'
		},
		methods: {
			submit: function() {
				var that = this
				that.time = that.time.replace(/-/g, "/");
				$.ajax({
					type: "post",
					url: that.myurl + "/updateTraderMember",
					data: {
						usMemberId: that.usMemberId,
						usTraderMemberCardId: that.usTraderMemberCardId,
						usTrName: localStorage.getItem('username'),
						usMeLimitTime: new Date(that.time)
					},
					success: function(res) {
						console.log(res)
						if(res.data==1){
							alert('修改完成')
						}else{
							alert('修改失败')
						}
					}
				});
			},
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			},
			bottomshow: function(id) {
				this.bshow = !this.bshow
				this.viptext = id
			},
			handelChange: function(date, formatDate) {
				this.time = formatDate
			},
			timeshow: function() {
				this.calendarShow = !this.calendarShow
			}
		},
		computed: {
			myurl() {
				return this.$store.state.myurl
			},
			usMemberId() {
				return this.$store.state.usMemberId
			},
			usTraderMemberCardId() {
				return this.$store.state.usTraderMemberCardId
			}
		},
		components: {
			THead: resolve => require(['./head'], resolve),
			BottomNav: resolve => require(['./bottomnav'], resolve),
		}
	}
</script>

<style type="text/css" lang="scss">
	.vipdetail {
		#main {
			display: flex;
			align-items: center;
			flex-direction: column;
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
			input {
				width: calc(100% - .4rem);
				border: 0;
				border-bottom: 1px solid #EFEFF0;
				height: .7rem;
				margin: .2rem 0;
				text-indent: .2rem;
				border-radius: .1rem;
			}
			img {
				height: .3rem;
			}
			.input-box {
				display: flex;
				width: calc(100% - .4rem);
				align-items: center;
				margin: .2rem 0;
				border-bottom: 1px solid #EFEFF0;
				input {
					width: 100%;
					margin: 0;
					border: 0;
				}
			}
		}
	}
</style>