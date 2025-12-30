<template>
	<view class="container">
		<!-- 背景装饰 -->
		<view class="bg-shape shape-1"></view>
		<view class="bg-shape shape-2"></view>
		
		<view class="login-content">
			<!-- 头部 Logo 区 -->
			<view class="header fade-in-down">
				<image class="logo" src="/static/logo.png" mode="aspectFill"></image>
				<text class="app-name">SNDemo</text>
				<text class="subtitle">欢迎回来，请登录您的账号</text>
			</view>
			
			<!-- 表单区 -->
			<view class="form-card fade-in-up">
				<view class="input-group">
					<view class="input-icon">👤</view>
					<input class="input-field" type="text" v-model="userName" placeholder="请输入账号" placeholder-class="placeholder"/>
				</view>
				
				<view class="input-group">
					<view class="input-icon">🔒</view>
					<input class="input-field" type="password" v-model="password" placeholder="请输入密码" placeholder-class="placeholder"/>
				</view>
				
				<view class="form-actions">
					<text class="forgot-pwd" @click="showTip">忘记密码?</text>
				</view>
				
				<button class="login-btn" hover-class="btn-hover" @click="login()">
					<text>立即登录</text>
					<view class="btn-shine"></view>
				</button>
			</view>
			
			<!-- 底部区域 -->
			<view class="footer fade-in">
				<text class="copyright">© 2024 SNDemo All Rights Reserved</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { http } from '../../lib/http';
	export default {
		data() {
			return {
				userName:'lll',
				password:'lll1997'
			}
		},
		methods: {
			login(){
				if(!this.userName || !this.password) {
					uni.showToast({ title: '请输入账号和密码', icon: 'none' });
					return;
				}
				
				// 模拟登录加载效果
				uni.showLoading({ title: '登录中...' });
				
				http.fectch({
					method:'post',
					url:'/api/login',
					data:{
						userName:this.userName,
						passWord:this.password
					},
					header:{
						'Content-Type':'application/x-www-form-urlencoded'
					},
					success:(res)=>{
						uni.hideLoading();
						console.log(res,'登陆返回的')
						//存储token
						uni.setStorageSync('token',res.token)
						//存储用户名
						uni.setStorageSync('userName',res.data.userName)
						//存储用户头像
						uni.setStorageSync('imgUrl',res.data.imgUrl)
						
						uni.showToast({
							title:'登陆成功',
							icon: 'success'
						})
						
						setTimeout(()=>{
							uni.switchTab({
								url:'/pages/index/index'
							})
						}, 1000)
					},
					fail: () => {
						uni.hideLoading();
						// 即使失败也允许跳转（演示用）
						// uni.showToast({ title: '网络请求失败', icon: 'none' });
					}
				})
			},
			showTip() {
				uni.showToast({ title: '请联系管理员重置', icon: 'none' });
			}
		}
	}
</script>

<style lang="scss">
	/* 变量定义 */
	$primary-color: #4a7ef7;
	$primary-dark: #3b66d1;
	$bg-color: #f0f4f8;
	$card-bg: #ffffff;
	$text-main: #333;
	$text-sub: #999;
	
	page {
		height: 100%;
		background-color: $bg-color;
		font-family: -apple-system, Helvetica, sans-serif;
	}

	.container {
		height: 100%;
		position: relative;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	/* 背景装饰 */
	.bg-shape {
		position: absolute;
		border-radius: 50%;
		filter: blur(60px);
		z-index: 0;
		opacity: 0.6;
	}
	.shape-1 {
		width: 300px;
		height: 300px;
		background: #a0c4ff;
		top: -100px;
		right: -50px;
		animation: float 10s infinite ease-in-out;
	}
	.shape-2 {
		width: 250px;
		height: 250px;
		background: #ffc6ff;
		bottom: -50px;
		left: -50px;
		animation: float 8s infinite ease-in-out reverse;
	}
	
	@keyframes float {
		0%, 100% { transform: translate(0, 0); }
		50% { transform: translate(20px, 30px); }
	}

	.login-content {
		width: 100%;
		padding: 40px;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	/* 头部区域 */
	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 40px;
		
		.logo {
			width: 80px;
			height: 80px;
			border-radius: 20px;
			box-shadow: 0 10px 20px rgba(74, 126, 247, 0.2);
			margin-bottom: 15px;
		}
		
		.app-name {
			font-size: 24px;
			font-weight: bold;
			color: $text-main;
			margin-bottom: 5px;
			letter-spacing: 1px;
		}
		
		.subtitle {
			font-size: 14px;
			color: $text-sub;
		}
	}
	
	/* 表单卡片 */
	.form-card {
		width: 100%;
		background: rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border-radius: 24px;
		padding: 30px 25px;
		box-shadow: 0 15px 35px rgba(0,0,0,0.05);
		border: 1px solid rgba(255,255,255,1);
	}
	
	.input-group {
		display: flex;
		align-items: center;
		background: #f5f7fa;
		border-radius: 12px;
		padding: 0 15px;
		margin-bottom: 20px;
		height: 54px;
		transition: all 0.3s;
		border: 1px solid transparent;
		
		&:focus-within {
			background: #fff;
			border-color: $primary-color;
			box-shadow: 0 0 0 4px rgba(74, 126, 247, 0.1);
			transform: translateY(-1px);
		}
		
		.input-icon {
			font-size: 18px;
			margin-right: 12px;
			opacity: 0.6;
		}
		
		.input-field {
			flex: 1;
			height: 100%;
			font-size: 16px;
			color: $text-main;
		}
	}
	
	.form-actions {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 30px;
		
		.forgot-pwd {
			font-size: 13px;
			color: $primary-color;
			padding: 5px;
		}
	}
	
	.login-btn {
		position: relative;
		width: 100%;
		height: 54px;
		background: linear-gradient(135deg, $primary-color, $primary-dark);
		color: #fff;
		border-radius: 27px;
		font-size: 18px;
		font-weight: 600;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 10px 20px rgba(74, 126, 247, 0.3);
		border: none;
		overflow: hidden;
		
		&::after { border: none; }
		
		/* 按钮光效 */
		.btn-shine {
			position: absolute;
			top: 0;
			left: -100%;
			width: 100%;
			height: 100%;
			background: linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent);
			transform: skewX(-20deg);
			animation: shine 3s infinite;
		}
	}
	
	@keyframes shine {
		0% { left: -100%; }
		20% { left: 100%; }
		100% { left: 100%; }
	}
	
	.btn-hover {
		transform: scale(0.98);
		box-shadow: 0 5px 10px rgba(74, 126, 247, 0.2);
	}
	
	.footer {
		margin-top: 40px;
		.copyright {
			font-size: 12px;
			color: #ccc;
		}
	}
	
	/* 动画类 */
	.fade-in-down { animation: fadeInDown 0.8s ease-out; }
	.fade-in-up { animation: fadeInUp 0.8s ease-out 0.2s backwards; }
	.fade-in { animation: fadeIn 1s ease-out 0.5s backwards; }
	
	@keyframes fadeInDown {
		from { opacity: 0; transform: translateY(-20px); }
		to { opacity: 1; transform: translateY(0); }
	}
	@keyframes fadeInUp {
		from { opacity: 0; transform: translateY(20px); }
		to { opacity: 1; transform: translateY(0); }
	}
	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}
</style>