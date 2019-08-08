<template>
	<div id="wrapper" class="rider">
		<t-head></t-head>
		<div id="main">
			<div class="group" v-for="(val,index) in mydata" @click="addrider(val.usRiderId,val.usTraderName,val.usRiPhone,val.usRiSex,val.usRiDetailed,val.usRiCardId)">
				<div class="delete-box" @click.stop="godelete(val.usRiderId,index)">
					<img src="../../static/delete.png" />
				</div>
				<img :src="val.usRiHeadImgUrl | myimg" class="avatar" />
				<div class="text">
					<div class="name">
						{{val.usRiName}}
					</div>
					<div class="start-box">
						<img src="../../static/star-no.png" class="star-no" />
						<img src="../../static/star-no.png" class="star-no" />
						<img src="../../static/star-no.png" class="star-no" />
						<img src="../../static/star-no.png" class="star-no" />
						<img src="../../static/star-no.png" class="star-no" />
						<div class="star-wrapper" v-if="val.usRiStar!=-1">
							<img src="../../static/star.png" class="star" v-for="item in val.usRiStar" />
						</div>
					</div>
					<div class="adress">
						{{val.usRiServingCity}}
					</div>
				</div>
				<div class="phone">
					<a :href="['tel:'+val.usRiPhone]">
						<img src="../../static/detail_03.png" />
					</a>
				</div>
			</div>
		</div>
		<div class="add-box" @click="opennew('addrider')">
			<img src="../../static/add.png" />
		</div>
		<transition name='alert'>
			<alert v-show='alertshow' @alertboo='alertboo' @alerttrue='alerttrue'></alert>
		</transition>
	</div>
</template>

<script>
	export default {
		name: 'rider',
		data() {
			return {
				alertshow: false,
				mydata: [],
				usRiderId: '',
				index: ''
			}
		},
		mounted() {
			this.$store.state.head = '骑手管理'
			this.myajax()
		},
		methods: {
			addrider: function(usRiderId, usTraderName, usRiPhone, usRiSex, usRiDetailed, usRiCardId) {
				this.$store.state.usRiderId = usRiderId
				this.$store.state.usTraderName = usTraderName
				this.$store.state.usRiPhone = usRiPhone
				this.$store.state.usRiSex = usRiSex
				this.$store.state.usRiDetailed = usRiDetailed
				this.$store.state.usRiCardId = usRiCardId
				this.opennew('addrider')
			},
			myajax: function() {
				var that = this
				$.ajax({
					type: "post",
					url: that.myurl + "/selectTraderRider",
					dataType: 'json',
					data: {
						usTraderId: localStorage.getItem('userid')
					},
					success: function(res) {
						console.log(res)
						that.mydata = res.data
					}
				});
			},
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			},
			godelete: function(usRiderId, index) {
				this.usRiderId = usRiderId
				this.index = index
				this.$store.state.alerttext = '确定删除骑手吗？'
				this.alertboo()
			},
			alertboo: function() {
				this.alertshow = !this.alertshow
			},
			alerttrue: function() {
				console.log(this.usRiderId)
				this.alertboo()
				var that = this
				$.ajax({
					type: "post",
					url: that.myurl + "/deleteTraderRider",
					dataType: 'json',
					data: {
						usRiderId: that.usRiderId
					},
					success: function(res) {
						console.log(res)
						if(res.data == 1) {
							that.mydata.splice(that.index, 1)
						}
					}
				});
			}
		},
		components: {
			THead: resolve => require(['./head'], resolve),
			alert: resolve => require(['./alert'], resolve)
		},
		computed: {
			myurl() {
				return this.$store.state.myurl
			}
		},
		filters: {
			myimg: function(value) {
				if(value != null) {
					return localStorage.getItem('myimg') +'/'+ value.substring(value.indexOf('D:') + 2)
				}
			}
		}
	}
</script>

<style type="text/css" lang="scss">
	.rider {
		.add-box {
			width: .7rem;
			height: .7rem;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			bottom: .3rem;
			right: .3rem;
			background: #FFC408;
			img {
				width: .4rem;
				height: .4rem;
			}
		}
		.group {
			width: calc(100% - .6rem);
			background: white;
			border-radius: .1rem;
			box-shadow: 0 0 10px .1rem gainsboro;
			margin: .15rem auto;
			display: flex;
			padding: .4rem .2rem;
			align-items: center;
			position: relative;
			a {
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.phone {
				width: .8rem;
				height: .8rem;
				border-radius: 50%;
				border: 1px solid #999999;
				display: flex;
				align-items: center;
				justify-content: center;
				img {
					width: 70%;
					height: 70%;
				}
			}
			.avatar {
				width: 1.2rem;
				height: 1.2rem;
				border-radius: 50%;
				margin-right: .2rem;
			}
			.text {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 1.1rem;
				margin-top: .2rem;
			}
			.name {
				font-size: .25rem;
				font-weight: 600;
				flex: 1;
			}
			.start-box {
				display: flex;
				position: relative;
				margin: .15rem 0;
				.star-wrapper {
					position: absolute;
					left: -.2rem;
					width: 100%;
					height: .2rem;
				}
				img {
					width: .2rem;
					height: .2rem;
				}
				.star {
					position: absolute;
				}
				@for $i from 1 through 5 {
					.star:nth-of-type(#{$i}) {
						left: .2rem * $i;
					}
				}
			}
			.delete-box {
				position: absolute;
				top: -.05rem;
				right: -.05rem;
				background: #d81e06;
				display: flex;
				align-items: center;
				justify-content: center;
				width: .7rem;
				height: .4rem;
				border-bottom-left-radius: .3rem;
				border-top-right-radius: .05rem;
				img {
					width: .25rem;
					height: .25rem;
				}
			}
		}
	}
</style>