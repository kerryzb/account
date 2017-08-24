package com.kerryzb.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.kerryzb.common.BasicDAO;
import com.kerryzb.model.Bill;

@Component("billDAO")
public class BillDAO extends BasicDAO<Bill>{

	public List<Object> listBill(int start, int limit, String month, String platform) {
		StringBuffer hql = new StringBuffer("from Bill where 1=1");
		if (month!=null&&!month.equals("")) {
			hql.append(" and month like '%"+month+"%'");
		}
		if (platform!=null&&!platform.equals("")) {
			hql.append(" and platformName like '%"+platform+"%'");
		}else{
			hql.append(" and platformName is null");
		}
		hql.append(" order by month desc, date desc");
		
		List list = this.findPageByHQL(hql.toString(),start ,limit);
		return list;
	}

	public int totalBill(String month, String platform) {
		StringBuffer hql = new StringBuffer("select id from Bill where 1=1");
		if (month!=null&&!month.equals("")) {
			hql.append(" and month like '%"+month+"%'");
		}
		if (platform!=null&&!platform.equals("")) {
			hql.append(" and platformName like '%"+platform+"%'");
		}else{
			hql.append(" and platformName is null");
		}
		hql.append(" order by month desc, date desc");
		
		List list = this.findByHQL(hql.toString());
		return list.size();
	}

	public boolean generateBill(){
		String sql = "INSERT bill(sysUserID,platformID,platformName,date,month,amount,tradingAmount,availableBalance,amountCompare,tradingAmountCompare,availableBalanceCompare)"+  
					" ("+
						"select p.sysUserID,p.id,p.name, NOW() as date, DATE_FORMAT(NOW(), '%Y-%m') as month, p.amount,p.tradingAmount,p.availableBalance,"+
							" p.amount-b.amount as amountCompare, p.tradingAmount-b.tradingAmount as tradingAmountCompare, p.availableBalance-b.availableBalance as availableBalanceCompare from platform p"+
							" left join bill b on p.sysUserID = b.sysUserID and p.id = b.platformID "+
						" where "+
							" b.id is null or "+
						  " b.id = (  "+
								"SELECT  "+
										"max(b2.id)  "+
								"FROM  "+
										"bill b2  "+
								"WHERE  "+
										"p.sysUserID = b2.sysUserID and p.id = b2.platformID "+
						" )"+
					" )";
		this.excuteBySql(sql);
		
		String sql2="INSERT bill(sysUserID,date,month,amount,tradingAmount,availableBalance,amountCompare,tradingAmountCompare,availableBalanceCompare)  "+
				" ("+
					"select b.sysUserID, NOW() as date, DATE_FORMAT(NOW(), '%Y-%m') as month, sum(p.amount),sum(p.tradingAmount),sum(p.availableBalance),"+
						" sum(p.amount)-b.amount as amountCompare, sum(p.tradingAmount)-b.tradingAmount as tradingAmountCompare, sum(p.availableBalance)-b.availableBalance as availableBalanceCompare from platform p"+
						" left join bill b on p.sysUserID = b.sysUserID and p.id = b.platformID "+
					 
					" where "+
						"b.id is null or "+
					  " b.id = (  "+
							"SELECT  "+
									"max(b2.id)  "+
							"FROM  "+
									"bill b2  "+
							"WHERE  "+
									"p.sysUserID = b2.sysUserID and p.id = b2.platformID "+
					" )"+
				" )";
		this.excuteBySql(sql2);
		return true;
		
	}
}