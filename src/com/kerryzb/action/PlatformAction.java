package com.kerryzb.action;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.kerryzb.common.BasicAction;
import com.kerryzb.model.Platform;
import com.kerryzb.service.PlatformService;
import com.kerryzb.util.ActionUtil;

@SuppressWarnings("serial")
@Component("platformAction")
@Scope("prototype")
public class PlatformAction extends BasicAction {

	private Platform platform;
	private int id;
	private int start;
	private int limit;
	private String name;
	private String type;
	private String query;
	private PlatformService platformService;
	
	public String add(){
		if (!platformService.isExit(platform.getName())) {
			platform.setSysUserID(ActionUtil.getCurrentSysUserID());
			platform.setUdpateDate(new Date());
			platformService.save(platform);
			this.toSuccess("成功保存!");
		}else{
			this.toFalier("系统中已经存在该平台,请检查!");
		}		
		return SUCCESS;
	}
		
	public String delete(){
		platform = platformService.findById(id);
		if (platform!=null) {
			if (platform.getAmount()!=null&&platform.getAmount()>0) {
				this.toFalier("该平台存在金额,不能删除!");
				return SUCCESS;
			}
			platformService.delete(platform);				
			
		}	
		this.toSuccess("成功删除!");
		return SUCCESS;
	}

	public String update(){
		platform.setUdpateDate(new Date());
		platformService.saveOrUpdate(platform);
		this.toSuccess("成功修改!");
		return SUCCESS;
	}

	public String findById(){
		platform = platformService.findById(id);
		if (platform!=null) {
			this.toExtObj(platform);
		}else{
			this.toFalier("记录不存在,可能已经被删除!");
		}
		return SUCCESS;
	}

	public String list(){
		List<Object> list = platformService.list(start, limit, name, type);
		int total = platformService.total(name, type);
		this.toExtPage(list, total);
		return SUCCESS;
	}
	
	public String listByName(){
		List<Object> list = platformService.listByName(query);
		this.toExtPage(list, list.size());
		return SUCCESS;
	}
	
	public String listType(){
		List<Object> list = platformService.listType(query);
		List<Object> typeList = new ArrayList<Object>();
		for(Object type : list) {
			Platform platform = new Platform();
			platform.setType((String) type);
			typeList.add(platform);
		}
		this.toExtPage(typeList, list.size());
		return SUCCESS;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public Platform getPlatform() {
		return platform;
	}

	public void setPlatform(Platform platform) {
		this.platform = platform;
	}

	public PlatformService getPlatformService() {
		return platformService;
	}

	@Resource
	public void setPlatformService(PlatformService platformService) {
		this.platformService = platformService;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getQuery() {
		return query;
	}

	public void setQuery(String query) {
		this.query = query;
	}

	
}
