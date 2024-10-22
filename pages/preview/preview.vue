<template>
	<view class="preview">
		<swiper circular :current="currentIndex" @change="swiperChange">
			<swiper-item v-for="(item, index) in classDetailsList" :key="item._id">
				<image v-if="readImgs.includes(index)" @click="maskChange" :src="item.picurl" mode="scaleToFill" />
			</swiper-item>
		</swiper>
		<view class="mask" v-if="maskState">
			<view class="goBack" @click="goBack" :style="{ top: getTitleBarHeight() + 'px' }">
				<uni-icons type="back" size="20" color="#fff"></uni-icons>
			</view>
			<view class="count">{{ currentIndex + 1 }}/ {{ classDetailsList.length }}</view>
			<view class="time">
				<uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat>
			</view>
			<view class="date">
				<uni-dateformat :date="new Date()" format="MM月dd日"></uni-dateformat>
			</view>
			<view class="footer">
				<view class="box" @click="clickInfo">
					<uni-icons type="info" size="28"></uni-icons>
					<view class="text">信息</view>
				</view>
				<view class="box" @click="clickScore">
					<uni-icons type="info" size="28"></uni-icons>
					<!-- <view class="text">评分</view> -->
					<view class="text">{{ currentInfo?.score }}分</view>
				</view>
				<view class="box" @click="downloadImg">
					<uni-icons type="info" size="23"></uni-icons>
					<view class="text">下载</view>
				</view>
			</view>

		</view>
		<!-- 底部弹窗 -->
		<uni-popup ref="infoPopup" type="bottom">
			<view class="infoPopup">
				<view class="popHeader">
					<view></view>
					<view class="title">
						壁纸信息
					</view>
					<view class="close" @click="closePopup">
						<uni-icons type="closeempty" size="23"></uni-icons>
					</view>
				</view>
				<scroll-view scroll-y>
					<view class="content">
						<view class="row">
							<view class="label">壁纸ID：</view>
							<text class="value" selectable>{{ currentInfo?._id }}</text>
						</view>
						<!-- <view class="row">
							<view class="label">分类：</view>
							<text class="value class">明星美女</text>
						</view> -->
						<view class="row">
							<view class="label">发布者：</view>
							<text class="value" selectable>{{ currentInfo.nickname }}</text>
						</view>
						<view class="row">
							<text class="label">评分：</text>
							<view class="value rateBox">
								<uni-rate readonly touchalbe size="16" :value="currentInfo.score" @change="onChange" />
								<view class="score">{{ currentInfo.score }}分</view>
							</view>
						</view>
						<view class="row">
							<text class="label">摘要：</text>
							<view class="value">{{ currentInfo.description }}</view>
						</view>
						<view class="row">
							<text class="label">标签：</text>
							<view class="value tabs">
								<view class="tab" v-for="(tab, key) in currentInfo.tabs" :key="key">
									{{ tab }}
								</view>
							</view>
						</view>

						<view class="copyright">
							声明：本图片来用户投稿，非商业使用，用于免费学习交流，如侵犯了您的权益，您可以拷贝壁纸ID举报至平台，邮箱513894357@qq.com，管理将删除侵权壁纸，维护您的权益。
						</view>
						<view class="safe-area-inset-bottom"></view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>

		<uni-popup ref="scorePopup" :is-mask-click="false">
			<view class="scorePopup">
				<view class="popHeader">
					<view></view>
					<view class="title">
						{{ isScore ? "评分过了" : "壁纸评分" }}
					</view>
					<view class="close" @click="closeScorePopup">
						<uni-icons type="closeempty" size="23"></uni-icons>
					</view>
				</view>
				<view class="content">
					<uni-rate allowHalf v-model="userScore" @change="onChange" :disabled="isScore"
						disabled-color="#FFCA3E"></uni-rate>
					<text class="text">{{ userScore }}分</text>
				</view>
				<view class="footer">
					<button :disabled="!userScore || isScore" type="default" plain @click="submitScore"
						size="mini">确认评分</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { getTitleBarHeight } from '@/utils/system'
import { onLoad, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import { apiGetSetupScore, apiWriteDownload, apiDetailWall } from '@/api/apis.js'

const maskState = ref(true)	//遮罩层
const infoPopup = ref(null); //壁纸信息
const userScore = ref(0)  //确认评分
const scorePopup = ref(null)//评分点击


const classDetailsList = ref([])//当前展示的数据
const currentId = ref()	//当前图片的id，根据当前id，计算索引，用于展示当前是第几涨
const currentIndex = ref()	//索引
const isScore = ref(false)  //是否评分
const readImgs = ref([])  //加载保存当前预览的三张图
const currentInfo = ref([]) //当前图片信息

// 读取localStorage数据，减少请求
const storageClassDetailsList = uni.getStorageSync("storageClassDetail") || []
classDetailsList.value = storageClassDetailsList.map(item => {
	return {
		...item,
		picurl: item.smallPicurl.replace("_small.webp", ".jpg")//小图更换为大图
	}
})

// 获取id
onLoad(async (e) => {
	currentId.value = e.id
	if (e.type == 'share') {
		let res = await apiDetailWall({ id: currentId.value })
		classDetailsList.value = res.data.map(item => {
			return {
				...item,
				picurl: item.smallPicurl.replace("_small.webp", ".jpg")//小图更换为大图
			}
		})

	}
	// 获取当前索引
	currentIndex.value = classDetailsList.value.findIndex(item => item._id == currentId.value)
	currentInfo.value = classDetailsList.value[currentIndex.value]
	readImgsFun()
})

// 滑动图片
const swiperChange = (e) => {
	currentIndex.value = e.detail.current
	readImgsFun()
}

// 点击info弹窗
const clickInfo = () => {
	infoPopup.value.open()
}
// 关闭info弹窗
const closePopup = () => {
	infoPopup.value.close()
}
// 打开评分弹窗
const clickScore = () => {
	if (currentInfo.value.userScore) {
		isScore.value = true
		userScore.value = currentInfo.value.userScore
	}
	scorePopup.value.open()
}

// 关闭评分
const closeScorePopup = () => {
	scorePopup.value.close()
	userScore.value = 0
	isScore.value = true
}

// 确认评分
const submitScore = async () => {
	uni.showLoading({
		title: '加载中...'
	})
	let { classid, _id: wallId } = currentInfo.value;
	let res = await apiGetSetupScore({
		classid,
		wallId,
		userScore: userScore.value
	})
	uni.hideLoading()
	if (res.errCode == 0) {
		uni.showToast({
			title: '评分成功',
			icon: 'none',
		})
		// 将评分存到数据里
		classDetailsList.value[currentIndex.value].userScore = userScore.value
		// 更新本地缓存的数据
		uni.setStorageSync("storageClassDetail", classDetailsList.value)
		// 关闭弹窗
		closeScorePopup()
	}
}

// 评分点击事件
const onChange = () => {

}

// 遮罩层
const maskChange = () => {
	maskState.value = !maskState.value
}

//返回上一页
const goBack = () => {
	uni.navigateBack({
		success: () => {

		},
		fail: () => {
			uni.reLaunch({
				url: '/page/index/index'
			})
		}
	})
}


// 下载图片
const downloadImg = async () => {
	// #ifdef H5
	uni.showModal({
		content: "请长按保存壁纸",
		showCancel: false
	})
	// #endif


	// #ifndef H5

	try {
		uni.showLoading({
			title: '下载中...',
			mask: true
		})

		// 下载
		let { classid, _id: wallId } = currentInfo.value;
		let res = await apiWriteDownload({
			classid,
			wallId
		})

		if (res.errCode !== 0) throw res


		uni.getImageInfo({
			src: currentInfo.value.picurl,
			success: (res) => {
				// console.log(res)
				// 保存到相册
				uni.saveImageToPhotosAlbum({
					filePath: res.path,
					success: (res) => {
						console.log(res)
					},
					fail: err => {
						if (err.errMsg == "saveImageToPhotosAlbum:fail cancel") {
							uni.showToast({
								title: '保存成功，请到相册查看',
								icon: "none"
							})
							return;
						}
						uni.showModal({
							title: '授权提示',
							content: '需要授权保存相册',
							success: res => {
								if (res.confirm) {
									// console.log('确认授权了')
									uni.getSetting({
										success: ({ authSetting }) => {
											if (authSetting["scope.writePhotoAlbum"]) {
												uni.showToast({
													title: '获取授权成功！',
													icon: "none"
												})
											} else {
												uni.showToast({
													title: '获取授权失败！',
													icon: "none"
												})
											}
										},
										fail: (error) => { }
									})
								}
							}
						})
					},
					complete: () => {
						uni.hideLoading()
					}
				})
			}
		})
	} catch (err) {
		console.log(err)
		uni.hideLoading()
	}
	// #endif
}


//性能优化：只展示三张图：当前要看的、前一张、后一张
const readImgsFun = () => {
	readImgs.value.push(
		currentIndex.value <= 0 ? classDetailsList.value.length - 1 : currentIndex.value - 1,//前一张，如果当前是第一张，前一张就是元素总长度；否则是当前-1
		currentIndex.value,//当前 
		currentIndex.value >= classDetailsList.value.length - 1 ? 0 : currentIndex.value + 1  //后一张，如果当前是最后一张，那么下一张就是第一张，即0，无限循环
	)
	readImgs.value = [...new Set(readImgs.value)]


}


// 分享给好友
onShareAppMessage((e) => {
	return {
		title: '壁纸',
		path: '`/page/preview/preview?id=${currentId.value}&type=share`',
	}
})

// 分享到朋友圈
onShareTimeline(() => {
	return {
		title: '壁纸',
		query: '`id=${currentId.value}&type=share`'
	}
})


</script>

<style lang="scss" scoped>
.preview {
	width: 100%;
	height: 100vh;
	position: relative;

	swiper {
		width: 100%;
		height: 100%;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.mask {
		&>view {
			position: absolute;
			left: 0;
			margin: auto;
			color: #fff;
			right: 0;
			width: fit-content;
		}

		.goBack {
			width: 38px;
			height: 38px;
			background-color: rgba(0, 0, 0, 0.5);
			left: 30rpx;
			margin-left: 0;
			border-radius: 100rpx;
			top: 0;
			backdrop-filter: blur(10rpx);
			border: 1rpx solid rgba(255, 255, 255, 0.3);
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.count {

			top: 10vh;
			background: rgba(0, 0, 0, 0.3);
			font-size: 28rpx;
			border-radius: 40rpx;
			padding: 8rpx 28rpx;
			backdrop-filter: blur(10rpx);
		}

		.time {

			font-size: 140rpx;
			top: calc(10vh + 80rpx);
			font-weight: 100;
			line-height: 1em;
			text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
		}

		.date {

			font-size: 34rpx;
			top: calc(10vh + 230rpx);
			text-shadow: 0 2rpx rgba(0, 0, 0, 0.3);
		}

		.footer {
			background-color: rgba(255, 255, 255, 0.8);
			bottom: 10vh;
			width: 65vw;
			height: 120rpx;
			border-radius: 120rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			box-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.1);
			backdrop-filter: blur(20rpx);

			.box {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				padding: 2rpx 12rpx;

				.text {
					font-size: 26rpx;
					color: $text-font-color-2;
				}
			}

		}

	}

	.popHeader {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.title {
			color: $text-font-color-2;
			font-size: 26rpx;
		}

		.close {
			padding: 6rpx;
		}
	}

	.infoPopup {
		padding: 30rpx;
		border-radius: 30rpx 30rpx 0 0;
		background-color: #fff;
		overflow: hidden;


		scroll-view {
			max-height: 60vh;

			.content {
				.row {
					display: flex;
					font-size: 32rpx;
					line-height: 1.7em;
					padding: 16px 0;

					.label {
						color: $text-font-color-3;
						width: 140rpx;
						text-align: right;
						font-size: 30rpx;
					}

					.value {
						flex: 1;
						width: 0;
					}

					.rateBox {
						display: flex;
						align-items: center;

						.score {
							color: $text-font-color-2;
							font-size: 26rpx;
							padding-left: 20rpx;
						}
					}

					.tabs {
						display: flex;
						flex-wrap: wrap;

						.tab {
							border: 1px solid $brand-theme-color;
							color: $brand-theme-color;
							font-size: 22rpx;
							padding: 10rpx 30rpx;
							border-radius: 40rpx;
							line-height: 1em;
							margin: 0 10rpx 10rpx 0;
						}
					}

					.class {
						color: $brand-theme-color;
					}

				}

				.copyright {
					font-size: 28rpx;
					padding: 20rpx;
					background: #F6F6F6;
					color: #666;
					border-radius: 10rpx;
					margin: 20rpx 0;
					line-height: 1.6em;
				}
			}
		}
	}

	.scorePopup {
		background-color: #fff;
		padding: 30rpx;
		border-radius: 30rpx;
		overflow: hidden;
		width: 70vw;

		.content {
			padding: 30rpx 0;

			display: flex;
			align-items: center;
			justify-content: center;

			.text {
				color: #FFCA3E;
				padding-left: 10rpx;
				width: 80rpx;
				line-height: 1em;
				text-align: right;
			}

		}

		.footer {
			padding: 10rpx 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>
