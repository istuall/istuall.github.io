<template>
	<view class="container">
		<view class="top-bar">
			<text class="title">多人聊天室 ({{userNum}})</text>
			<view class="action-btn" @click="changeName">
				<text class="action-icon">✎</text>
			</view>
		</view>
		
		<scroll-view class="chat-area" scroll-y="true" :scroll-into-view="scrollIntoView" :scroll-top="scrollTop">
			<view class="content" id="chatContent">
				<view class="row" v-for="(item,index) in list" :key="index" :class="userName===item.userName?'right':'left'">
					<image class="avatar" :src="baseUrl+item.imgUrl" mode="aspectFill"></image>
					<view class="msg-wrapper">
						<text class="name">{{item.userName}}</text>
						<view class="bubble">
							<text class="msg-text">{{item.data}}</text>
						</view>
					</view>
				</view>
				<!-- 占位 -->
				<view class="bottom-spacer"></view>
			</view>
		</scroll-view>
		
		<view class="input-area">
			<input class="input-box" type="text" v-model="inputVal" placeholder="一起聊聊吧..." placeholder-class="placeholder" confirm-type="send" @confirm="send()"/>
			<button class="send-btn" @click="send()">
				<text class="btn-text">发送</text>
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//头像图片的接口前缀
				baseUrl:'http://124.222.209.246:3000/uploads/',
				inputVal: '',
				// 获取userName用于判断消息在左边还是右边
				userName:uni.getStorageSync('userName') || '颤抖啾啾',
				// 用来存储消息列表
				list: [{
						data: '星火大模型AI',
						userName: 'AI',
						imgUrl: 'tb.png'
					},
					{
						data: '你好星火大模型',
						userName: '颤抖啾啾',
						imgUrl: 'logo.png'
					}
				],
				// 用来存储在线人数
				userNum:'0',
				scrollIntoView: '',
				scrollTop: 0
			}
		},
		watch:{
			'list.length'(newVal,oldVal){
				// 数据发生改变时,滚动到页面最下方
				console.log(newVal,'新数据')
				this.scrollToBottom();
			}
		},
		onShow(){
			this.init()
		},
		methods: {
			scrollToBottom() {
				this.$nextTick(() => {
					// 尝试使用 scrollIntoView
					this.scrollIntoView = 'chatContent';
					// 同时尝试 scrollTop 兜底
					this.scrollTop = 9999999;
					
					// 某些场景下需要延时
					setTimeout(() => {
						this.scrollTop = 9999999 + Math.random(); // 强制更新
					}, 100);
				});
			},
			// 用来获取消息列表
			init(){
				// 利用实时通讯技术 socket
				// 首先建立连接
				uni.connectSocket({
					url:'ws://124.222.209.246:8800?userName='+uni.getStorageSync('userName')+"&imgUrl="+uni.getStorageSync('imgUrl')
				})
				// 获取实时数据
				uni.onSocketMessage((res)=>{
					let obj=JSON.parse(res.data)
					console.log(obj,'实时数据返回的数据')
					// 将聊天数据赋值给变量
					this.list=obj.chatList
					// 将在线人数赋值给变量
					this.userNum=[...obj.userList].length
				})
			},
			send(){
				if(!this.inputVal){
					uni.showToast({
						title:'请输入内容',
						icon:'none'
					})
					return
				}
				uni.sendSocketMessage({
					data:JSON.stringify({
						data:this.inputVal,
						userName:this.userName,
						imgUrl:uni.getStorageSync('imgUrl')
					})
				})
				this.inputVal=''
			},
			changeName() {
				uni.showModal({
					title: '修改昵称',
					editable: true,
					placeholderText: '请输入新昵称',
					success: (res) => {
						if (res.confirm && res.content) {
							// 更新本地存储
							uni.setStorageSync('userName', res.content)
							this.userName = res.content
							// 重新连接以更新 socket 中的用户信息
							uni.closeSocket()
							setTimeout(() => {
								this.init()
							}, 500)
							uni.showToast({
								title: '改名成功',
								icon: 'success'
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	$primary-color: #4a7ef7;
	$bg-color: #f5f7fa;
	$bubble-bg-left: #ffffff;
	$bubble-bg-right: $primary-color;
	$text-color: #333;
	
	page {
		height: 100%;
		background-color: $bg-color;
	}
	
	.container {
		position: relative;
		width: 100%;
		height: 100vh;
		overflow: hidden;
		background-color: $bg-color;
	}

	.top-bar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #fff;
		box-shadow: 0 2px 10px rgba(0,0,0,0.05);
		z-index: 20;
		padding-top: var(--status-bar-height);
		
		.title {
			font-size: 18px;
			font-weight: bold;
			color: $text-color;
		}
		
		.action-btn {
			position: absolute;
			right: 15px;
			bottom: 0;
			top: var(--status-bar-height);
			display: flex;
			align-items: center;
			justify-content: center;
			width: 44px;
			
			.action-icon {
				font-size: 20px;
				color: $primary-color;
			}
			
			&:active {
				opacity: 0.7;
			}
		}
	}
	
	.chat-area {
		position: absolute;
		top: calc(44px + var(--status-bar-height)); /* 顶部栏高度 */
		bottom: 100px; /* 底部栏高度 + TabBar */
		width: 100%;
		background-color: $bg-color;
		padding: 15px;
		box-sizing: border-box;
	}
	
	.content {
		padding-bottom: 20px;
	}
	
	.row {
		display: flex;
		margin-bottom: 20px;
		align-items: flex-start;
		
		&.left {
			flex-direction: row;
			
			.msg-wrapper {
				align-items: flex-start;
				margin-left: 10px;
				
				.name {
					margin-left: 5px;
				}
				
				.bubble {
					background-color: $bubble-bg-left;
					color: $text-color;
					border-top-left-radius: 2px;
				}
			}
		}
		
		&.right {
			flex-direction: row-reverse;
			
			.msg-wrapper {
				align-items: flex-end;
				margin-right: 10px;
				
				.name {
					margin-right: 5px;
				}
				
				.bubble {
					background-color: $bubble-bg-right;
					color: #fff;
					border-top-right-radius: 2px;
				}
			}
		}
	}
	
	.avatar {
		width: 45px;
		height: 45px;
		border-radius: 50%;
		box-shadow: 0 2px 5px rgba(0,0,0,0.1);
		flex-shrink: 0;
		background-color: #eee;
	}
	
	.msg-wrapper {
		display: flex;
		flex-direction: column;
		max-width: 70%;
		
		.name {
			font-size: 12px;
			color: #999;
			margin-bottom: 4px;
		}
		
		.bubble {
			padding: 10px 15px;
			border-radius: 12px;
			box-shadow: 0 2px 8px rgba(0,0,0,0.05);
			position: relative;
			word-wrap: break-word;
			word-break: break-all;
			
			.msg-text {
				font-size: 15px;
				line-height: 1.5;
			}
		}
	}
	
	.bottom-spacer {
		height: 20px;
	}

	.input-area {
		background-color: #fff;
		padding: 10px 15px;
		/* 适配底部导航栏和安全区 */
		padding-bottom: calc(10px + constant(safe-area-inset-bottom) + 50px); /* 50px 是 TabBar 的高度 */
		padding-bottom: calc(10px + env(safe-area-inset-bottom) + 50px);
		display: flex;
		align-items: center;
		box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
		z-index: 10;
		/* 固定在底部 */
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		box-sizing: border-box;
		
		.input-box {
			flex: 1;
			height: 40px;
			background-color: #f0f2f5;
			border-radius: 20px;
			padding: 0 15px;
			font-size: 16px;
			margin-right: 10px;
		}
		
		.send-btn {
			width: 70px;
			height: 40px;
			background: linear-gradient(135deg, #4a7ef7, #2f5df5);
			border-radius: 20px;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0;
			margin: 0;
			box-shadow: 0 4px 10px rgba(74, 126, 247, 0.3);
			
			.btn-text {
				color: #fff;
				font-size: 14px;
				font-weight: bold;
			}
			
			&:active {
				transform: scale(0.96);
				opacity: 0.9;
			}
		}
	}
	
	.placeholder {
		color: #bbb;
	}
</style>