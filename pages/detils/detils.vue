<template>
	<view class="container">
		<!-- 顶部背景图 -->
		<view class="hero-header">
			<image class="bg-img" :src="'https://game.gtimg.cn/images/lol/act/img/skin/big'+id+'000.jpg'" mode="aspectFill"></image>
			<view class="hero-info-overlay">
				<!-- 这里可以放英雄称号等，如果有数据的话 -->
				<text class="hero-title">技能介绍</text>
			</view>
		</view>

		<view class="content-body">
			<view class="section-title">技能列表</view>
			
			<view class="skill-card" v-for="(item,index) in list" :key="index">
				<view class="card-header">
					<image class="skill-icon" :src="item.abilityIconPath" mode="aspectFill"></image>
					<text class="skill-name">{{item.name}}</text>
					<!-- 技能快捷键 (如果有数据可加) -->
					<text class="skill-key" v-if="item.spellKey">{{item.spellKey}}</text>
				</view>
				<view class="card-body">
					<text class="skill-desc">{{item.description}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				id: ''
			}
		},
		methods: {
			search(id){
				uni.showLoading({ title: '加载中...' });
				uni.request({
					url:'https://game.gtimg.cn/images/lol/act/img/js/hero/'+id+'.js',
					method:"get",
					success:(res)=>{
						uni.hideLoading();
						if (res.data && res.data.spells) {
							this.list = res.data.spells;
						}
					},
					fail: () => {
						uni.hideLoading();
						uni.showToast({ title: '加载失败', icon: 'none' });
					}
				});
			}
		},
		onLoad(option){
			if (option.id) {
				this.id = option.id;
				this.search(option.id);
				
				if(option.name) {
					uni.setNavigationBarTitle({
						title: option.name + ' - 技能详情'
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	.container {
		min-height: 100vh;
		background-color: #f5f7fa;
	}

	.hero-header {
		width: 100%;
		height: 260px;
		position: relative;
		
		.bg-img {
			width: 100%;
			height: 100%;
		}
		
		.hero-info-overlay {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 80px;
			background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
			display: flex;
			align-items: flex-end;
			padding: 20px;
			box-sizing: border-box;
			
			.hero-title {
				color: #fff;
				font-size: 24px;
				font-weight: bold;
				text-shadow: 0 2px 4px rgba(0,0,0,0.5);
			}
		}
	}

	.content-body {
		padding: 20px;
		position: relative;
		top: -20px; /* 上移一点，覆盖图片底部 */
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		background-color: #f5f7fa;
		z-index: 10;
	}

	.section-title {
		font-size: 18px;
		font-weight: bold;
		color: #333;
		margin-bottom: 15px;
		padding-left: 10px;
		border-left: 4px solid #57c6b9;
	}

	.skill-card {
		background: #fff;
		border-radius: 12px;
		padding: 15px;
		margin-bottom: 15px;
		box-shadow: 0 4px 10px rgba(0,0,0,0.03);
		
		.card-header {
			display: flex;
			align-items: center;
			margin-bottom: 10px;
			padding-bottom: 10px;
			border-bottom: 1px solid #eee;
			
			.skill-icon {
				width: 40px;
				height: 40px;
				border-radius: 8px;
				margin-right: 12px;
				border: 1px solid #eee;
			}
			
			.skill-name {
				font-size: 16px;
				font-weight: bold;
				color: #333;
				flex: 1;
			}
			
			.skill-key {
				font-size: 12px;
				color: #fff;
				background-color: #333;
				padding: 2px 6px;
				border-radius: 4px;
				font-family: monospace;
			}
		}
		
		.card-body {
			.skill-desc {
				font-size: 14px;
				color: #666;
				line-height: 1.6;
				text-align: justify;
			}
		}
	}
</style>