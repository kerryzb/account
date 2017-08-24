package com.kerryzb.interceptor;

import org.aspectj.weaver.patterns.ThisOrTargetAnnotationPointcut;

import com.kerryzb.util.ExtJson;
import com.opensymphony.xwork2.ActionContext;

public class SystemException extends Exception {
	

	public SystemException(String frdMessage) {

		super(createFriendlyErrMsg(frdMessage));
		
		ExtJson extJson = new ExtJson();
		extJson.setSuccess(false);
		extJson.setMsg(frdMessage);
		
		ActionContext context = ActionContext.getContext();  
		context.put("extJson", extJson); 
		
	}

	public SystemException(Throwable throwable) {

		super(throwable);

	}

	public SystemException(Throwable throwable, String frdMessage) {

		super(throwable);

	}

	/**
	 * 
	 * 创建友好的报错信息
	 * 
	 * */

	private static String createFriendlyErrMsg(String msgBody) {
		
		System.out.println(msgBody);

		String prefixStr = "抱歉。";

		String suffixStr = "请稍后再试或与管理员联系！";

		StringBuffer friendlyErrMsg = new StringBuffer();

		friendlyErrMsg.append(prefixStr);

		friendlyErrMsg.append(msgBody);

		friendlyErrMsg.append(suffixStr);
		
		return friendlyErrMsg.toString();

	}


}
