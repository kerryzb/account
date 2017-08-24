package com.kerryzb.util;

import com.kerryzb.model.SysUser;
import com.opensymphony.xwork2.ActionContext;

public class ActionUtil {
	
	public static SysUser getCurrentSysUser(){
		Object currentSysUser = ActionContext.getContext().getSession().get("currentSysUser");
		if (currentSysUser!=null) {
			return (SysUser)currentSysUser;
		}
		return null;
	}
	
	public static int getCurrentSysUserID(){
		Object currentSysUser = ActionContext.getContext().getSession().get("currentSysUser");
		if (currentSysUser!=null) {
			SysUser user = (SysUser)currentSysUser; 
			return user.getId();
		}
		return 0;
	}

}
