<template>
	<view class="labelContainer">
		
		<view class="BossContainer" @tap="handleOpen">
			<view class="lineBox">
				<view class="line">
				</view>
			</view>
			
			<view class="BossInfo">
				
				<view class="leftBox">
					<image :src="props.data.picture" />
					
					<view class="leftInfo">
						<span>{{props.data.name}}</span>
						<span>{{props.data.phone}}</span>
					</view>
				</view>
				
				
				<view class="rightBox">
					<span v-if="props.data.performance == null">0</span>
					<span v-else>{{props.data.performance}}</span>
					<span>业绩</span>
				</view>
				
				<uv-icon v-show="!state.openChilde && props.data.children.length != 0" name="arrow-right" size="14"></uv-icon>
				<uv-icon v-show="state.openChilde && props.data.children.length != 0" name="arrow-down" size="14"></uv-icon>
			</view>
		</view>
		
		
		<uv-transition 
			:show="state.openChilde"
			mode="fade"
		>
			<view class="children" >
				<TeamLabel
					v-for="(item, index) in props.data.children"
					:key="index"
					:data="item"
				/>
			</view> 
		</uv-transition>
		
		
		
	</view>
</template>

<script>
export default {
	name: 'TeamLabel'
}
</script>

<script setup>
import { reactive } from 'vue';

	
	const state = reactive({
		openChilde: false
	})
	
	const props = defineProps({
		data: Object
	})
	
	const handleOpen = () => {
		let res = state.openChilde
		state.openChilde = !res
	}
	
</script>

<style scoped lang="less">
.labelContainer{
	width: 100%;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	border-left: 2rpx solid #E5E7EB;
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
.BossContainer{
	width: 100%;
	display: flex;
	align-items: center;
	margin-bottom: 20rpx;
	
	.lineBox{
		flex-shrink: 0;
		display: flex;
		align-items: center;
		
		.line{
			flex-shrink: 0;
			width: 30rpx;
			height: 2rpx;
			background-color: #E5E7EB;
		}
	}
}
.BossInfo{
	height: 120rpx;
	border-radius: 24rpx;
	.commonContainer();
	padding: 24rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	
	.leftBox{
		display: flex;
		align-items: center;
		gap: 24rpx;
		
		image{
			width: 72rpx;
			height: 72rpx;
			border-radius: 50%;
		}
		
		.leftInfo{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			
			span:nth-of-type(1){
				.fontStyle(28rpx, 500, 42rpx, #1F2937)
			}
			span:nth-of-type(2){
				.fontStyle(24rpx, 400, 32rpx, #4B5563)
			}
		}
	}
	
	.rightBox{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: auto;
		margin-right: 10rpx;
		
		span:nth-of-type(1){
			text-align: right;
			.fontStyle(28rpx, 500, 42rpx, #22C55E)
		}
		span:nth-of-type(2){
			text-align: right;
			.fontStyle(24rpx, 400, 32rpx, #6B7280)
		}
	}
}
.children{
	width: 100%;
	box-sizing: border-box;
	padding-left: 30rpx;
}
</style>
