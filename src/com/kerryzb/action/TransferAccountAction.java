package com.kerryzb.action;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.kerryzb.common.BasicAction;
import com.kerryzb.model.TransferAccount;
import com.kerryzb.service.TransferAccountService;
import com.kerryzb.util.ActionUtil;

@SuppressWarnings("serial")
@Component("transferAccountAction")
@Scope("prototype")
public class TransferAccountAction extends BasicAction {

	private TransferAccount transferAccount;
	private int id;
	private int start;
	private int limit;
	private String platformName;
	private TransferAccountService transferAccountService;
	
	public String add(){
//		if (transferAccount.getFromPlatformID()==null) {
//			this.toFalier("转入平台为空!");
//			return SUCCESS;
//		}
//		if (transferAccount.getToPlatformID()==null) {
//			this.toFalier("转出平台为空!");
//			return SUCCESS;
//		}
		
		transferAccount.setSysUserID(ActionUtil.getCurrentSysUserID());
		transferAccount.setUpdateDate(new Date());
		transferAccountService.save(transferAccount);
		this.toSuccess("成功保存!");
		return SUCCESS;
	}
		
	public String delete(){
		transferAccount = transferAccountService.findById(id);
		if (transferAccount!=null) {
			transferAccountService.delete(transferAccount);
		}	
		this.toSuccess("成功删除!");
		return SUCCESS;
	}

	public String update(){
//		if (transferAccount.getFromPlatformID()==null) {
//			this.toFalier("转入平台为空!");
//			return SUCCESS;
//		}
		if (transferAccount.getToPlatformID()==null) {
			this.toFalier("转出平台为空!");
			return SUCCESS;
		}
		transferAccount.setUpdateDate(new Date());
		transferAccountService.saveOrUpdate(transferAccount);
		this.toSuccess("成功修改!");
		return SUCCESS;
	}

	public String findById(){
		transferAccount = transferAccountService.findById(id);
		if (transferAccount!=null) {
			this.toExtObj(transferAccount);
		}else{
			this.toFalier("记录不存在,可能已经被删除!");
		}
		return SUCCESS;
	}

	public String list(){
		List<Object> list = transferAccountService.list(start, limit, platformName);
		int total = transferAccountService.total(platformName);
		this.toExtPage(list, total);
		return SUCCESS;
	}
	
	public String listTransfer(){
		List<Object> list = transferAccountService.listTransfer(start, limit, platformName);
		int total = transferAccountService.total(platformName);
		this.toExtPage(list, total);
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

	public TransferAccount getTransferAccount() {
		return transferAccount;
	}

	public void setTransferAccount(TransferAccount transferAccount) {
		this.transferAccount = transferAccount;
	}

	public TransferAccountService getTransferAccountService() {
		return transferAccountService;
	}

	@Resource
	public void setTransferAccountService(TransferAccountService transferAccountService) {
		this.transferAccountService = transferAccountService;
	}

	public String getPlatformName() {
		return platformName;
	}

	public void setPlatformName(String platformName) {
		this.platformName = platformName;
	}

	
}
