<template>
	<view class="pages">
		
		<view class="topHeader">
			
			<image :src="userStore.userInfo?.picture" />
			
			
			<view class="infoBox">
				<span>{{userStore.userInfo?.nickName}}</span>
				<span>账号: {{getAccount}}</span>
			</view>
			
			<uv-icon name="arrow-right" color="white" size="28"></uv-icon>
		</view>
		
		
		<view class="bootomBtn">
			<uv-button
				:custom-style="{
					width: '100%',
					height: '90rpx',
				}" 
				type="error" 
				text="退出登录"
				shape="circle"
				@click="handleLogOut"
			>
			</uv-button>
		</view>
	</view>
</template>

<script setup>
import { acquireUserInfo, logout } from "@/api/baseApi"
	
import { computed, onMounted } from 'vue';
import useUserStore from '@/store/userStore';
import { onPullDownRefresh } from "@dcloudio/uni-app"

	
	const userStore = useUserStore()
	
	onMounted(async ()=>{
		if(userStore.userInfo == null){
			await init()
		}
	})
	
	onPullDownRefresh(async () => {
		await init()
		uni.stopPullDownRefresh()
	})
	
	const getAccount = computed(()=>{
		let account = null
		if(userStore.userInfo?.phone != '' && userStore.userInfo?.phone != null){
			account = userStore.userInfo?.phone
		}else{
			account = userStore.userInfo?.email
		}
		return account
	})
	
	const init = async () => {
		await getUserInfo()
	}
	
	const getUserInfo = async () => {
		let res = await acquireUserInfo()
		if(res?.msg == 'success'){
			userStore.userInfo = res?.data
		}
	}
	
	const handleLogOut = async () => {
		let res = await logout()
		if(res?.msg == 'success'){
			gotoLogin()
		}
	}
	
	const gotoLogin = () => {
		uni.reLaunch({
			url: '/pages/login/login'
		})
	}
	
</script>

<style scoped lang="less">
.pages{
	height: 100%;
	box-sizing: border-box;
	padding: 30rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	position: relative;
	background-color: #F9FAFB;
	height: 100%;
}
.commonContainer{
	width: 100%;
	box-sizing: border-box;
	padding: 32rpx;
	border-radius: 32rpx;
	background: linear-gradient(0deg, rgba(0, 0, 0, 0.001), rgba(0, 0, 0, 0.001)), #FFFFFF;
	box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}
.fontStyle(@fontSize, @fontWight, @lineHeight, @color){
	font-size: @fontSize;
	font-weight: @fontWight;
	line-height: @lineHeight;
	color: @color;
}
.topHeader{
	width: 100%;
	box-sizing: border-box;
	padding: 48rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-radius: 32rpx;
	margin-top: 42rpx;
	
	background: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), linear-gradient(90deg, #4F46E5 0%, #EC4899 100%);
	
	image{
		width: 128rpx;
		height: 128rpx;
		border-radius: 50%;
	}
	
	.infoBox{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-left: 32rpx;
		margin-right: auto;
		
		span:nth-of-type(1){
			.fontStyle(40rpx, 600, 56rpx, white)
		}
		
		span:nth-of-type(2){
			.fontStyle(28rpx, 400, 40rpx, white)
		}

	}
	
}
.bootomBtn{
	width: 100%;
}
</style>

