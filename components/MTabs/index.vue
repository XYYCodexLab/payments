<template>
	<view class="infoItem">
		<view class="infoItemHeader">
			<span>{{props.title}}</span>
			<uv-icon :name="props.rightIcon" color="#2979ff" size="28"></uv-icon>
		</view>
		
		<view class="bottomBox">
			<span class="outSpan">{{props.data}}</span>
			<view v-if="props.rate >= 0" class="upRateBox" v-show="props.rate != null">
				<uv-icon name="arrow-upward" color="#22C55E" size="14"></uv-icon>
				<span>{{props.rate}}% {{props.rateSign}}</span>
			</view>
			<view v-else class="downRateBox" v-show="props.rate != null">
				<uv-icon name="arrow-downward" color="#EF4444" size="14"></uv-icon>
				<span>{{props.rate}}% {{props.rateSign}}</span>
			</view>
		</view>
		
	</view>
</template>

<script setup>
	
	const props = defineProps({
		title: String,
		rightIcon: String,
		data: String,
		rate: String,
		rateSign: String,
	})
	
</script>

<style scoped lang="less">
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
.infoItem{
	.commonContainer();
	width: 327rpx;
	display: flex;
	flex-direction: column;
	
	.infoItemHeader{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		
		span{
			.fontStyle(28rpx, 500, 40rpx, #4B5563)
		}
	}
		
	.bottomBox{
		width: 100%;
		margin-top: 10rpx;
		display: flex;
		flex-direction: column;
		gap: 10rpx;
		box-sizing: border-box;
		
		.commonRate{
			display: flex;
			align-items: center;
			gap: 3rpx;
		}
		
		.upRateBox{
			.commonRate();
			span{
				.fontStyle(28rpx, 400, 32rpx, #22C55E)
			}
		}
		
		.downRateBox{
			.commonRate();
			span{
				.fontStyle(28rpx, 400, 32rpx, #EF4444)
			}
		}
	}
		
	.outSpan{
		.fontStyle(48rpx, 600, 64rpx, #1F2937)
	}
	
	.bottomSpan{
		margin-top: 20rpx;
		.fontStyle(24rpx, 500, 32rpx, #6B7280)
	}
}
</style>
