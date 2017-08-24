package com.kerryzb.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.kerryzb.common.BasicDAO;
import com.kerryzb.model.Platform;
import com.kerryzb.util.ActionUtil;

@Component("platformDAO")
public class PlatformDAO extends BasicDAO<Platform>{

	public List<Object> listPlatform(int start, int limit, String name, String type) {	
		StringBuffer hql = new StringBuffer("from Platform where 1=1");
		hql.append(" and sysUserID = "+ActionUtil.getCurrentSysUserID());
		if (name!=null&&!name.equals("")) {
			hql.append(" and name like '%"+name+"%'");
		}
		if (type!=null&&!type.equals("")) {
			hql.append(" and type like '%"+type+"%'");
		}
		hql.append(" order by amount desc, udpateDate desc");
		
		List list = this.findPageByHQL(hql.toString(),start ,limit);
		return list;
	}
	
	public int totalPlatform(String name, String type) {		
		StringBuffer hql = new StringBuffer("select id from Platform where 1=1");
		hql.append(" and sysUserID = "+ActionUtil.getCurrentSysUserID());
		if (name!=null&&!name.equals("")) {
			hql.append(" and name like '%"+name+"%'");
		}
		if (type!=null&&!type.equals("")) {
			hql.append(" and type like '%"+type+"%'");
		}
		hql.append(" order by amount desc, udpateDate desc");
		
		List list = this.findByHQL(hql.toString());
		return list.size();
	}

	public List<Object> listByName(String name) {
		StringBuffer hql = new StringBuffer("from Platform where 1=1");
		hql.append(" and sysUserID = "+ActionUtil.getCurrentSysUserID());
		if (name!=null&&!name.equals("")) {
			hql.append(" and name like '%"+name+"%'");
		}
		hql.append(" order by udpateDate desc");
		
		List list = this.queryByHQL(hql.toString());
		return list;
	}

	public List<Object> listType(String query) {
		StringBuffer hql = new StringBuffer("select distinct type from Platform where 1=1");
		hql.append(" and sysUserID = "+ActionUtil.getCurrentSysUserID());
		if (query!=null&&!query.equals("")) {
			hql.append(" and type like '%"+query+"%'");
		}
		hql.append(" order by udpateDate desc");
		
		List list = this.queryByHQL(hql.toString());
		return list;
	}

}
