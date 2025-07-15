<template>
	<view class="pages">
		
		<span class="titleSpan">欢迎回来，请登录您的账号</span>
		
		<view class="formContainer">
			
			<view class="inputItem">
				<span>手机号</span>
				<view class="inputBox">
					<uv-input placeholder="请输入账号" border="none" font-size="20px" v-model="state.inputAccount"></uv-input>
				</view>
			</view>
			
			<view class="inputItem">
				<span>密码</span>
				<view class="inputBox">
					<uv-input placeholder="请输入密码" border="none" font-size="20px" type="password" v-model="state.inputPassword"></uv-input>
				</view>
			</view>
			
			<uv-button 
				:custom-style="{
					width: '100%',
					height: '90rpx',
				}" 
				type="primary"
				shape="circle"
				text="登录"
				:loading="state.isLoading"
				loadingMode="circle"
				@click="handleLogin"
			>
			</uv-button>
		</view>
		
		<view>
			<uv-toast ref="toast"></uv-toast>
		</view>
	</view>
</template>

<script setup>
import useTokenStore from '@/store/tokenStore';
import { login } from '@/api/baseApi';
	
import { reactive, ref } from 'vue';

	
	const state = reactive({
		inputAccount: '',
		inputPassword: '',
		
		// bottom btn
		isLoading: false,
	})
	
	const toast = ref(null)
	
	const tokenStore = useTokenStore()
	
	const gotoIndex = () => {
		uni.reLaunch({
			url: '/pages/index/index'
		})
	}
	
	const handleLogin = async () => {
		if(state.isLoading){
			return
		}
		state.isLoading = true
		if(state.inputAccount == '' || state.inputPassword == ''){
			toast.value.show({
				type: 'error',
				title: '失败主题(带图标)',
				message: "必填值不能为空"
			})
			state.isLoading = false
			return
		}
		
		let requestParam = {
			phoneOrEmail: state.inputAccount,
			password: state.inputPassword,
			platform: 'APP2'
		}
		
		let res = await login(requestParam)
		if(res?.msg == 'success'){
			let token = res?.data?.token
			updateToken(token)
		}else{
			toast.value.show({
				type: 'error',
				title: '失败主题(带图标)',
				message: res?.msg
			})
		}
		state.isLoading = false
	}
	
	const updateToken = (token) => {
		tokenStore.token = token
		uni.setStorageSync('api_token', token)
		gotoIndex()
	}
	
</script>

<style scoped lang="less">
.pages{
	width: 100%;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.05);
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 0 48rpx;
}
.titleSpan{
	margin-bottom: 20rpx;
}
.formContainer{
	box-sizing: border-box;
	padding: 50rpx;
	border-radius: 35rpx;
	background: linear-gradient(0deg, rgba(0, 0, 0, 0.001), rgba(0, 0, 0, 0.001)), #FFFFFF;
	box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 25rpx;
}
.inputItem{
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 8rpx;
	
	.inputBox{
		width: 100%;
		height: 94rpx;
		border-radius: 24rpx;
		box-sizing: border-box;
		border: 2rpx solid #D1D5DB;
		display: flex;
		align-items: center;
	}
}
</style>

