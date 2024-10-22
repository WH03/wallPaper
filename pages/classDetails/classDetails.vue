<template>
	<view class="classDetails">
		<view class="loadingLayout" v-if="!classDetailsList.length && !noData">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		<view class="content">
			<navigator class="item" :url="`/pages/preview/preview?id=${item._id}`" v-for="item in classDetailsList">
				<image :src="item.smallPicurl" mode="aspectFill"></image>
			</navigator>
		</view>

		<view class="loadingLayout" v-if="classDetailsList.length || noData">
			<uni-load-more :status="noData ? 'noMore' : 'loading'"></uni-load-more>
		</view>
		<view class="safe-area-inset-bottom"></view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onLoad, onUnload, onReachBottom, onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app"
import { apiGetClassDetails } from "@/api/apis.js"
import { gotoHome } from '@/utils/common.js'
const classDetailsList = ref([])

const noData = ref(false)

let pageNume = ref()

const queryParams = {
	pageNum: 1,
	pageSize: 12
}

onLoad((e) => {
	let { id = null, name = null } = e
	if (!id) gotoHome()
	queryParams.classid = id
	pageNume.value = name
	// 修改标题
	uni.setNavigationBarTitle({ title: pageNume.value })
	// 获取分类列表数据
	getClassDetails()
})

onReachBottom(() => {
	if (noData.value) return
	queryParams.pageNum++
	getClassDetails()
})


// 获取分类列表网络数据
const getClassDetails = async () => {
	let res = await apiGetClassDetails(queryParams)
	// console.log('res', res)
	classDetailsList.value = [...classDetailsList.value, ...res.data]
	// 如果返回的数据，少于传递的参数，就说明没有更多数据了，停止请求
	if (queryParams.pageSize > res.data.length) noData.value = true

	// 将数据存储到localStorage
	uni.setStorageSync("storageClassDetail", classDetailsList.value)
}



// 分享给好友
onShareAppMessage((e) => {
	return {
		title: '`壁纸${pageName.value}`',
		// path: '/page/index/index',
		path: '`/page/classDetail/classDetail?id=${queryParams.classid}&name=${pageName}`',
	}
})

// 分享到朋友圈
onShareTimeline(() => {
	return {
		title: '`壁纸${pageName.value}`',
		query: '`id=${queryParams.classid}&name=${pageName}`'
	}
})

// 离开页面
onUnload(() => {
	uni.removeStorageSync('storageClassDetail')
})

</script>

<style lang="scss" scoped>
// .classDetails {
// 	.content {
// 		display: grid;
// 		grid-template-columns: repeat(3, 1fr);
// 		gap: 5rpx;
// 		padding: 5rpx;

// 		.item {
// 			height: 440rpx;

// 			image {
// 				width: 100%;
// 				height: 100%;
// 				display: block;
// 			}
// 		}
// 	}
// }

.classDetails {
	.content {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 5rpx;
		padding: 5rpx;

		.item {
			height: 440rpx;

			image {
				width: 100%;
				height: 100%;
				display: block;
			}
		}
	}
}
</style>