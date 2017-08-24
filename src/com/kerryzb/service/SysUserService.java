package com.kerryzb.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.kerryzb.dao.SysUserDAO;
import com.kerryzb.model.SysUser;

@Component("sysUserService")
public class SysUserService {
	
	private SysUserDAO sysUserDAO;
	
	public void save(SysUser sysUser){
		sysUserDAO.save(sysUser);
	}
	
	public void delete(SysUser sysUser){
		sysUserDAO.delete(sysUser);
	}
	
	public void saveOrUpdate(SysUser sysUser){		
		sysUserDAO.saveOrUpdate(sysUser);
	}
	
	public SysUser findById(int id){
		return (SysUser) sysUserDAO.getEntityById(id);
	}
	
	public List<Object> list(int start, int limit, String username, String truename){
		return sysUserDAO.listSysUser(start, limit, username, truename);
	}
	
	public int total(String username, String truename) {
		return sysUserDAO.totalSysUser(username, truename);
	}
	
	public boolean isExit(String username, String truename) {
		boolean flag = false;
		String hqlString = "from SysUser where 1=1";
		if (username!=null&&!username.equals("")) {
			hqlString+=" and username = '"+username+"'";
		}
		if (truename!=null&&!truename.equals("")) {
			hqlString += "and truename = '"+truename+"'";
		}
		List list = sysUserDAO.findByHQL(hqlString);
		if (!list.isEmpty()) {
			flag = true;
		}
		return flag;
	}
		
	public SysUserDAO getSysUserDAO() {
		return sysUserDAO;
	}

	@Resource
	public void setSysUserDAO(SysUserDAO sysUserDAO) {
		this.sysUserDAO = sysUserDAO;
	}

	public SysUser login(String username, String password) {
		String hqlString = "from SysUser where 1=1";
		hqlString += " and (username = '"+username+"' or truename = '"+username+"')";
		hqlString += " and password = '"+password+"'";
		List list = sysUserDAO.findByHQL(hqlString);
		if (!list.isEmpty()) {
			return (SysUser) list.get(0);
		}
		return null;
	}

	


}
