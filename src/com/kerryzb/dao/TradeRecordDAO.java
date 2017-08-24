package com.kerryzb.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.kerryzb.common.BasicDAO;
import com.kerryzb.model.TradeRecord;

@Component("tradeRecordDAO")
public class TradeRecordDAO extends BasicDAO<TradeRecord>{

	public List<Object> listTradeRecord(int start, int limit, String platformName, String platfromType, String isTradeFinish) {
		StringBuffer hql = new StringBuffer("from TradeRecord where 1=1");
		if (platformName!=null&&!platformName.equals("")) {
			hql.append(" and platformName like '%"+platformName+"%'");
		}
		if (platfromType!=null&&!platfromType.equals("")) {
			hql.append(" and platfromType like '%"+platfromType+"%'");
		}
		if (isTradeFinish!=null&&!isTradeFinish.equals("")) {
			hql.append(" and isTradeFinish = '"+isTradeFinish+"'");
		}
		hql.append(" order by tradeDate desc, updateDate desc");
		
		List list = this.findPageByHQL(hql.toString(),start ,limit);
		return list;
	}

	public int totalTradeRecord(String platformName, String platfromType, String isTradeFinish) {
		StringBuffer hql = new StringBuffer("select id from TradeRecord where 1=1");
		if (platformName!=null&&!platformName.equals("")) {
			hql.append(" and platformName like '%"+platformName+"%'");
		}
		if (platfromType!=null&&!platfromType.equals("")) {
			hql.append(" and platfromType like '%"+platfromType+"%'");
		}
		if (isTradeFinish!=null&&!isTradeFinish.equals("")) {
			hql.append(" and isTradeFinish = '"+isTradeFinish+"'");
		}
		hql.append(" order by tradeDate desc, updateDate desc");
		
		List list = this.findByHQL(hql.toString());
		return list.size();
	}

}
