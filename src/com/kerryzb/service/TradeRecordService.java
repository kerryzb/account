package com.kerryzb.service;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.kerryzb.dao.PlatformDAO;
import com.kerryzb.dao.TradeRecordDAO;
import com.kerryzb.model.Platform;
import com.kerryzb.model.TradeRecord;

@Component("tradeRecordService")
public class TradeRecordService {
	
	private TradeRecordDAO tradeRecordDAO;	
	private PlatformDAO platformDAO;
	
	public void save(TradeRecord tradeRecord){			
		tradeRecordDAO.save(tradeRecord);
		//平台交易金额
		if (tradeRecord.getPlatformID()!=null&&tradeRecord.getPlatformID()!=0) {
			Platform platform = (Platform) platformDAO.getEntityById(tradeRecord.getPlatformID());
			if (platform!=null) {
				if (platform.getTradingAmount()==null) {
					platform.setTradingAmount(0f);
				}
				if (platform.getAvailableBalance()==null) {
					platform.setAvailableBalance(0f);
				}
				platform.setTradingAmount(platform.getTradingAmount()+tradeRecord.getAmount());
				platform.setAvailableBalance(platform.getAvailableBalance()-tradeRecord.getAmount());
				platformDAO.saveOrUpdate(platform);
			}
		}
	}
	
	public void delete(TradeRecord tradeRecord){
		//还原平台交易金额
		if (tradeRecord.getPlatformID()!=null&&tradeRecord.getPlatformID()!=0) {
			Platform platform = (Platform) platformDAO.getEntityById(tradeRecord.getPlatformID());	
			if (platform!=null) {
				if (platform.getTradingAmount()==null) {
					platform.setTradingAmount(0f);
				}
				if (platform.getAvailableBalance()==null) {
					platform.setAvailableBalance(0f);
				}
				platform.setTradingAmount(platform.getTradingAmount()-tradeRecord.getAmount());
				platform.setAvailableBalance(platform.getAvailableBalance()+tradeRecord.getAmount());
				platformDAO.saveOrUpdate(platform);
			}
		}
		tradeRecordDAO.delete(tradeRecord);
	}
	
	public void saveOrUpdate(TradeRecord tradeRecord){
		//还原平台交易金额
		TradeRecord tradeRecordOld = (TradeRecord) tradeRecordDAO.getEntityById(tradeRecord.getId());
		if (tradeRecordOld==null) {
			return;
		}
		if (tradeRecordOld.getPlatformID()!=null&&tradeRecordOld.getPlatformID()!=0) {
			Platform platform = (Platform) platformDAO.getEntityById(tradeRecordOld.getPlatformID());	
			if (platform!=null) {
				if (platform.getTradingAmount()==null) {
					platform.setTradingAmount(0f);
				}
				if (platform.getAvailableBalance()==null) {
					platform.setAvailableBalance(0f);
				}
				platform.setTradingAmount(platform.getTradingAmount()-tradeRecordOld.getAmount());
				platform.setAvailableBalance(platform.getAvailableBalance()+tradeRecordOld.getAmount());
				platformDAO.saveOrUpdate(platform);
			}
		}
		tradeRecordDAO.saveOrUpdate(tradeRecord);
		//平台交易金额
		if (tradeRecord.getPlatformID()!=null&&tradeRecord.getPlatformID()!=0) {
			Platform platform = (Platform) platformDAO.getEntityById(tradeRecord.getPlatformID());
			if (platform!=null) {
				if (platform.getTradingAmount()==null) {
					platform.setTradingAmount(0f);
				}
				if (platform.getAvailableBalance()==null) {
					platform.setAvailableBalance(0f);
				}
				platform.setTradingAmount(platform.getTradingAmount()+tradeRecord.getAmount());
				platform.setAvailableBalance(platform.getAvailableBalance()-tradeRecord.getAmount());
				platformDAO.saveOrUpdate(platform);
			}
		}
	}
	
	/**
	 * 完成交易：交易中金额转入可用余额，并增加收益金额
	 * @param trading
	 */
	public void finish(TradeRecord trading){
		TradeRecord tradeRecord = (TradeRecord) tradeRecordDAO.getEntityById(trading.getId());
		if (tradeRecord==null) {
			return;
		}
		if (!"1".equals(tradeRecord.getIsTradeFinish())) {
			tradeRecord.setIsTradeFinish("1");
			tradeRecord.setUpdateDate(new Date());
			tradeRecordDAO.saveOrUpdate(tradeRecord);
			//更新平台交易金额与平台账户总金额
			if (tradeRecord.getPlatformID()!=null&&tradeRecord.getPlatformID()!=0) {
				Platform platform = (Platform) platformDAO.getEntityById(tradeRecord.getPlatformID());	
				if (platform!=null) {
					if (platform.getAmount()==null) {
						platform.setAmount(0f);
					}
					if (platform.getTradingAmount()==null) {
						platform.setTradingAmount(0f);
					}
					if (platform.getAvailableBalance()==null) {
						platform.setAvailableBalance(0f);
					}
					platform.setTradingAmount(platform.getTradingAmount()-tradeRecord.getAmount());
					platform.setAvailableBalance(platform.getAvailableBalance()+tradeRecord.getAmount());
					if (tradeRecord.getGainsAll()!=null) {
						platform.setAvailableBalance(platform.getAvailableBalance()+tradeRecord.getGainsAll());
						platform.setAmount(platform.getAmount()+tradeRecord.getGainsAll());
					}
					platformDAO.saveOrUpdate(platform);
				}
			}
		}
	}
	
	public TradeRecord findById(int id){
		return (TradeRecord) tradeRecordDAO.getEntityById(id);
	}
	
	public List<Object> list(int start, int limit, String platformName, String platfromType, String isTradeFinish){
		return tradeRecordDAO.listTradeRecord(start, limit, platformName, platfromType, isTradeFinish);
	}
	
	public int total(String platformName, String platfromType, String isTradeFinish) {		
		return tradeRecordDAO.totalTradeRecord(platformName, platfromType, isTradeFinish);
	}

	public TradeRecordDAO getTradeRecordDAO() {
		return tradeRecordDAO;
	}

	@Resource
	public void setTradeRecordDAO(TradeRecordDAO tradeRecordDAO) {
		this.tradeRecordDAO = tradeRecordDAO;
	}

	public PlatformDAO getPlatformDAO() {
		return platformDAO;
	}

	@Resource
	public void setPlatformDAO(PlatformDAO platformDAO) {
		this.platformDAO = platformDAO;
	}

	


}
