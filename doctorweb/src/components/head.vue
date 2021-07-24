<template>
	<el-header>
		<button v-if="currentPage === 1" class="makeMedicine page1" @click="apply"><i class="el-icon-edit-outline"></i>复诊配药</button>
		<button v-else class="makeMedicine page0" @click="apply"><i class="el-icon-edit-outline"></i>复诊配药</button>
		<button v-if="currentPage === 2" class="record page1" @click="record"><i class="el-icon-document-copy"></i>接诊记录</button>
		<button v-else class="record page0" @click="record"><i class="el-icon-document-copy"></i>接诊记录</button>
		<div class="doctorPosition">{{doctorPosition}}</div>
		<div class="doctorName">{{doctorName}}</div>
		<el-avatar :size="40" :src="avatarUrl"></el-avatar>
	</el-header>
</template>

<script>
	export default {
		props: {
			avatarUrl: {  //医生头像
				type: String
			},
			doctorName: {  //医生姓名
				type: String
			},
			doctorPosition: {  //医生职位
				type: String
			},
			currentPage: {  //当前界面 1 —— 复诊配药；2 —— 接诊记录
				type: Number
			}
		},
		methods:{
			record(){
				this.$router.replace({path: '/consultRecords'})
			},
			apply(){
				this.$router.replace({path: '/prescribeApply'})
			}
		}
		// data() {
		// 	return {
		// 		avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
		// 		doctorName: '医生姓名',
		// 		doctorPosition: '职位',
		// 		currentPage:2
		// 	}
		// }
	}
</script>

<style lang="scss">
	.el-header {
		background-color: #6699CC;
		color: #333;
		line-height: 60px;
		box-shadow: 0px 1px 5px #888888;
	}

	.doctorName {
		display: inline;
		float: right;
		color: white;
		font-size: 18px;
		font-weight: 600;
	}

	.doctorPosition {
		display: inline;
		float: right;
		margin-top: 15px;
		margin-left: 15px;
		margin-right: 20px;
		color: white;
		font-size: 15px;
	}

	.el-avatar {
		float: right;
		display: flex;
		margin-top: 10px;
		margin-right: 20px;
		box-shadow: 1px 1px 10px #888888;
	}

	.makeMedicine,
	.record {
		width: 10%;
		height: 100%;
		color: white;
		border: 0;
		font-size: 20px;
	}
	
	.page0 {
		background-color: #6699CC;
	}

	.page1 {
		background-color: #87a5cc;
	}

	.makeMedicine:hover,
	.record:hover {
		background-color: #87a5cc;
	}

	.makeMedicine i,
	.record i {
		padding-right: 10px;
	}

	.makeMedicine {
		margin-right: 20%;
	}
</style>
