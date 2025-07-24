<template>
	<view class="pages">
		
		<view class="topHeader"> 
			<span>总资产</span>
			<span>{{userStore.userInfo?.goldenBean}}</span>
		</view>
		
		<view class="optionBox">
			<view class="commonItem" :style="state.activeIndex == 0?'background-color:#4F46E5':''" @tap="()=>{changeActive(0)}">
				<span :style="state.activeIndex == 0?'color:white':''">收入</span>
			</view>
			<view class="commonItem" :style="state.activeIndex == 1?'background-color:#4F46E5':''" @tap="()=>{changeActive(1)}">
				<span :style="state.activeIndex == 1?'color:white':''">支出</span>
			</view>
		</view>
		
		<swiper class="swiperBox" :current="state.activeIndex"  @change="swiperChange">
			<swiper-item>
				<scroll-view class="scrollBox" :scroll-y="true" :show-scrollbar="false" @scrolltolower="loadMoreIncome">
					<view class="scrollItem" v-for="(item, index) in state.incomeList" :key="index">
						<ListLabel
							type="1"
							:leftTitle="item.title"
							:leftSubTitle="item.formatTime"
							:rightTitle="item.goldenBean"
							:rightSubTitle="'余额:'+item.goldenBeanBalance"
							:linkId="item?.linkId"
						/>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="scrollBox" :scroll-y="true" :show-scrollbar="false" @scrolltolower="loadMoreExpend">
					<view class="scrollItem" v-for="(item, index) in state.expendList" :key="index">
						<ListLabel
							type="2"
							:leftTitle="item.title"
							:leftSubTitle="item.formatTime"
							:rightTitle="item.goldenBean"
							:rightSubTitle="'余额:'+item.goldenBeanBalance"
							:linkId="item?.linkId"
						/>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
import { getAssetsList } from '@/api/assetsApi.js'
import { formatTime } from '@/utils/timeUtil';
	
import { onMounted, reactive } from 'vue';
import ListLabel from '@/components/Mlabels/ListLabel.vue'
import useUserStore from '@/store/userStore';
import { onPullDownRefresh } from "@dcloudio/uni-app"
	
	const state = reactive({
		activeIndex: 0,
		incomeList: [],
		expendList: [],
		
		// income
		inPageNum: 0,
		inPageSize: 20,
		
		// expend
		exPageNum: 0,
		exPageSize: 20,
	})
	
	const userStore = useUserStore()
	
	onMounted(async () => {
		await init()
	})
	
	onPullDownRefresh(async () => {
		await init()
		uni.stopPullDownRefresh()
	})
	
	const init = async () => {
		await loadMoreIncome()
		await loadMoreExpend()
	}
	
	const swiperChange = (e) => {
		state.activeIndex = e?.detail?.current
	}
	
	const changeActive = (index) => {
		state.activeIndex = index
	}
	
	const loadMoreIncome = async () => {
		state.inPageNum += 1
		let requestParam = {
			type: '1',
			pageNum: state.inPageNum,
			pageSize: state.inPageSize
		}
		let res = await getAssetsList(requestParam)
		console.log("res:", res)
		if(res?.msg == 'success'){
			let temp_list = res.data?.records
			let add_list = handleList(temp_list)
			state.incomeList = state.incomeList.concat(add_list)
		}
	}
	
	const loadMoreExpend = async () => {
		state.exPageNum += 1
		let requestParam = {
			type: '2',
			pageNum: state.exPageNum,
			pageSize: state.exPageSize
		}
		let res = await getAssetsList(requestParam)
		if(res?.msg == 'success'){
			let temp_list = res.data?.records
			let add_list = handleList(temp_list)
			state.expendList = state.expendList.concat(add_list)
		}
	}
	
	const handleList = (list) => {
		let res = []
		for(const item of list){
			if(item.goldenBean == null || item.goldenBean == undefined || item.goldenBean == ''){
				continue
			}
			item.goldenBean = Math.abs(item.goldenBean)
			item.formatTime = formatTime(item?.occurrenceTime)
			res.push(item)
		}
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
.topHeader{
	.commonContainer();
	display: flex;
	flex-direction: column;
	gap: 16rpx;
	
	span:nth-of-type(1){
		.fontStyle(28rpx, 500, 40rpx, #6B7280);
	}
	
	span:nth-of-type(2){
		.fontStyle(60rpx, 600, 72rpx, #111827);
	}
}
.optionBox{
	margin-top: 34rpx;
	.commonContainer();
	padding: 24rpx;
	display: flex;
	align-items: center;
	gap: 12rpx;
	
	.commonItem{
		box-sizing: border-box;
		padding: 8rpx 24rpx;
		background: #F3F4F6;
		border-radius: 8rpx;
		
		span{
			.fontStyle(28rpx, 500, 40rpx, #374151);
		}
	}
}
.swiperBox{
	margin-top: 34rpx;
	.commonContainer();
	height: calc(100vh - 450rpx);
	
	.scrollBox{
		width: 100%;
		height: calc(100vh - 500rpx);
	}
	
	.scrollItem{
		width: 100%;
	}
}
</style>

