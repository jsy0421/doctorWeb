<template>
	<div>
		<div class="background">
			<img src="../assets/background.jpg" style="width: 100%; height: 100%;opacity: 0.3;">
		</div>
		<Head :avatarUrl="avatarUrl" :doctorName="doctorName" :doctorPosition="doctorPosition" :currentPage=1></Head>
		<div v-if="containerlist.length != 0" >
			
		
		<div class="content">
			<div class="container"
				:class="{ go: rotateIndex == index ? rotate :'', aa: rotateIndex == index ? !rotate: '' }"
				v-for="(item, index) of containerlist" :key="index">
				<div class="container-header"
					:class="{ go: rotateIndex == index ? rotate :'', aa: rotateIndex == index ? !rotate: '' }">
					申请时间：{{ item.createTime.split('T')[0] }} {{ item.createTime.split('T')[1].split('.')[0] }} <span
						style="color:#e5964d;">{{item.consultStatus | statusFormat}}</span>
				</div>
				<div v-show="item.content" class="container-content"
					:class="{ go: rotateIndex == index ? rotate :'', aa: rotateIndex == index ? !rotate: '' }"
					@click="zhuan(index)">
					<div class="content-item">
						<img width="150px" height="150px" :src="item.avatarUrl" alt="" srcset="" />
						<div class="content-item-two">
							<h3>患者信息</h3>
							<span>{{ item.personName }} {{ item.personGenderName }}
								{{ item.personAge }}岁</span>
						</div>
					</div>
					<div class="content-item">
						<h3>历史病症</h3>
						<span>{{ item.diagnosis }}</span>
					</div>
					<div class="content-item">
						<h3>病情描述</h3>
						<span>{{ item.question }}</span>
					</div>
				</div>
				<div v-show="item.details" class="container-content"
					:class="{ go: rotateIndex == index ? rotate :'', aa: rotateIndex == index ? !rotate: '' }"
					@click="zhuan(index)">
					<div class="details-content">
						<h3 style="padding: 10px 0; text-align: left">所需药品</h3>
						<div class="content-first">
							<span v-for="(ite, inde) of item.drugNames" :key="inde">{{ite}}</span>
						</div>
						<h3 style="padding: 10px 0; text-align: left">病情图片</h3>
						<div class="block">
							<el-carousel trigger="click" height="120px">
								<el-carousel-item v-for="ele in photo" :key="ele">
									<div>
										<img :src='ele' />
									</div>
								</el-carousel-item>
							</el-carousel>
						</div>
					</div>
				</div>
				<div class='container-footer'
					:class="{ go: rotateIndex == index ? rotate :'', aa: rotateIndex == index ? !rotate: '' }">
					<button @click="createPrescribe(index)" class="footer-button">创建处方</button>
				</div>
			</div>
		</div>
		<div class="footers">
			<el-pagination background layout="prev, pager, next" :total="total" :page-size='2'
				@current-change='changePage'>
			</el-pagination>
		</div>
	</div>
	<div v-else>
		<el-empty :image-size="200" description="暂无配药请求"></el-empty>
	</div>
	</div>
</template>

<script>
	import Head from '../components/head.vue'

	export default {
		name: "prescribeApply",
		components: {
			Head
		},
		data() {
			return {
				containerlist: [],

				rotate: false,
				rotateIndex: 0,
				avatarUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
				doctorName: "医生姓名",
				doctorPosition: "职位",
				page: 1,
				total: 0,
				photo: [],
				doctorId:''
			};
		},
		filters: {
			statusFormat(status) {
				if (status === 1)
					return '待完成';
				else if (status === 2)
					return '进行中';
				else
					return '已完成';
			},
		},
		mounted() {
			this.getData();
		},
		methods: {
			createPrescribe(index) {
				console.log(index);
				console.log(this.containerlist[index]);
				this.$router.replace({path: '/prescribe',query:this.containerlist[index]})
			},
			// 获取数据
			getData() {
				this.doctorName = sessionStorage.getItem("doctorName");
				this.doctorPosition = sessionStorage.getItem("levelName");
				this.avatarUrl = sessionStorage.getItem("avatarUrl");
				this.doctorId = sessionStorage.getItem("doctorId");
				this.$http.post("/doctor/consult/page", {
						doctorId: this.doctorId,
						status: "1",
						page: this.page,
						size: 2,
					})
					.then((response) => {
						const res = response.data.result.records;
						this.containerlist = res;
						console.log(this.containerlist);
						let drugNames = [];
						for (let i of this.containerlist) {
							drugNames = i.drugNames.split(",");
							i.drugNames = drugNames;
							i.details = false;
							i.content = true;
							this.photo = i.photoIds.split(',').filter(item => item && item.trim())
						}
						this.total = response.data.result.total
						console.log(this.total)
						console.log(drugNames);
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			//翻转效果
			zhuan(index) {
				this.$nextTick(() => {
					this.rotate = !this.rotate;
					this.rotateIndex = index;
					this.containerlist[index].content = !this.containerlist[index].content;
					this.containerlist[index].details = !this.containerlist[index].details;
				})
			},
			changePage(event) {
				this.page = event
				this.getData()
			}
		},
	};
</script>

<style scoped>
	.background {
		width: 100%;
		height: 100%;
		z-index: -1;
		position: absolute;

	}

	.container-content {
		height: 270px;
	}

	.footers {
		margin-top: 20px;
	}

	.content {
		flex-direction: row;
	}

	.content-first {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		height: 50px;
		overflow: hidden;
		justify-content: center;
	}

	.content-first>span {
		color: #6699cc;
		display: inline-block;
		padding: 7px 20px;
		margin: 10px 0;
		border-radius: 20px;
		border: 1px solid #6699cc;
	}

	.details-content {
		padding: 0 20px;
		margin-top: 30px;
	}

	.footer-button {
		width: 140px;
		padding: 10px 10px;
		border-radius: 30px;
		margin-top: 16px;
		margin-right: 30px;
		margin-bottom: 16px;
		background-color: #6699cc;
		border: 0;
	}

	.footer-button:hover {
		background-color: #87a5cc;
	}

	.content {
		width: 100%;
		margin: 50px auto 0;
		display: flex;
		flex-wrap: wrap;
	}

	.content-item-two {
		height: 100px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.content-item>span {
		width: 150px;
		text-align: left;
	}

	.content-item {
		margin: 30px 0;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}

	.content-item>img {
		border-radius: 50%;
	}

	.container-footer {
		border-top: 1px dashed #6699cc;
		text-align: right;
	}

	.container-header {
		border-bottom: 1px solid #6699cc;
		padding: 20px;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.container {
		background-color: white;
		box-shadow: #999999 5px 5px 10px;
		width: 360px;
		border: 4px #6699cc solid;
		border-radius: 20px;
		margin-bottom: 50px;
		margin-left: 15%;
	}

	.aa {
		transition: all 1s;
	}

	.go {
		transform: rotateY(180deg);
		transition: all 1s;
	}

	.details-back {
		transform: rotateY(180deg);
	}

	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 150px;
		margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n + 1) {
		background-color: #d3dce6;
	}
</style>
