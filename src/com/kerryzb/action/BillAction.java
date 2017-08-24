package com.kerryzb.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.kerryzb.common.BasicAction;
import com.kerryzb.service.BillService;

@SuppressWarnings("serial")
@Component("billAction")
@Scope("prototype")
public class BillAction extends BasicAction {

	private int id;
	private int start;
	private int limit;
	private String name;
	private String month;
	private String query;
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
		this.toSuccess("成功删除!");
		return SUCCESS;
	}

	public String list(){
		List<Object> list = billService.list(start, limit, month, name);
		int total = billService.total(month, name);
		this.toExtPage(list, total);
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

	
}
