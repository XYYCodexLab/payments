<template>
	<view class="container" @tap="handleClick">
		<view class="leftBox">
			<view v-show="props.type == '1'" class="iconBox1">
				<uv-icon name="red-packet" color="#22C55E" size="30px"></uv-icon>
			</view>
			<view v-show="props.type == '2'" class="iconBox2">
				<uv-icon name="empty-coupon" color="#A855F7" size="30px"></uv-icon>
			</view>
			
			<view class="leftTextBox">
				<span>{{props.leftTitle}}</span>
				<span>{{props.leftSubTitle}}</span>
			</view>
		</view>
		
		<view class="rightBox">
			<span>{{props.rightTitle}}</span>
			<!-- <span>+{{props.rightSubTitle}}%</span> -->
		</view>
	</view>
</template>

<script setup>
	
	const props = defineProps({
		type: String,
		leftTitle: String,
		leftSubTitle: String,
		rightTitle: String,
		rightSubTitle: String
	})
	
	const emit = defineEmits(['tapFn'])
	
	const handleClick = () => {
		emit('tapFn', props.type)
	}
	
</script>

<style scoped lang="less">
.container{
	box-sizing: border-box;
	width: 100%;
	padding: 24rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-radius: 24rpx;
	background-color: #F9FAFB;
}
.fontStyle(@fontSize, @fontWight, @lineHeight, @color){
	font-size: @fontSize;
	font-weight: @fontWight;
	line-height: @lineHeight;
	color: @color;
}
.leftBox{
	display: flex;
	align-items: center;
	gap: 24rpx;
	
	.commonIconBox{
		width: 80rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
	}
	
	.iconBox1{
		.commonIconBox();
		background-color: #DCFCE7;
	}
	
	.iconBox2{
		.commonIconBox();
		background-color: #F3E8FF;
	}
	
	.leftTextBox{
		display: flex;
		flex-direction: column;
		
		span:nth-of-type(1){
			.fontStyle(28rpx, 500, 42rpx, #1F2937);
		}
		
		span:nth-of-type(2){
			.fontStyle(24rpx, 400, 32rpx, #6B7280);
		}
	}
}
.rightBox{
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	
	span:nth-of-type(1){
		.fontStyle(28rpx, 500, 42rpx, #1F2937);
	}
	
	span:nth-of-type(2){
		.fontStyle(24rpx, 400, 32rpx, #22C55E);
	}
}
</style>
