import axios from "../axios";


export const checkVersion = async () => {
	return await axios.get('/v2/upgrade/checkInfo')
}

export const acquireReward = async () => {
	return await axios.get('/v2/team/rewardSum')
}

