package com.kerryzb.action;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.kerryzb.common.BasicAction;
import com.kerryzb.model.SysUser;
import com.kerryzb.service.SysUserService;
import com.kerryzb.util.MD5Util;
import com.opensymphony.xwork2.ActionContext;

@SuppressWarnings("serial")
@Component("sysUserAction")
@Scope("prototype")
public class SysUserAction extends BasicAction {

	private SysUser sysUser;
	private int id;
	private int start;
	private int limit;
	private String truename;
	private String username;
	private SysUserService sysUserService;
	
	public String add(){
		if (sysUser.getPassword().equals("******")) {
			this.toFalier("密码错误!");
			return SUCCESS;
		}
		if (!sysUserService.isExit(sysUser.getUsername(), sysUser.getTruename())) {
			sysUser.setPassword(MD5Util.string2MD5(sysUser.getPassword()));
			sysUser.setUpdateDate(new Date());
			sysUserService.save(sysUser);
			this.toSuccess("成功保存!");
		}else{
			this.toFalier("系统中已经存在该用户,请检查!");
		}		
		return SUCCESS;
	}
		
	public String delete(){
		sysUser = sysUserService.findById(id);
		if (sysUser!=null) {
			sysUserService.delete(sysUser);
		}	
		this.toSuccess("成功删除!");
		return SUCCESS;
	}

	public String update(){		
		SysUser user = sysUserService.findById(sysUser.getId());
		if (user==null) {
			this.toFalier("记录不存在,可能已经被删除!");
			return SUCCESS;
		}
		if (!sysUser.getPassword().equals("******")) {
			user.setPassword(MD5Util.string2MD5(sysUser.getPassword()));
		}
		user.setTruename(sysUser.getTruename());
		user.setUsername(sysUser.getUsername());
		user.setRemark(sysUser.getRemark());
		user.setUpdateDate(new Date());
		sysUserService.saveOrUpdate(user);
		this.toSuccess("成功修改!");
		return SUCCESS;
	}

	public String findById(){
		sysUser = sysUserService.findById(id);
		if (sysUser!=null) {
			this.toExtObj(sysUser);
		}else{
			this.toFalier("记录不存在,可能已经被删除!");
		}
		return SUCCESS;
	}

	public String list(){
		List<Object> list = sysUserService.list(start, limit, username, truename);		
		int total = sysUserService.total(username, truename);
		this.toExtPage(list, total);
		return SUCCESS;
	}
	
	public String login(){
		if (sysUser.getUsername()==null&&sysUser.getUsername().equals("")) {
			this.toFalier("用户名不能为空!");
			return "loginFail";
		}
		if (sysUser.getPassword()==null&&sysUser.getPassword().equals("")) {
			this.toFalier("密码不能为空!");
			return "loginFail";
		}
		SysUser currentSysUser = sysUserService.login(sysUser.getUsername(), MD5Util.string2MD5(sysUser.getPassword()));
		if(currentSysUser!=null){
			ActionContext.getContext().getSession().put("currentSysUser", currentSysUser);
			this.toSuccess("登陆成功!");
		}else{
			this.toFalier("用户名或密码错误!");
			return "loginFail";
		}	
		return "loginSuccess";
	}
	
	public String logout(){
		ActionContext.getContext().getSession().remove("currentSysUser");
		this.toSuccess("登出成功!");
		return "logoutSuccess";
	}
	
	public String isLogin(){
		Object currentSysUser = ActionContext.getContext().getSession().get("currentSysUser");
		if (currentSysUser!=null) {
//			sysUser = (SysUser)currentSysUser;
			this.toExtObj(currentSysUser);
		}else{
			this.toFalier("未登陆");
		}
		return SUCCESS;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public SysUser getSysUser() {
		return sysUser;
	}

	public void setSysUser(SysUser sysUser) {
		this.sysUser = sysUser;
	}

	public SysUserService getSysUserService() {
		return sysUserService;
	}

	@Resource
	public void setSysUserService(SysUserService sysUserService) {
		this.sysUserService = sysUserService;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public String getTruename() {
		return truename;
	}

	public void setTruename(String truename) {
		this.truename = truename;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	
}
