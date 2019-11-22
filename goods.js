define(["parabola","shoppingCar","index","jquery","jquery-cookie"],function(parabola,shoppingCar,index,$){

    var url = location.search;
    var id = cutString(url);

    function cutString(url){
        var n1 = url.indexOf("id");
        var n2 = url.indexOf(n1,"&");
        if(n2 == -1){
            n2 = url.length;
        }
        var id = url.substring(n1 + 3, n2);
        
        return id;
    }


    function headline(){
        $.ajax({
            type:"get",
            url:"data/index.json",
            success:function(data){
                
                var arr = data.hotListBox;
                // alert(arr[0].id);
                // alert(id);
                for(var i = 0; i < arr.length; i++){
                    
                    if(id == arr[i].id){
                        
                        var node = $(`<span>${arr[i].title}</span>`);
                        node.appendTo($(".headline"));
                        break;
                    }
                }
            },
            error:function(msg){
                console.log("error" + msg);
            }
        })
    }


    function count(){
        $(".reduce").click(function(){
            var count = parseInt($(".countSum").val()) - 1;
            if(count == 0){
                count = 1;
            }
            $(".countSum").val(count);
        })
        $(".add").click(function(){
            
            var count = parseInt($(".countSum").val()) + 1;
            $(".countSum").val(count);
        })
    }


    function download(){
        $.ajax({
            type:"get",
            url:"data/goods.json",
            success:function(data){
                var arr = data.imgBox;
                for(var i = 0; i < arr.length; i++){
                    if(id == arr[i].id){
                        $(".proDetail").html(arr[i].price);
                        $(".proOld").html(arr[i].oldPrice);
                        $(".imgBox").find("img").attr("src",arr[i].img[0]);
                        $(".showBox").find("img").attr("src",arr[i].img[0]);
                        for(var j = 0; j < arr[i].img.length; j++){
                            var oLi = $(`<li class="smallImgLi">
                                            <img src="${arr[i].img[j]}" alt="">
                                        </li>`);
                            oLi.appendTo($(".innerImg"));
                        }
                    }
    
                }

            }
        })

        $(".innerImg").on("click",".smallImgLi",function(){
            var src = $(this).find("img").attr("src");
            $(".imgBox").find("img").attr("src",src);
            $(".showBox").find("img").attr("src",src);
        })

    }

    function moveImg(){
        $(".rightImg").click(function(){
            var l = parseInt($(".innerImg").css("left"));
            if(l <= -200){
                l = -200;
                $(".innerImg").css("left",l);
            }else{
                $(".innerImg").css("left",l - 100);
            }
            
            
        })

        $(".leftImg").click(function(){
            var l = parseInt($(".innerImg").css("left"));
            if(l >= 0){
                l = 0;
            }else{
                l +=100;
            }
            $(".innerImg").css("left",l);
        })
    }

    function magnifying(){
        $(".imgBox").on({
            mouseenter:function(){
                        $(".mark").show();
                        $(".showBox").show();
            },
            mouseleave:function(){
            $(".mark").hide();
            $(".showBox").hide();
            },
            mousemove:function(ev){
                var l = ev.pageX - $(".imgBox").offset().left - 200;
                var t = ev.pageY - $(".imgBox").offset().top - 135;

                if(l <= 0){
                    l = 0;
                }
                if(l >= $(".imgBox").outerWidth() - $(".mark").outerWidth()){
                    l = $(".imgBox").outerWidth() - $(".mark").outerWidth();
                }
                if(t <= 0){
                    t = 0;
                }
                if(t >= $(".imgBox").outerWidth() - $(".mark").outerWidth()){
                    t = $(".imgBox").outerWidth() - $(".mark").outerWidth();
                }

                $(".mark").css({
                    left:l,
                    top:t
                })

                $(".showBox img").css({
                    left:-l * 1.5,
                    top:-t * 1.5 
                })
            }
        })

    }


    function cookie(){
        $("#addCar").click(function(){
            var number = parseInt($(".countSum").val());
            var first = $.cookie("goods") == null ? true : false;
            if(first){
                var arr = [{id:id,num:number}];
                $.cookie("goods",JSON.stringify(arr),{
                    expires:7
                })
                
            }else{
                var cookieStr = $.cookie("goods");
                var cookieArr = JSON.parse(cookieStr);
                var same = false;
                for(var i = 0; i < cookieArr.length; i++){
                    if(cookieArr[i].id == id){
                        cookieArr[i].num += number;
                        same = true;
                        break;
                    }
                }

                if(!same){ 
                    var obj = {id:id,num:number};
                    cookieArr.push(obj);
                }

               
                $.cookie("goods",JSON.stringify(cookieArr),{
                    expires:7
                })
            }


            //  if(first){
            //     var arr = [{id:id,num:1}];
            //     $.cookie("goods",JSON.stringify(arr),{
            //         expires:7
            //     })
                
            // }else{
            //     var cookieStr = $.cookie("goods");
            //     var cookieArr = JSON.parse(cookieStr);
            //     var same = false;
            //     for(var i = 0; i < cookieArr.length; i++){
            //         if(cookieArr[i].id == id){
            //             cookieArr[i].num++;
            //             same = true;
            //             break;
            //         }
            //     }

            //     if(!same){ 
            //         var obj = {id:id,num:1};
            //         cookieArr.push(obj);
            //     }

               
            //     $.cookie("goods",JSON.stringify(cookieArr),{
            //         expires:7
            //     })
            // }
            


            
            ballMove($("#addCar"));
            window.location.reload();
        })

        // shoppingCar.sc_num();
        // shoppingCar.sc_msg();
    }

    function ballMove(oBtn){
        $("#ball").css({
            display:"block",
            left:$("#addCar").offset().left,
            top:$("#addCar").offset().top,
        })
        console.log($(oBtn).offset().left);
        console.log($("#shoppigCar").offset().left);
        var X = $("#shoppigCar").offset().left - $(oBtn).offset().left;

        var Y = $("#shoppigCar").offset().top -  $(oBtn).offset().top;
        
        var bool = new Parabola({
            el:"#ball",
            offset:[X,Y],
            duration:800,
            curvature: 0.0005,
            callback: function(){
                $("#ball").hide();
            }
        });
        bool.start();
    }

    return{
        headline:headline,
        count:count,
        download:download,
        moveImg:moveImg,
        magnifying:magnifying,
        cookie:cookie,
        
    }
})