package com.kerryzb.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.kerryzb.dao.BillDAO;
import com.kerryzb.model.Bill;

@Component("billService")
public class BillService {
	
	private BillDAO billDAO;
	
	public boolean generateBill(){
		return billDAO.generateBill();
	}
	
	public void delete(Bill bill){
		billDAO.delete(bill);
	}
	
	public void delete(String ids) {
		billDAO.delete(ids);		
	}
	
	public List<Object> list(int start, int limit, String month , String platform, String platformType){
		return billDAO.listBill(start, limit, month, platform, platformType);
	}
	
	public int total(String month, String platform, String platformType) {
		return billDAO.totalBill(month, platform, platformType);
	}

	public BillDAO getBillDAO() {
		return billDAO;
	}

	@Resource
	public void setBillDAO(BillDAO billDAO) {
		this.billDAO = billDAO;
	}

	public List<Object> listMonth(String query) {
		return billDAO.listMonth(query);
	}

	public Bill findById(int id) {
		return (Bill) billDAO.getEntityById(id);
	}

	
	
}
