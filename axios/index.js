
import requestionList from "./interceptors/requestInterceptors"
import responseList from "./interceptors/responseInterceptors"
import config from "@/common/common.js";


const baseUrl = config.baseUrl
const timeOut = 5000; // 5秒超时

class Axios {
	
	constructor(baseUrl, timeOut, requestInterceptors, responseInterceptors){
		this.baseUrl = baseUrl
		this.timeOut = timeOut
		this.interceptors = {
			request: requestInterceptors,
			response: responseInterceptors
		}
	}
	
	useRequestInterceptors(callBacks){
		if(callBacks?.length > 0){
			this.interceptors.request.concat(callBacks);
		}
	}
	
	useResponseInterceptors(callBacks){
		if(callBacks?.length > 0){
			this.interceptors.response.concat(callBacks);
		}
	}
	
	request(options = {}){
		let config = {
			url: this.baseUrl + options.requestUrl,
			method: options.method || 'GET',
			data: options.data || {},
			header: {
				'Content-Type': 'application/json'
			},
			timeout: this.timeOut,
			dataType: 'json',
		    responseType: 'text',
			...options
		}
		// 顺序通过拦截器
		this.interceptors.request.forEach(interceptor => {
			
			config = interceptor(config)
		})
		
		return new Promise((resolve, reject) => {
			uni.request({
				...config,
				success: (res) => {
					
					let response = {...res}
					
					// 执行相应拦截器
					this.interceptors.response.forEach(interceptor => {
						response = interceptor(response, resolve, reject)
					})
				},
				fail: (err) => {
					console.error("Network error:", err);
					reject(err)
				}
			})
		})
		
	}
		
	get(requestUrl, data, config){
		return this.request({requestUrl, data, method: "GET", ...config});
	}
	
	post(requestUrl, data, config){
		return this.request({requestUrl, data, method: "POST", ...config});
	}
	
	put(requestUrl, data, config){
		return this.request({requestUrl, data, method: "PUT", ...config});
	}
	
	del(requestUrl, data, config){
		return this.request({requestUrl, data, method: "DELETE", ...config});
	}
	
	// 文件上传
	uploadFile(requestUrl, filePath, name = 'file', formdata = {}){
		return new Promise((resolve, reject) => {
			let config = {
				url: this.baseUrl + requestUrl,
				filePath: filePath,
				name: name,
				formdata: formdata,
				timeout: this.timeOut,
				header: {
					'Content-Type': 'multipart/form-data'
				},
			}
			
			this.interceptors.request.forEach(interceptor => {
				config = interceptor(config)
			})
			
			uni.uploadFile({
				...config, 
				success: (res) => {
					let response = {...res}
					
					// 执行相应拦截器
					this.interceptors.response.forEach(interceptor => {
						response = interceptor(response, resolve, reject)
					})
				},
				fail: (err) => {
					console.error("Network error:", err);
					reject(err);
				}
			})
		})
	}
	
}

const axios = new Axios(baseUrl, timeOut, requestionList, responseList);

export default axios;


