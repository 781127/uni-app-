<template>
	<view>
		<view class="logincontent">
			<view class="content">
				<input type="text" placeholder="请输入用户名" v-model="userName"/>
				
			</view> 
			<view class="content">
				<input type="password" placeholder="请输入密码" v-model="passWord"/>
			</view> 
			<button @click="login()">登录</button>
		</view>
		<image class="btning" src="../../static/static/abc.png"></image>
	</view>
</template>

<script>
	//引入封装的请求函数
	import{ http } from'../../lib/http';
	export default {
		data() {
			return {
				userName:'lll',
				passWord:'lll1997'
			}
		},
		methods: {
			login(){
				http.fetch({
					method:'post',
					url:'/api/login',
					data:{
						userName:this.userName,
						passWord:this.passWord
					},
					header:{
						'Content-Type':'application/x-www-form-urlencoded'
					},
					success:(res)=>{
						console.log(res,'登录返回的')
						uni.setStorageSync('userName',res.data.userName)
						uni.setStorageSync('imgUrl',res.data.imgUrl)
						uni.showToast({
							title:'登录成功'
						})
						setTimeout(()=>{
							uni.switchTab({
									url:'/pages/index/index'
								})
							
						},500)
					}
					
				})
			//底部按钮，跳转，其他navigateTo
			
				
		}
	}}
</script>

<style>
.logincontent button{
	width:100px;
	background-color: #38f6ff;
}
.logincontent{
		width:90%;
		/*background-color: pink;*/
		margin:auto;
		margin-top: 200px;
		
	}
.content input{
	height:60px;
	margin-left: 70px;
	padding: 10px 0;
	font-size: 18px;
}
.content{
	height:70px;
	border-bottom: 1px solid #000;
	margin:20px 0;
}
.btning{
	width:100%;
	height:200px;
	position:fixed;
	left:0;
	top:0;
	z-index: -1;
}
</style>