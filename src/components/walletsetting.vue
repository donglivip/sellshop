<template>
  <div id="wrapper" class="walletsetting">
    	<t-head></t-head>
    	<div id="main">
    		<!--<div class="input-group" @click="change(0)">
    			<div class="text">
    				开启三天自动打款
    			</div>
    			<div class="circle" :class="dayboo==true?'active':''">
    				<img src="../../static/yes.png"/>
    			</div>
    		</div>-->
    		<div class="input-group" @click="change(1)">
    			<div class="text">
    				<span>开启广告分成</span>
    				<img src="../../static/question.png" @click.stop="opennew('adrules')"/>
    			</div>
    			<div class="circle" :class="adboo==true?'active':''">
    				<img src="../../static/yes.png"/>
    			</div>
    		</div>
    	</div>
  </div>
</template>

<script>
export default {
  name: 'walletsetting',
  data () {
    return {
      dayboo:false,
      adboo:true
    }
  },
  mounted(){
  this.$store.state.head='钱包设置'
  },
  methods:{
		opennew:function(target){
			this.$router.push({
				name:target
			})
		},
		change:function(Type){
			if(Type==0){
				this.dayboo=!this.dayboo
			}else{
				this.adboo=!this.adboo
			}
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
	.walletsetting{
		.input-group{
			background: white;
			width: calc(100% - .4rem);
			height: .7rem;
			border-radius: .1rem;
			margin:.2rem;
			box-shadow: 0 0 10px .1rem gainsboro;
			display: flex;
			align-items: center;
			img{
				width: .4rem;
				height: .4rem;
				display: none;
			}
			.text{
				text-indent: .2rem;
				flex: 1;
				display: flex;
				align-items: center;
				img{
					display: block!important;
					margin-left: .1rem;
					width: .3rem;
					height: .3rem;
				}
			}
			.circle{
				margin-right: .2rem;
				border: 1px solid gainsboro;
				border-radius: 50%;
				overflow: hidden;
				width: .4rem;
				height: .4rem;
				box-sizing: border-box;
			}
			.active{
				border: none!important;
				img{
					display: block!important;
				}
			}
		}
	}
</style>
