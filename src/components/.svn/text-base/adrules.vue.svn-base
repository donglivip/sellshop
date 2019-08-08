<template>
  <div id="wrapper" class="adrules">
    	<t-head></t-head>
    	<div id="main">
    		<div class="question-box">
    			<div class="question">
    				1.什么是广告分成？
    			</div>
    			<div class="answer">
    				答：广告分成就是用户在付完款以后，会跳出一个其他商户广告页面，用户可以直接点击进入，可以领取优惠卷或者关注店铺，财务管理中的广告收益就是广告分成所产生的收益！
    			</div>
    		</div>
    		<div class="question-box">
    			<div class="question">
    				2.为什么要开启广告分成？
    			</div>
    			<div class="answer">
    				答：开启广告分成会产生广告收益，增加您的收入！
    			</div>
    		</div>
    		<div class="question-box">
    			<div class="question">
    				2.广告分成的规则是什么样的？
    			</div>
    			<div class="answer">
    				答：广告收益的85%属于商户，15%属于总部！
    			</div>
    		</div>
    	</div>
  </div>
</template>

<script>
export default {
  name: 'adrules',
  data () {
    return {
      
    }
  },
  mounted(){
  	this.$store.state.head='广告分成规则'
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
  	THead:resolve => require(['./head'],resolve)
  }
}
</script>

<style type="text/css" lang="scss">
	.adrules{
		.question-box{
			background: white;
			width: calc(100% - .4rem);
			margin: .2rem;
			box-shadow: 0 0 10px .1rem gainsboro;
			border-radius: .1rem;
			padding: .2rem;
			box-sizing: border-box;
			.question{
				font-size: .3rem;
				font-weight: 600;
			}
			.answer{
				padding: .2rem;
				line-height: .35rem;
			}
		}
	}
</style>
