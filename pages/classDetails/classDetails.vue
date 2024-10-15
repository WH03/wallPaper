<template>
	<view class="classDetails">
		<view class="loadingLayout" v-if="!classDetailsList.length && !noData">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		<view class="content">
			<navigator class="item" url="/pages/preview/preview" v-for="item in classDetailsList">
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
import { onLoad, onReachBottom } from "@dcloudio/uni-app"
import { apiGetClassDetails } from "@/api/apis.js"
const classDetailsList = ref([])

const noData = ref(false)


const queryParams = {
	pageNum: 1,
	pageSize: 12
}

onLoad((e) => {
	let { id = null, name = null } = e
	queryParams.classid = id
	// 修改标题
	uni.setNavigationBarTitle({ title: name })
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
}


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