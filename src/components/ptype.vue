<template>
	<div class="login" id="wrapper">
		<t-head></t-head>
		<div id="main" class="addshop">
			<form action="">
				<div class="input-group">
					<span>平台配送</span>
					<img src="../../static/open02.png" style="height: .4rem;"/>
				</div>
				<div class="input-group">
					<span>自配送</span>
					<img src="../../static/open02.png" style="height: .4rem;"/>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'userregister',
		data() {
			return {
				mydata:[]
			}
		},
		mounted() {
			this.$store.state.head = '配送方式'
			this.myajax()
		},
		methods: {
			myajax:function(){
				var that=this
				$.ajax({
					type: "post",
					url: that.myurl + "/selectUsTraderEmployeeAll",
					dataType: 'json',
					data: {
						usTraderId: localStorage.getItem('userid')
					},
					success: function(res) {
						that.mydata = res.data
					}
				});
			},
			opennew: function(target) {
				this.$router.push({
					name: target
				});
			}
		},
		computed: {
			myurl() {
				return this.$store.state.myurl
			}
		},
		components: {
			THead: resolve => require(['./head'], resolve)
		}
	}
</script>

<style type="text/css" lang="scss" scoped="scoped">
	.login .head img {
		height: .3rem;
	}
	
	.login select {
		border: 0;
		width: 2rem;
		height: .5rem;
	}
	
	.login .logo {
		width: 1.5rem;
		height: 1.5rem;
		margin: 1rem auto .7rem;
		display: block;
	}
	
	.login .input-group {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding: .15rem .3rem;
		background: #FFFFFF;
		border-bottom: 1px solid #D8D8D8;
		height: .6rem;
		&:first-of-type{margin-top: .2rem;}
	}
	
	.login .input-group img {
		height: .25rem;
	}
	
	.login .input-group input {
		margin: 0;
		padding: 0;
		border: 0;
		flex: 1;
		text-align: right;
		font-size: .2rem;
	}
	
	
	
	.login .input-group span {
		flex: 1;
		text-align: left;
		font-weight: 600;
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
		color: white;
	}
	
	.login input::-webkit-input-placeholder {
		color: #666666;
	}
	
	.login .upimg {
		width: .8rem!important;
	}
	
	.login label {
		font-size: .2rem;
	}
	
	.title01 {
		flex: 1;
		color: #666666;
		font-size: .2rem;
	}
	
	input[type='radio'] {
		flex: none!important;
		margin: 0 .2rem!important;
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
		line-height: 20px;
		color: #d8d8d8;
		align-items: center;
		justify-content: center;
	}
	
	input[type=file] {
		opacity: 0;
	}
	
	input[type=radio]:after {
		content: '';
		display: block;
		width: .4rem;
		height: .4rem;
		border-radius: 50%;
		text-align: center;
		color: #fff;
		border: 1px solid #ddd;
		background-color: #fff;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	input[type=radio]:checked:after {
		content: "⚪";
		display: block;
		margin: 0 auto;
		border-color: #FF8190;
		background-color: #FF8190;
		width: .4rem;
		height: .4rem;
	}
	
	.addshop input {
		color: #333333
	}
	
	.addshop input::-webkit-input-placeholder {
		color: #333333!important;
	}
	.login #mysubmit {
		width: 6.5rem;
		height: .8rem;
		color: #FFFFFF;
		background: #FF8190;
		display: flex;
		align-items: center;
		justify-content: center;
		display: block;
		border: 0;
		padding: 0;
		margin: .8rem auto .2rem;
	}
</style>