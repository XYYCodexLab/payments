import axios from "../axios";

export const acquireAllowance = async () => {
	return await axios.get('/v2/subsidy/total')
}

export const acquireAllowanceList = async (requestParam) => {
	return await axios.get(`/v2/subsidy/page?pageNum=${requestParam.pageNum}&pageSize=${requestParam.pageSize}`)
}
