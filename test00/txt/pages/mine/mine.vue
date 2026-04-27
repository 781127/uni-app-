<template>
	<view>
		<view class="top">
			多人聊天室({{userNum}})
		</view>
		<view class="content">
			<view class="row" v-for="(item,index) in list" :key="index" :class="userName==item.userName?'right':'left'">
				<image class="tx" :src="baseUrl+item.imgUrl" mode=""></image>
				<text class="name">{{item.userName}}</text>
				<text class="msg">{{item.data}}</text>
			</view>
		</view>
		<view class="bottom">
			<input type="text" v-model="inputVal" placeholder="请输入内容" />
			<button @click="send()">发送</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseUrl:'http://124.222.209.246:3000/uploads/',
				inputVal: '',
				// 用来存储消息列表
				userName:uni.getStorageSync('userName'),
				list: [{
						data: '星火达模型AI',
						name: 'AI',
						imgUrl: '../../static/static/tb.png'
					},
					{
						data: '你好星火大模型',
						name: '我',
						imgUrl: '../../static/static/logo.png'
					}
				],
				userNum:'0'
			}
		},
		watch:{
			"list.length"(newVal,oldVal){
				console.log(newVal,'newVal')
				setTimeout(()=>{
				uni.pageScrollTo({
					scrollTop:99999,
					duration:500
					})
				},500)
			}
		},
		onShow(){
			this.init()
		},
		methods: {
			send(){
				if(this.inputVal){
					uni.sendSocketMessage({
						data:JSON.stringify({
							type:2,
							data:this.inputVal
						})
					})
					this.inputVal=''
				}else{
					uni.showToast({
						title:'请输入内容',
						icon:'none'
					})
				}
			},
			init(){
				uni.connectSocket({
					url:'ws://124.222.209.246:8800?userName='+uni.getStorageSync('userName')+"&imagUrl="+uni.getStorageSync('imgUrl')
				})
				uni.onSocketMessage((res)=>{
					let obj=JSON.parse(res.data)
					console.log(obj,'实时通讯返回的数据')
					this.list=obj.chatList
					this.userNum=[...obj.userList].length
				})
			}
		}
	}
</script>

<style>
	.bottom button {
		background-color: #63d7f8;
		color: #fff;
	}

	.bottom input {
		width: 70%;
		padding-left: 20px;
	}

	.bottom {
		width: 100%;
		display: flex;
		align-items: center;
		height: 50px;
		position: fixed;
		left: 0;
		bottom: 50px;
		background-color: #ccc;
	}

	.msg {
		/* 控制文字超出最大长度的话折行 */
		word-wrap: break-word;
		display: inline-block;
		margin-left: 10px;
		border-radius: 10px;
		padding: 5px 10px;
		background-color: #fff;
		/* 最小宽度 */
		min-width: 10px;
		/* 最大宽度 */
		max-width: 220px;
		/* 最小高度 */
		min-height: 20px;
		/* 添加外边距的上边距 */
		margin-top: 10px;
	}

	.name {
		position: absolute;
		left: 40px;
		top: 0;
		color: #fff;
	}

	.tx {
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}

	.row {
		padding: 8px 0;
		display: flex;
		/* 相对定位  为后续用户名定位做准备 */
		position: relative;
	}

	.content {
		padding: 50px 10px;
		background-color: #4ba1d5;
		/* 超出隐藏 */
		overflow: hidden;
	}

	.top {
		width: 100%;
		/* 文本居中对齐 */
		text-align: center;
		height: 50px;
		line-height: 50px;
		background-color: #63d7f8;
		font-size: 18px;
		color: #fff;
		/* 添加固定定位 */
		position: fixed;
		top: 0;
		left: 0;
		/* 涂层显示位置 */
		z-index: 9999;
	}

	.right {
		display: flex;
		/* 控制水平方向排序反转 */
		flex-direction: row-reverse;
	}

	.right .name {
		left: auto;
		right: 40px;
	}

	.right .msg {
		margin-right: 15px;
	}
</style>