import useTokenStore from "../../store/tokenStore";

var requestionList = [];

var whiteList = ['/api/user/login']

const isInWhiteList = (url) => {
	for(let i = 0; i < whiteList.length; i++){
		if(whiteList[i] == url){
			return true
		}
	}
	return false
}

const loadToken = (config) => {
	const tokenStore = useTokenStore()
	let res = isInWhiteList(config.requestUrl)
	if(!res){
		// 获取token 并进行设置的操作
		let token = tokenStore.token
		let request_token = ''
		if(token == ''){
			token = uni.getStorageSync('api_token')
			if(token == null || token == undefined || token == ''){
				uni.reLaunch({
					url: '/pages/login/login'
				})
			}else{
				tokenStore.token = token
				request_token = tokenStore.acquireToken
			}
		}else{
			request_token = tokenStore.acquireToken
		}
		config.header["Authorization"] = request_token
	}
	return config;
}

requestionList.push(loadToken);

export default requestionList;

