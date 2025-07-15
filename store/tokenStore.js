import { defineStore } from 'pinia'

const useTokenStore = defineStore('apiToekn', {
	state: () => ({
		token: ''
	}),
	getters: {
		acquireToken: (state) => {
			let temp_token = 'Bearer ' + state.token
			return temp_token
		}
	},
	actions: {
		
	}
})


export default useTokenStore


