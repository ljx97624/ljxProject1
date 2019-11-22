<?php 
header("Content-type:text/html;charset=utf-8");
//统一发返回格式
$responseData = array("code" => 0, "message" => "");

 $tel = $_POST['tel'];
 $password = $_POST['password'];

if(!$tel){
    $responseData['code'] = 1;
    $responseData['message'] = "用户名不能为空";
    echo json_encode($responseData);
    exit;
 }

if(!$password){
    $responseData['code'] = 2;
    $responseData['message'] = "密码不能为空";
    echo json_encode($responseData);
    exit;
} 

$link = mysql_connect("localhost","root","123456");

if(!$link){
    $responseData['code'] = 3;
    $responseData['message'] = "数据库连接失败";
    echo json_encode($responseData);
    exit;
}

mysql_set_charset('utf8');

mysql_select_db("asus");

$str = md5(md5(md5($password)."asus")."huashuo");

$sql = "SELECT * FROM users WHERE tel='{$tel}' AND password='{$str}'";

$res = mysql_query($sql);

$row = mysql_fetch_assoc($res);

if(!$row){
    $responseData['code'] = 4;
    $responseData['message'] = "账号或密码错误";
    echo json_encode($responseData);
}else{
    $responseData['message'] = "登陆成功";
    echo json_encode($responseData);
}

mysql_close($link);

?>