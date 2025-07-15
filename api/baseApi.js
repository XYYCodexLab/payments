import axios from '@/axios/index.js'


export const login = async (requestParam) => {
	return await axios.post('/api/user/login', requestParam)
}

export const acquireUserInfo = async () => {
	return await axios.get('/api/user/info')
}

export const logout = async () => {
	return await axios.post('/api/user/logout')
}