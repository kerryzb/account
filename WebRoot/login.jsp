<%@ page language="java" import="java.util.*, com.kerryzb.util.ExtJson" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
ExtJson extJson = (ExtJson)request.getAttribute("extJson");
String msg = "";
if(extJson!=null&&!extJson.isSuccess()){
	msg = extJson.getMsg();	
}
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>login</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="css/login.css">
	    
	<script>
		function check(){
			var username = document.getElementsByName("sysUser.username")[0].value;
			var password = document.getElementsByName("sysUser.password")[0].value;
			
			if(username==null||username==''){
				alert('请输入用户名！');
				return false;
			}
			if(password==null||password==''){
				alert('请输入密码！');
				return false;
			}
			return true;
		}
	</script>    
	    
  </head>
  
  <body>
  <form name="form" action="sysUserlogin.action" method="post"  onsubmit="return check()">
  <div class="login-form">
  	  <div class="login-title">
  	  	系统登陆
  	  </div>
	  <div class="login-input">
		  <table border=0 width="100%" cellspacing="0" cellpadding="0">
			  <tr>
			  	<td class="login-input-text">用户名：</td><td><input type="text" name="sysUser.username" placeholder="请输入姓名或用户名"></td>
			  </tr>
			  <tr>
			  	<td class="login-input-text">密&nbsp;&nbsp;&nbsp;码：</td><td><input type="password" name="sysUser.password" placeholder="请输入密码"></td>
			  </tr>
		  </table>
	  </div>
	  <div class="login-tips">
	  	<%=msg %>
	  </div>
	  <div class="login-submit">
  	  	<input type="submit" value="登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;陆">
  	  </div>
  </div>
  </form>
  
  </body>
</html>
