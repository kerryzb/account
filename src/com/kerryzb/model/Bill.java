package com.kerryzb.model;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * 账单
 * @author zou
 *
 */
@Entity
public class Bill {

	private Integer id;
	private Integer sysUserID;
	private Integer platformID;
	private String platformName; // 平台名称, 平台为空表示全部平台金额
	private Date date;		//账单产生日期
	private String month;	//月份
	private Float amount;// 平台总金额
	private Float tradingAmount; // 交易中金额
	private Float availableBalance;// 可用余额
	private Float amountCompare; // 总金额比较
	private Float tradingAmountCompare; // 交易中金额比较
	private Float availableBalanceCompare; // 可用余额比较

	@Id
	@GeneratedValue
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getSysUserID() {
		return sysUserID;
	}

	public void setSysUserID(Integer sysUserID) {
		this.sysUserID = sysUserID;
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

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	public Float getAmount() {
		return amount;
	}

	public void setAmount(Float amount) {
		this.amount = amount;
	}

	public Float getTradingAmount() {
		return tradingAmount;
	}

	public void setTradingAmount(Float tradingAmount) {
		this.tradingAmount = tradingAmount;
	}

	public Float getAvailableBalance() {
		return availableBalance;
	}

	public void setAvailableBalance(Float availableBalance) {
		this.availableBalance = availableBalance;
	}

	public Float getAmountCompare() {
		return amountCompare;
	}

	public void setAmountCompare(Float amountCompare) {
		this.amountCompare = amountCompare;
	}

	public Float getTradingAmountCompare() {
		return tradingAmountCompare;
	}

	public void setTradingAmountCompare(Float tradingAmountCompare) {
		this.tradingAmountCompare = tradingAmountCompare;
	}

	public Float getAvailableBalanceCompare() {
		return availableBalanceCompare;
	}

	public void setAvailableBalanceCompare(Float availableBalanceCompare) {
		this.availableBalanceCompare = availableBalanceCompare;
	}

	

}
