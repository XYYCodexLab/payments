<template>
	<view class="pages">
		
		<view class="topInfoBox">
			<view class="infoItem">
				<view class="infoItemHeader">
					<span>直推人数</span>
					<uv-icon name="account-fill" color="#2979ff" size="28"></uv-icon>
				</view>
				
				<view class="bottomBox">
					<span class="outSpan">{{state.inviteNum}}</span>
					<span id="innerSpan">人</span>
				</view>
				
			</view>
			
			<view class="infoItem">
				<view class="infoItemHeader">
					<span>团队总人数</span>
					<uv-icon name="file-text-fill" color="#2979ff" size="28"></uv-icon>
				</view>
				
				<view class="bottomBox">
					<span class="outSpan">{{state.teamNum}}</span>
					<span id="innerSpan">人</span>
				</view>
				
			</view>
		</view>
		
		
		<view class="teamContainer">
			<TeamLabel
				v-for="(item, index) in state.teamList" 
				:key="index"
				:data="item"
			/>
		</view>
		
		
		
	</view>
</template>

<script setup>
import { acquireTeamInfo, acquireTeamList } from "@/api/teamApi";
	
import { onMounted, reactive } from "vue";
import TeamLabel from "@/components/Mteam/TeamLabel.vue"
import { onPullDownRefresh } from "@dcloudio/uni-app"
	
	const state = reactive({
		inviteNum: 0,
		teamNum: 0,
		
		teamList: []
	})
	
	onMounted(async () => {
		await init()
	})
	
	onPullDownRefresh(async () => {
		await init()
		uni.stopPullDownRefresh()
	})
	
	const init = async () => {
		await getTeamInfo()
		await getTeamTree()
	}
	
	const getTeamInfo = async () => {
		let res = await acquireTeamInfo()
		if(res?.msg == 'success'){
			state.inviteNum = res.data?.directCount
			state.teamNum = res.data?.teamCount
		}
	}
	
	const getTeamTree = async () => {
		let res = await acquireTeamList()
		if(res?.msg == 'success'){
			state.teamList = res.data
		}
	}
	
	
</script>

<style scoped lang="less">
.pages{
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	padding: 30rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	background-color: #F9FAFB;
	overflow-y: scroll;
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
.topInfoBox{
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	
	.infoItem{
		.commonContainer();
		width: 327rpx;
		height: 184rpx;
		display: flex;
		flex-direction: column;
		
		.infoItemHeader{
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			span{
				.fontStyle(28rpx, 500, 40rpx, #4B5563)
			}
		}
		
		.bottomBox{
			margin-top: 10rpx;
		}
		
		.outSpan{
			.fontStyle(48rpx, 600, 64rpx, #1F2937)
		}
		#innerSpan{
			.fontStyle(24rpx, 500, 32rpx, #6B7280)
		}
	}
}
.teamContainer{
	margin-top: 20rpx;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
}
</style>

