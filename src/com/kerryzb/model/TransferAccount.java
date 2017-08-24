package com.kerryzb.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import sun.misc.FloatingDecimal;

/**
 * 转入转出记录
 * @author zou
 *
 */
@Entity
public class TransferAccount {

	private Integer id;
	private Integer sysUserID;	
	private Integer fromPlatformID;
	private String fromPlatformName;	
	private Float fromPlatformBalance;
	private Integer toPlatformID;
	private String toPlatformName;	
	private Float toPlatformBalance;
	private Date transferDate;
	private Float amount;
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

	public Integer getFromPlatformID() {
		return fromPlatformID;
	}

	public void setFromPlatformID(Integer fromPlatformID) {
		this.fromPlatformID = fromPlatformID;
	}

	public String getFromPlatformName() {
		return fromPlatformName;
	}

	public void setFromPlatformName(String fromPlatformName) {
		this.fromPlatformName = fromPlatformName;
	}

	public Integer getToPlatformID() {
		return toPlatformID;
	}

	public void setToPlatformID(Integer toPlatformID) {
		this.toPlatformID = toPlatformID;
	}

	public String getToPlatformName() {
		return toPlatformName;
	}

	public void setToPlatformName(String toPlatformName) {
		this.toPlatformName = toPlatformName;
	}

	public Date getTransferDate() {
		return transferDate;
	}

	public void setTransferDate(Date transferDate) {
		this.transferDate = transferDate;
	}

	public Float getAmount() {
		return amount;
	}

	public void setAmount(Float amount) {
		this.amount = amount;
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

	public Float getFromPlatformBalance() {
		return fromPlatformBalance;
	}

	public void setFromPlatformBalance(Float fromPlatformBalance) {
		this.fromPlatformBalance = fromPlatformBalance;
	}

	public Float getToPlatformBalance() {
		return toPlatformBalance;
	}

	public void setToPlatformBalance(Float toPlatformBalance) {
		this.toPlatformBalance = toPlatformBalance;
	}
	
	

}
