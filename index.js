
define(["jquery","jquery-cookie"],function($){

    function banner(){
        // alert($(window).outerWidth());
        

        var l = (1920 - $(window).outerWidth()) / 2;
        $("#bannerbox").css("left", -l);

        //顶部固定图片居中
        $("#fixed #fixedBox").css("left",-l);

        var L = ($(window).outerWidth() - 1260) / 2;
        $("#left").css("left", L + 234);

        $("#right").css("right", L);

        $("#bigbox").css("width",$(window).outerWidth());
        $.ajax({
            type:"get",
            url:"data/index.json",
            success:function(data){
                var arr = data.banner;
                for(var i = 0; i < arr.length; i++){
                    var node = $(`<li><a href=""><img src="${arr[i].img}" alt="" /></a></li>`);
                    node.appendTo("#banner");
                }
            }
        })



        var iNow = 0;
        var timer = null;
        

        timer = setInterval(function(){
            iNow++;
            
            tab();
        },2000);


        function tab(){
            // document.title = iNow;
            $("#bigbox ol").find("span").attr("class","");
            $("#bigbox ol").find("span").eq(iNow).attr("class","active");
            $("#banner").animate({left:-iNow * 1920},300,"linear",function(){
                if(iNow == 7){
                    $("#banner").css("left",0);
                    iNow = 0;
                }
            });


            if(iNow == 7){
                $("#bigbox ol").find("span").eq(0).attr("class","active");
            }
            
        }

        $("#right").click(function(){
            if(iNow == 7){
                iNow = 0;
            }
            iNow++;
            
            tab();
        })

        $("#left").click(function(){
            if(iNow == 0){
                $("#banner").css("left",-13440);
                iNow = 7;
            }
            iNow--;
            
            tab();
        })

        $("#bigbox ol").on("click","span",function(){
            $("ol span").attr("class","");
            $(this).attr("class","active");
            iNow = $(this).index();
            tab();
        })

        $("#bigbox").hover(function(){
            clearInterval(timer);
        },function(){
            timer = setInterval(function(){
                iNow++;
                tab();
            },2000);
        })





    }

    function leftNav(){
        var l = ($(window).outerWidth() - 1260) / 2;
        $("#leftNav").css("left",l + "px");


        $.ajax({
            type:"get",
            url:"data/index.json",
            success:function(data){
                var arr = data.leftNav;
                for(var i = 0; i < arr.length; i++){
                    
                var oLi = $(`<li><a href="" class="left">${arr[i].title}<i>></i></a>
                                    <ul class="smallUl" id="smallUl">
                                    <div class="detailList">
                                    </div>
                                    <div class="imgBox">
                                            <img src="${arr[i].img}" alt="" class="rightImg">
                                        </div>
                                    </ul>
                                </li>`);
                    var arrChilds = arr[i].childs;
                    for(var j = 0; j < arrChilds.length; j++){
                        
                        var node = $(`
                                        <dl class="clearfn">
                                            <dt>
                                                <img src="${arrChilds[j].image}" alt="">
                                                <span>${arrChilds[j].name}</span>
                                            </dt>
                                            <dd>
                                            </dd>
                                        </dl>
                                    `);

                        if(arrChilds[j].nodes){
                            var arrNodes = arrChilds[j].nodes;
                            for(var k = 0; k < arrNodes.length; k++){
                                // console.log(arrNodes.length);
                                var oA = $(`<a href="" class="list">${arrNodes[k]}</a>`);
                                oA.appendTo(node.find("dd"));
                            }
    
                           

                        }
                        
                        node.appendTo(oLi.find(".detailList")); 
                           
                    }
                    oLi.appendTo($("#leftNav"));
                }
                
            }
        })

        $("#leftNav").hover(function(){
            $(this).find(".smallUl").show();
        },
        function(){
            $(this).find(".smallUl").hide();
        })
        $("#leftNav").on("mouseenter",".left",function(){
            $("#leftNav ul").hide();
            $("#leftNav").find("ul").eq($(this).parent().index()).show();
            // console.log($(this).parent().index());
        })


        $("#leftNav").on("mouseleave","ul",function(){      
            $(this).hide();
        })
        
        
    }

    function topNav(){

        $.ajax({
            type:"get",
            url:"data/index.json",
            success:function(data){
                var topNav = data.topNav;
                for(var i = 0; i < topNav.length; i++){
                    $(`<li><a href="${topNav[i].url}">${topNav[i].title}</a></li>`).appendTo("#titleul");
                    
                    if(i == 1){
                        var topNavChild1 = topNav[1].childs;
                        var topNavNode = $(`<div class="topNav"></div>`);
                        for(var j = 0; j < topNavChild1.length; j++){
                            var node = $(`<li class="li1">
                                            <div class="topImgBox">
                                                <img src="${topNavChild1[j].img}" alt="">
                                            </div>
                                            <p class="nav1">${topNavChild1[j].name}</p>
                                        </li>`);

                            node.appendTo(topNavNode);
                        }
                        topNavNode.appendTo($("#topNavBox"));
                    }
                        
                        
                    if(i == 2){
                        var topNavChild2 = topNav[2].childs;
                        var topNavNode = $(`<div class="topNav"></div>`);
                        for(var j = 0; j < topNavChild2.length; j++){
                            var node = $(`<li class="li2">
                                <img src="${topNavChild2[j].img}" alt="">
                                <p>${topNavChild2[j].name}</p>
                            </li>`);
                            node.appendTo(topNavNode);
                        }
                        topNavNode.appendTo($("#topNavBox"));
                    }


                        if(i == 4){
                            var topNavChild4 = topNav[4].childs;
                            var topNavNode = $(`<div class="topNav"></div>`);
                            for(var j = 0; j < topNavChild4.length; j++){
                                var node = $(`<li class="li3">
                                            <div class="topImgBox">
                                                <img src="${topNavChild4[j].img}" alt="">
                                            </div>
                                            <p class="nav1">${topNavChild4[j].name}</p>
                                        </li>`);

                                node.appendTo(topNavNode);
                            }

                             topNavNode.appendTo($("#topNavBox"));

                             
                        }
                }
                $("#topNavBox").hide();
            }
        })

        $("#titleul").on("mouseenter","li",function(){
            var id = $(this).index();
            console.log(id);
            var n = -1;
            var aDiv = $("#topNavBox").find(".topNav");
            aDiv.hide();
            if(id == 1){
                n = 0;
            }
            if(id == 2){
                n = 1;
            }
            if(id == 4){
                n = 2;
            }
            if(id == 1 || id == 2 || id == 4){
                $("#topNavBox").css("display","block");
                aDiv.eq(n).css("display","block");
            }
        })

        $("#topNavBox").mouseleave(function(){
            $(this).hide();
        })

        $("#titleul").on("mouseleave","li a",function(){
            $("#topNavBox").hide();
        })
        
        
    }

    function choose(){
        $.ajax({
            type:"get",
            url:"data/index.json",
            success:function(data){
                var arr = data.choose;
                for(var i = 0; i < arr.length; i++){
                    var node = $(`<li>
                                    <a href="">
                                        <i class="i1" style="background: url(${arr[i].img}) center center / contain no-repeat;"></i>
                                        <i class="i2" style="background: url(${arr[i].img1}) center center / contain no-repeat;"></i>
                                        <p>${arr[i].title}</p>
                                    </a>
                                </li>`);
                    node.appendTo($("#choose"));
                }
                $("#choose").find(".i2").hide();
                $("#choose").find(".i1").show();
                $("#choose").on("mouseleave","a",function(){
                    $(this).find(".i2").hide();
                    $(this).find(".i1").show();
                })
                $("#choose").on("mouseenter","a",function(){
                    $(this).find(".i2").show();
                    $(this).find(".i1").hide();
                })

            },
            error:function(msg){
                alert("error" + msg);
            }
        })

        
    }

    function hotList(){
        $.ajax({
            type:"get",
            url:"data/index.json",
            success:function(data){
                var arr = data.hotListBox;
                for(var i = 0; i < arr.length; i++){
                    var oLi = $(`<li>
                    <a class="liImgBox" href="goods.html?id=${arr[i].id}">
                        <img src="${arr[i].img}" alt="">
                    </a>
                    <p class="lab">${arr[i].title}</p>
                    <p class="model">${arr[i].model}</p>
                    <p class="price">${arr[i].price}</p>
                    <p class="oldPrice">${arr[i].oldPrice}</p>
                </li>`);
                oLi.appendTo($("#hotList"));
                }
            }
        })
        var iNow = 0;
        $(".btnr").click(function(){
            iNow++;
            if(iNow > 2){
                iNow = 2;
            }
            $(".btnr").css("color","#939393");
            $(".btnl").css("color","#939393");
            if(iNow == 2){
                $(".btnr").css("color","#eaeaea");
            }
            console.log(iNow);
            $("#hotList").css({left:-iNow*1260});
        })

        $(".btnl").click(function(){
            
            iNow--;
            if(iNow < 0){
                iNow = 0;
            }
            $(".btnl").css("color","#939393");
            $(".btnr").css("color","#939393");
            if(iNow == 0){
                $(".btnl").css("color","#eaeaea");
            }
            $("#hotList").css({left:-iNow*1260});
        })
        
        
    }

    function innerData(){
        $.ajax({
            type:"get",
            url:"data/index.json",
            success:function(data){
                var arr = data.innerData;
                var obj = arr[0];
                //加载左侧
                var nLeft = $(`<div class="middleLeft">
                                <img src="${obj.img}" alt="">
                            </div>`);
                nLeft.appendTo($("#middle"));

                //加载中心

                //中心部分选项卡ul
                var centerArr = obj.center;
                var nodeCenter0 = $(`<div class="middleCenter">
                                    <ul class="middleCenterUl clearfn">
                                    </ul>
                                </div>`);
                for(var i = 0; i < centerArr.length; i++){
                    var oLi1 = $(`<li><a class="tab">${centerArr[i].name}</a></li>`);
                    oLi1.appendTo(nodeCenter0.find(".middleCenterUl"));
                    if(i == 0){
                        $(oLi1.find("a")).addClass("liActive");;
                    }
                }


                
                
                //加载中心部分选项卡1的状态
                var center0 = centerArr[0];
                var ban = $(`<div class="middleCenterBannerBox">
                                <div id="sLeft"><</div>
                                <div id="sRight">></div>
                                <ol id="banOl">
                                <span class="active"></span>
                                <span></span>
                                <span></span>
                                </ol>
                                <ul class="middleCenterBanner">
                                </ul>
                            </div>`);
                for(var i = 0; i < center0.img.length; i++){
                    var oLi2 = $(`<li><img src="${center0.img[i]}" alt=""></li>`);
                    oLi2.appendTo(ban.find(".middleCenterBanner"));
                }
                
                
                var timer = null;
                var iNow = 0;
                timer = setInterval(function(){
                    iNow++;
                    tab();
                },3000);
                ban.appendTo(nodeCenter0);

                function tab(){
                    ban.find("#banOl span").attr("class","");
                    ban.find("#banOl span").eq(iNow).attr("class","active");
                    ban.find(".middleCenterBanner").animate({left:-iNow*812},500,"linear",function(){
                        if(iNow == 3){
                            ban.find(".middleCenterBanner").css({
                                left:0
                            });
                            iNow = 0;
                        }
                    });

                    if(iNow == 3){
                        ban.find("#banOl span").eq(0).attr("class","active");
                    }
                }

                ban.on("click","#sLeft",function(){
                    clearInterval(timer);
                    if(iNow == 0){
                        iNow = 2;
                    }else{
                        iNow--;
                    }
                    tab();
                })

                ban.on("click","#sRight",function(){
                    clearInterval(timer);
                    if(iNow == 2){
                        iNow = 0;
                    }else{
                        iNow++;
                    }
                    tab();
                })
                   


                ban.find(".middleCenterBanner").mouseenter(function(){
                    clearInterval(timer);
                })
                ban.find(".middleCenterBanner").mouseleave(function(){
                    timer = setInterval(function(){
                        iNow++;
                        tab();
                    },1000);
                })
                ban.find("#banOl").on("mouseenter","span",function(){
                    ban.find("#banOl span").attr("class","");
                    $(this).attr("class","active");
                    iNow = $(this).index();
                    tab();
                    clearInterval(timer);
                })

                ban.find("#banOl").on("mouseleave","span",function(){
                    // $(this).attr("class","");
                    timer = setInterval(function(){
                        iNow++;
                        tab();
                    },1000);
                })

                

                var oBottom = $(`<ul id="middleCenterBottom" class="part"></ul>`);
                
                for(var i = 0; i < center0.bottom.length; i++){
                    var oLi = $(`<li class="mLi">
                                    <div class="mImgBox">
                                        <img src="${center0.bottom[i].img}" alt="">
                                    </div>        
                                    <p class="title">${center0.bottom[i].title}</p>
                                    <p class="info">${center0.bottom[i].info}</p>
                                    <p class="priceBox">
                                        <span class="price">${center0.bottom[i].price}</span>  
                                        <span class="oldPrice">${center0.bottom[i].oldPrice}</span>
                                    </p>
                                </li>`);
                    oLi.appendTo(oBottom);
                }
                oBottom.appendTo(nodeCenter0);
               


                var oUl2 = $(`<ul class="clearfn part oUl2"></ul>`);
                // alert(centerArr[1].list.length);
                for(var i = 0; i < centerArr[1].list.length; i++){
                    var node = $(`<li class="mLi">
                                    <div class="mImgBox">
                                        <img src="${centerArr[1].list[i].img}" alt="">
                                    </div>        
                                    <p class="title">${centerArr[1].list[i].title}</p>
                                    <p class="info">${centerArr[1].list[i].info}</p>
                                    <p class="priceBox">
                                        <span class="price">${centerArr[1].list[i].price}</span>  
                                        <span class="oldPrice">${centerArr[1].list[i].oldPrice}</span>
                                    </p>
                                </li>`);
                        node.appendTo(oUl2);
                }
                oUl2.appendTo(nodeCenter0);


                var oUl3 = $(`<ul class="clearfn part oUl3"></ul>`);
                for(var i = 0; i < centerArr[2].list.length; i++){
                    
                    var node = $(`<li class="mLi">
                                    <div class="mImgBox">
                                        <img src="${centerArr[2].list[i].img}" alt="">
                                    </div>        
                                    <p class="title">${centerArr[2].list[i].title}</p>
                                    <p class="info">${centerArr[2].list[i].info}</p>
                                    <p class="priceBox">
                                        <span class="price">${centerArr[2].list[i].price}</span>  
                                        <span class="oldPrice">${centerArr[2].list[i].oldPrice}</span>
                                    </p>
                                </li>`);
                    node.appendTo(oUl3);
                }
                oUl3.appendTo(nodeCenter0);


                 $("#middle").on("mouseenter",".middleCenter ul li .tab",function(){
                    
                    nodeCenter0.find("a").removeClass("liActive");
                    $(this).addClass("liActive");
                    var bannerNode = $("#middle .middleCenterBannerBox");
                    var aUls = $("#middle .middleCenter ul.part");
                    // alert(aUls.length);
                    aUls.hide().eq($(this).parent().index()).show();

                    if($(this).parent().index() == 0){
                        bannerNode.show();
                    }else{
                        bannerNode.hide();
                        aUls.eq(0).hide();
                    }
                    
                })


                nodeCenter0.appendTo($("#middle"));

                //加载右侧排行榜
                var nRight = $(`<div class="middleRight">
                                    <div class="sale">本类销售榜</div>
                                    <div class="saleBox">
                                        <ul class="saleUl">
                                        </ul>
                                    </div>
                                </div>`);

                for(var i = 0; i < obj.saleList.length; i++){
                    var oLi = $(`<li class="saleLi clearfn">
                                    <span class="goodsNum">${i+1}</span>
                                    <div class="goodsPic">
                                        <img src="${obj.saleList[i].img}" alt="">
                                    </div>
                                    <div class="goodsInfo">
                                        <a href="" class="goodsA">${obj.saleList[i].title}</a>
                                        <p class="goodsPrice">${obj.saleList[i].price}</p>
                                    </div>
                                </li>`);
                    if(i > 2){
                        oLi.find(".goodsPic").hide();
                        oLi.find(".goodsPrice").hide();
                        oLi.find(".goodsNum").css({
                            background:"none",
                            color:"#00a8ff",
                           
                        });
                        oLi.find(".goodsA").css({
                            marginLeft:40,
                            width:109,
                            height:30,
                            display: "block",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                        })
                    }
                    
                    oLi.appendTo(nRight.find(".saleUl"));
 
                }

                nRight.on("mouseenter",".saleLi",function(){
                    if($(this).index() > 1){
                       
                        $(this).find(".goodsPic").show();
                        $(this).find(".goodsPrice").show();
                        $(this).find(".goodsNum").css({
                            color:"white",
							background: 'url("//static.asus.com.cn/static/store/css/images/sales_chart.png") center center no-repeat'	
                            
                        });
                        $(this).find(".goodsA").css({
                            marginLeft:0,
                            width:109,
                            height:30,
                            display: "block",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                        })
                        
                        $(this).siblings().eq(2).find(".goodsPic").hide();
                        $(this).siblings().eq(2).find(".goodsPrice").hide();
                        $(this).siblings().eq(2).find(".goodsNum").css({
                            background:"none",
                            color:"#00a8ff",
                           
                        });
                        $(this).siblings().eq(2).find(".goodsA").css({
                            marginLeft:40,
                            width:120,
                            height:30,
                            display: "block",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                        })
                    }
                })

                nRight.on("mouseleave",".saleLi",function(){
                    if($(this).index() > 1){
                        $(this).find(".goodsPic").hide();
                        $(this).find(".goodsPrice").hide();
                        $(this).find(".goodsNum").css({
                            background:"none",
                            color:"#00a8ff",
                           
                        });
                        $(this).find(".goodsA").css({
                            marginLeft:40,
                            width:120,
                            height:30,
                            display: "block",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                        })
                        
                    }
                })

                

                nRight.appendTo($("#middle"));


            },
            error:function(msg){
                alert("error" + msg);
            }
        })



    }

    //用户是否登陆
    function userscookie(){
        var str = JSON.parse($.cookie("users"));
        if(str){
            $("#name").html(str);
            $("#login").show();
            $(".ofirstLi").hide();
            $(".osecondLi").hide();
            $(".othirdLi").hide();

            $("#esc").on("click",function(){
                $.cookie("users",null);
                location.reload();
            })
           
        }else{
            $("#login").hide();
            $(".ofirstLi").show();
            $(".osecondLi").show();
            $(".othirdLi").show();
        }

       
        
    }

    //加载右上方购物车小图标商品数量
    function goodsCookie(){
        var str = $.cookie("goods");
        if(str){
            var arr = JSON.parse(str);
            if(arr.length){
                var count = 0;
                for(var i = 0 ; i < arr.length; i++){
                    count += arr[i].num;
                    $("#shoppigCar").find("em").html(count);
                }
                $("#shoppigCar i").css({
                    colo:"white"
                })
                $("#shoppigCar").css({
                    background:"#00a8ff",
                    color:"white"
                })
            }
        }
            
    }


    return{
        banner:banner,
        leftNav:leftNav,
        topNav:topNav,
        choose:choose,
        hotList:hotList,
        innerData:innerData,
        login:login,
        userscookie:userscookie,
        goodsCookie:goodsCookie
    }
})