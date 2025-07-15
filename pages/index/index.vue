<template>
	<view class="pages">
		
		<view class="topHeader">
			<span class="firstSpan">总资产</span>
			<span class="secondSpan">{{userStore.userInfo?.goldenBean}}</span>
			
			<view class="optionContgainer">
				
				<view class="optionItem" @tap="gotoAssets">
					<uv-icon name="list-dot" color="white" size="20px"></uv-icon>
					<span>资产明细</span>
				</view>
				
				<view class="optionItem" @tap="gotoRecords">
					<uv-icon name="order" color="white" size="20px"></uv-icon>
					<span>交易记录</span>
				</view>
			</view>
		</view>
		
		<view class="assestBox">
			<span class="title">资产分类</span>
			
			<view class="labelBox">
				<view>
					<HomeLabel
						type="1"
						leftTitle="邀请奖励"
						leftSubTitle="邀请分润"
						:rightTitle="state.totalBenefit"
						@tapFn="clickToPage"
					/>
				</view>
				<view>
					<HomeLabel
						type="2"
						leftTitle="津贴"
						leftSubTitle="销售，管理"
						:rightTitle="state.allowance"
						@tapFn="clickToPage"
					/>
				</view>
			</view>
		</view>
		
		<view>
			<uv-modal 
				ref="modal" 
				:title="state.modalTitle" 
				:content="state.modalContent" 
				@confirm="updateVersion"
			>
			</uv-modal>
		</view>
	</view>
</template>

<script setup>
import { acquireUserInfo } from "@/api/baseApi"
import { checkVersion } from "@/api/homeApi"
import { acquireTotalBenefit } from "@/api/inviteApi"
import { acquireAllowance } from "@/api/allowanceApi"
	
import { onMounted, reactive, ref } from "vue"
import HomeLabel from "@/components/Mlabels/HomeLabel.vue"
import useUserStore from "@/store/userStore"
import { onLoad, onPullDownRefresh } from "@dcloudio/uni-app"
	
	const state = reactive({
		version: '',
		modalTitle: '',
		modalContent: '',
		updateUrl: '',
		
		totalBenefit: '',
		allowance: '',
	})
	
	const modal = ref(null)
	const modalFn = ref(null)
	
	onLoad(()=>{
		let info = uni.getAppBaseInfo()
		//state.version = info?.appVersion
		state.version = '0.9.0'
	})
	
	onPullDownRefresh(async () => {
		await init()
		uni.stopPullDownRefresh()
	})
	
	const userStore = useUserStore()
	
	onMounted(async () => {
		await init()
		console.log(userStore.userInfo)
	})
	
	const init = async () => {
		await getUserInfo()
		await getTotalBenefit()
		await getAllowance()
		await getVerison()
	}
	
	const getUserInfo = async () => {
		let res = await acquireUserInfo()
		if(res?.msg == 'success'){
			userStore.userInfo = res?.data
		}
	}
	
	const getVerison = async () => {
		let res = await checkVersion()
		if(res?.msg == 'success'){
			state.updateUrl = res.data?.upgradeUrl
			if(res.data?.targetVersion > state.version){
				state.modalTitle = "版本更新"
				state.modalContent = "版本需要更新，请下载最新版本软件"
				modal.value.open()
			}
		}
	}
	
	const getTotalBenefit = async () => {
		let res = await acquireTotalBenefit()
		if(res?.msg == 'success'){
			state.totalBenefit = res?.data
		}
	}
	
	const getAllowance = async () => {
		let res = await acquireAllowance()
		if(res?.msg == 'success'){
			state.allowance = res?.data
		}
	}
	
	const updateVersion = () => {
		modal.value.close()
		plus.runtime.openURL(state.updateUrl)
	}

	const gotoLogin = () => {
		uni.navigateTo({
			url: '/pages/login/login'
		})
	}
	
	const gotoAssets = () => {
		uni.navigateTo({
			url: '/pages/assets/assets'
		})
	}
	
	const gotoRecords = () => {
		uni.navigateTo({
			url: '/pages/records/records'
		})
	}
	
	const gotoInvite = () => {
		uni.navigateTo({
			url: '/pages/invite/invite'
		})
	}
	
	const gotoAllowance = () => {
		uni.navigateTo({
			url: '/pages/allowance/allowance'
		})
	}
	
	const clickToPage = (type) => {
		if(type == '1'){
			gotoInvite()
		}else{
			gotoAllowance()
		}
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
	position: relative;
	background-color: #F9FAFB;
}
.commonContainer{
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
	box-sizing: border-box;
	width: 100%;
	padding: 48rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 20rpx;
	background-image: url("/static/img/home/banner.png");
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	
	.firstSpan{
		.fontStyle(28rpx, 500, 40rpx, white);
	}
	
	.secondSpan{
		margin-top: 8rpx;
		.fontStyle(60rpx, bold, 72rpx, white);
	}
}
.optionContgainer{
	margin-top: 48rpx;
	width: 100%;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
	
	.optionItem{
		padding: 16rpx 32rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5rpx;
		border-radius: 8rpx;
		background: rgba(255, 255, 255, 0.2);
		
		span{
			.fontStyle(28rpx, 500, 40rpx, white);
		}
	}
}
.assestBox{
	width: 100%;
	margin-top: 48rpx;
	.commonContainer();
	padding: 32rpx;
	display: flex;
	flex-direction: column;
	
	.title{
		.fontStyle(36rpx, 600, 56rpx, #1F2937);
	}
	
	.labelBox{
		margin-top: 72rpx;
		box-sizing: border-box;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 32rpx;
	}
}
</style>
