export const http={
	
	fetch:({
		method,
		url,
		success,
		header,
		data
	})=>{
		let token=uni.getStorageSync('token')
		header['Content-Type']='application/x-www-form-urlencoded'
		if(!url.includes('login')&&!url.includes('register')){
			header['token']=token
		}
		let  hostUrl='http://124.222.209.246:3000'
		
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