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
	
	public List<Object> list(int start, int limit, String month , String platform){
		return billDAO.listBill(start, limit, month, platform);
	}
	
	public int total(String month, String platform) {
		return billDAO.totalBill(month, platform);
	}

	public BillDAO getBillDAO() {
		return billDAO;
	}

	@Resource
	public void setBillDAO(BillDAO billDAO) {
		this.billDAO = billDAO;
	}
	
}
