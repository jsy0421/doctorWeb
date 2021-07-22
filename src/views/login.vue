<template>
	<div class="content">
		<div v-if="into === true">
			<div class="background">
				<img src="../assets/background.jpg" style="width: 100%; height: 100%;opacity: 0.7;">
			</div>
			<div class="title"> 复诊配药系统 </div>
			<button type="button" class="in" @click="intoLogin()">进入<i class="el-icon-arrow-right"></i></button>
		</div>

		<div v-else>
			<div class="pic">
				<div class="Loginbackground">
					<img src="../assets/Loginbackgroung.jpg" style="width: 100%; height: 100%; opacity: 0.5;">
				</div>
				<div class="Logintitle"> 复诊配药系统 </div>
			</div>
			<div class="login">
				<div class="text">
					欢迎登录
				</div>
				<el-input v-model="doctorid" placeholder="请填写医生ID" clearable prefix-icon="el-icon-user-solid"></el-input>
				<button type="button" class="LoginButton">Login<i class="el-icon-caret-right"></i></button>
			</div>
		</div>



	</div>

</template>

<script>
	export default {
		name: 'Login',
		data() {
			return {
				into: true,
				doctorid:''
			}
		},
		methods: {
			intoLogin() {
				this.into = false;
			}
		}
	}
</script>

<style>
	
	.pic{
		float: left;
	}
	
	.background {
		width: 100%;
		height: 100%;
		z-index: -1;
		position: absolute;
	}

	.Loginbackground {
		width: 56%;
		height: 100%;
		z-index: -1;
		position: absolute;
		
	}

	.title {
		font-size: 50px;
		padding-top: 12%;
		letter-spacing: 5px;
		font-weight: 600;
	}

	.Logintitle {
		font-size: 50px;
		margin-top: 16%;
		margin-left: 18%;
		padding: 1%;
		border-radius: 20px;
		letter-spacing: 5px;
		font-weight: 600;
		z-index: 1;
		position: absolute;
		box-shadow: 0px 1px 20px #888888;
		background-color: rgba(255,255,255,0.4)
	}

	.in {
		width: 150px;
		height: 50px;
		background-color: transparent;
		border: 3px #0C71D5 solid;
		color: #000000;
		margin-top: 15%;
		font-size: 16px;
		font-weight: 600;
		border-radius: 20px;
	}

	.in i {
		margin-left: 10px;
		margin-right: -15px;
	}

	.in:hover {
		background-color: #0C71D5;
		color: #FFFFFF;
	}
	
	.login{
		margin-top: 13%;
		margin-right: 13%;
		float: right;
	}
	
	.el-input{
		margin-top: 20%;
		margin-bottom: 20%;
		box-shadow: 0px 1px 5px #888888;
	}
	
	.text{
		width: 70%;
		font-size: 35px;
		margin-left: 15%;
		padding-bottom: 10px;
		border-bottom: 3px #0C71D5 solid;
		border-radius: 5px;
		letter-spacing: 5px;
		font-weight: 600;
		color: #021834;
	}
	
	.LoginButton{
		width: 100%;
		height: 40px;
		border-radius: 20px;
		border: 2px transparent solid;
		background-color: #0A6FBA;
		color: white;
		font-size: 18px;
		box-shadow: 0px 1px 10px #888888;
	}
	
	.LoginButton:hover{
		background-color: transparent;
		border: 2px #0A6FBA solid;
		color: #0A6FBA;
	}
	
	.LoginButton i{
		padding-left: 10px;
	}
</style>
