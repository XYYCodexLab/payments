<template>
	<view class="container">
		<view class="leftBox">
			<view v-show="props.type == '1'" class="iconBox1">
				<uv-icon name="plus-circle" color="#4F46E5" size="30px"></uv-icon>
			</view>
			<view v-show="props.type == '2'" class="iconBox2">
				<uv-icon name="minus-circle" color="#A855F7" size="30px"></uv-icon>
			</view>
			
			<view class="leftTextBox">
				<span>{{props.leftTitle}}</span>
				<span>{{props.leftSubTitle}}</span>
			</view>
		</view>
		
		<view class="rightBox">
			<span v-if="props.type == '1'" class="spanTop1">+{{props.rightTitle}}</span>
			<span v-else class="spanTop2">-{{props.rightTitle}}</span>
			<span class="spanBottom">{{props.rightSubTitle}}</span>
		</view>
	</view>
</template>

<script setup>
	
	const props = defineProps({
		type: String,
		leftTitle: String,
		leftSubTitle: String,
		rightTitle: Number,
		rightSubTitle: String
	})
	
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
		background-color: #EFF6FF;
	}
	
	.iconBox2{
		.commonIconBox();
		background-color: #FAF5FF;
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
	
	.spanTop1{
		.fontStyle(28rpx, 500, 42rpx, #4F46E5);
	}
	
	.spanTop2{
		.fontStyle(28rpx, 500, 42rpx, #A855F7);
	}
	
	.spanBottom{
		.fontStyle(24rpx, 400, 32rpx, #6B7280);
	}
}
</style>

