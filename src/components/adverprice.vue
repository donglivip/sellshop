<template>
  <div id="wrapper">
    	<t-head></t-head>
    	<div id="main">
    		<p>暂缺</p>
    	</div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      
    }
  },
  mounted(){
  	this.$store.state.head='广告价格明细'
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
	
</style>
