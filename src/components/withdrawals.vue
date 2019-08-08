<template>
  <div id="wrapper" class="withdrawals">
    <t-head></t-head>
    <div id="main" v-if="mydata01!=''">
      <div class="group-box">
        <input type="text" v-model="mtype" placeholder="点击选择提现方式" readonly="readonly" @click="btnshow" />
        <img src="../../static/arr02.png" />
      </div>
      <div class="group-box itext">
        提现金额
      </div>
      <div class="group-box borb">
        <span class="dor">¥</span>
        <input type="number" v-model="phone" placeholder="请输入提现金额" @input="inputblur" />
      </div>
      <div class="group-box guize">
        余额:{{mydata.usTwPrice}}元 <strong>满10元可提现</strong>
      </div>
      <!-- <input type="text" placeholder="请输入提现账号" v-model="usTaCard" /> -->
      <!-- 			<div class="group-box top bottom">
				提现手续费：{{phone * (mydata01[0].maAtrPoundage/100)}}
			</div> -->
      <div class="group-box bbox">
        <div class="mysubmit02" @click="pay">
          提交
        </div>
      </div>
    </div>
    <div id="bottomnav" v-if="bottomboo" @click="btnshow">
      <div class="nav-box">
        <div class="nav" v-for="val in bottomdata" @click.stop="navclick(val)" :class="val.id==id?'active':''">
          {{val.text}}
        </div>

      </div>
      <div class="mysubmit" style="position: initial!important;">
        确定
      </div>
    </div>
  </div>
</template>

<script>
  export default {
		name: 'withdrawals',
		data() {
			return {
				bottomboo: false,
				mtype: '',
				phone: '',
				mydata: '',
				mydata01: '',
				bottomdata: [{
					text: '支付宝',
					id: 1
				}
    //     , {
				// 	text: '微信',
				// 	id: 2
				// }, {
				// 	text: '银行卡',
				// 	id: 3
				// },
        ],
				id: '',
				usTaCard: ''
			}
		},
		mounted() {
			this.$store.state.head = '提现'
			this.myajax()
		},
		methods: {
			inputblur:function(){
				this.phone=this.phone.replace(/[^\d\.]/g,'')
			},
			navclick: function(val) {
				this.mtype = val.text
				this.id = val.id
			},
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			},
			btnshow: function() {
				this.bottomboo = !this.bottomboo
			},
			pay: function() {
				var that = this
							$.ajax({
								type: "post",
								url: that.myurl + "/updatePutForwardTrader",
								dataType: 'json',
								data: {
									usTwPricePutForward: that.phone,
									usTraderId: localStorage.getItem('userid')
								},
								success: function(res) {
									if(res.status == 200 && res.data == 1) {
										plus.nativeUI.toast('提现成功')
										that.$router.back()
									} else {
										alert('提现失败')
									}
								}
							});

			},
			myajax: function() {
				var that = this
				$.ajax({
					type: "post",
					url: that.myurl + "/selectMyWalletStatistics",
					dataType: 'json',
					data: {
						usTraderId: localStorage.getItem('userid')
					},
					success: function(res) {
						that.mydata = res.data
					}
				});
				$.ajax({
					type: "post",
					url: that.myurl03 + "/role/findForwardRoles",
					data: {
						num: 2
					},
					success: function(res) {
						that.mydata01 = res.data
					}
				});
			}
		},
		computed: {
			tfoot() {
				return this.$store.state.tfoot
			},
			myurl() {
				return this.$store.state.myurl
			},
			myurl03() {
				return this.$store.state.myurl03
			}
		},
		components: {
			THead: resolve => require(['./head'], resolve),
			BottomNav: resolve => require(['./bottomnav'], resolve)
		}
	}
</script>

<style type="text/css" lang="scss" scoped="scoped">
  .withdrawals {

    .group-box {
      display: flex;
      background: #ffffff;
      align-items: center;
      margin: .1rem .2rem;

      img {
        height: .3rem;
        margin-right: .2rem;
      }

      input {
        flex: 1;
      }

      .dor {
        font-size: .72rem;
        font-weight: 600;
        margin-left: .7rem;
        border-bottom: 1px solid #D4D4D4;
        height: .8rem;
      }
    }

    .borb {
      margin: 0 .2rem;
    }

    .borb input {
      border-bottom: 1px solid #D4D4D4;
      margin-right: .7rem;
    }

    .itext {
      font-size: .28rem;
      color: #272727;
      margin: 0 .2rem;
      padding: .2rem 0 .32rem .65rem;
      font-weight: 600;
    }

    .guize {
      margin: 0 .2rem;
      padding: .32rem 0 .4rem .7rem;
      font-size: .2rem;

      strong {
        color: #FF9385;
      }
    }

    .bbox {
      margin-top: 0;
      padding: .2rem 0 .46rem 0;
    }

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
      z-index: 9999;
      color: #666666;

      .mysubmit {
        width: calc(100% - .4rem);
        height: .7rem;
        background: #FF8190;
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

      .active {
        background: #FF8190;
        color: #FFFFFF;
      }
    }

    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: .2rem;
      font-size: .3rem;

      .condition {
        color: rgb(280, 80, 60);
        font-size: .2rem;
      }
    }

    input {
      text-indent: .15rem;
      border: 0;
      height: .8rem;
    }

    .bottom {
      font-size: .2rem;
      margin-top: .1rem;
      text-indent: .1rem;
    }

    .mysubmit02 {
      display: flex;
      align-items: center;
      width: 6rem;
      border-radius: .1rem;
      background: #FF8190;
      color: white;
      border-radius: .1rem;
      justify-content: center;
      height: .8rem;
      margin: 0 auto;
    }
  }
</style>
