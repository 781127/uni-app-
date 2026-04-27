<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<button @click="change()">修改title的数值</button>
		
		<view v-for="(item,index) in list" :key="index">
			数组里的每一项---{{item}}
			<br />
			数组的下标---{{index}}
		</view>
		
		<view v-for="(item,index) in num" :key="10+index" :class="item==2?'two':'other'">
			item--{{item}}
			<br />
			index--{{index}}
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				list:["前端","后端",'测试','UI','项目经理','产品经理'],
				num:5
			}
		},
		onLoad() {

		},
		methods: {
				change(){
					console.log(this,'项目中的this')
					this.title+='山东农业大学'
				}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
