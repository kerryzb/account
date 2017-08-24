package com.kerryzb.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * 平台转入转出明细
 * 
 * @author zou
 *
 */
public class Transfer {

	private Integer id;
	private Integer sysUserID;
	private Integer platformID;
	private String platformName;
	private Float balance;
	private Date transferDate;
	private Float fromAmount;
	private Float toAmount;
	private String remark;
	private Date updateDate;

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

	public Float getBalance() {
		return balance;
	}

	public void setBalance(Float balance) {
		this.balance = balance;
	}

	public Date getTransferDate() {
		return transferDate;
	}

	public void setTransferDate(Date transferDate) {
		this.transferDate = transferDate;
	}

	public Float getFromAmount() {
		return fromAmount;
	}

	public void setFromAmount(Float fromAmount) {
		this.fromAmount = fromAmount;
	}

	public Float getToAmount() {
		return toAmount;
	}

	public void setToAmount(Float toAmount) {
		this.toAmount = toAmount;
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

}
