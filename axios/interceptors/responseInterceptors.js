
var responseList = [];


const handlerRes = (response, resolve, reject) => {
	// 进行统一的错误处理 resolve reject
	if(typeof response.data != 'object'){
		let temp_data = JSON.parse(response.data)
		response.data = temp_data
	}
	if(response?.data?.code != 0){
		if(response?.data?.code == 401){
			uni.reLaunch({
				url: '/pages/login/login'
			})
		}
		resolve(response?.data)
	}else{
		resolve(response?.data)
	}
}

responseList.push(handlerRes)


export default responseList;
