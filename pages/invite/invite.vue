<template>
	<view class="pages">
		
		<view class="topContainer">
			<span>累计收益</span>
			<span>{{state.totalBenefit}}</span>
		</view>
		
		<view class="swiperBox">
			<scroll-view class="scrollBox" :scroll-y="true" :show-scrollbar="false" @scrolltolower="loadMoreBenefitList">
				<view class="scrollItem" v-for="(item, index) in state.benefitList" :key="index">
					<ListRowLabel
						type="1"
						:leftTitle="item.nickName"
						:leftSubTitle="item.formatTime"
						:rightTitle="item.accumulatAmount"
						rightSubTitle="已结算"
					/>
				</view>
			</scroll-view>
		</view>
		
	</view>
</template>

<script setup>
import { acquireTotalBenefit, acquireBenefitList } from '@/api/inviteApi';
import { formatTime } from '@/utils/timeUtil';

import { onMounted, reactive } from 'vue';
import ListRowLabel from '@/components/Mlabels/ListRowLabel.vue'
	
	const state = reactive({
		totalBenefit: '',
		benefitList: [],
		
		// page info
		pageNum: 0,
		pageSize: 20,
		
	})
	
	onMounted(async () => {
		await init()
	})
	
	const init = async () => {
		await getTotalBenefit()
		await loadMoreBenefitList()
	}
	
	const getTotalBenefit = async () => {
		let res = await acquireTotalBenefit()
		if(res?.msg == 'success'){
			state.totalBenefit = res?.data
		}
	}
	
	const loadMoreBenefitList = async () => {
		state.pageNum += 1
		let requestParam = {
			pageNum: state.pageNum,
			pageSize: state.pageSize
		}
		let res = await acquireBenefitList(requestParam)
		if(res?.msg == 'success'){
			let temp_list = res.data?.records
			let add_list = handleList(temp_list)
			state.benefitList = state.benefitList.concat(add_list)
		}
	}
	
	const handleList = (list) => {
		let res = []
		list.forEach(item => {
			item.formatTime = formatTime(item?.startTime)
			res.push(item)
		})
		return res
	}

</script>

<style scoped lang="less">
.pages{
	box-sizing: border-box;
	padding: 30rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
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
.topContainer{
	margin-top: 20rpx;
	.commonContainer();
	padding: 48rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8rpx;
	
	span:nth-of-type(1){
		.fontStyle(28rpx, 400, 40rpx, #6B7280);
	}
	
	span:nth-of-type(2){
		.fontStyle(60rpx, 600, 72rpx, #111827);
	}
}
.swiperBox{
	margin-top: 20rpx;
	.commonContainer();
	height: calc(100vh - 300rpx);
	
	.scrollBox{
		width: 100%;
		height: calc(100vh - 350rpx);
	}
	
	.scrollItem{
		width: 100%;
	}
}
</style>

