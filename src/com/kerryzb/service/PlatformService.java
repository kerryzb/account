package com.kerryzb.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.kerryzb.dao.PlatformDAO;
import com.kerryzb.model.Platform;
import com.kerryzb.util.ActionUtil;

@Component("platformService")
public class PlatformService {
	
	private PlatformDAO platformDAO;
	
	public void save(Platform platform){
		platformDAO.save(platform);
	}
	
	public void delete(Platform platform){
		platformDAO.delete(platform);
	}
	
	public void saveOrUpdate(Platform platform){
		platformDAO.saveOrUpdate(platform);
	}
	
	public Platform findById(int id){
		return (Platform) platformDAO.getEntityById(id);
	}
	
	public List<Object> list(int start, int limit, String name, String type){
		return platformDAO.listPlatform(start, limit, name, type);
	}
	
	public int total(String name, String type){
		return platformDAO.totalPlatform(name, type);
	}
	
	public List<Object> listByName(String name) {
		return platformDAO.listByName(name);
	}
	
	public List<Object> listType(String query) {
		return platformDAO.listType(query);
	}
	
	public boolean isExit(String name) {
		boolean flag = false;
		String hqlString = "from Platform where 1=1";
		hqlString += " and sysUserID = "+ActionUtil.getCurrentSysUserID();
		if (name!=null&&!name.equals("")) {
			hqlString+=" and name = '"+name+"'";
		}
		List list = platformDAO.findByHQL(hqlString);
		if (!list.isEmpty()) {
			flag = true;
		}
		return flag;
	}

	public PlatformDAO getPlatformDAO() {
		return platformDAO;
	}

	@Resource
	public void setPlatformDAO(PlatformDAO platformDAO) {
		this.platformDAO = platformDAO;
	}

	

		
}
