<template>
	<view class="homeLayout pageBg">
		<!-- #ifndef MP-TOUTIAO -->
		<custom-nav-bar title="推荐"></custom-nav-bar>
		<!-- #endif -->
		<view class="banner">
			<swiper circular indicator-dots indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#fff">
				<swiper-item v-for="item in bannerList" :key="item._id">
					<navigator v-if="item.target == 'miniProgram'" :url="item.url" target="miniProgram"
						app-id="item.appid" class="link">
						<image :src="item.picurl" alt="">
						</image>
					</navigator>
					<navigator v-else :url="`/pages/classDetail/ClassDetails?${item.url}`" class="link">
						<image :src="item.picurl" alt="">
						</image>
					</navigator>
				</swiper-item>
			</swiper>
		</view>
		<view class="notice">
			<view class="left">
				<uni-icons type="sound-filled" size="26"></uni-icons>
				<text>公告</text>
			</view>
			<view class="center">
				<swiper vertical circular autoplay interval="1500" duration="300">
					<swiper-item v-for="item in noticeList" :key="item._id">
						<navigator url="`/pages/notice/detail?id=${item._id}`">
							{{ item.title }}
						</navigator>
					</swiper-item>>

				</swiper>
			</view>
			<view class="right">
				<uni-icons type="right" size="30"></uni-icons>
			</view>
		</view>
		<view class="select">
			<common-title>
				<template #name>每日推荐</template>
				<template #custom>
					<view class="date">
						<uni-icons type="calendar" size="18"></uni-icons>
						<uni-dateformat :date="Date.now()" format="dd 日"></uni-dateformat>
					</view>
				</template>
			</common-title>
			<view class="content">
				<scroll-view scroll-x>
					<view class="box" v-for="item in randomList" :key="item._id" @click="goPreview(item._id)">
						<image :src="item.smallPicurl" mode="scaleToFill" />
					</view>
				</scroll-view>
			</view>
		</view>

		<!-- 专题 -->
		<view class="theme">
			<common-title>
				<template #name>
					每日专题
				</template>

				<template #custom>
					<navigator url="/pages/classify/classify" open-type="reLaunch" hover-class="navigator-hover">
						More+
					</navigator>

				</template>
			</common-title>
			<!-- 图片列表 -->
			<div class="content">
				<theme-item v-for="item in classifyList" :key="item._id" :item="item"></theme-item>
				<theme-item :isMore="true"></theme-item>
			</div>
		</view>


	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import { apiGetBanner, apiGetDayRandom, apiGetNotice, apiGetClassify } from '@/api/apis.js';
import ClassDetails from '../classDetails/classDetails.vue';


const bannerList = ref([])
const randomList = ref([])
const noticeList = ref([])
const classifyList = ref([])

const getBanner = async () => {
	let res = await apiGetBanner()
	bannerList.value = res.data
}

const getDayRandom = async () => {
	let res = await apiGetDayRandom()
	randomList.value = res.data
}


const getNotice = async () => {
	let res = await apiGetNotice({ select: true })
	noticeList.value = res.data
}
// 分类
const getClassify = async () => {
	let res = await apiGetClassify({ select: true })
	classifyList.value = res.data
	// console.log('@@@res', res)
}

// 跳转到预览页面
const goPreview = (id) => {
	// 将数据存储到localStorage
	uni.setStorageSync("storageClassDetail", randomList.value)

	uni.navigateTo({
		url: "/pages/preview/preview?id=" + id
	})

}

// 分享给好友
onShareAppMessage((e) => {
	return {
		title: '壁纸',
		path: '/page/index/index'
	}
})

// 分享到朋友圈
onShareTimeline(() => {
	return {
		title: '壁纸啦啦',
		// imageUrl: '/static/images/logo2.jpg',
		imageUrl: bannerList.value[0].picurl
	}
})



onMounted(() => {
	getBanner()
	getDayRandom()
	getNotice()
	getClassify()
})
</script>

<style lang="scss" scoped>
.homeLayout {
	.banner {
		width: 750rpx;
		padding: 30rpx 0;

		swiper {
			width: 750rpx;
			height: 340rpx;

			&-item {
				width: 100%;
				height: 100%;
				padding: 0 30rpx;

				.link {
					width: 100%;
					height: 100%;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

		}
	}

	.notice {
		width: 690rpx;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #f9f9f9;
		margin: 0 auto;
		border-radius: 80rpx;
		display: flex;

		.left {
			width: 140rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			:deep() {
				.uni-icons {
					color: $brand-theme-color !important;
				}
			}

			text {
				color: $brand-theme-color;
				font-weight: 600;
				font-size: 28rpx;
			}
		}

		.center {
			flex: 1;

			swiper {
				height: 100%;

				&-item {
					height: 100%;
					font-size: 30rpx;
					color: #666;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}

		.right {
			width: 70rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.select {
		padding-top: 50rpx;

		.date {
			:deep() {
				.uni-icons {
					color: $brand-theme-color !important;
				}
			}
		}

		.content {
			width: 720rpx;
			margin-left: 30rpx;
			margin-top: 30rpx;

			scroll-view {
				white-space: nowrap;

				.box {
					width: 200rpx;
					height: 430rpx;
					display: inline-block;
					margin-right: 15rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}

				.box:last-child {
					margin-right: 30rpx;
				}
			}
		}
	}

	.theme {
		padding: 50rpx 0;

		.more {
			font-size: 32rpx;
			color: #888;
		}


		.content {
			// margin-top: 30rpx;
			// padding: 50rpx 30rpx;
			margin-top: 30rpx;
			padding: 0 30rpx;
			display: grid;
			gap: 15rpx;
			grid-template-columns: repeat(3, 1fr);
		}
	}
}
</style>