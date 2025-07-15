
export const formatTime = (dateTime) => {
	const now = new Date(dateTime);
	
	const year = now.getFullYear();
	const month = (now.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，所以要+1，并补零
	const day = now.getDate().toString().padStart(2, '0'); // 补零
	const hours = now.getHours().toString().padStart(2, '0'); // 补零
	const minutes = now.getMinutes().toString().padStart(2, '0'); // 补零
	const seconds = now.getSeconds().toString().padStart(2, '0'); // 补零
	
	// 示例格式：YYYY-MM-DD HH:mm:ss
	const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	return formattedDate
}

export const formatTimeDay = (dateTime) => {
	const now = new Date(dateTime);
	
	const year = now.getFullYear();
	const month = (now.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，所以要+1，并补零
	const day = now.getDate().toString().padStart(2, '0'); // 补零
	
	// 示例格式：YYYY-MM-DD HH:mm:ss
	const formattedDate = `${year}-${month}-${day}`;
	return formattedDate
}

