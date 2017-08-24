package com.kerryzb.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.kerryzb.common.BasicDAO;
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

}
