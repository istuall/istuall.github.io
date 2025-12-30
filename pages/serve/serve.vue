<template>
	<view class="container">
		<view class="header">
			<text class="page-title">英雄列表</text>
			<text class="page-desc">League of Legends Champions</text>
		</view>

		<scroll-view scroll-y class="hero-grid">
			<view class="hero-card" v-for="(item, index) in list" :key="index" @click="push(item)">
				<view class="card-image-box">
					<image class="hero-img" :src="'https://game.gtimg.cn/images/lol/act/img/champion/' + item.alias + '.png'" mode="aspectFill"></image>
				</view>
				<view class="card-info">
					<text class="hero-name">{{item.title}}</text>
					<text class="hero-alias">{{item.name}}</text>
					<view class="tags">
						<text class="tag" v-for="(tag, tIdx) in (item.roles || [])" :key="tIdx">{{tag}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		methods: {
			push(other){
				uni.navigateTo({
					url: '/pages/detils/detils?id=' + other.heroId + "&name=" + other.name
				})
			},
			search(){
				uni.showLoading({ title: '加载中...' });
				uni.request({
					url: 'https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js?ts=2944842',
					method: "get",
					success: (res) => {
						uni.hideLoading();
						if (res.data && res.data.hero) {
							this.list = res.data.hero;
						}
					},
					fail: () => {
						uni.hideLoading();
						uni.showToast({ title: '加载失败', icon: 'none' });
					}
				})
			}
		},
		onShow(){
			this.search()
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 20px;
		padding-bottom: 0;
		height: 100vh;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	.header {
		margin-bottom: 20px;
		.page-title {
			font-size: 24px;
			font-weight: bold;
			color: #333;
			display: block;
		}
		.page-desc {
			font-size: 12px;
			color: #999;
			margin-top: 4px;
			display: block;
		}
	}

	.hero-grid {
		flex: 1;
		/* 允许 scroll-view 内部使用 flex/grid 布局 */
		height: 0; 
	}
	
	/* 这里的 Grid 布局需要应用在 scroll-view 的直接子元素上，或者用 flex wrap 模拟 */
	/* 由于 scroll-view 在不同端表现不同，这里使用 flex wrap 来模拟 Grid */
	::v-deep .uni-scroll-view-content {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	
	/* 兼容非 H5 端，直接在 scroll-view 内部再包一层 view 用于布局会更稳健，但为了保持结构简单，这里直接用 flex wrap */
	/* 修正：在 template 中直接让 scroll-view 内部就是卡片可能无法直接 Grid。
	   通常做法是 scroll-view -> view(grid) -> cards。
	   鉴于 uni-app scroll-view 特性，我们保持简单，用 float 或者 inline-block 或者 flex wrap
	*/

	.hero-card {
		width: 48%; /* 两列布局 */
		background: #fff;
		border-radius: 12px;
		margin-bottom: 15px;
		overflow: hidden;
		box-shadow: 0 4px 12px rgba(0,0,0,0.05);
		transition: transform 0.2s;
		float: left; /* 简单的流式布局 */
		
		&:nth-child(2n) {
			float: right;
		}
		
		&:active {
			transform: scale(0.98);
		}
	}

	.card-image-box {
		width: 100%;
		height: 120px;
		background: #eee;
		
		.hero-img {
			width: 100%;
			height: 100%;
		}
	}

	.card-info {
		padding: 10px;
		
		.hero-name {
			font-size: 16px;
			font-weight: bold;
			color: #333;
			display: block;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		
		.hero-alias {
			font-size: 12px;
			color: #666;
			margin-top: 2px;
			display: block;
		}
		
		.tags {
			margin-top: 8px;
			display: flex;
			flex-wrap: wrap;
			gap: 4px;
			
			.tag {
				font-size: 10px;
				color: #4a7ef7;
				background: rgba(74, 126, 247, 0.1);
				padding: 2px 6px;
				border-radius: 4px;
			}
		}
	}
	
	/* 清除浮动 */
	.hero-grid::after {
		content: "";
		display: block;
		clear: both;
		height: 20px; /* 底部留白 */
	}
</style>