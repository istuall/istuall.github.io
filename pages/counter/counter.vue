<template>
	<view class="container">
		<!-- 背景装饰 -->
		<view class="bg-decoration circle-1"></view>
		<view class="bg-decoration circle-2"></view>

		<view class="calculator">
			<!-- 顶部区域 -->
			<view class="header">
				<view class="brand-info">
					<text class="brand">CASIO</text>
					<text class="model">MX-12B Pro</text>
				</view>
				<view class="solar-panel">
					<view class="cell" v-for="i in 4" :key="i"></view>
				</view>
			</view>

			<!-- 屏幕显示 -->
			<view class="screen">
				<view class="history-display">{{ display1Value }}</view>
				<view class="main-display">
					<input type="text" v-model="display2Value" disabled adjust-position="false" />
				</view>
			</view>

			<!-- 键盘区域 -->
			<view class="keypad">
				<!-- Row 1 -->
				<button class="btn btn-func" @click="handleInput('back')" :disabled="isDisabled('back')">🎲</button>
				<button class="btn btn-func" @click="handleInput('CP')" :disabled="isDisabled('CP')">CP</button>
				<button class="btn btn-danger" @click="handleInput('ON')" :disabled="isDisabled('ON')">ON</button>
				<button class="btn btn-danger" @click="handleInput('OFF')" :disabled="isDisabled('OFF')">OFF</button>
				<button class="btn btn-func" @click="handleInput('AC')" :disabled="isDisabled('AC')">AC</button>

				<!-- Row 2 -->
				<button class="btn" @click="handleInput('←')" :disabled="isDisabled('←')">←</button>
				<button class="btn" @click="handleInput('(')" :disabled="isDisabled('(')">(</button>
				<button class="btn" @click="handleInput(')')" :disabled="isDisabled(')')">)</button>
				<button class="btn" @click="handleInput('**')" :disabled="isDisabled('**')">x^</button>
				<button class="btn" @click="handleInput('/')" :disabled="isDisabled('/')">÷</button>

				<!-- Row 3 -->
				<button class="btn" @click="handleInput('7')" :disabled="isDisabled('7')">7</button>
				<button class="btn" @click="handleInput('8')" :disabled="isDisabled('8')">8</button>
				<button class="btn" @click="handleInput('9')" :disabled="isDisabled('9')">9</button>
				<button class="btn" @click="handleInput('×')" :disabled="isDisabled('×')">×</button>
				<button class="btn" @click="handleInput('DEL')" :disabled="isDisabled('DEL')">DEL</button>

				<!-- Row 4 -->
				<button class="btn" @click="handleInput('4')" :disabled="isDisabled('4')">4</button>
				<button class="btn" @click="handleInput('5')" :disabled="isDisabled('5')">5</button>
				<button class="btn" @click="handleInput('6')" :disabled="isDisabled('6')">6</button>
				<button class="btn" @click="handleInput('-')" :disabled="isDisabled('-')">-</button>
				<button class="btn" @click="handleInput('outlook')" :disabled="isDisabled('outlook')">✉</button>

				<!-- Row 5 -->
				<button class="btn" @click="handleInput('1')" :disabled="isDisabled('1')">1</button>
				<button class="btn" @click="handleInput('2')" :disabled="isDisabled('2')">2</button>
				<button class="btn" @click="handleInput('3')" :disabled="isDisabled('3')">3</button>
				<button class="btn" @click="handleInput('+')" :disabled="isDisabled('+')">+</button>
				<button class="btn" @click="handleInput('i')" :disabled="isDisabled('i')">ⓘ</button>

				<!-- Row 6 -->
				<button class="btn" @click="handleInput('%')" :disabled="isDisabled('%')">%</button>
				<button class="btn" @click="handleInput('0')" :disabled="isDisabled('0')">0</button>
				<button class="btn" @click="handleInput('.')" :disabled="isDisabled('.')">.</button>
				<button class="btn btn-primary span-2" @click="handleInput('=')" :disabled="isDisabled('=')">=</button>
			</view>
		</view>

		<!-- 彩蛋弹窗 -->
		<view class="easter-egg-modal" v-if="imgVisibility === 'visible'" @click="toggleImg">
			<image class="egg-img" src="/static/image.png" mode="widthFix" @click.stop></image>
			<text class="egg-tip">点击背景关闭</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				display1Value: 'ON',
				display2Value: '',
				imgVisibility: 'hidden',
				history: [],
				isOff: false
			}
		},
		methods: {
			isDisabled(value) {
				if (!this.isOff) return false;
				const enabledWhenOff = ["ON", "?", "back", "img", "i", "outlook"];
				return !enabledWhenOff.includes(value);
			},
			toggleImg() {
				this.imgVisibility = this.imgVisibility === "hidden" ? "visible" : "hidden";
			},
			handleInput(value) {
				if (value !== "back" && !this.isOff) {
					this.history.push(this.display2Value);
					if (this.history.length > 10) this.history.shift();
				}

				switch (value) {
					case "back":
						this.display1Value = "Be Happy!";
						this.display2Value = "";
						break;
					case "ON":
						this.display2Value = "";
						this.display1Value = "ON";
						this.history = [];
						this.isOff = false;
						break;
					case "CP":
						uni.setClipboardData({
							data: this.display1Value,
							success: () => {
								this.display2Value = "";
								this.display1Value = "Copied!";
							}
						});
						break;
					case "OFF":
						this.display2Value = "";
						this.display1Value = "OFF";
						this.history = [];
						this.isOff = true;
						break;
					case "AC":
						this.display2Value = "";
						this.display1Value = "0";
						this.history = [];
						break;
					case "DEL":
					case "←":
						this.display2Value = this.display2Value.slice(0, -1);
						break;
					case "→": // 界面上可能没有这个按钮了，保留逻辑无妨
						this.display2Value = this.display2Value.slice(1);
						break;
					case "img":
						this.toggleImg();
						break;
					case "outlook":
						uni.showModal({
							title: '联系作者',
							content: '邮箱：zero180t@qq.com',
							confirmText: '复制邮箱',
							success: (res) => {
								if(res.confirm) {
									uni.setClipboardData({ data: 'zero180t@qq.com' });
								}
							}
						});
						break;
					case "i":
						uni.showModal({ title: '关于', content: 'Vue 3 Calculator\nVersion 2.0', showCancel: false });
						break;
					case "=":
						if (this.isOff) {
							this.display1Value = "OFF";
						} else {
							try {
								// eslint-disable-next-line no-eval
								const res = eval(this.display2Value);
								this.display1Value = String(res);
							} catch (e) {
								this.display1Value = "Error";
							}
						}
						break;
					default:
						if (this.isOff) {
							this.display1Value = "OFF";
						} else {
							// 简单的运算符替换显示
							if(['÷','×'].includes(value)) {
								this.display2Value += value === '÷' ? '/' : '*';
							} else {
								this.display2Value += value;
							}
						}
						break;
				}
			}
		}
	}
</script>

<style lang="scss">
	/* 引入全局变量 */
	:root {
		--calc-bg: #f0f4f8;
		--key-bg: #ffffff;
		--key-text: #2d3436;
		--accent-color: #4a7ef7;
		--danger-color: #ff7675;
		--func-color: #74b9ff;
	}

	page {
		height: 100%;
		background-color: var(--calc-bg);
		overflow: hidden;
	}

	.container {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		padding: 20px;
		box-sizing: border-box;
	}

	/* 背景装饰 */
	.bg-decoration {
		position: absolute;
		border-radius: 50%;
		filter: blur(60px);
		z-index: 0;
		opacity: 0.6;
	}
	.circle-1 {
		width: 300px;
		height: 300px;
		background: #74b9ff;
		top: -50px;
		right: -50px;
	}
	.circle-2 {
		width: 250px;
		height: 250px;
		background: #ff7675;
		bottom: -50px;
		left: -50px;
	}

	.calculator {
		position: relative;
		z-index: 10;
		width: 100%;
		max-width: 400px;
		background: rgba(255, 255, 255, 0.7);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border-radius: 24px;
		box-shadow: 0 15px 35px rgba(0,0,0,0.1);
		border: 1px solid rgba(255,255,255,0.8);
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 5px;

		.brand-info {
			.brand {
				font-size: 20px;
				font-weight: 800;
				color: #2d3436;
				letter-spacing: 1px;
			}
			.model {
				font-size: 10px;
				color: #636e72;
				display: block;
			}
		}

		.solar-panel {
			display: flex;
			gap: 2px;
			background: #2d3436;
			padding: 2px;
			border-radius: 4px;
			
			.cell {
				width: 12px;
				height: 20px;
				background: #535c68;
				border-radius: 1px;
			}
		}
	}

	.screen {
		background: rgba(236, 240, 241, 0.8);
		border-radius: 16px;
		padding: 15px;
		text-align: right;
		box-shadow: inset 2px 2px 5px rgba(0,0,0,0.05);

		.history-display {
			font-size: 14px;
			color: #636e72;
			height: 20px;
			margin-bottom: 5px;
		}

		.main-display {
			input {
				font-size: 36px;
				font-weight: 600;
				color: #2d3436;
				height: 44px;
				min-height: 44px;
			}
		}
	}

	.keypad {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 10px;
	}

	.btn {
		width: 100%;
		aspect-ratio: 1; /* 保持正方形 */
		background: rgba(255, 255, 255, 0.9);
		border: 1px solid rgba(255, 255, 255, 0.5);
		border-radius: 12px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 18px;
		font-weight: 600;
		color: #2d3436;
		box-shadow: 0 4px 6px rgba(0,0,0,0.05);
		transition: all 0.1s;
		padding: 0;
		margin: 0;

		&:active {
			transform: scale(0.95);
			background: #f1f2f6;
		}

		&[disabled] {
			opacity: 0.5;
			background: #dfe6e9;
		}
	}

	.btn-primary {
		background: #4a7ef7;
		color: #fff;
		box-shadow: 0 4px 10px rgba(74, 126, 247, 0.3);
		
		&:active {
			background: #2f5df5;
		}
	}

	.btn-danger {
		color: #ff7675;
		background: rgba(255, 118, 117, 0.1);
	}

	.btn-func {
		color: #4a7ef7;
		background: rgba(74, 126, 247, 0.1);
	}

	.span-2 {
		grid-column: span 2;
		aspect-ratio: auto; /* 取消正方形限制 */
	}

	.easter-egg-modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0,0,0,0.8);
		z-index: 100;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		.egg-img {
			width: 80%;
			max-width: 300px;
			border-radius: 10px;
		}
		
		.egg-tip {
			color: #fff;
			margin-top: 20px;
			font-size: 14px;
		}
	}
</style>