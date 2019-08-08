<template>
	<div id="bottomnav">
		<div class="nav-box">
			<div class="nav" v-for="val in bottomdata" @click="navclick(val)">
				{{val}}
			</div>
		</div>
		<div class="mysubmit" @click="submit">
			确定
		</div>
	</div>
</template>

<script>
	export default {
		name: 'index',
		data() {
			return {

			}
		},
		mounted() {

		},
		methods: {
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			},
			navclick: function(id) {
				this.bottomshow(id)
			},
			submit: function() {
				this.bottomshow()
			},
			bottomshow: function(val) {
				this.$emit('bottomshow',val)
			}
		},
		computed: {
			bottomdata() {
				return this.$store.state.bottomdata
			}
		}
	}
</script>

<style type="text/css" lang="scss">
	#bottomnav {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, .5);
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		z-index:9999;
		color:#666666;
		.mysubmit {
			width: calc(100% - .4rem);
			height: .7rem;
			background: #00c6c8;
			color: white;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: .1rem;
			margin: .2rem 0 .4rem;
		}
		.nav-box {
			background: white;
			width: calc(100% - .4rem);
			border-radius: .1rem;
			display: flex;
			flex-direction: column;
			overflow: hidden;
			.nav {
				border-bottom: 1px solid #E3E3E3;
				height: .7rem;
				line-height: .7rem;
				text-align: center;
			}
		}
	}
</style>