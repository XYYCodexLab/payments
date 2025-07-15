import axios from "../axios";

export const acquireRecordList = async (requestParam) => {
	return await axios.post('/v2/balance/records', requestParam)
}
