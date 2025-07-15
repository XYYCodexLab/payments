import axios from '@/axios/index.js'


export const acquireTotalBenefit = async () => {
	return await axios.get('/v2/benefit/total')
} 

export const acquireBenefitList = async (requestParam) => {
	return await axios.get(`/v2/benefit/page?pageNum=${requestParam.pageNum}&pageSize=${requestParam.pageSize}`)
}
