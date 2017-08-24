package com.kerryzb.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.kerryzb.dao.PlatformDAO;
import com.kerryzb.dao.TransferAccountDAO;
import com.kerryzb.model.Platform;
import com.kerryzb.model.SysUser;
import com.kerryzb.model.TransferAccount;

@Component("transferAccountService")
public class TransferAccountService {
	
	private TransferAccountDAO transferAccountDAO;
	private PlatformDAO platformDAO;
	
	public void save(TransferAccount transferAccount){
		//平台转账金额
		if (transferAccount.getFromPlatformID()!=null&&transferAccount.getFromPlatformID()!=0) {
			Platform fromPlatform = (Platform) platformDAO.getEntityById(transferAccount.getFromPlatformID());
			if (fromPlatform!=null) {
				if (fromPlatform.getAmount()==null) {
					fromPlatform.setAmount(0f);
				}
				if (fromPlatform.getAvailableBalance()==null) {
					fromPlatform.setAvailableBalance(0f);
				}
				fromPlatform.setAmount(fromPlatform.getAmount()-transferAccount.getAmount());	
				fromPlatform.setAvailableBalance(fromPlatform.getAvailableBalance()-transferAccount.getAmount());
				platformDAO.saveOrUpdate(fromPlatform);				
				transferAccount.setFromPlatformBalance(fromPlatform.getAmount());
			}
		}
		if (transferAccount.getToPlatformID()!=null&&transferAccount.getToPlatformID()!=0) {
			Platform toPlatform = (Platform) platformDAO.getEntityById(transferAccount.getToPlatformID());
			if (toPlatform!=null) {
				if (toPlatform.getAmount()==null) {
					toPlatform.setAmount(0f);
				}
				if (toPlatform.getAvailableBalance()==null) {
					toPlatform.setAvailableBalance(0f);
				}
				toPlatform.setAmount(toPlatform.getAmount()+transferAccount.getAmount());	
				toPlatform.setAvailableBalance(toPlatform.getAvailableBalance()+transferAccount.getAmount());
				platformDAO.saveOrUpdate(toPlatform);
				transferAccount.setToPlatformBalance(toPlatform.getAmount());
			}
		}
		transferAccountDAO.save(transferAccount);
	}
	
	public void delete(TransferAccount transferAccount){
		//还原平台账户余额
		if (transferAccount.getFromPlatformID()!=null&&transferAccount.getFromPlatformID()!=0) {
			Platform fromPlatform = (Platform) platformDAO.getEntityById(transferAccount.getFromPlatformID());
			if (fromPlatform!=null) {
				if (fromPlatform.getAmount()==null) {
					fromPlatform.setAmount(0f);
				}
				if (fromPlatform.getAvailableBalance()==null) {
					fromPlatform.setAvailableBalance(0f);
				}
				fromPlatform.setAmount(fromPlatform.getAmount()+transferAccount.getAmount());	
				fromPlatform.setAvailableBalance(fromPlatform.getAvailableBalance()+transferAccount.getAmount());
				platformDAO.saveOrUpdate(fromPlatform);
			}
		}
		if (transferAccount.getToPlatformID()!=null&&transferAccount.getToPlatformID()!=0) {
			Platform toPlatform = (Platform) platformDAO.getEntityById(transferAccount.getFromPlatformID());
			if (toPlatform!=null) {
				if (toPlatform.getAmount()==null) {
					toPlatform.setAmount(0f);
				}
				if (toPlatform.getAvailableBalance()==null) {
					toPlatform.setAvailableBalance(0f);
				}
				toPlatform.setAmount(toPlatform.getAmount()-transferAccount.getAmount());	
				toPlatform.setAvailableBalance(toPlatform.getAvailableBalance()-transferAccount.getAmount());
				platformDAO.saveOrUpdate(toPlatform);
			}
		}
		transferAccountDAO.delete(transferAccount);		
	}
	
	public void saveOrUpdate(TransferAccount transferAccount){
		TransferAccount transferAccountOld = (TransferAccount) transferAccountDAO.getEntityById(transferAccount.getId());
		if (transferAccountOld==null) {
			return;
		}
		//还原平台账户余额
		if (transferAccountOld.getFromPlatformID()!=null&&transferAccountOld.getFromPlatformID()!=0) {
			Platform fromPlatform = (Platform) platformDAO.getEntityById(transferAccountOld.getFromPlatformID());
			if (fromPlatform!=null) {
				if (fromPlatform.getAmount()==null) {
					fromPlatform.setAmount(0f);
				}
				if (fromPlatform.getAvailableBalance()==null) {
					fromPlatform.setAvailableBalance(0f);
				}
				fromPlatform.setAmount(fromPlatform.getAmount()+transferAccountOld.getAmount());	
				fromPlatform.setAvailableBalance(fromPlatform.getAvailableBalance()+transferAccountOld.getAmount());
				platformDAO.saveOrUpdate(fromPlatform);
			}
		}
		if (transferAccountOld.getToPlatformID()!=null&&transferAccountOld.getToPlatformID()!=0) {
			Platform toPlatform = (Platform) platformDAO.getEntityById(transferAccountOld.getToPlatformID());
			if (toPlatform!=null) {
				if (toPlatform.getAmount()==null) {
					toPlatform.setAmount(0f);
				}
				if (toPlatform.getAvailableBalance()==null) {
					toPlatform.setAvailableBalance(0f);
				}
				toPlatform.setAmount(toPlatform.getAmount()-transferAccountOld.getAmount());	
				toPlatform.setAvailableBalance(toPlatform.getAvailableBalance()-transferAccountOld.getAmount());
				platformDAO.saveOrUpdate(toPlatform);
			}
		}		
		//平台转账金额
		if (transferAccount.getFromPlatformID()!=null&&transferAccount.getFromPlatformID()!=0) {
			Platform fromPlatform = (Platform) platformDAO.getEntityById(transferAccount.getFromPlatformID());
			if (fromPlatform!=null) {
				if (fromPlatform.getAmount()==null) {
					fromPlatform.setAmount(0f);
				}
				if (fromPlatform.getAvailableBalance()==null) {
					fromPlatform.setAvailableBalance(0f);
				}
				fromPlatform.setAmount(fromPlatform.getAmount()-transferAccount.getAmount());	
				fromPlatform.setAvailableBalance(fromPlatform.getAvailableBalance()-transferAccount.getAmount());
				platformDAO.saveOrUpdate(fromPlatform);
				transferAccount.setFromPlatformBalance(fromPlatform.getAmount());
			}
		}
		if (transferAccount.getToPlatformID()!=null&&transferAccount.getToPlatformID()!=0) {
			Platform toPlatform = (Platform) platformDAO.getEntityById(transferAccount.getToPlatformID());
			if (toPlatform!=null) {
				if (toPlatform.getAmount()==null) {
					toPlatform.setAmount(0f);
				}
				if (toPlatform.getAvailableBalance()==null) {
					toPlatform.setAvailableBalance(0f);
				}
				toPlatform.setAmount(toPlatform.getAmount()+transferAccount.getAmount());	
				toPlatform.setAvailableBalance(toPlatform.getAvailableBalance()+transferAccount.getAmount());
				platformDAO.saveOrUpdate(toPlatform);
				transferAccount.setToPlatformBalance(toPlatform.getAmount());
			}
		}	
		transferAccountDAO.saveOrUpdate(transferAccount);
	}
	
	public TransferAccount findById(int id){
		return (TransferAccount) transferAccountDAO.getEntityById(id);
	}
	
	public List<Object> list(int start, int limit, String platformName){
		return transferAccountDAO.listTransferAccount(start, limit, platformName);
	}

	public int total(String platformName) {
		return transferAccountDAO.total(platformName);
	}
	
	public TransferAccountDAO getTransferAccountDAO() {
		return transferAccountDAO;
	}

	@Resource
	public void setTransferAccountDAO(TransferAccountDAO transferAccountDAO) {
		this.transferAccountDAO = transferAccountDAO;
	}

	public PlatformDAO getPlatformDAO() {
		return platformDAO;
	}

	@Resource
	public void setPlatformDAO(PlatformDAO platformDAO) {
		this.platformDAO = platformDAO;
	}


}
