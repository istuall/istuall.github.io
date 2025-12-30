<template>
	<view class="container">
		<view class="top-bar">
			<text class="title">AI对话聊天室</text>
		</view>
		
		<scroll-view class="chat-area" scroll-y="true" :scroll-into-view="scrollIntoView">
			<view class="content" id="chatContent">
				<view class="row" v-for="(item,index) in list" :key="index" :class="item.type==2?'left':'right'">
					<image class="avatar" :src="item.imgUrl" mode="aspectFill"></image>
					<view class="msg-wrapper">
						<text class="name">{{item.name}}</text>
						<view class="bubble">
							<text class="msg-text">{{item.data}}</text>
						</view>
					</view>
				</view>
				<!-- 占位，防止底部被输入框遮挡 -->
				<view class="bottom-spacer"></view>
			</view>
		</scroll-view>
		
		<view class="input-area">
			<input class="input-box" type="text" v-model="inputVal" placeholder="请输入内容..." placeholder-class="placeholder" confirm-type="send" @confirm="send()"/>
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
				list:[
					{																																															
						type:'2',
						data:'你好！我是星火大模型AI，很高兴为你服务。',
						name:'AI',																	
						imgUrl:'/static/icon/AIchat.png'
					},
					{
						type:'1',
						data:'你好星火大模型',
						name: uni.getStorageSync('userName') || '颤抖啾啾',
						imgUrl:'/static/tb.png'
					}
				],
				speakUrl:'https://spark-api-open.xf-yun.com/v1/chat/completions',
				apiPassword:'xyHbpSDJtjxcSlylkoUR:uEPhLQLMxKnTFcuEUErU',
				inputVal:'',
				scrollIntoView: ''
			}
		},
		methods: {
			scrollToBottom() {
				// 简单实现滚动到底部
				this.$nextTick(() => {
					this.scrollIntoView = 'chatContent'; // 实际上应该定位到最后一个元素ID，这里简化处理
				});
			},
			send(){
				console.log(this.inputVal,'输入框输入的内容')
				if(this.inputVal){
					const data={
						//表明自己身份
						user:'0393db44',
						model:'lite',
						messages:[{
							role:'user',
							//实际发送的内容
							content:this.inputVal
						}]
					}
					const header={
						"Content-Type":'application/json',
						// 用于身份认证
						"Authorization":`Bearer ${this.apiPassword}`
					}
					this.list.push({
						type:'1',
						data:this.inputVal,
						name: uni.getStorageSync('userName') || '颤抖啾啾',
						imgUrl:'/static/tb.png'
					})
					this.inputVal=''
					this.scrollToBottom();
					
					// 发送头请求
					uni.request({
						url: this.speakUrl,
						method: 'post',
						data,
						header,
						success: (res) => {
							console.log(res,'AI返回的数据')
							if (res.data.choices && res.data.choices.length > 0) {
								this.list.push({
									type:'2',
									data:res.data.choices[0].message.content,
									name:'AI',
									imgUrl:'/static/icon/AIchat.png'
								})
								this.scrollToBottom();
							}
						}
					})
				}else{
					uni.showToast({
						title:'请输入内容',
						icon:'none'
					})
				}
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
		padding-top: var(--status-bar-height); /* 适配状态栏 */
		
		.title {
			font-size: 18px;
			font-weight: bold;
			color: $text-color;
		}
	}
	
	.chat-area {
		position: absolute;
		top: calc(44px + var(--status-bar-height)); /* 顶部栏高度 + 状态栏高度 */
		bottom: 60px; /* 底部输入栏高度 */
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