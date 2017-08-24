package com.kerryzb.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * 平台
 * @author zou
 *
 */
@Entity
public class Platform {

	private Integer id;
	private Integer sysUserID;
	private String name;
	private String username;
	private String loginPassword;
	private String tradePassword;
	private String gesturePassword;
	private String type; // P2P 银行 股票 基金 其它等
	private Float amount;//平台总金额
	private Float tradingAmount;	//交易中金额
	private Float availableBalance;//可用余额
	private String remark;
	private Date udpateDate;

	@Id
	@GeneratedValue
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getLoginPassword() {
		return loginPassword;
	}

	public void setLoginPassword(String loginPassword) {
		this.loginPassword = loginPassword;
	}

	public String getTradePassword() {
		return tradePassword;
	}

	public void setTradePassword(String tradePassword) {
		this.tradePassword = tradePassword;
	}

	public String getGesturePassword() {
		return gesturePassword;
	}

	public void setGesturePassword(String gesturePassword) {
		this.gesturePassword = gesturePassword;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
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

	public Date getUdpateDate() {
		return udpateDate;
	}

	public void setUdpateDate(Date udpateDate) {
		this.udpateDate = udpateDate;
	}

	public Integer getSysUserID() {
		return sysUserID;
	}

	public void setSysUserID(Integer sysUserID) {
		this.sysUserID = sysUserID;
	}

}
