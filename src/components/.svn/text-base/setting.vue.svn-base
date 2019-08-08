<template>
  <div class="wapper set" id="wrapper">
  	<t-head></t-head>
		<div class="main" id="main">
			<!--<div class="message">
				<div class="group" @click="opennew('qqus')">
					<div class="left">
						<img src="../../static/aa_03.png">
						<span>意见反馈</span>
					</div>
					<div class="right">
						<img src="../../static/jian_03.png"> 
					</div>
				</div>
			</div>-->
			<div class="message">
				<div class="group1" @click="backlogin">
					<div class="left">
						<img src="../../static/aa_12.png"> 
						<span>退出登录</span>
					</div>
					<div class="right">
						<img src="../../static/jian_03.png">
					</div>
				</div>
			</div>
		</div>
		</div>
</template>

<script>
export default {
  name: 'setting',
  data () {
    return {
      
    }
  },
  mounted(){
  this.$store.state.head='设置'
  },
  methods:{
		opennew:function(target){
			this.$router.push({
				name:target
			})
		},
		backlogin:function(){
			localStorage.clear()
			this.opennew('login')
		}
  },
  computed:{
  	tfoot(){
  		return this.$store.state.tfoot
  	}
  },
  components:{
  	THead:resolve => require(['./head'],resolve)
  }
}
</script>

<style type="text/css" lang="scss">
	html,.wapper,.main,body{padding: 0px;margin: 0px;font-size: .23rem;height: 100%;}
		.set{background:rgb(239,239,239);}
		.set .group img,.group1 img{height: .35rem;margin:0 .12rem;}
		.set .message{margin-top:.2rem;background: #FFFFFF;}
		.set .group,.group1{height: .8rem;display: flex;align-items: center;border-bottom: 1px solid rgb(239,239,239);justify-content: space-between;padding:0 .2rem;}
		.set .group,.group1 .left{display: flex;align-items: center;}
		.set .secret{margin: .2rem 0;}
		.set .left,.right{display: flex;}
		.set .liuliang{color: #FFC408;display: flex;align-items: center;}
</style>
