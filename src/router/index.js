import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
		{
			path: '/yinhangrenzheng',
			name: 'yinhangrenzheng',
			component: resolve => require(['@/components/yinhangrenzheng'], resolve)
		},
		{
			path: '/dianpurenzheng',
			name: 'dianpurenzheng',
			component: resolve => require(['@/components/dianpurenzheng'], resolve)
		},
		{
			path: '/shimingrenzheng',
			name: 'shimingrenzheng',
			component: resolve => require(['@/components/shimingrenzheng'], resolve)
		},
		{
			path: '/renzhenglist',
			name: 'renzhenglist',
			component: resolve => require(['@/components/renzhenglist'], resolve)
		},
  	{
			path: '/ptype',
			name: 'ptype',
			component: resolve => require(['@/components/ptype'], resolve)
		},
  	{
			path: '/news',
			name: 'news',
			component: resolve => require(['@/components/news'], resolve)
		},
		{
			path: '/usercenter',
			name: 'usercenter',
			component: resolve => require(['@/components/usercenter'], resolve)
		},
		{
			path: '/Bluetooth',
			name: 'Bluetooth',
			component: resolve => require(['@/components/Bluetooth'], resolve)
		},
  	{
      path: '/addshop02',
      name: 'addshop02',
      component: resolve => require(['@/components/addshop02'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/login'], resolve)
    },{
    	path:'',
    	redirect:'index'
    }, {
      path: '/userregister',
       name:'userregister',
      component: resolve => require(['@/components/userregister'], resolve)
    }, {
      path: '/shoplist',
       name:'shoplist',
      component: resolve => require(['@/components/shoplist'], resolve)
    }, {
      path: '/shopdetail',
       name:'shopdetail',
      component: resolve => require(['@/components/shopdetail'], resolve)
    }, {
      path: '/shoping',
       name:'shoping',
      component: resolve => require(['@/components/shoping'], resolve)
    }, {
      path: '/userinform',
      name:'userinform',
      component: resolve => require(['@/components/userinform'], resolve)
    }, {
      path: '/shopregister',
      name: 'shopregister',
      component: resolve => require(['@/components/shopregister'], resolve)
    }, {
      path: '/index',
      name: 'index',
      component: resolve => require(['@/components/index'], resolve)
    }
    ,{
      path: '/orderdetail',
      name: 'orderdetail',
      component: resolve => require(['@/components/orderdetail'], resolve)
    },{
      path: '/withdrawals02',
      name: 'withdrawals02',
      component: resolve => require(['@/components/withdrawals02'], resolve)
    }, {
      path: '/orderlist',
      name: 'orderlist',
      component: resolve => require(['@/components/orderlist'], resolve)
    }, {
      path: '/addshop',
      name: 'addshop',
      component: resolve => require(['@/components/addshop'], resolve)
    }, {
      path: '/vipcenter',
      name: 'vipcenter',
      component: resolve => require(['@/components/vipcenter'], resolve)
    }, {
      path: '/vipdetail',
      name: 'vipdetail',
      component: resolve => require(['@/components/vipdetail'], resolve)
    }, {
      path: '/freight',
      name: 'freight',
      component: resolve => require(['@/components/freight'], resolve)
    }, {
      path: '/addstart',
      name: 'addstart',
      component: resolve => require(['@/components/addstart'], resolve)
    }, {
      path: '/addpacking',
      name: 'addpacking',
      component: resolve => require(['@/components/addpacking'], resolve)
    }, {
      path: '/aboutus',
      name: 'aboutus',
      component: resolve => require(['@/components/aboutus'], resolve)
    }, {
      path: '/rider',
      name: 'rider',
      component: resolve => require(['@/components/rider'], resolve)
    }, {
      path: '/addrider',
      name: 'addrider',
      component: resolve => require(['@/components/addrider'], resolve)
    }, {
      path: '/activity',
      name: 'activity',
      component: resolve => require(['@/components/activity'], resolve)
    }, {
      path: '/setting',
      name: 'setting',
      component: resolve => require(['@/components/setting'], resolve)
    }, {
      path: '/addman',
      name: 'addman',
      component: resolve => require(['@/components/addman'], resolve)
    }, {
      path: '/addhong',
      name: 'addhong',
      component: resolve => require(['@/components/addhong'], resolve)
    }, {
      path: '/addzhe',
      name: 'addzhe',
      component: resolve => require(['@/components/addzhe'], resolve)
    }, {
      path: '/shop',
      name: 'shop',
      component: resolve => require(['@/components/shop'], resolve)
    }, {
      path: '/staff',
      name: 'staff',
      component: resolve => require(['@/components/staff'], resolve)
    }, {
      path: '/staffdetail',
      name: 'staffdetail',
      component: resolve => require(['@/components/staffdetail'], resolve)
    }, {
      path: '/adver',
      name: 'adver',
      component: resolve => require(['@/components/adver'], resolve)
    }, {
      path: '/adveradd',
      name: 'adveradd',
      component: resolve => require(['@/components/adveradd'], resolve)
    }, {
      path: '/adverprice',
      name: 'adverprice',
      component: resolve => require(['@/components/adverprice'], resolve)
    }, {
      path: '/wallet',
      name: 'wallet',
      component: resolve => require(['@/components/wallet'], resolve)
    }, {
      path: '/walletsetting',
      name: 'walletsetting',
      component: resolve => require(['@/components/walletsetting'], resolve)
    }, {
      path: '/adrules',
      name: 'adrules',
      component: resolve => require(['@/components/adrules'], resolve)
    }, {
      path: '/walletrecord',
      name: 'walletrecord',
      component: resolve => require(['@/components/walletrecord'], resolve)
    }, {
      path: '/withdrawals',
      name: 'withdrawals',
      component: resolve => require(['@/components/withdrawals'], resolve)
    }, {
      path: '/vipcart',
      name: 'vipcart',
      component: resolve => require(['@/components/vipcart'], resolve)
    }, {
      path: '/addvipcart',
      name: 'addvipcart',
      component: resolve => require(['@/components/addvipcart'], resolve)
    }, {
      path: '/addxin',
      name: 'addxin',
      component: resolve => require(['@/components/addxin'], resolve)
    }, {
      path: '/nav',
      name: 'nav',
      component: resolve => require(['@/components/nav'], resolve)
    }, {
      path: '/navlist',
      name: 'navlist',
      component: resolve => require(['@/components/navlist'], resolve)
    }, {
      path: '/addnav',
      name: 'addnav',
      component: resolve => require(['@/components/addnav'], resolve)
    }
  ]
})
