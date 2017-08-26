<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>老百姓管账系统</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="个人管账,老百姓,易用">
	<meta http-equiv="description" content="老百姓管账系统">
       
    <link rel="stylesheet" type="text/css" href="ext-4.1.1/resources/css/ext-all.css">
    <script type="text/javascript" src="ext-4.1.1/ext-all.js"></script>
    <script type="text/javascript" src="ext-4.1.1/ext-lang-zh_CN.js"></script>
    
    
    <link rel="stylesheet" type="text/css" href="css/ui.css">
    
    <script type="text/javascript" src="js/isLogin.js"></script>
    <script type="text/javascript" src="js/util.js"></script>
    <script type="text/javascript" src="js/platform.js"></script>
    <script type="text/javascript" src="js/tradeRecord.js"></script>
    <script type="text/javascript" src="js/transferAccount.js"></script>
    <script type="text/javascript" src="js/transfer.js"></script>
    <script type="text/javascript" src="js/bill.js"></script>
    <script type="text/javascript" src="js/sysUser.js"></script>
    <script type="text/javascript" src="js/data.js"></script>
    
    <script type="text/javascript" src="js/index.js"></script>
    
  </head>
  
  <body>
  </body>
</html>
