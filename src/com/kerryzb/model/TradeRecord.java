package com.kerryzb.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * 交易记录
 * @author zou
 *
 */
@Entity
public class TradeRecord {

	private Integer id;
	private Integer sysUserID;
	private Integer platformID;
	private String platformName;	//平台名称
	private String platfromType;	//平台类型：P2P 银行 股票 基金 其它等
	private String isTradeFinish; // 交易是否已经完成  0.未完成   1.已完成
	private Float amount; // 本金（投资金额）
	private Date tradeDate; // 交易（买入）时间（对于理财产品）
	private Date tradeEndDate; // 到期时间（对于理财产品）
	private String tradeDuration; // 投放时长（对于理财产品）
	private Float gains; // 投资收益
	private Float redPackets; // 红包
	private Float gainsAll; // 总收益
	private String remark;
	private Date updateDate;

	@Id
	@GeneratedValue
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getPlatformID() {
		return platformID;
	}

	public void setPlatformID(Integer platformID) {
		this.platformID = platformID;
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

	public Float getAmount() {
		return amount;
	}

	public void setAmount(Float amount) {
		this.amount = amount;
	}

	public Date getTradeDate() {
		return tradeDate;
	}

	public void setTradeDate(Date tradeDate) {
		this.tradeDate = tradeDate;
	}

	public Date getTradeEndDate() {
		return tradeEndDate;
	}

	public void setTradeEndDate(Date tradeEndDate) {
		this.tradeEndDate = tradeEndDate;
	}

	public String getTradeDuration() {
		return tradeDuration;
	}

	public void setTradeDuration(String tradeDuration) {
		this.tradeDuration = tradeDuration;
	}

	public Float getGains() {
		return gains;
	}

	public void setGains(Float gains) {
		this.gains = gains;
	}

	public Float getRedPackets() {
		return redPackets;
	}

	public void setRedPackets(Float redPackets) {
		this.redPackets = redPackets;
	}

	public Float getGainsAll() {
		return gainsAll;
	}

	public void setGainsAll(Float gainsAll) {
		this.gainsAll = gainsAll;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public Integer getSysUserID() {
		return sysUserID;
	}

	public void setSysUserID(Integer sysUserID) {
		this.sysUserID = sysUserID;
	}

}
