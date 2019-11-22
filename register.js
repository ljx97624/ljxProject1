define(["jquery","jquery-cookie"],function($){
    function change(){
        $("#code").click(function(){
            $("#codeBox").show();
            $("#idBox").hide();
            $(this).addClass("active");
            $("#account").removeClass("active");
        })

        $("#account").click(function(){
            $("#codeBox").hide();
            $("#idBox").show();
            $(this).addClass("active");
            $("#code").removeClass("active");
        })
    }

    function test(){
        $("#tel").on("blur",function(){
            var value = $("#tel").val();
                if(!value){
                    $("#msg").html("请输入手机号码");
                }else if(!/^[1-3]\d{10}$/.test(value)){
                    $("#msg").html("请输入合法手机号码");
                }
                $("#msg").show();
        })
    }
    

    function submit(){
        $("#go").click(function(){
            
            if($("#code").attr("class") == "active"){
                    $.ajax({
                        type:"post",
                        url:"php/register.php",
                        data:{
                            tel:$("#tel").val(),
                            password:$("#messageCode").val(),
                            repassword:$("#repeatCode").val(),
                            createTime:(new Date()).getTime()
                        },
                        success:function(result){
                            var obj = JSON.parse(result);
                            if(obj.code){
                                $("#msg").html(obj.message);
                                $("#msg").show();
                            }else{
                                $("#msg").hide();
                                $.cookie("users",JSON.stringify($("#tel").val()),{
                                    expires:7
                                })
                                setTimeout(function(){
                                    location.href = "index.html";
                                }, 2000);
                            }
                        },
                        error:function(msg){
                            alert("error" + msg);
                        }
                    })
                
            }else{
              
                $.ajax({
                    type:"post",
                    url:"php/login.php",
                    data:{
                        tel:$("#email").val(),
                        password:$("#secrectCode").val(),
                    },
                    success:function(result){
                        var obj = JSON.parse(result);
                        if(!obj.code){
                            $.cookie("users",$("#email").val(),{
                                expires:7
                            })
                            setTimeout(function(){
                                location.href = "index.html";
                            },2000);
                        }
                        $("#alert").html(obj.message);
                        $("#alert").css("display","block");
                    },
                    error:function(msg){
                        alert("error" + msg);
                    }
                })
            }
            
        })
    }


    return{
        change:change,
        test:test,
        submit:submit,

    }

})

