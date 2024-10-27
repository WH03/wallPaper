import { request } from '@/utils/request.js'

export function apiGetBanner() {
    return request({ url: '/homeBanner' })
}

export function apiGetDayRandom() {
    return request({ url: '/randomWall' })
}

export function apiGetNotice(data = {}) {
    return request({ url: '/wallNewsList', data })
}

export function apiGetClassify(data = {}) {
    return request({ url: '/classify', data })
}

export function apiGetClassDetails(data = {}) {
    return request({
        url: "/wallList",
        data
    })
}

export function apiGetSetupScore(data = {}) {
    return request({
        url: '/setupScore',
        data
    })
}

// 下载
export function apiWriteDownload(data = {}) {
    return request({
        url: '/downloadWall',
        data
    })
}

export function apiDetailWall(data = {}) {
    return request({
        url: '/detailWall',
        data
    })
}

//用户登录
export function apiUserInfo(data = {}) {
    return request({
        url: '/userInfo',
        data
    })
}

//下载记录
export function apiHistoryList(data = {}) {
    return request({
        url: '/userWallList',
        data
    })
}

//获取公告
export function apiNoticeDetail(data = {}) {
    return request({
        url: '/wallNewsDetail',
        data
    })
}

// 获取搜索记录
export function apiSearchData(data = {}) {
    return request({
        url: '/searchWall',
        data
    })
}