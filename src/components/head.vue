<template>
  <div id="head">
    	<span @click="back">
    		<img src="../../static/arrleft.png"/></span>
    	<div>
    		{{head}}
    	</div>
    	<span></span>
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

  },
  methods:{
		opennew:function(target){
			this.$router.push({
				name:target
			})
		},
		back:function(){
			this.$router.back()
		}
  },
  computed:{
  	head(){
  		return this.$store.state.head
  	}
  }
}
</script>

<style type="text/css" lang="scss">

</style>
