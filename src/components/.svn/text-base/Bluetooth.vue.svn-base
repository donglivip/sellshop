<template>
	<div id="wrapper" class="Bluetooth">
		<t-head></t-head>
		<div id="main">
			<div class="bluelist" @click="changeblue(val.deviceId)" :class="bid==val.deviceId?'active':''" v-for="val in bluedata" v-if="val.localName!=''">
				{{val.localName}}
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'Bluetooth',
		data() {
			return {
				bluedata: [],
				bid: ''
			}
		},
		mounted() {
			var that = this
			this.$store.state.head = '设置打印机'
			this.bid = localStorage.getItem('bid')
			if(window.plus) {
				that.startBluetoothDiscovery()
			} else {
				document.addEventListener("plusready", that.startBluetoothDiscovery(), false);
			}
		},
		methods: {
			changeblue: function(bid) {
				localStorage.setItem('bid', bid)
				this.bid = bid
				plus.nativeUI.toast('默认打印机已修改！')
			},
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			},
			// 开始搜索蓝牙
			startBluetoothDiscovery: function() {
				plus.nativeUI.toast('搜索蓝牙中')
				var that = this
				plus.bluetooth.openBluetoothAdapter({
					success: function(e) {
						plus.bluetooth.startBluetoothDevicesDiscovery({
							success: function(e) {
								setInterval(function() {
									that.getBluetoothDevices()
								}, 1000)
							},
							fail: function(e) {
								alert('打开蓝牙失败，请检查后重试！');
							}
						});
					},
					fail: function(e) {
						alert('打开蓝牙失败，请检查后重试！');
					}
				});
			},
			// 获取已搜索到的蓝牙设备
			getBluetoothDevices: function() {
				var that = this
				plus.bluetooth.getBluetoothDevices({
					success: function(e) {
						that.bluedata = e.devices;
					},
					fail: function(e) {
						console.log('get devices failed: ' + JSON.stringify(e));
					}
				});
			},
			// 结束搜索蓝牙
			stopBluetoothDiscovery: function() {
				plus.bluetooth.stopBluetoothDevicesDiscovery({
					success: function(e) {
						plus.bluetooth.closeBluetoothAdapter({
							success: function(e) {
								console.log('close success: ' + JSON.stringify(e));
							},
							fail: function(e) {
								console.log('close failed: ' + JSON.stringify(e));
							}
						});
					},
					fail: function(e) {
						console.log('stop discovery failed: ' + JSON.stringify(e));
					}
				});
			}
		},
		computed: {

		},
		components: {
			THead: resolve => require(['./head'], resolve),
		}
	}
</script>

<style type="text/css" lang="scss">
	.Bluetooth {
		.bluelist {
			height: .8rem;
			display: flex;
			align-items: center;
			text-indent: .3rem;
			background: #FFFFFF;
			border-bottom: 1px solid #F4F4F4;
		}
		.active {
			color: #FFC408;
			border: 1px solid #FFC408;
		}
	}
</style>