<template>
	<view>
		<view class="top">
			AI对话聊天室
		</view>
		<view class="content">
			<view class="row" v-for="(item,index) in list" :key="index" :class="item.type==2?'left':'right'">
				<image class="tx" :src="item.imgUrl" mode=""></image>
				<text class="name">{{item.name}}</text>
				<text class="msg">{{item.data}}</text>
			</view>
			<!-- <view class="row left">
				<image class="tx" src="../../static/static/tb.png" mode=""></image>
				<text class="name">AI</text>
				<text class="msg">你好我是火星大模型你好我是火星大模型你好我是火星大模型你好我是火星大模型你好我是火星大模型</text>
			</view>
			<view class="row right">
				<image class="tx" src="../../static/static/tb.png" mode=""></image>
				<text class="name">我</text>
				<text class="msg">我是我是我是</text>
			</view> -->
		</view>
		<view class="bottom">
			<input type="text" v-model="inputVal" placeholder="请输入内容"/>	
			<button @click="send()">发送</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputVal:'',
				list:[
					{
						type:'2',
						data:'星火大模型AI',
						name:'AI',
						imgUrl:'../../static/static/tb.png'
					},
					{
						type:'1',
						data:'星火大模型AI',
						name:'我',
						imgUrl:'../../static/static/logo.png'
					}
				],
				speakUrl:'https://spark-api-open.xf-yun.com/v1/chat/completions',
				apiPassword:'xbVPopwrGcERsuGwlxnO:VDhdYuhvhsMDJzvBFnWe'
			}
		},
		methods: {
			send(){
				console.log(this.inputVal,'输入框输入的内容')
				if(this.inputVal){
					const data={
						user:'e555d279',
						model:'lite',
						messages:[{
							role:'user',
							content:this.inputVal
						}]
					}
					const header={
						"Content-Type":'application/json',
						"Authorization":`Bearer ${this.apiPassword}`
					}
					this.list.push({
						type:'1',
						data:this.inputVal,
						name:'我',
						imgUrl:'../../static/static/logo.png'
					})
					this.inputVal=''
					uni.request({
						url:this.speakUrl,
						method:'post',
						data,
						header,
						success: (res) => {
							console.log(res, 'AI返回的数据')
							this.list.push({
								type:'2',
								data:res.data.choices[0].message.content,
								name: 'AI',
								imgUrl: '../../static/static/abc.png'
							})
							
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

<style>
	.bottom button{
		background-color: #63d7f8;
		color:#fff;
	}
	.bottom input{
		width: 70%;
		padding-left: 20px;
	}
	.bottom{
		width:100%;
		display: flex;
		align-items:center;
		height:fixed;
		left:0;
		bottom:50px;
		background-color: #ccc;
	}
	.msg{
		word-wrap:break-word;
		display:inline-block;
		margin-left: 10px;
		border-radius:10px;
		padding:5px 10px;
		background-color: #fff;
		min-width:10px;
		max-width:220px;
		min-height:20px;
		margin-top:10px;
	}
	.name{
		position:absolute;
		left:40px;
		top:0;
		color:#fff;
	}
	.tx{
		width:50px;
		height:50px;
		border-radius:50%
	}
	.row{
		padding:8px 0;
		display:flex;
		/* align-items:center; */
		position:relative;
	}
	.content{
		padding:50px 10px;
		background-color: #4ba1d5;
		overflow: hidden;
	}
	.top{
		width:100%;
		text-align: center;
		heigt:50px;
		line-height:50px;
		background-color:#63d7f8 ;
		font-size: 18px;
		color:#fff;
		position: fixed;
		top: 0;
		left: 0;
		z-index:9999;	
	}
	.right{
			display: flex;
			flex-direction: row-reverse;
		}
	.right .name{
		left:auto;
		right:40px;
	}
	.right .msg{
		margin-right:15px;
	}
</style>