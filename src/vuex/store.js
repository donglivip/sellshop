import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	// 定义状态
	state: {
		province:'选择现在住址',
		city:'',
		area:'',
		alerttext:'未知错误',
		head:'首页',
		bottomdata:['普通会员','高级会员','超级会员'],
//		yidianwm.com 192.168.2.107
//		47.110.8.48  领先
//		47.104.101.165  联华
//    39.107.70.18
		myurl:'http://39.107.70.18/trader',
		myurl02:'http://39.107.70.18/card',
		myurl03:'http://39.107.70.18',
		province01:'选择现在住址',
		city01:'',
		area01:'',
		orderid:'',
		money01:'',
		money02:'',
		usTraderSubtractId:'',
		usTraderStoresId:'',
		usTraderDiscountId:'',
		usTdDicsont:'',
		usTdNum:'',
		usTpPrice:'',
		usTpLimitPrice:'',
		usTpLimitNum:'',
		usTraderPackageId:'',
		usTnaPrice:'',
		usTnaDemand:'',
		usTraderNewActivitiesId:'',
		usMemberId:'',
		usTraderMemberCardId:'',
		maDistributionId:'',
		maDiPrice:'',
		usTrName:'',
		usPackingFeeId:'',
		usPfPrice:'',
		usTraderName:'',
		usTraderEmployeeId:'',
		usTeCardId:'',
		usTeDetailed:'',
		usRiderId:'',
		usTraderName:'',
		usRiPhone:'',
		usRiSex:'',
		usRiDetailed:'',
		usRiCardId:'',
		usTraderMemberCardId:'',
		usTmcLevel:'',
		usTmcPrice:'',
		usTmcDiscount:'',
		usTraderStoresId:'',
		usTraderShoppingId:'',
		usTmcLevelNumber:'',
		mytime:'',
		usOrIsDelivery:2,
		statusTraderStore:1,
		bid:'',
		myset:''
	}
})

export default store
