package com.kerryzb.common;

import java.io.Serializable;
import java.util.List;

import javax.annotation.Resource;

import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.stereotype.Component;

import java.lang.reflect.ParameterizedType;

@Component("basicDAO")
public class BasicDAO<T> {
	
	private SessionFactory sessionFactory;
	
	public void save(Object entity){
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		session.save(entity);
		session.flush();
		transaction.commit();
		session.close();
	}
	
	public void update(Object entity){
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		session.update(entity);
		session.flush();
		transaction.commit();
		session.close();		
	}
	
	public void saveOrUpdate(Object entity){
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		session.saveOrUpdate(entity);
		session.flush();
		transaction.commit();
		session.close();		
	}
	
	public void delete(Object entity){
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		session.delete(entity);
		session.flush();
		transaction.commit();
		session.close();
	}
		
	public Object getEntityById(Serializable id){
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		Object entity = session.get(getTClass(), id);
		session.flush();
		transaction.commit();
		session.close();
		return entity;
	}
		
	@SuppressWarnings("rawtypes")
	public List findByHQL(String hql){
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		Query query = session.createQuery(hql);
		List list = query.list();
		session.flush();
		transaction.commit();
		session.close();
		return list;		
	}
	
	@SuppressWarnings("rawtypes")
	public List findBySQL(String sql){
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		SQLQuery query = session.createSQLQuery(sql);
		List list = query.list();
		session.flush();
		transaction.commit();
		session.close();
		return list;		
	}
	
	
	@SuppressWarnings("rawtypes")
	public List queryByHQL(String hql, String... propertys){
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		Query query = session.createQuery(hql);
		for (int i=0;i<propertys.length;i++) {
			query.setString(i, propertys[i]);
		}
		List list = query.list();
		session.flush();
		transaction.commit();
		session.close();
		return list;		
	}
	
	@SuppressWarnings("rawtypes")
	public List queryBySQL(String sql, String... propertys){
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		SQLQuery query = session.createSQLQuery(sql);
		for (int i=0;i<propertys.length;i++) {
			query.setString(i, propertys[i]);
		}
		List list = query.list();
		session.flush();
		transaction.commit();
		session.close();
		return list;		
	}
	
	@SuppressWarnings("rawtypes")
	public List findPageByHQL(String sql, int first, int max){
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		Query query = session.createQuery(sql);
		query.setFirstResult(first);
		query.setMaxResults(max);
		List list = query.list();
		session.flush();
		transaction.commit();
		session.close();
		return list;		
	}
	
	@SuppressWarnings("rawtypes")
	public List findPageBySQL(String sql, int first, int max){
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		SQLQuery query = session.createSQLQuery(sql);
		query.setFirstResult(first);
		query.setMaxResults(max);
		List list = query.list();
		session.flush();
		transaction.commit();
		session.close();
		return list;		
	}
	
	@SuppressWarnings("unchecked")
	private Class<T> getTClass()
    {
        Class<T> tClass = (Class<T>)((ParameterizedType)getClass().getGenericSuperclass()).getActualTypeArguments()[0];
        return tClass;
    }
	

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	@Resource
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	

}
