// 封装接口请求,在必要的时候调用请求
export const http={
	//这里是自定义的变量名
	fectch:({
		// 调用封装接口/函数 传递过来的方法
		method,
		//调用传递来的请求路径
		url,
		//传递一个函数用于接收成功返回的数据
		success,
		//请求头,一般要传递token
		header,
		//接口请求的参数
		data
	})=>{
		// 有的接口需要传递tokeng
		// 登陆时后端返到前端,存储起来
		let token=uni.getStorageSync('token')
		// 请求头格式
		header['Content-Type']='application/x-www-form-urlencoded'
		// 判断接口路径,如果是登陆注册,不传递token
		//判断路径 不是登录也不是注册的时候传递token
		if(!url.includes('login') && !url.includes('register')){
			header['token']=token
		}
		//定义接口的地址
		let hostUrl='http://124.222.209.246:3000'
		//利用uniapp原生方法调用接口
		uni.request({
			url:hostUrl+url,
			method,
			data,
			header,
			success:(res)=>{
				console.log(res)
				if(res.data.code==200){
					success(res.data)
				}
			}
		})
	}
}