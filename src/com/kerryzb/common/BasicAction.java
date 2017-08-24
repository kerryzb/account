package com.kerryzb.common;

import java.util.List;

import org.springframework.stereotype.Component;

import com.kerryzb.util.ExtJson;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
@Component("basicAction")
public class BasicAction extends ActionSupport{
	
	private ExtJson extJson;
	
	public void toExtPage(List<Object> list,int total){
		ExtJson extJson = new ExtJson();
		extJson.setList(list);
		extJson.setTotal(total);
		extJson.setSuccess(true);
		this.setExtJson(extJson);
	}
	
	public void toExtObj(Object obj){
		ExtJson extJson = new ExtJson();
		extJson.setObj(obj);
		extJson.setSuccess(true);
		extJson.setMsg("操作成功!");
		this.setExtJson(extJson);
	}
	
	public void toSuccess(String msg){
		ExtJson extJson = new ExtJson();
		extJson.setSuccess(true);
		extJson.setMsg(msg);
		this.setExtJson(extJson);
	}
	
	public void toFalier(String msg){
		ExtJson extJson = new ExtJson();
		extJson.setSuccess(false);
		extJson.setMsg(msg);
		this.setExtJson(extJson);
	}

	public ExtJson getExtJson() {
		return extJson;
	}

	public void setExtJson(ExtJson extJson) {
		this.extJson = extJson;
	}


}
