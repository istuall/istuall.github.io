<template>
	<view class="container">
		<view class="header-section">
			<image class="logo" src="/static/logo.png" mode="aspectFit"></image>
			<view class="header-text">
				<text class="title">{{title}}</text>
				<text class="subtitle">探索更多精彩功能</text>
			</view>
		</view>

		<view class="grid-menu">
			<!-- AI 对话 -->
			<view class="menu-item" @click="navigateTo('/pages/msg/msg')">
				<view class="icon-box blue-gradient">
					<text class="menu-icon">🤖</text>
				</view>
				<text class="menu-title">AI 对话</text>
				<text class="menu-desc">智能助手在线解答</text>
			</view>

			<!-- 多人聊天 -->
			<view class="menu-item" @click="navigateTo('/pages/mine/mine')">
				<view class="icon-box purple-gradient">
					<text class="menu-icon">💬</text>
				</view>
				<text class="menu-title">多人热聊</text>
				<text class="menu-desc">实时在线群组聊天</text>
			</view>

			<!-- 计算器 -->
			<view class="menu-item" @click="navigateTo('/pages/counter/counter')">
				<view class="icon-box green-gradient">
					<text class="menu-icon">🧮</text>
				</view>
				<text class="menu-title">计算器</text>
				<text class="menu-desc">拟物风格科学计算</text>
			</view>

			<!-- 演示功能 (保留原有逻辑) -->
			<view class="menu-item" @click="change">
				<view class="icon-box orange-gradient">
					<text class="menu-icon">⚡</text>
				</view>
				<text class="menu-title">演示互动</text>
				<text class="menu-desc">点击修改顶部标题</text>
			</view>
		</view>

		<view class="list-section">
			<view class="section-title">最近动态</view>
			<view class="list-item" v-for="(item,index) in list" :key="index">
				<view class="dot"></view>
				<text class="item-text">{{item}} - {{index + 1}}</text>
			</view>
		</view>
		
		<button class="logout-btn" @click="logout">退出登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'UniApp 演示中心',
				list: ['系统更新通知', '新功能上线公告', '维护计划说明', '社区活动预告']
			}
		},
		onLoad() {

		},
		methods: {
			scrollToBottom() {
				// 简单实现滚动到底部
				this.$nextTick(() => {
					this.scrollIntoView = 'chatContent'; // 实际上应该定位到最后一个元素ID，这里简化处理
				});
			},
			change() {
				this.title = this.title === 'UniApp 演示中心' ? '你好 UniApp' : 'UniApp 演示中心';
				uni.showToast({
					title: '标题已修改',
					icon: 'none'
				});
			},
			navigateTo(url) {
				// 定义 TabBar 页面路径列表
				const tabPages = [
					'/pages/index/index',
					'/pages/counter/counter',
					'/pages/serve/serve',
					'/pages/msg/msg',
					'/pages/mine/mine'
				];			
				// 判断是否为 TabBar 页面
				if (tabPages.includes(url)) {
					uni.switchTab({
						url: url,
						fail: (err) => {
							console.error(err);
							uni.showToast({
								title: '跳转失败',
								icon: 'none'
							});
						}
					});
				} else {
					uni.navigateTo({
						url: url,
						fail: (err) => {
							console.error(err);
							uni.showToast({
								title: '页面跳转失败',
								icon: 'none'
							});
						}
					});
				}
			},
			logout() {
				uni.showModal({
					title: '提示',
					content: '确定要退出登录吗？',
					success: (res) => {
						if (res.confirm) {
							uni.clearStorageSync();
							uni.reLaunch({
								url: '/pages/login/login'
							});
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	$bg-color: #f5f7fa;
	$card-bg: #ffffff;
	$text-main: #333;
	$text-sub: #999;
	
	page {
		background-color: $bg-color;
		min-height: 100%;
	}

	.container {
		padding: 20px;
		display: flex;
		flex-direction: column;
	}

	.header-section {
		display: flex;
		align-items: center;
		margin-bottom: 30px;
		margin-top: 10px;
		
		.logo {
			width: 60px;
			height: 60px;
			margin-right: 15px;
			border-radius: 12px;
			box-shadow: 0 4px 10px rgba(0,0,0,0.1);
		}
		
		.header-text {
			display: flex;
			flex-direction: column;
			
			.title {
				font-size: 24px;
				font-weight: bold;
				color: $text-main;
				margin-bottom: 4px;
			}
			
			.subtitle {
				font-size: 14px;
				color: $text-sub;
			}
		}
	}

	.grid-menu {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 15px;
		margin-bottom: 30px;
	}

	.menu-item {
		background-color: $card-bg;
		border-radius: 16px;
		padding: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		box-shadow: 0 4px 20px rgba(0,0,0,0.04);
		transition: all 0.2s;
		
		&:active {
			transform: scale(0.98);
			box-shadow: 0 2px 10px rgba(0,0,0,0.02);
		}

		.icon-box {
			width: 50px;
			height: 50px;
			border-radius: 12px;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 12px;
			
			.menu-icon {
				font-size: 24px;
			}
			
			&.blue-gradient { background: linear-gradient(135deg, #e3f2fd, #bbdefb); }
			&.purple-gradient { background: linear-gradient(135deg, #f3e5f5, #e1bee7); }
			&.green-gradient { background: linear-gradient(135deg, #e8f5e9, #c8e6c9); }
			&.orange-gradient { background: linear-gradient(135deg, #fff3e0, #ffe0b2); }
		}

		.menu-title {
			font-size: 16px;
			font-weight: bold;
			color: $text-main;
			margin-bottom: 4px;
		}

		.menu-desc {
			font-size: 12px;
			color: $text-sub;
		}
	}

	.list-section {
		background-color: $card-bg;
		border-radius: 16px;
		padding: 20px;
		box-shadow: 0 4px 20px rgba(0,0,0,0.04);
		margin-bottom: 30px;
		
		.section-title {
			font-size: 16px;
			font-weight: bold;
			margin-bottom: 15px;
			padding-left: 10px;
			border-left: 4px solid #4a7ef7;
		}
		
		.list-item {
			display: flex;
			align-items: center;
			padding: 12px 0;
			border-bottom: 1px solid #f0f0f0;
			
			&:last-child {
				border-bottom: none;
			}
			
			.dot {
				width: 8px;
				height: 8px;
				background-color: #4a7ef7;
				border-radius: 50%;
				margin-right: 12px;
			}
			
			.item-text {
				font-size: 14px;
				color: #555;
			}
		}
	}
	
	.logout-btn {
		background-color: #fff;
		color: #ff6b6b;
		border-radius: 12px;
		font-size: 16px;
		box-shadow: 0 4px 10px rgba(0,0,0,0.05);
		border: 1px solid #ffcccc;
		
		&:active {
			background-color: #fff0f0;
		}
		
		&::after { border: none; }
	}
</style>