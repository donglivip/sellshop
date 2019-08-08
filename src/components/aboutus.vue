<template>
  <div id="wrapper" class="about">
    	<t-head></t-head>
    	<div id="main">
    		<image src="../../static/logo.png"></image>
    		<div class="name">外卖</div>
    		<div class="num">
    			版本号: 1.3.0
    		</div>
    		<div class="group">
    			<div class="title">
    				邮箱
    			</div>
    			<div class="text">
    				1076454380@qq.com
    			</div>
    		</div>
    		<div class="group">
    			<div class="title">
    				官方公众号
    			</div>
    			<div class="text">
    				1076454380@qq.com
    			</div>
    		</div>
    	</div>
  </div>
</template>

<script>
export default {
  name: 'aboutus',
  data () {
    return {
      
    }
  },
  mounted(){
  	this.$store.state.head='关于我们'
  },
  methods:{
		opennew:function(target){
			this.$router.push({
				name:target
			})
		}
  },
  computed:{
  	tfoot(){
  		return this.$store.state.tfoot
  	}
  },
  components:{
  	THead:resolve => require(['./head'],resolve),
  }
}
</script>

<style type="text/css" lang="scss">
	.about{
		#main{
			background:#FFFFFF;
			img{
				width: .6rem;
				height: .6rem;
				border-radius: .1rem;
				display: block;
				margin: 1.4rem auto 0;
			}
			.name{
				text-align: center;
				line-height: .7rem;
				font-weight: 600;
			}
			.num{
				text-align: center;
				color: #969696;
				margin-bottom: .2rem;
			}
			.group{
				background: white;
				display: flex;
				align-items: center;
				height: .7rem;
				.title{
					margin: 0 .2rem;
				}
				.text{
					color: #969696;
					font-size: .2rem;
				}
			}
		}
	}
</style>
