define(["jquery","jquery-cookie"],function($){
    function sc_msg(){
        $.ajax({
            type:"get",
            url:"data/index.json",
            success:function(data){
                var arr = data.hotListBox;
                var cookieStr = $.cookie("goods");
                if(cookieStr){
                    var cookieArr = JSON.parse(cookieStr);
                    var newArr = [];
                    for(var i = 0; i < arr.length; i++){
                        for(var j = 0; j < cookieArr.length; j++){
                            if(arr[i].id == cookieArr[j].id){
                                arr[i].num = cookieArr[j].num;
                                newArr.push(arr[i]);
                            }
                        }
                    }

                    $(".carUl").empty();
                    var m = 0;
                    for(var i = 0; i < newArr.length; i++){
                        var n = parseInt(newArr[i].price.substring(1)) * newArr[i].num;
                        m += n;
                        var node = $(`<div class="carItem" id="${newArr[i].id}">
                                        <div class="product clearfn">
                                            <ul class="productUl clearfn">
                                                <li>
                                                    <input type="checkbox" checked class="cbBox" id="cbBox">
                                                </li>
                                                <li>
                                                    <img src="${newArr[i].img}" alt="">
                                                    <p>${newArr[i].title}</p>
                                                </li>
                                                <li class="salePrice">${newArr[i].price}</li>
                                                <li class="changeC">
                                                    <article class="a">-</article>
                                                    <input type="text" value = "${newArr[i].num}" id='NUM'>
                                                    <article class="a">+</article>
                                                </li>
                                                <li>￥0</li>
                                                <li class="score">${n}</li>
                                                <li class="count">${n}</li>
                                                <li class="remove">×</li>
                                            </ul>
                                        </div>
                                    </div>`);
                        node.appendTo(".carUl");
                    }
                    $("#money").html("￥" + m);

                }

               
            },
            error:function(msg){
                alert("error" + msg);
            }
        })
    }

    //计算商品总数
    function sc_num(){
        var cookieStr = $.cookie("goods");
        if(cookieStr){
            var cookieArr = JSON.parse(cookieStr);
            var sum = 0;
            for(var i = 0; i < cookieArr.length; i++){
                sum += cookieArr[i].num;
            }
            $("#sum").html(sum);
            $("#checked").html(sum);
        }else{
            $("#sum").html(0);
            $("#checked").html(0);
        }
    }


    //删除商品
    function removeGoods(){
        $(".carUl").on("click",".carItem .remove",function(){
            var id = $(this).closest(".carItem").remove().attr("id");
            
            var cookieArr = JSON.parse($.cookie("goods"));
            for(var i = 0; i < cookieArr.length; i++){
                
                if(id == cookieArr[i].id){
                    cookieArr.splice(i,1);
                    // alert(cookieArr.length);
                    break;
                }
            }

            if(cookieArr.length){
                $.cookie("goods",JSON.stringify(cookieArr),{
                    expires:7
                })
            }else{
                $.cookie("goods",null);
            }

            sc_num();
        })
    }


    //单个物品数量增减
    function changeCount(){
        $(".carUl").on("click",".changeC article",function(){
            var id = $(this).closest(".carItem").attr("id");

            var cookieArr = JSON.parse($.cookie("goods"));
            
            for(var i = 0; i < cookieArr.length; i++){
                if(id == cookieArr[i].id){
                    var goodObj = cookieArr[i];
                    // alert(goodObj.id);
                    break;
                }
            }
            if(this.innerHTML == "+"){
                goodObj.num++;
                
            }else{
                if(goodObj.num == 1){
                    alert("数量已经最小！");
                }else{
                    goodObj.num--;
                }
            }
            $(this).closest("li").find("input").val(goodObj.num);
            showNum($(this),goodObj.num);

            $.cookie("goods",JSON.stringify(cookieArr),{
                expires:7
            });

            sc_num();
            total();
            

        })


        $(".carUl").on("blur",".changeC #NUM",function(){
            var id = $(this).closest(".carItem").attr("id");

            var cookieArr = JSON.parse($.cookie("goods"));
            for(var i = 0; i < cookieArr.length; i++){
                if(id == cookieArr[i].id){
                    //要修改的数据
                    var goodObj = cookieArr[i];
                    break;
                }
            }

            goodObj.num = parseInt($(this).val());
            $.cookie("goods", JSON.stringify(cookieArr), {
                expires: 7
            });
            sc_num();
            total();
            showNum($(this),goodObj.num);
        })

    }

    //显示积分和小计
    function showNum(node,num){
        var money =  node.closest(".carItem").find(".salePrice").html();

        money = parseInt(money.substring(1)) * num;
        node.closest(".carItem").find(".score").html(money);
        node.closest(".carItem").find(".count").html(money);


    }

    
    //计算选中商品总价
    function total(){
        var sum = 0;
        var node = 0;
       $(".carUl").find(".cbBox").each(function(index,item){
           var isChecked = $(item).prop("checked");
           if(isChecked){
               node += Number($(item).closest(".carItem").find(".changeC input").val());
                var money = Number($(item).closest(".carItem").find(".count").html());
                sum += money;
           }
       })
       $("#money").html("￥" + sum);
       $("#checked").html(node);
        // var aUls = $(".carUl").find('.carItem').find(".productUl");
        // var sum = 0;
        // aUls.each(function(index, item){
        //     var isCheckEd = $(item).find(".cbBox").prop("checked");
           
        //     if(isCheckEd){
        //         sum += Number($(item).find(".count").html());
        //     }
        //     $("#money").html("￥" + sum);
        // })
        
    }

    function checkoutClick(){
        $(".carUl").on("click",$(".cbBox"),function(){
            total();
            $(".carUl").find(".cbBox").each(function(index,item){
                if(!$(item).prop("checked")){
                    $("#totalCheck").prop("checked",false);
                }else{
                    $("#totalCheck").prop("checked",true);
                }
            })
        });

        $("#totalCheck").on("click",function(){
            var isChecked = $(this).prop("checked");
            if(isChecked){
                $(".carUl").find(".cbBox").each(function(index,item){
                    $(item).prop("checked",true);
                })
            }else{
                $(".carUl").find(".cbBox").each(function(index,item){
                    $(item).prop("checked",false);
                })
            }
            
            total();
        })
    }

    



    return{
        sc_msg:sc_msg,//加载页面
        sc_num:sc_num,
        removeGoods:removeGoods,
        changeCount:changeCount,
        // total:total,
        checkoutClick:checkoutClick
    }
})