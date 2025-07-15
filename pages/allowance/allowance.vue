<template>
	<view class="pages">
		
		<view class="swiperBox">
			<scroll-view class="scrollBox" :scroll-y="true" :show-scrollbar="false" @scrolltolower="loadMoreList">
				<view class="scrollItem" v-for="(item, index) in state.dataList" :key="index">
					<ListLabel
						type="1"
						leftTitle="收入"
						:leftSubTitle="item.date"
						:rightTitle="item.subsidy"
						:rightSubTitle="'业绩:'+item.totalPerf"
					/>
				</view>
			</scroll-view>
		</view>
		
	</view>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { acquireAllowanceList } from '@/api/allowanceApi';
	
import ListLabel from '@/components/Mlabels/ListLabel.vue'
	
	const state = reactive({
		dataList: [],
		
		// page Info
		pageNum: 0,
		pageSize: 50,
	})
	
	onMounted(async () => {
		await init()
	})
	
	const init = async () => {
		await loadMoreList()
	}
	
	const loadMoreList = async () => {
		state.pageNum += 1
		let requestParam = {
			pageNum: state.pageNum,
			pageSize: state.pageSize
		}
		let res = await acquireAllowanceList(requestParam)
		if(res?.msg == 'success'){
			let temp_list = res.data?.records
			state.dataList = state.dataList.concat(temp_list)
		}
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
	box-sizing: border-box;
	padding: 32rpx;
	border-radius: 32rpx;
	background: linear-gradient(0deg, rgba(0, 0, 0, 0.001), rgba(0, 0, 0, 0.001)), #FFFFFF;
	box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
	width: 100%;
}
.fontStyle(@fontSize, @fontWight, @lineHeight, @color){
	font-size: @fontSize;
	font-weight: @fontWight;
	line-height: @lineHeight;
	color: @color;
}
.swiperBox{
	margin-top: 20rpx;
	.commonContainer();
	height: calc(100vh - 100rpx);
	
	.scrollBox{
		width: 100%;
		height: calc(100vh - 150rpx);
	}
	
	.scrollItem{
		width: 100%;
	}
}
</style>

