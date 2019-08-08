<template>
  <div id="wrapper" class="orderdetail">
    <div id="head">
      <span @click="back">
        <img src="../../static/backwhite.png" /></span>
      <div>
        订单详情
      </div>
      <span></span>
    </div>
    <div id="main" v-if="mydata!=''">
      <div class="order-top">{{mydata.length}}</div>
      <div class="order-main">
        <div class="order-group">
          <div class="state-group">
            <div class="group" :class="mydata.usOrder.usOrIsCancel>=0?'active':''">
              <div class="img-box">
                <img src="../../static/wait.png" />
              </div>
              <span>
                等待接单
              </span>
            </div>
            <img src="../../static/next-no.png" />
            <div class="group" :class="mydata.usOrder.usOrIsCancel>=1?'active':''">
              <div class="img-box">
                <img src="../../static/qucan.png" />
              </div>
              <span>
                取餐中
              </span>
            </div>
            <img src="../../static/next-no.png" />
            <div class="group" :class="mydata.usOrder.usOrIsCancel>=2?'active':''">
              <div class="img-box">
                <img src="../../static/peisong-no.png" />
              </div>
              <span>
                配送中
              </span>
            </div>
            <img src="../../static/next-no.png" />
            <div class="group" :class="mydata.usOrder.usOrIsCancel>=3?'active':''">
              <div class="img-box">
                <img src="../../static/ok-no.png" />
              </div>
              <span>
                {{mydata.usOrder.usOrIsCancel | state}}
              </span>
            </div>
          </div>
        </div>
        <div class="order-title">
          发票信息
        </div>
        <div class="order-group">
          <div class="inform-group">
            <div class="inform-title">
              备注
            </div>
            <div class="inform-text">
              {{mydata.usOrder.usOrNote}}
            </div>
          </div>
          <div class="inform-group">
            <div class="inform-title">
              订单编号
            </div>
            <div class="inform-text">
              {{orderid}}
            </div>
          </div>
          <div class="inform-group">
            <div class="inform-title">
              配送费
            </div>
            <div class="inform-text">
              ¥{{mydata.maDistribution}}
            </div>
          </div>
           <div class="inform-group">
            <div class="inform-title">
              包装费
            </div>
            <div class="inform-text">
              ¥{{mydata.usOrder.usOrPackingFee}}
            </div>
          </div>
        </div>
        <div class="order-title">
          餐品信息
        </div>
        <div class="order-group">
          <div class="shop-group top">
            <div class="shop-name">
              合计
            </div>
            <div class="shop-num">

            </div>
            <div class="shop-price">
              ¥{{mydata.shoppingAllPrice}}
            </div>
          </div>
          <div class="shop-group" v-for="val in mydata.usOrderDetaileUsTraderShoppingPojoList">
            <div class="shop-name">
              {{val.usTsName}}
            </div>
            <div class="shop-num">
              x{{val.usOdNum}}
            </div>
            <div class="shop-price">
              ¥{{val.usDetailsPrice}}
            </div>
          </div>
        </div>
        <div class="order-title">
          优惠信息
        </div>
        <div class="order-group">
          <div class="shop-group" v-if="mydata.usTraderPackage!=undefined">
            <span>
              商户红包活动
            </span>
            <span class="grey">
              {{mydata.usTraderPackage}}
            </span>
          </div>
          <div class="shop-group" v-if="mydata.usTraderNewActivities!=undefined">
            <span>
              商户新人活动
            </span>
            <span class="grey">
              {{mydata.usTraderNewActivities}}
            </span>
          </div>
          <div class="shop-group" v-if="mydata.usTraderDiscount!=undefined">
            <span>
              商户折扣
            </span>
            <span class="grey">
              {{mydata.usTraderDiscount}}
            </span>
          </div>
          <div class="shop-group" v-if="mydata.usTraderSubtract!=undefined">
            <span>
              商户满减
            </span>
            <span class="grey">
              {{mydata.usTraderSubtract}}
            </span>
          </div>
          <div class="shop-group" v-if="mydata[3]!=null">
            <span>
              商户店铺红包
            </span>
            <span class="grey">
              {{mydata[3].usTpPrice}}
            </span>
          </div>
        </div>
        <div class="order-title">
          配送信息
        </div>
        <div class="order-group">

          <div class="shop-group adress">
            <div class="shop-name">
              <img src="../../static/end.png" />
            </div>
            <div class="shop-num">
              <p>
                {{mydata.listUsTriderPojo[0].traderAddress}}
              </p>
              <p>
                <span>
                  {{mydata.listUsTriderPojo[0].usTsCompanyName}}
                </span>
                <span>
                  <a :href="['tel:'+mydata.listUsTriderPojo[0].usTsPhone+'']">{{mydata.listUsTriderPojo[0].usTsPhone}}</a>
                </span>
              </p>
            </div>
          </div>
          <div class="shop-group adress">
            <div class="shop-name">
              <img src="../../static/start.png" />
            </div>
            <div class="shop-num">
              <p>
                {{mydata.listUsTriderPojo[0].address}}
              </p>
              <p>
                <span>
                  {{mydata.listUsTriderPojo[0].usNickname}}
                </span>
                <span>
                  <a :href="['tel:'+mydata.listUsTriderPojo[0].usPhone+'']">{{mydata.listUsTriderPojo[0].usPhone}}</a>
                </span>
              </p>
            </div>
          </div>
        </div>

      </div>
      <div class="btn-bo">
        <div class="state" @click="noorder" v-if="(mydata.usOrder.usOrIsDelivery==1&&mydata.usOrder.usOrIsCancel<3)||mydata.usOrder.usOrIsCancel<=1">
          取消订单
        </div>
        <div class="state" @click="orderok" v-if="mydata.usOrder.usOrIsDelivery==1&&mydata.usOrder.usOrIsCancel<3">
          完成订单
        </div>
      </div>
    </div>
    <transition name='alert'>
      <alert v-show='alertbo' @alertboo="alertboo" @alerttrue="alerttrue"></alert>
    </transition>
  </div>
</template>

<script>
  export default {
		name: 'orderdetail',
		data() {
			return {
				alertbo: false,
				mydata: []
			}
		},
		filters: {
			state: function(value) {
				if(value == 3) {
					return '已完成'
				} else if(value == 4) {
					return '订单已取消'
				} else if(value == 5) {
					return '等待退款'
				} else if(value == 6) {
					return '已退款'
				} else {
					return '已完成'
				}
			}
		},
		mounted() {
			this.myajax()
		},
		methods: {
			myajax: function() {
				var that = this
				$.ajax({
					type: "post",
					url: that.myurl + "/selectOrderDetailsEmployee",
					dataType: 'json',
					data: {
						usOrderId: that.orderid
					},
					success: function(res) {
						that.mydata = res.data
					}
				});
			},
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			},
			alertboo: function() {
				this.alertbo = !this.alertbo
			},
			noorder: function() {
				this.$store.state.alerttext = '确认取消订单吗？'
				this.alertboo()
			},
			alerttrue: function() {
				this.alertbo = !this.alertbo
				var that = this
				$.ajax({
					type: "post",
					url: that.myurl03 + "/user/userSellerRefund",
					dataType: 'json',
					data: {
						traderNo: that.mydata.usOrder.usOrderId,
						refundAmount: that.mydata.usOrPrice
					},
					success: function(res) {
						if(res.status == 400) {
							plus.nativeUI.toast('用户已取消订单，无法取消！')
							that.$router.back()
						} else {
							if(res.data == 1) {
								plus.nativeUI.toast('已取消')
								that.$router.back()
							} else {
								plus.nativeUI.toast(res.msg)
							}
						}
					}
				});
			},
			back: function() {
				this.$router.back()
			},
			orderok: function() {
				var that = this
				$.ajax({
					type: "post",
					url: that.myurl + "/fulfillmentOrder",
					dataType: 'json',
					data: {
						usOrderId: that.mydata.usOrder.usOrderId,
						usTraderStoresId: that.mydata.usOrder.usTraderStoresId
					},
					success: function(res) {
						//						if(res.msg=='ok'){
						plus.nativeUI.toast('订单已完成')
						that.$router.back()
						//						}else{
						//							plus.nativeUI.toast('接单失败')
						//						}
					}
				});
			}
		},
		computed: {
			orderid() {
				return this.$store.state.orderid
			},
			myurl() {
				return this.$store.state.myurl
			},
			myurl03() {
				return this.$store.state.myurl03
			}
		},
		components: {
			alert: resolve => require(['./alert'], resolve)
		}
	}
</script>

<style type="text/css" lang="scss">
  .orderdetail {
    background: #EFEFF0;

    .grey {
      flex: 1;
      color: #F6383A;
      text-align: right;
    }

    .btn-bo {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      display: flex;
    }

    #head {
      background: #FF8190;
      border: 0;
      color: #ffffff;
    }

    .active {
      color: #FF8190;
    }

    .group {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .state {
      bottom: 0;
      left: 0;
      height: .8rem;
      background: #FF8190;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: .25rem;
      flex: 1;
    }

    .state:first-of-type {
      border-right: 1px solid #FFFFFF;
      border-top-left-radius: .1rem;
    }

    .state:last-of-type {
      border-top-right-radius: .1rem;
    }

    .adress {
      .shop-name {
        width: .5rem !important;
      }

      .shop-num {
        text-align: left !important;
        line-height: .4rem;
      }

      p {
        display: flex;
        justify-content: space-between;

        a {
          color: #FF8190;
        }
      }
    }

    .top {
      margin: .2rem .1rem !important;

      .shop-name {
        font-size: .3rem;
        font-weight: 600;
      }

      .shop-price {
        color: #F6383A;
        font-size: .25rem;
        font-weight: 600;
      }
    }

    .shop-group {
      display: flex;
      margin: .2rem;

      .shop-name {
        width: 1.5rem;
        white-space: nowrap;

        img {
          height: .4rem;
        }
      }

      .shop-num {
        flex: 1;
        text-align: right;
      }

      .shop-price {
        width: 1.2rem;
        text-align: right;
      }
    }

    .inform-group {
      display: flex;
      justify-content: space-between;
      margin: .2rem;

      .inform-title {
        font-size: .25rem;
        width: 2rem;
        font-weight: 600;
        line-height: .4rem;
      }

      .inform-text {
        line-height: .4rem;
      }
    }

    .order-title {
      height: .28rem;
      display: flex;
      align-items: center;
      border-left: 2px solid #FF8190;
      color: #969696;
      margin: .25rem .15rem;
      text-indent: .17rem;
    }

    .order-top {
      height: 1.3rem;
      background: #FF8190;
      width: 100%;
    }

    .order-main {
      margin: -.6rem .2rem 1rem;
    }

    .order-group {
      background: #FFFFFF;
      border-radius: .1rem;
      padding: .3rem .1rem;
    }

    .state-group {
      display: flex;
      align-items: center;
      justify-content: space-around;

      img {
        width: .5rem;
        height: .5rem;
      }

      span {
        margin-top: .15rem;
        display: block;
      }
    }

    .img-box {
      background: #FF8190;
      border-radius: 50%;
      width: .7rem;
      height: .7rem;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: .4rem;
        height: .4rem;
      }
    }
  }
</style>
