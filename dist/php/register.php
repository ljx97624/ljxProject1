<?php
    header("Content-type:text/html;charset=utf-8");

    $responseData = array("code" => 0, "message" => "");

    $tel = $_POST["tel"];
    $password = $_POST["password"];
    $repassword = $_POST["repassword"];
    $createTime = $_POST["createTime"];
    
    if(!$tel){
        $responseData["code"] = 1;
        $responseData["message"] = "手机号不能为空";
        echo json_encode($responseData);
        exit;
    }

    if(!$password){
        $responseData["code"] = 2;
        $responseData["message"] = "密码不能为空";
        echo json_encode($responseData);
        exit;
    }
    if($password != $repassword){
        $responseData["code"] = 3;
        $responseData["message"] = "两次输入的密码不一致";
        echo json_encode($responseData);
        exit;
    }

    $link = mysql_connect("localhost","root","123456");
    if(!$link){
        $responseData["code"] = 4;
        $responseData["message"] = "服务器忙";
        echo json_encode($responseData);
        exit;
    }

    mysql_set_charset("utf8");
    mysql_select_db("asus");

    //准备sql语句  判断数据库是否有同名用户名
    $sql = "SELECT * FROM users WHERE tel='{$tel}'";
    
    $res = mysql_query($sql);
    $row = mysql_fetch_assoc($res);
    if($row){
        $responseData["code"] = 5;
        $responseData["message"] = "用户名已注册";
        echo json_encode($responseData);
        exit;
    }

    //密码要进行md5加密
    $str = md5(md5(md5($password)."asus")."huashuo");

    //注册
	$sql = "INSERT INTO users(tel,password,create_time) VALUES('{$tel}','{$str}',{$createTime})";
    $res = mysql_query($sql);
    if(!$res){
        $responseData["code"] = 6;
        $responseData["message"] = "服务器忙";
		echo json_encode($responseData);
		exit;
    }else{
        $responseData["message"] = "注册成功";
		echo json_encode($responseData);
    }
    mysql_close($link);



?>