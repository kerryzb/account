package com.kerryzb.action;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.kerryzb.common.BasicAction;
import com.kerryzb.model.Bill;
import com.kerryzb.model.Platform;
import com.kerryzb.service.BillService;

@SuppressWarnings("serial")
@Component("billAction")
@Scope("prototype")
public class BillAction extends BasicAction {

	private int id;
	private String ids;
	private int start;
	private int limit;
	private String name;
	private String month;
	private String platformType;
	private String query;
	private Bill bill;
	private BillService billService;
	
	public String generateBill(){
		boolean flag = billService.generateBill();
		if (flag) {
			this.toSuccess("操作成功!");
		}else{
			this.toFalier("操作失败!");
		}
		return SUCCESS;
	}
		
	public String delete(){		
		billService.delete(ids);
		this.toSuccess("成功删除!");
		return SUCCESS;
	}
	
	public String findById(){
		bill = billService.findById(id);
		if (bill!=null) {
			this.toExtObj(bill);
		}else{
			this.toFalier("记录不存在,可能已经被删除!");
		}
		return SUCCESS;
	}

	public String list(){
		List<Object> list = billService.list(start, limit, month, name, platformType);
		int total = billService.total(month, name, platformType);
		this.toExtPage(list, total);
		return SUCCESS;
	}
	
	public String listMonth(){
		List<Object> list = billService.listMonth(query);
		List<Object> monthList = new ArrayList<Object>();
		for(Object type : list) {
			Bill month = new Bill();
			month.setMonth((String) type);
			monthList.add(month);
		}
		this.toExtPage(monthList, list.size());
		return SUCCESS;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}


	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getQuery() {
		return query;
	}

	public void setQuery(String query) {
		this.query = query;
	}

	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	public BillService getBillService() {
		return billService;
	}

	@Resource
	public void setBillService(BillService billService) {
		this.billService = billService;
	}

	public String getIds() {
		return ids;
	}

	public void setIds(String ids) {
		this.ids = ids;
	}

	public String getPlatformType() {
		return platformType;
	}

	public void setPlatformType(String platformType) {
		this.platformType = platformType;
	}

	public Bill getBill() {
		return bill;
	}

	public void setBill(Bill bill) {
		this.bill = bill;
	}

	
}
