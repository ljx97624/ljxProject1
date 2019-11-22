// console.log("加载成功！");

require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        "index":"index"
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


require(["index"],function(index){
    index.banner();
    index.leftNav();
    index.topNav();
    index.choose();
    index.hotList();
    index.innerData();
    index.userscookie();
    index.goodsCookie();
})