import axios from "../axios";

export const getAssetsList = async (requestParam) => {
	return await axios.post('/v2/balance/page', requestParam)
}


