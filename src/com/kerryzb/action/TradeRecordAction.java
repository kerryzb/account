package com.kerryzb.action;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.kerryzb.common.BasicAction;
import com.kerryzb.model.TradeRecord;
import com.kerryzb.service.TradeRecordService;
import com.kerryzb.util.ActionUtil;

@SuppressWarnings("serial")
@Component("tradeRecordAction")
@Scope("prototype")
public class TradeRecordAction extends BasicAction {

	private TradeRecord tradeRecord;
	private int id;
	private int start;
	private int limit;
	private String platformName;
	private String platfromType;
	private String isTradeFinish;
	private TradeRecordService tradeRecordService;
	
	public String add(){
		if (tradeRecord.getPlatformID()==null) {
			this.toFalier("平台为空!");
			return SUCCESS;
		}
		tradeRecord.setSysUserID(ActionUtil.getCurrentSysUserID());
		tradeRecord.setIsTradeFinish("0");
		tradeRecord.setUpdateDate(new Date());
		tradeRecordService.save(tradeRecord);
		this.toSuccess("成功保存!");
		return SUCCESS;
	}
		
	public String delete(){
		tradeRecord = tradeRecordService.findById(id);
		if (tradeRecord!=null) {
			tradeRecordService.delete(tradeRecord);
		}	
		this.toSuccess("成功删除!");
		return SUCCESS;
	}

	public String update(){
		if (tradeRecord.getPlatformID()==null) {
			this.toFalier("平台为空!");
			return SUCCESS;
		}
		tradeRecord.setUpdateDate(new Date());
		tradeRecordService.saveOrUpdate(tradeRecord);
		this.toSuccess("成功修改!");
		return SUCCESS;
	}

	public String findById(){
		tradeRecord = tradeRecordService.findById(id);
		if (tradeRecord!=null) {
			this.toExtObj(tradeRecord);
		}else{
			this.toFalier("记录不存在,可能已经被删除!");
		}
		return SUCCESS;
	}

	public String list(){
		List<Object> list = tradeRecordService.list(start, limit, platformName, platfromType, isTradeFinish);
		int total = tradeRecordService.total(platformName, platfromType, isTradeFinish);
		this.toExtPage(list, total);
		return SUCCESS;
	}
	
	/**
	 * 完成交易
	 * @return
	 */
	public String finish(){
		tradeRecord = tradeRecordService.findById(id);
		if (tradeRecord!=null) {
			tradeRecordService.finish(tradeRecord);
			this.toSuccess("操作成功!");
		}else{
			this.toFalier("记录不存在,可能已经被删除!");
		}
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

	public TradeRecord getTradeRecord() {
		return tradeRecord;
	}

	public void setTradeRecord(TradeRecord tradeRecord) {
		this.tradeRecord = tradeRecord;
	}

	public TradeRecordService getTradeRecordService() {
		return tradeRecordService;
	}

	@Resource
	public void setTradeRecordService(TradeRecordService tradeRecordService) {
		this.tradeRecordService = tradeRecordService;
	}

	public String getPlatformName() {
		return platformName;
	}

	public void setPlatformName(String platformName) {
		this.platformName = platformName;
	}

	public String getPlatfromType() {
		return platfromType;
	}

	public void setPlatfromType(String platfromType) {
		this.platfromType = platfromType;
	}

	public String getIsTradeFinish() {
		return isTradeFinish;
	}

	public void setIsTradeFinish(String isTradeFinish) {
		this.isTradeFinish = isTradeFinish;
	}

	
}
