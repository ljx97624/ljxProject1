console.log("加载成功！");

require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        "index":"index",
        "shoppingCar":"shoppingCar"
    },
    shim: {
        //设置依赖关系  先引入jquery.js  然后在隐去jquery-cookie
        "jquery-cookie": ["jquery"],
        //声明当前模块不遵从AMD
        "parabola": {
			exports: "_"
		}
    }
})


require(["index","shoppingCar"],function(index,shoppingCar){
    index.topNav();
    shoppingCar.sc_msg();
    shoppingCar.sc_num();
    shoppingCar.removeGoods();
    shoppingCar.changeCount();
    shoppingCar.checkoutClick();
    index.goodsCookie();
    index.userscookie();
})