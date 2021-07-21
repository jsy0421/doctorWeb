<template>
	<el-header>
		<button class="makeMedicine"><i class="el-icon-edit-outline"></i>复诊配药</button>
		<button class="record"><i class="el-icon-document-copy"></i>接诊记录</button>
		<div class="doctorPosition">{{doctorPosition}}</div>
		<div class="doctorName">{{doctorName}}</div>
		<el-avatar :size="40" :src="avatarUrl"></el-avatar>
	</el-header>
</template>

<script>
	export default {
		name: 'Head',
		data() {
			return {
				avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
				doctorName: '医生姓名',
				doctorPosition: '职位'

			}
		}
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

	.makeMedicine,.record {
		width: 10%;
		height: 100%;
		background-color: #6699CC;
		color: white;
		border: 0;
		font-size: 20px;
	}

	.makeMedicine:hover,.record:hover {
		background-color: #87a5cc;
	}

	.makeMedicine,.record i {
		padding-right: 10px;
	}

	.makeMedicine {
		margin-right: 20%;
	}
</style>
