<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	:root {
		--primary-color: #4a7ef7;
		--secondary-color: #57c6b9;
		--bg-color: #f5f7fa;
		--card-bg: #ffffff;
		--text-main: #333333;
		--text-sub: #999999;
	}

	page {
		font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
		background-color: var(--bg-color);
		color: var(--text-main);
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	/* 隐藏滚动条但保留滚动功能 (可选) */
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}
</style>