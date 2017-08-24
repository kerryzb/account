package com.kerryzb.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.kerryzb.common.BasicDAO;
import com.kerryzb.model.SysUser;

@Component("sysUserDAO")
public class SysUserDAO extends BasicDAO<SysUser>{

	public List<Object> listSysUser(int start, int limit, String username, String truename) {
		StringBuffer hql = new StringBuffer("from SysUser where 1=1");
		if (username!=null&&!username.equals("")) {
			hql.append(" and username like '%"+username+"%'");
		}
		if (truename!=null&&!truename.equals("")) {
			hql.append(" and truename like '%"+truename+"%'");
		}
		hql.append(" order by updateDate desc");
		
		List list = this.findPageByHQL(hql.toString(),start ,limit);
		return list;
	}

	public int totalSysUser(String username, String truename) {
		StringBuffer hql = new StringBuffer("select id from SysUser where 1=1");
		if (username!=null&&!username.equals("")) {
			hql.append(" and username like '%"+username+"%'");
		}
		if (truename!=null&&!truename.equals("")) {
			hql.append(" and truename like '%"+truename+"%'");
		}
		hql.append(" order by updateDate desc");
		
		List list = this.findByHQL(hql.toString());
		return list.size();
	}

}
