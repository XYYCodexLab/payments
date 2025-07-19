import axios from "../axios";

export const acquireTeamInfo = async () => {
	return await axios.get('/v2/team/stats')
}

export const acquireTeamList = async () => {
	return await axios.get('/v2/team/tree')
}
