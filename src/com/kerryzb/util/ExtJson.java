package com.kerryzb.util;

import java.util.List;

public class ExtJson {

	private List<?> list;
	private Object obj;
	private int total;
	private String msg;
	private boolean success;

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}	

	public ExtJson() {
		super();
	}

	public ExtJson(List<Object> list, int total, boolean success) {
		super();
		this.list = list;
		this.total = total;
		this.success = success;
	}

	public Object getObj() {
		return obj;
	}

	public void setObj(Object obj) {
		this.obj = obj;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public List<?> getList() {
		return list;
	}

	public void setList(List<?> list) {
		this.list = list;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

}
