<template>
	<view>
		<view class="box" v-for="(item,index) in list" :key="index">
			<image class="tx" :src="item.abilityIconPath" mode=""></image>
			<text class="dw">{{item.name}}</text>
			<view class="bottom">
				<image class="btm-img" :src="item.abilityIconPath" mode=""></image>
				<text class="message">{{item.description}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			}
		},
		methods: {
			//具体查询全部技能函数
			search(id){
				console.log(id,'传递过来的英雄id，后需要查询英雄全部技能')
				//const validId = Number(id); 
				
			//	https://game.gtimg.cn/images/lol/act/img/js/hero/对应英雄的id.js
			uni.request({
			//	url:"https://game.gtimg.cn/images/lol/act/img/js/hero/"+id+'.js',
				url:`https://game.gtimg.cn/images/lol/act/img/js/hero/${id}.js`,
				method: 'get',
				data:{},
				header:{},
				success: (res)=> {
				console.log(res,'技能数据')
				this.list=res.data.spells
					
				}
			})
			}
		},
		onLoad(option){
			//参数是用来查询英雄技能详情的
			console.log(option,'跳转页面传递过来的答案')
			this.search(option.id)
		}
	}
</script>

<style>
	.bottom{
		display: flex;
		align-items: center;
		
	}
	.btm-img{
		width: 50px;
		height: 50px;
		margin-right: 10px;
		border-radius: 50%;
		
	}
		
	.message{
		width: 200px;
		height: 50px;
		line-height: 50px;
		overflow: hidden;
		background-color: aquamarine;
	}
.box{
	width: 95%;
	
	position: relative;//相对定位
	margin: 10px auto;
	
}
.dw{
	position: absolute;//绝对定位 
	background-color: seashell;
	right: 0;
	top: 0;
	color: #ffafda;
	padding: 2px 4px;
	
}
	
.tx{
	width: 100%;
}
</style>