package com.kerryzb.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Component;

import com.kerryzb.common.BasicDAO;
import com.kerryzb.model.Transfer;
import com.kerryzb.model.TransferAccount;
import com.kerryzb.util.ActionUtil;

@Component("transferAccountDAO")
public class TransferAccountDAO extends BasicDAO<TransferAccount>{

	public List<Object> listTransferAccount(int start, int limit, String platformName) {
		StringBuffer hql = new StringBuffer("from TransferAccount where 1=1");
		hql.append(" and sysUserID = "+ActionUtil.getCurrentSysUserID());
		if (platformName!=null&&!platformName.equals("")) {
			hql.append(" and fromPlatformName like '%"+platformName+"%' or toPlatformName like '%"+platformName+"%'");
		}
		hql.append(" order by transferDate desc, updateDate desc");
		
		List list = this.findPageByHQL(hql.toString(),start ,limit);
		return list;
	}

	public int total(String platformName) {
		StringBuffer hql = new StringBuffer("from TransferAccount where 1=1");
		hql.append(" and sysUserID = "+ActionUtil.getCurrentSysUserID());
		if (platformName!=null&&!platformName.equals("")) {
			hql.append(" and fromPlatformName like '%"+platformName+"%' or toPlatformName like '%"+platformName+"%'");
		}
		hql.append(" order by transferDate desc, updateDate desc");
		
		List list = this.findByHQL(hql.toString());
		return list.size();
	}
	
	public List<Object> listTransfer(int start, int limit, String platformName) {
		StringBuffer sql = new StringBuffer("select * from ");
		sql.append("(");
		sql.append("(SELECT id, fromPlatformID as platformID, fromPlatformName as platformName, transferDate, amount as fromAmount, null as toAmount, fromPlatformBalance as balance, remark, updateDate FROM transferaccount where 1 = 1 ");
		sql.append(" and sysUserID = "+ActionUtil.getCurrentSysUserID());
		if (platformName!=null&&!platformName.equals("")) {
			sql.append(" and fromPlatformName like '%"+platformName+"%'");
		}
		sql.append(")");		
		sql.append("union all");		
		sql.append("(SELECT id, toPlatformID as platformID, toPlatformName as platformName, transferDate, null as fromAmount, amount as toAmount, toPlatformBalance as balance, remark, updateDate FROM transferaccount where 1 = 1 ");
		sql.append(" and sysUserID = "+ActionUtil.getCurrentSysUserID());
		if (platformName!=null&&!platformName.equals("")) {
			sql.append(" and toPlatformName like '%"+platformName+"%'");
		}
		sql.append(")");		
		sql.append(") a order by transferDate desc, id desc");		
		List list = this.findPageBySQL(sql.toString(),start ,limit);
		List<Object> transfers = new ArrayList<Object>();
		for (Object object : list) {
			Object[] obj = (Object[]) object;
			Transfer transfer = new Transfer();
			transfer.setId(obj[0]!=null?(Integer) obj[0]:null);
			transfer.setPlatformID(obj[1]!=null?(Integer) obj[1]:null);
			transfer.setPlatformName(obj[2]!=null?(String) obj[2]:null);
			transfer.setTransferDate(obj[3]!=null?(Date) obj[3]:null);
			transfer.setFromAmount(obj[4]!=null?(Float) obj[4]:null);
			transfer.setToAmount(obj[5]!=null?(Float) obj[5]:null);
			transfer.setBalance(obj[6]!=null?(Float) obj[6]:null);
			transfer.setRemark(obj[7]!=null?(String) obj[7]:null);
			transfer.setUpdateDate(obj[8]!=null?(Date) obj[8]:null);			
			transfers.add(transfer);
		}
		return transfers;
	}

}
