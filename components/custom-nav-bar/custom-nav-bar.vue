<template>
	<view class="layout">
		<view class="navBar">
			<view class="statusBar" :style="{ height: getStatusBarHeight() + 'px' }"></view>
			<view class="titleBar"
				:style="{ height: getTitleBarHeight() + 'px', marginLeft: getLeftIconLeft() + 'px' }">
				<view class="title">{{ title }}</view>
				<view class="search">
					<uni-icons class="icon" type="search" color="#888" size="18"></uni-icons>
					<view class="text">搜索</view>
				</view>
			</view>
		</view>
		<view class="fill" :style="{ height: getNavBarHeight() + 'px' }">

		</view>
	</view>
</template>

<script setup>
import {
	ref
} from 'vue'

import { getStatusBarHeight, getTitleBarHeight, getNavBarHeight, getLeftIconLeft } from '@/utils/system.js'

defineProps({
	title: {
		type: String,
		default: "壁纸"
	}
})

</script>

<style lang="scss" scoped>
.layout {
	.navBar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 10;
		background:
			linear-gradient(to bottom, transparent, #fff 400rpx),
			linear-gradient(to right, #beecd8 20%, #F4E2D8);

		.statusBar {}

		.titleBar {
			display: flex;
			align-self: center;
			padding: 0 30px;
			// border: 1px solid #000;

			.title {
				font-size: 22px;
				font-weight: 700;
				color: $text-font-color-1 ;
			}

			.search {
				display: flex;
				align-items: center;

				width: 220rpx;
				height: 50rpx;

				background-color: rgba(255, 255, 255, 0.4);
				border: 1px solid #fff;
				border-radius: 60rpx;
				margin-left: 30rpx;
				color: #999;
				font-size: 28rpx;
				padding-left: 10rpx;

				.icon {
					margin-left: 5rpx;
				}

				.text {
					padding-left: 10rpx;
				}
			}
		}
	}
}
</style>