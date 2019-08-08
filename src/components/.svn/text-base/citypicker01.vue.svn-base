<template>
  <div id="citypicker">
    	<v-distpicker type="mobile" @selected="onSelected"></v-distpicker>
    	<div class="city-setting">
				<div @click="citychange(0)">
					确定
				</div>
				<div @click="citychange(1)">
					取消
				</div>
			</div>
  </div>
</template>

<script>
	import VDistpicker from 'v-distpicker'
	export default {
	  name: 'citypicker',
	  data () {
	    return {
	      
	    }
	  },
	  mounted(){
	  	
	  },
	  methods:{
	  	onSelected:function(data){
				this.$store.state.province01 = data.province.value
				this.$store.state.city01 = data.city.value
				this.$store.state.area01 = data.area.value
			},
			citychange:function(type){
				if(type==0){
					if(this.$store.state.province01=='选择现在住址'){
						this.$store.state.alerttext='地址选择不完整'
						this.$emit('alertchange')
					}
					this.$emit('citychange')
				}else{
					this.$store.state.province01='选择现在住址'
					this.$emit('citychange')
				}
			}
	  },
	  computed:{
	  	province01(){
	  		return this.$store.state.province01
	  	},
	  	city01(){
	  		return this.$store.state.city01
	  	},
	  	area01(){
	  		return this.$store.state.area01
	  	}
	  },
		components:{
			VDistpicker 
		}
	}
</script>

<style type="text/css" lang="scss" scoped="scoped">
	#citypicker{position: absolute;width: 100%;height: 100%;top: 0;left: 0;background: #FFFFFF;z-index: 999;}
	.distpicker-address-wrapper{position: absolute;top: 0;left: 0;width: 100%;z-index: 999;height: calc(100% - 1rem)!important;overflow: hidden;}
	.address-container{height: calc(100% - 34px);overflow-y: scroll;}
	.city-setting{height: 1rem;width: 100%;display: flex;align-items: center;bottom: 0;left: 0;position: absolute;background: white;color: #9caebf;border-top: 1px solid #9caebf;box-sizing: border-box;justify-content: space-around;font-size: .26rem;
		}

</style>
