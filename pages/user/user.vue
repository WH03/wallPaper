<template>
	<view class="userLayout pageBg">
		<view class="userInfo">
			<view class="avatar">
				<image src="../../static//images/xxmLogo.png" mode="scaleToFill" />
			</view>
			<view class="ip">119.163.181.236</view>
			<view class="address">来自：山东</view>
		</view>
		<view class="section">
			<view class="list">

				<navigator url="/pages/classDetails/classDetails">
					<view class="row">
						<view class="left">
							<uni-icons type="download-filled" size="20" color="#28b389"></uni-icons>
							<view class="text">我的下载</view>
						</view>
						<view class="right">
							<view class="text">33</view>
							<uni-icons type="right" size="15" color="#ccc"></uni-icons>
						</view>
					</view>
				</navigator>


				<navigator url="/pages/classDetails/classDetails">
					<view class="row">
						<view class="left">
							<uni-icons type="star-filled" size="20" color="#28b389"></uni-icons>
							<view class="text">我的评分</view>
						</view>
						<view class="right">
							<view class="text">22</view>
							<uni-icons type="right" size="15" color="#aaa"></uni-icons>
						</view>
					</view>
				</navigator>
				<view class="row">
					<view class="left">
						<uni-icons type="chatboxes-filled" size="20" color="#28b389"></uni-icons>
						<view class="text">联系客服</view>
					</view>
					<view class="right">
						<view class="text"></view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
					<!-- #ifdef MP -->
					<button open-type="contact">联系客服</button>
					<!-- #endif -->
					<!-- #ifndef MP -->
					<button @click="clickContact">拨打电话</button>
					<!-- #endif -->

				</view>
			</view>
		</view>
		<view class="section">
			<view class="list">
				<view class="row">
					<view class="left">
						<uni-icons type="notification-filled" size="20" color="#28b389"></uni-icons>
						<view class="text">订阅更新</view>
					</view>
					<view class="right">
						<view class="text"></view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</view>
				<view class="row">
					<view class="left">
						<uni-icons type="flag-filled" size="20" color="#28b389"></uni-icons>
						<view class="text">常见问题</view>
					</view>
					<view class="right">
						<view class="text"></view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>

const clickContact = () => {
	uni.makePhoneCall({
		phoneNumber: "114"
	})
}
</script>

<style lang="scss" scoped>
.userLayout {
	.userInfo {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		.avatar {
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.ip {
			font-size: 44rpx;
			color: #333;
			padding: 20rpx 0 5rpx;
		}

		.address {
			font-size: 28rpx;
			color: #aaa;
		}
	}

	.section {
		width: 690rpx;
		margin: 50rpx auto;
		border: 1px solid #eee;
		border-radius: 10rpx;
		box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.05);

		.list {
			// border-bottom: 1px solid #ccc;
		}

		.row {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx;
			border-bottom: 1px solid #eee;
			position: relative;
			background-color: #fff;

			.left {
				display: flex;
				align-items: center;

				.text {
					color: #666;
					padding-left: 20rpx;
				}
			}

			.right {
				display: flex;
				align-items: center;

				.text {
					font-size: 28rpx;
					color: #aaa;
				}
			}

			button {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				opacity: 0;
			}
		}

	}
}
</style>