package com.kerryzb.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.LineNumberReader;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.kerryzb.common.BasicAction;

@SuppressWarnings("serial")
@Scope("prototype")
@Component("dataAction")
public class DataAction extends BasicAction{
	
	private String fileName;//文件名称
	private InputStream inputStream;//文件输出流
	private File file;
	
	public String beifen(){
		try {
			Runtime rt = Runtime.getRuntime();  
	        String cmd ="mysqldump -h localhost -uroot -p123456 account > d:/mysql.sql"; //一定要加 -h localhost(或是服务器IP地址)  
			Process process =rt.exec("cmd /c " + cmd);  
			InputStreamReader isr = new InputStreamReader(process.getErrorStream());  
			LineNumberReader input = new LineNumberReader(isr);  
			String line;  
			while((line = input.readLine())!= null){  
				System.out.println(line+"~~~~~~~~~~");  
			}  
			
			File file = new File("d:/mysql.sql");
			if (file.exists()) {
				inputStream=new FileInputStream(file);
			}
			this.fileName="mysql.sql";
			
			System.out.println("备份成功!");  
		} catch (Exception e) {
			System.out.println("备份失败!");  
			e.printStackTrace();  
		}
		return "beifen";
	}
	
	public String huanyuan(){
		try {
//			FileOutputStream fos=new FileOutputStream(file);
//		    RandomAccessFile raf=new RandomAccessFile(new File("c:/mysql.sql"), "rw");
//		        fos.write(raf.read(new byte[1024]));
//		        fos.flush();
//		        fos.close();
//		    raf.close();
	        int  byteread  =  0;  
			InputStream  inStream  =  new  FileInputStream(file);  //读入原文件 
            FileOutputStream  fs  =  new  FileOutputStream(new File("d:/mysql.sql"));  
            byte[]  buffer  =  new  byte[1444];  
            while  (  (byteread  =  inStream.read(buffer))  !=  -1)  {  
                fs.write(buffer,  0,  byteread);  
            }  
            inStream.close();  
			
			Runtime rt = Runtime.getRuntime();  
	        String cmd ="mysqldump -h localhost -uroot -p123456 account < d:/mysql.sql"; //一定要加 -h localhost(或是服务器IP地址)  
			Process process =rt.exec("cmd /c " + cmd);  
//			InputStreamReader isr = new InputStreamReader(process.getErrorStream());  
//			LineNumberReader input = new LineNumberReader(isr);  
//			String line;  
//			while((line = input.readLine())!= null){  
//				System.out.println(line+"~~~~~~~~~~");  
//			}  
			System.out.println("还原成功!");  
			
			this.toSuccess("还原成功!");
		} catch (Exception e) {
			System.out.println("还原失败!");  
			e.printStackTrace();  
			this.toFalier("还原失败!");
		}
		return SUCCESS;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public InputStream getInputStream() {
		return inputStream;
	}

	public void setInputStream(InputStream inputStream) {
		this.inputStream = inputStream;
	}

	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}


}
