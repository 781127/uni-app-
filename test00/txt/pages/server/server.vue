<template>
	<view>
		<view class="content" v-for="(item,index) in list" :key="index"@click='push(item)'>
			<image class="left" :src="'https://game.gtimg.cn/images/lol/act/img/champion/'+item.alias+'.png'" mode=""></image>
			<view class="right">
				<text>{{item.title}}</text>
				<text class="msg">{{item.keywords}}</text>
			</view>
		</view>
		
		<view class="content">
			<image class="left" src="../../static/static/images/ico1.png" mode=""></image>
			<view class="right">
				<text>安妮</text>
				<text class="msg">带着一个小熊的英雄</text>
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
			
			push(other){
				console.log(other,'点击对应英雄的时候传递过来的数据')
				uni.navigateTo({
					url:'/pages/details/details?id='+other.heroId+"&name="+other.name
					
				})
			},
			
			search(){
				console.log('查询英雄联盟数据')
				uni.request({
					url:'https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js?ts=2944842',
					method:"get",
					data:{},
					header:{},
					success:(res)=>{
						console.log(res,'联盟英雄数据')
						this.list=res.data.hero
					}
				})
			}
		},
		onShow(){
			this.search()
		}
	}
</script>

<style>
.content{
	width:100%;
	display: flex;
	align-items: center;
	padding:5px 10px;
}
.left{
	width:35px;
	height:35px;
	border-radius:50%;
	margin-right:10px;
}
.msg{
	margin-left:10px;
	display: inline-block;
	height: 20px;
	width: 250px;
	overflow:hidden;
}
</style>