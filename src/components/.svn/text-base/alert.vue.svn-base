<template>
  <div id="alert">
    	<div id="alert-main">
    		<h1>
    			提示
    		</h1>
    		<p>
    			{{alerttext}}
    		</p>
    		<div id="alert-setting">
    			<span @click="alerttrue">
    				确定
    			</span>
    			<span @click="alertboo">
    				取消
    			</span>
    		</div>
    	</div>
  </div>
</template>

<script>
export default {
  name: 'alert',
  data () {
    return {
      
    }
  },
  mounted(){
  
  },
  methods:{
		alertboo:function(){
			this.$emit('alertboo')
		},
		alerttrue:function(){
			this.$emit('alerttrue')
		}
  },
  computed:{
  	alerttext(){
  		return this.$store.state.alerttext
  	}
  }
}
</script>

<style type="text/css" lang="scss">
	
</style>
