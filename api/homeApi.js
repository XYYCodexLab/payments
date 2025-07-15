import axios from "../axios";


export const checkVersion = async () => {
	return await axios.get('/v2/upgrade/checkInfo')
}
