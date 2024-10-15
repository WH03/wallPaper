<template>
	<view class="common-title">
		<div class="name">
			<slot name="name"></slot>
		</div>
		<view class="custom">
			<slot name="custom"></slot>
		</view>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.common-title {
	display: flex;
	justify-content: space-between;
	padding: 0 30rpx;

	.name {
		font-size: 40rpx;
	}
}
</style>